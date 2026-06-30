import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Header } from './components/Header';
import { Viewport3D } from './components/Viewport3D';
import { CameraController } from './components/CameraController';
import { HUD } from './components/HUD';
import type { MenuItem } from './components/HamburgerMenu';
import './index.css';

/**
 * 主页 — 登录后 3D 场景入口
 *
 * 组件树:
 *   IndexPage
 *   ├── Header (Logo + 汉堡菜单，菜单内含控制面板)
 *   ├── Canvas (r3f)
 *   │   ├── Viewport3D  (场景内容)
 *   │   └── CameraController (Orbit 控制)
 *   └── HUD (叠加信息)
 */

// TODO: 后续接入真实用户数据
const mockMenuItems: MenuItem[] = [];
const mockUsername = '用户';
const handleLogout = () => {
  // TODO: 清除登录态，跳回 auth 页面
  console.log('[Index] Logout');
};

export const IndexPage: React.FC = () => {
  return (
    <div className="index-page">
      {/* 顶栏（overlay） */}
      <Header
        username={mockUsername}
        menuItems={mockMenuItems}
        onLogout={handleLogout}
      />

      {/* 3D 画布 */}
      <div className="index-page__canvas">
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

      <HUD />
    </div>
  );
};
