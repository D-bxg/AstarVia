import React from 'react';
import { useScreenDPI, calcA4CSSPixels } from '../../hooks/useScreenDPI';
import './style.css';

interface A4PaperProps {
  children?: React.ReactNode;
}

/**
 * A4Paper — 真实 A4 物理尺寸区域
 *
 * 从 Electron 获取屏幕 EDID 物理尺寸 + 原生分辨率 + 缩放比例，
 * 计算 210mm×297mm 对应的 CSS 像素值，1:1 匹配真实纸张。
 */
export const A4Paper: React.FC<A4PaperProps> = ({ children }) => {
  const rawInfo = useScreenDPI();

  if (!rawInfo) {
    return (
      <div className="a4-paper a4-paper--loading">
        <span>仅支持 Electron 桌面端</span>
      </div>
    );
  }

  const size = calcA4CSSPixels(rawInfo);

  return (
    <div
      className="a4-paper"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
    >
      <div className="a4-paper__inner">
        {children || (
          <p className="a4-paper__hint">
            {rawInfo.error ? (
              <span style={{ color: '#e94560' }}>错误: {rawInfo.error}</span>
            ) : (
              <>
                A4 · {size.width}×{size.height} CSS px
                <br />
                屏幕 {size.screenWidthMM}×{size.screenHeightMM}mm
                @ {size.nativeWidthPx}px · 缩放 {Math.round(size.scaleFactor * 100)}%
              </>
            )}
          </p>
        )}
      </div>
    </div>
  );
};
