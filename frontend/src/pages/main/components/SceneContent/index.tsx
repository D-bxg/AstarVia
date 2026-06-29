import React from 'react';

/**
 * SceneContent — 场景内容组件
 *
 * 职责：存放 3D 场景中的所有实体对象（模型、网格等）
 * 后续往这里添加业务相关的 3D 内容
 */
export const SceneContent: React.FC = () => {
  return (
    <group>
      {/* 地面网格辅助 */}
      <gridHelper
        args={[20, 20, '#333355', '#222244']}
        position={[0, -0.01, 0]}
      />

      {/* 坐标轴辅助（开发阶段） */}
      <axesHelper args={[5]} />

      {/* ========================================
          后续在此添加 3D 内容，例如：
          <ModelLoader url="xxx.glb" />
          <EffectComposer>...</EffectComposer>
          ======================================== */}
    </group>
  );
};
