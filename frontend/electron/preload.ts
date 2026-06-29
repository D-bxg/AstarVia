import { contextBridge } from 'electron';

/**
 * 预加载脚本 — 安全地暴露有限 API 给渲染进程
 * 后续可按需扩展 IPC 通信接口
 */
contextBridge.exposeInMainWorld('electronAPI', {
  /** 平台信息 */
  platform: process.platform,
});
