import React, { useState, useCallback } from 'react';
import { FormInput } from '../FormInput';
import { PasswordInput } from '../PasswordInput';
import type { FieldError } from '../../types';
import './style.css';

interface RegisterFormProps {
  errors: FieldError[];
  loading: boolean;
  serverError: string | null;
  getError: (errors: FieldError[], field: string) => string | undefined;
  clearFieldError: (field: string) => void;
  onSubmit: (fields: { username: string; password: string; confirmPassword: string }) => Promise<boolean>;
  onSwitchToLogin: () => void;
}

/**
 * RegisterForm — 注册表单
 *
 * 职责：管理注册字段状态 + 提交
 * 不关心：登录逻辑、页面布局
 */
export const RegisterForm: React.FC<RegisterFormProps> = ({
  errors,
  loading,
  serverError,
  getError,
  clearFieldError,
  onSubmit,
  onSwitchToLogin,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await onSubmit({ username, password, confirmPassword });
    },
    [username, password, confirmPassword, onSubmit],
  );

  return (
    <form className="register-form" onSubmit={handleSubmit} noValidate>
      {serverError && <div className="register-form__server-error">{serverError}</div>}

      <FormInput
        label="用户名"
        name="reg-username"
        value={username}
        placeholder="请输入用户名（至少 3 位）"
        autoComplete="username"
        error={getError(errors, 'username')}
        onChange={(v) => {
          setUsername(v);
          clearFieldError('username');
        }}
      />

      <PasswordInput
        label="密码"
        name="reg-password"
        value={password}
        placeholder="请输入密码（至少 6 位）"
        autoComplete="new-password"
        error={getError(errors, 'password')}
        onChange={(v) => {
          setPassword(v);
          clearFieldError('password');
        }}
      />

      <PasswordInput
        label="确认密码"
        name="reg-confirm"
        value={confirmPassword}
        placeholder="请再次输入密码"
        autoComplete="new-password"
        error={getError(errors, 'confirmPassword')}
        onChange={(v) => {
          setConfirmPassword(v);
          clearFieldError('confirmPassword');
        }}
      />

      <button
        type="submit"
        className="register-form__submit"
        disabled={loading}
      >
        {loading ? '注册中...' : '注  册'}
      </button>

      <p className="register-form__switch">
        已有账号？
        <button type="button" onClick={onSwitchToLogin}>
          立即登录
        </button>
      </p>
    </form>
  );
};
