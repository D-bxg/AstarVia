import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Viewport3D } from './components/Viewport3D';
import { CameraController } from './components/CameraController';
import { ControlPanel } from './components/ControlPanel';
import { HUD } from './components/HUD';
import './index.css';

/**
 * 主页 — 3D 场景入口
 *
 * 组件树:
 *   MainPage
 *   ├── Canvas (r3f)
 *   │   ├── Viewport3D  (场景内容)
 *   │   └── CameraController (Orbit 控制)
 *   ├── ControlPanel (UI 面板)
 *   └── HUD (叠加信息)
 */
export const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <div className="main-page__canvas">
        <Canvas
          shadows
          camera={{ position: [5, 5, 10], fov: 60 }}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: 1, // ACESFilmic
          }}
        >
          <Viewport3D />
          <CameraController />
        </Canvas>
      </div>

      <ControlPanel />
      <HUD />
    </div>
  );
};
