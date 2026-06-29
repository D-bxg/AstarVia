import { useState, useCallback } from 'react';
import type { AuthMode, LoginFields, RegisterFields, ValidationResult } from '../types';
import { useFormValidation } from './useFormValidation';

interface AuthState {
  mode: AuthMode;
  loading: boolean;
  errors: ValidationResult['errors'];
  serverError: string | null;
}

/**
 * 认证逻辑 hook
 *
 * 职责：管理登录/注册流程、调用 API、切换模式
 * TODO: 接入真实 API 后替换 try 块中的模拟请求
 */
export function useAuth() {
  const { validateLogin, validateRegister, getError } = useFormValidation();

  const [state, setState] = useState<AuthState>({
    mode: 'login',
    loading: false,
    errors: [],
    serverError: null,
  });

  /** 切换登录 / 注册 */
  const switchMode = useCallback((mode: AuthMode) => {
    setState((prev) => ({ ...prev, mode, errors: [], serverError: null }));
  }, []);

  /** 清除指定字段错误（输入时） */
  const clearFieldError = useCallback((field: string) => {
    setState((prev) => ({
      ...prev,
      errors: prev.errors.filter((e) => e.field !== field),
      serverError: null,
    }));
  }, []);

  /** 登录 */
  const login = useCallback(
    async (fields: LoginFields) => {
      const result = validateLogin(fields);
      setState((prev) => ({ ...prev, errors: result.errors }));

      if (!result.valid) return false;

      setState((prev) => ({ ...prev, loading: true, serverError: null }));

      try {
        // TODO: 替换为真实 API 调用
        // const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify(fields) });
        await new Promise((r) => setTimeout(r, 800)); // 模拟网络延迟
        console.log('[Auth] Login success:', fields.username);

        setState((prev) => ({ ...prev, loading: false }));
        return true;
      } catch {
        setState((prev) => ({
          ...prev,
          loading: false,
          serverError: '登录失败，请重试',
        }));
        return false;
      }
    },
    [validateLogin],
  );

  /** 注册 */
  const register = useCallback(
    async (fields: RegisterFields) => {
      const result = validateRegister(fields);
      setState((prev) => ({ ...prev, errors: result.errors }));

      if (!result.valid) return false;

      setState((prev) => ({ ...prev, loading: true, serverError: null }));

      try {
        // TODO: 替换为真实 API 调用
        // const res = await fetch('/api/auth/register', { method: 'POST', body: JSON.stringify(fields) });
        await new Promise((r) => setTimeout(r, 800)); // 模拟网络延迟
        console.log('[Auth] Register success:', fields.username);

        setState((prev) => ({ ...prev, loading: false }));
        return true;
      } catch {
        setState((prev) => ({
          ...prev,
          loading: false,
          serverError: '注册失败，请重试',
        }));
        return false;
      }
    },
    [validateRegister],
  );

  return {
    ...state,
    switchMode,
    clearFieldError,
    getError,
    login,
    register,
  };
}
