# AstarVia

3D 可视化应用 — 支持 Web / 桌面端多平台分发。

## 技术栈

| 层面 | 技术 |
|------|------|
| 3D 渲染 | Three.js + react-three-fiber |
| 前端框架 | React + TypeScript |
| 构建工具 | Vite |
| 桌面分发 | Electron |
| 后端 | Node.js |

## 项目结构

```
frontend/       # 前端 — React + r3f
  src/
    pages/      # 页面（各自独立文件夹，组件化拆分）
    shared/     # 跨页面共享组件/工具
    engine/     # 3D 引擎抽象层
  electron/     # Electron 主进程
backend/        # 后端 API 服务
dist/           # 构建产物
release/        # 发布包
```

## 开发

```bash
# 前端开发
cd frontend && npm run dev

# 后端开发
cd backend && npm run dev

# Electron 桌面端
cd frontend && npm run electron:dev
```

## 构建

```bash
# Web 构建
cd frontend && npm run build

# 桌面端打包
cd frontend && npm run electron:build
```
