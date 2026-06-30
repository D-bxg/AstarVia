import React from 'react';
import { SceneContent } from '../SceneContent';

/**
 * Viewport3D — 3D 视口组件
 *
 * 职责：管理 Canvas 内部的场景内容
 * 不包含：相机控制（由 CameraController 负责）
 *           UI 面板（由 ControlPanel 负责）
 */
export const Viewport3D: React.FC = () => {
  return (
    <>
      {/* 环境光 + 方向光 */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* 场景内容 */}
      <SceneContent />
    </>
  );
};
