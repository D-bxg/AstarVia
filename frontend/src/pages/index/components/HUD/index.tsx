import React from 'react';
import './style.css';

/**
 * HUD — 抬头显示
 *
 * 职责：3D 场景之上的叠加信息（帧率、坐标、状态指示等）
 * 不包含：交互控件（由 ControlPanel 负责）
 */
export const HUD: React.FC = () => {
  return (
    <div className="hud">
      <div className="hud__top-left">
        {/* 帧率 / 坐标信息，后续接入 stats.js 或自定义 */}
      </div>
    </div>
  );
};
