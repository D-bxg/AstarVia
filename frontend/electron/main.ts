import { app, BrowserWindow, shell, screen, ipcMain } from 'electron';
import path from 'path';
import { execSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { tmpdir } from 'os';

let mainWindow: BrowserWindow | null = null;

/**
 * Windows: SetProcessDPIAware + GetDeviceCaps(HORZSIZE/VERTSIZE)
 * 通过临时 .ps1 文件执行，避免 shell 转义问题
 */
function getPhysicalMM(): { width: number; height: number; error?: string } | null {
  if (process.platform !== 'win32') return null;

  const ps1Path = path.join(tmpdir(), 'astarvia_dpi.ps1');

  try {
    const script = [
      'Add-Type @"',
      'using System;',
      'using System.Runtime.InteropServices;',
      'public class GDI {',
      '  [DllImport("user32.dll")] public static extern bool SetProcessDPIAware();',
      '  [DllImport("gdi32.dll")]  public static extern int  GetDeviceCaps(IntPtr hdc, int index);',
      '  [DllImport("user32.dll")] public static extern IntPtr GetDC(IntPtr hwnd);',
      '  [DllImport("user32.dll")] public static extern int  ReleaseDC(IntPtr hwnd, IntPtr hdc);',
      '}',
      '"@',
      '$null = [GDI]::SetProcessDPIAware()',
      '$hdc = [GDI]::GetDC([IntPtr]::Zero)',
      '$wMM = [GDI]::GetDeviceCaps($hdc, 4)',
      '$hMM = [GDI]::GetDeviceCaps($hdc, 6)',
      '[GDI]::ReleaseDC([IntPtr]::Zero, $hdc)',
      'Write-Host "$wMM,$hMM"',
    ].join('\n');

    writeFileSync(ps1Path, script, 'utf-8');
    const raw = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${ps1Path}"`, {
      encoding: 'utf-8',
      timeout: 8000,
    }).trim();

    // 取最后一行匹配 number,number 的内容（跳过 SetProcessDPIAware 可能的返回值）
    const match = raw.match(/(\d+),(\d+)\s*$/m);
    if (match) {
      const wMM = Number(match[1]);
      const hMM = Number(match[2]);
      if (wMM > 0 && hMM > 0 && wMM < 2000 && hMM < 2000) {
        return { width: wMM, height: hMM };
      }
    }
    return { width: 0, height: 0, error: `unexpected output: ${raw}` };
  } catch (e: any) {
    return { width: 0, height: 0, error: e?.message || String(e) };
  } finally {
    try { unlinkSync(ps1Path); } catch { /* ignore */ }
  }
}

// IPC: 返回前端需要的全部屏幕数据
ipcMain.handle('get-screen-dpi', () => {
  const display = screen.getPrimaryDisplay();

  const physMM = getPhysicalMM();

  if (physMM && physMM.width > 0) {
    // bounds 在 Windows 上可能是逻辑像素，× scaleFactor 得到原生物理像素
    const nativePx = display.bounds.width * display.scaleFactor;
    const physicalDPI = Math.round(nativePx / (physMM.width / 25.4));

    return {
      dpi: physicalDPI,
      scaleFactor: display.scaleFactor,
      bounds: display.bounds,
      physicalMM: { width: physMM.width, height: physMM.height },
    };
  }

  return {
    dpi: Math.round(display.scaleFactor * 96),
    scaleFactor: display.scaleFactor,
    bounds: display.bounds,
    error: physMM?.error || '无法获取屏幕物理尺寸',
  };
});

function createWindow(): void {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    frame: false,
    title: 'AstarVia',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    backgroundColor: '#1a1a2e',
    show: false,
  });

  // 开发环境加载 Vite dev server，生产环境加载打包后的文件
  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/web/index.html'));
  }

  // 外部链接在系统浏览器打开
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
