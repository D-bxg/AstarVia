import { contextBridge, ipcRenderer } from 'electron';

export interface ScreenDPI {
  dpi: number;
  scaleFactor: number;
  bounds: { x: number; y: number; width: number; height: number };
  physicalMM?: { width: number; height: number };
  error?: string;
}

/**
 * 预加载脚本 — 安全地暴露有限 API 给渲染进程
 */
contextBridge.exposeInMainWorld('electronAPI', {
  platform: process.platform,
  getScreenDPI: (): Promise<ScreenDPI> => ipcRenderer.invoke('get-screen-dpi'),
});
