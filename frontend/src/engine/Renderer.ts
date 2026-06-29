import * as THREE from 'three';

/**
 * 渲染器管理器
 * 封装 WebGLRenderer 的创建、配置和自适应
 */
export class RendererManager {
  public renderer: THREE.WebGLRenderer;

  constructor(canvas?: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
  }

  /** 挂载到 DOM 容器 */
  mount(container: HTMLElement): void {
    container.appendChild(this.renderer.domElement);
    this.resize(container.clientWidth, container.clientHeight);
  }

  /** 移除 DOM */
  unmount(): void {
    this.renderer.domElement.remove();
  }

  /** 响应式尺寸调整 */
  resize(width: number, height: number): void {
    this.renderer.setSize(width, height, false);
  }

  /** 渲染一帧 */
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    this.renderer.render(scene, camera);
  }

  /** 销毁 */
  dispose(): void {
    this.renderer.dispose();
  }
}
