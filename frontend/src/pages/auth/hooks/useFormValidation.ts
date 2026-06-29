import { useCallback } from 'react';
import type { FieldError, LoginFields, RegisterFields, ValidationResult } from '../types';

/**
 * 表单校验 hook
 *
 * 职责：纯校验逻辑，不关心 UI 状态
 * 规则：用户名 ≥ 3 位、密码 ≥ 6 位、确认密码一致
 */
export function useFormValidation() {
  const validateLogin = useCallback((fields: LoginFields): ValidationResult => {
    const errors: FieldError[] = [];

    if (!fields.username.trim()) {
      errors.push({ field: 'username', message: '请输入用户名' });
    } else if (fields.username.trim().length < 3) {
      errors.push({ field: 'username', message: '用户名至少 3 位' });
    }

    if (!fields.password) {
      errors.push({ field: 'password', message: '请输入密码' });
    } else if (fields.password.length < 6) {
      errors.push({ field: 'password', message: '密码至少 6 位' });
    }

    return { valid: errors.length === 0, errors };
  }, []);

  const validateRegister = useCallback((fields: RegisterFields): ValidationResult => {
    const errors: FieldError[] = [];

    if (!fields.username.trim()) {
      errors.push({ field: 'username', message: '请输入用户名' });
    } else if (fields.username.trim().length < 3) {
      errors.push({ field: 'username', message: '用户名至少 3 位' });
    }

    if (!fields.password) {
      errors.push({ field: 'password', message: '请输入密码' });
    } else if (fields.password.length < 6) {
      errors.push({ field: 'password', message: '密码至少 6 位' });
    }

    if (!fields.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: '请确认密码' });
    } else if (fields.password !== fields.confirmPassword) {
      errors.push({ field: 'confirmPassword', message: '两次密码不一致' });
    }

    return { valid: errors.length === 0, errors };
  }, []);

  /** 获取单个字段的错误信息 */
  const getError = useCallback(
    (errors: FieldError[], field: string): string | undefined =>
      errors.find((e) => e.field === field)?.message,
    [],
  );

  return { validateLogin, validateRegister, getError };
}
