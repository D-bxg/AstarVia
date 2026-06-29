import React, { useState, useCallback } from 'react';
import { FormInput } from '../FormInput';
import { PasswordInput } from '../PasswordInput';
import type { FieldError } from '../../types';
import './style.css';

interface LoginFormProps {
  errors: FieldError[];
  loading: boolean;
  serverError: string | null;
  getError: (errors: FieldError[], field: string) => string | undefined;
  clearFieldError: (field: string) => void;
  onSubmit: (fields: { username: string; password: string }) => Promise<boolean>;
  onSwitchToRegister: () => void;
}

/**
 * LoginForm — 登录表单
 *
 * 职责：管理登录字段状态 + 提交
 * 不关心：注册逻辑、页面布局
 */
export const LoginForm: React.FC<LoginFormProps> = ({
  errors,
  loading,
  serverError,
  getError,
  clearFieldError,
  onSubmit,
  onSwitchToRegister,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await onSubmit({ username, password });
    },
    [username, password, onSubmit],
  );

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      {serverError && <div className="login-form__server-error">{serverError}</div>}

      <FormInput
        label="用户名"
        name="username"
        value={username}
        placeholder="请输入用户名"
        autoComplete="username"
        error={getError(errors, 'username')}
        onChange={(v) => {
          setUsername(v);
          clearFieldError('username');
        }}
      />

      <PasswordInput
        label="密码"
        name="password"
        value={password}
        placeholder="请输入密码"
        autoComplete="current-password"
        error={getError(errors, 'password')}
        onChange={(v) => {
          setPassword(v);
          clearFieldError('password');
        }}
      />

      <button
        type="submit"
        className="login-form__submit"
        disabled={loading}
      >
        {loading ? '登录中...' : '登  录'}
      </button>

      <p className="login-form__switch">
        没有账号？
        <button type="button" onClick={onSwitchToRegister}>
          立即注册
        </button>
      </p>
    </form>
  );
};
