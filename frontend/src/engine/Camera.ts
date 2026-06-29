import * as THREE from 'three';
import type { CameraConfig } from './types';

const DEFAULT_CONFIG: Required<CameraConfig> = {
  type: 'perspective',
  fov: 60,
  near: 0.1,
  far: 1000,
  position: [5, 5, 10],
  lookAt: [0, 0, 0],
};

/**
 * 相机制造器
 * 根据配置创建透视/正交相机
 */
export function createCamera(config: CameraConfig = {}): THREE.Camera {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const aspect = window.innerWidth / window.innerHeight;

  let camera: THREE.Camera;
  if (cfg.type === 'orthographic') {
    const frustumSize = 10;
    camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      cfg.near,
      cfg.far,
    );
  } else {
    camera = new THREE.PerspectiveCamera(cfg.fov, aspect, cfg.near, cfg.far);
  }

  camera.position.set(...cfg.position);
  camera.lookAt(...cfg.lookAt);
  return camera;
}

/** 更新相机长宽比（窗口 resize 时调用） */
export function updateCameraAspect(camera: THREE.Camera, aspect: number): void {
  if (camera instanceof THREE.PerspectiveCamera) {
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  } else if (camera instanceof THREE.OrthographicCamera) {
    const frustumSize = 10;
    camera.left = (frustumSize * aspect) / -2;
    camera.right = (frustumSize * aspect) / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();
  }
}
