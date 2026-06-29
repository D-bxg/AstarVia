import React from 'react';
import { AuthCard } from './components/AuthCard';
import { useAuth } from './hooks/useAuth';
import logo from './assets/logo.svg'; // TODO: 替换为真实 logo 文件后取消注释
import './index.css';

/**
 * AuthPage — 登录/注册页面
 *
 * 布局：
 *   ≥768px（桌面）：左 Logo + 右卡片双列
 *   <768px（手机）：居中单列，小 Logo 在上
 *
 * 组件树：
 *   AuthPage
 *   ├── .auth-page__logo（Logo 区域）
 *   └── AuthCard（Tab 切换 + 表单）
 */
export const AuthPage: React.FC = () => {
  const auth = useAuth();

  return (
    <div className="auth-page">
      {/* Logo 区域 */}
      <div className="auth-page__logo">
        {/* TODO: 放入 logo 文件后替换为 <img src={logo} alt="AstarVia" /> */}
        <img src={logo} alt="AstarVia" />
      </div>

      {/* 卡片区域 */}
      <div className="auth-page__card">
        <AuthCard
          mode={auth.mode}
          errors={auth.errors}
          loading={auth.loading}
          serverError={auth.serverError}
          getError={auth.getError}
          clearFieldError={auth.clearFieldError}
          onSwitchMode={auth.switchMode}
          onLogin={auth.login}
          onRegister={auth.register}
        />
      </div>
    </div>
  );
};
