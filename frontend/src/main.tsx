import React from 'react';
import ReactDOM from 'react-dom/client';
import '@shared/styles/variables.css';
import '@shared/styles/global.css';
import { AuthPage } from '@pages/auth';
// import { MainPage } from '@pages/main'; // TODO: 路由切换

const App: React.FC = () => {
  // TODO: 接入 react-router 后根据路径切换页面
  return <AuthPage />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
