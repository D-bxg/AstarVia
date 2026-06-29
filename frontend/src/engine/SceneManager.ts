import * as THREE from 'three';

/**
 * 场景管理器
 * 负责 3D 场景的创建、生命周期和销毁
 */
export class SceneManager {
  public scene: THREE.Scene;
  private disposed = false;

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1a1a2e);
  }

  /** 添加对象到场景 */
  add(...objects: THREE.Object3D[]): void {
    this.scene.add(...objects);
  }

  /** 从场景移除对象 */
  remove(...objects: THREE.Object3D[]): void {
    this.scene.remove(...objects);
  }

  /** 清理场景（递归 dispose 几何体和材质） */
  dispose(): void {
    if (this.disposed) return;
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry?.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material?.dispose();
        }
      }
    });
    this.scene.clear();
    this.disposed = true;
  }

  get isDisposed(): boolean {
    return this.disposed;
  }
}
