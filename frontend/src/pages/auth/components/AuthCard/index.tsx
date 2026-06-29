import React from 'react';
import { LoginForm } from '../LoginForm';
import { RegisterForm } from '../RegisterForm';
import type { AuthMode, FieldError, LoginFields, RegisterFields } from '../../types';
import './style.css';

interface AuthCardProps {
  mode: AuthMode;
  errors: FieldError[];
  loading: boolean;
  serverError: string | null;
  getError: (errors: FieldError[], field: string) => string | undefined;
  clearFieldError: (field: string) => void;
  onSwitchMode: (mode: AuthMode) => void;
  onLogin: (fields: LoginFields) => Promise<boolean>;
  onRegister: (fields: RegisterFields) => Promise<boolean>;
}

/**
 * AuthCard — 认证卡片容器
 *
 * 职责：Tab 切换 + 表单分发
 * 不关心：页面布局、外部背景
 */
export const AuthCard: React.FC<AuthCardProps> = ({
  mode,
  errors,
  loading,
  serverError,
  getError,
  clearFieldError,
  onSwitchMode,
  onLogin,
  onRegister,
}) => {
  return (
    <div className="auth-card">
      {/* Tab 切换 */}
      <div className="auth-card__tabs">
        <button
          className={`auth-card__tab${mode === 'login' ? ' auth-card__tab--active' : ''}`}
          onClick={() => onSwitchMode('login')}
        >
          登录
        </button>
        <button
          className={`auth-card__tab${mode === 'register' ? ' auth-card__tab--active' : ''}`}
          onClick={() => onSwitchMode('register')}
        >
          注册
        </button>
      </div>

      {/* 表单内容 */}
      <div className="auth-card__body">
        {mode === 'login' ? (
          <LoginForm
            errors={errors}
            loading={loading}
            serverError={serverError}
            getError={getError}
            clearFieldError={clearFieldError}
            onSubmit={onLogin}
            onSwitchToRegister={() => onSwitchMode('register')}
          />
        ) : (
          <RegisterForm
            errors={errors}
            loading={loading}
            serverError={serverError}
            getError={getError}
            clearFieldError={clearFieldError}
            onSubmit={onRegister}
            onSwitchToLogin={() => onSwitchMode('login')}
          />
        )}
      </div>
    </div>
  );
};
