import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// 路由（后续扩展）
// app.use('/api/...', someRouter);

app.listen(PORT, () => {
  console.log(`[AstarVia Backend] Server running on http://localhost:${PORT}`);
});
