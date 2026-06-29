import { type Scene, type WebGLRenderer, type Camera } from 'three';

/** 3D 引擎核心接口 */
export interface EngineInstance {
  scene: Scene;
  renderer: WebGLRenderer;
  camera: Camera;
  mount: (container: HTMLElement) => void;
  unmount: () => void;
  resize: (width: number, height: number) => void;
  render: (delta: number) => void;
}

/** 场景加载器选项 */
export interface LoaderOptions {
  /** 是否显示加载进度 */
  showProgress?: boolean;
  /** 资源基础路径 */
  basePath?: string;
}

/** 相机预设类型 */
export type CameraPreset = 'perspective' | 'orthographic';

/** 相机配置 */
export interface CameraConfig {
  type: CameraPreset;
  fov?: number;
  near?: number;
  far?: number;
  position?: [number, number, number];
  lookAt?: [number, number, number];
}
