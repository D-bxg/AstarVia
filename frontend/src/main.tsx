import React from 'react';
import ReactDOM from 'react-dom/client';
import '@shared/styles/variables.css';
import '@shared/styles/global.css';
// import { AuthPage } from '@pages/auth';
// import { IndexPage } from '@pages/index';
import { QuestionPage } from '@pages/question';

const App: React.FC = () => {
  // TODO: 接入 react-router 后根据路径切换页面
  return <QuestionPage />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
