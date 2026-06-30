import { useState, useEffect } from 'react';

/** IPC 返回的原始屏幕信息 */
interface RawScreenInfo {
  dpi: number;
  scaleFactor: number;
  bounds: { x: number; y: number; width: number; height: number };
  physicalMM?: { width: number; height: number };
  error?: string;
}

declare global {
  interface Window {
    electronAPI?: {
      platform: string;
      getScreenDPI: () => Promise<RawScreenInfo>;
    };
  }
}

/** calcA4Pixels 的输入和输出 */
export interface A4Pixels {
  width: number;
  height: number;
  /** 屏幕物理宽度 mm */
  screenWidthMM: number;
  /** 屏幕物理高度 mm */
  screenHeightMM: number;
  /** 屏幕原生像素宽 */
  nativeWidthPx: number;
  /** Windows 缩放 */
  scaleFactor: number;
}

/**
 * 计算 A4 纸在屏幕上应渲染的 CSS 像素尺寸
 *
 * 转换链路:
 *   EDID → 屏幕物理宽高(mm)
 *   Electron bounds → 原生像素宽高
 *   物理像素/mm = 原生像素 / 物理mm
 *   A4物理像素 = 210mm × 物理像素/mm
 *   A4 CSS像素 = A4物理像素 ÷ scaleFactor（消除Windows缩放）
 */
export function calcA4CSSPixels(raw: RawScreenInfo): A4Pixels {
  const mm = raw.physicalMM;
  if (mm) {
    // bounds 是逻辑像素，× scaleFactor = 原生物理像素
    const nativePx = raw.bounds.width * raw.scaleFactor;
    const pxPerMM = nativePx / mm.width;
    return {
      width: Math.round(210 * pxPerMM / raw.scaleFactor),
      height: Math.round(297 * pxPerMM / raw.scaleFactor),
      screenWidthMM: mm.width,
      screenHeightMM: mm.height,
      nativeWidthPx: nativePx,
      scaleFactor: raw.scaleFactor,
    };
  }

  // EDID 不可用时回退（逻辑DPI，不保证精度）
  return {
    width: Math.round((210 / 25.4) * raw.scaleFactor * 96 / raw.scaleFactor),
    height: Math.round((297 / 25.4) * raw.scaleFactor * 96 / raw.scaleFactor),
    screenWidthMM: 0,
    screenHeightMM: 0,
    nativeWidthPx: raw.bounds.width * raw.scaleFactor,
    scaleFactor: raw.scaleFactor,
  };
}

/** 获取屏幕信息（仅 Electron，浏览器返回 null） */
export function useScreenDPI(): RawScreenInfo | null {
  const [info, setInfo] = useState<RawScreenInfo | null>(null);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getScreenDPI().then(setInfo);
    }
  }, []);

  return info;
}
