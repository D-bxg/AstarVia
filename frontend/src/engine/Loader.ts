import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { LoaderOptions } from './types';

/**
 * 3D 资源加载器
 * 封装 GLTF/GLB 加载，支持 Draco 压缩
 */
export class AssetLoader {
  private gltfLoader: GLTFLoader;
  private progressHandlers: Array<(percent: number) => void> = [];

  constructor(private options: LoaderOptions = {}) {
    this.gltfLoader = new GLTFLoader();

    // Draco 压缩支持
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath(
      'https://www.gstatic.com/draco/versioned/decoders/1.5.7/',
    );
    this.gltfLoader.setDRACOLoader(dracoLoader);
  }

  /** 加载 GLTF/GLB 模型 */
  async loadGLTF(url: string): Promise<GLTF> {
    const fullUrl = this.options.basePath
      ? `${this.options.basePath}/${url}`
      : url;

    return new Promise((resolve, reject) => {
      this.gltfLoader.load(
        fullUrl,
        (gltf) => resolve(gltf),
        (progress) => {
          if (progress.total > 0) {
            const percent = (progress.loaded / progress.total) * 100;
            this.progressHandlers.forEach((h) => h(percent));
          }
        },
        (error) => reject(error),
      );
    });
  }

  /** 注册加载进度回调 */
  onProgress(handler: (percent: number) => void): void {
    this.progressHandlers.push(handler);
  }

  /** 清理 */
  dispose(): void {
    this.progressHandlers = [];
  }
}
