import React from 'react';
import './style.css';

/**
 * ControlPanel — 右侧控制面板
 *
 * 职责：UI 控件（按钮、滑块、参数配置等）
 * 不包含：3D 渲染逻辑（由 Viewport3D/SceneContent 负责）
 */
export const ControlPanel: React.FC = () => {
  return (
    <aside className="control-panel">
      <header className="control-panel__header">
        <h2 className="control-panel__title">控制面板</h2>
      </header>

      <div className="control-panel__body">
        <p className="control-panel__hint">
          在此添加操作控件（按钮、滑块、参数等）
        </p>

        {/* 示例：后续扩展 */}
        {/* <Button label="重置场景" onClick={...} /> */}
        {/* <Slider label="速度" min={0} max={100} /> */}
      </div>

      <footer className="control-panel__footer">
        <span className="control-panel__version">v0.1.0</span>
      </footer>
    </aside>
  );
};
