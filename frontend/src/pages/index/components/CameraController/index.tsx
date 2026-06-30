import React from 'react';
import { OrbitControls } from '@react-three/drei';

/**
 * CameraController — 相机交互控制
 *
 * 职责：Orbit 旋转/缩放/平移
 * 不包含：相机本身的创建（由 Canvas 的 camera prop 处理）
 */
export const CameraController: React.FC = () => {
  return (
    <OrbitControls
      enableDamping
      dampingFactor={0.08}
      minDistance={2}
      maxDistance={50}
      maxPolarAngle={Math.PI / 1.8}
      target={[0, 0, 0]}
    />
  );
};
