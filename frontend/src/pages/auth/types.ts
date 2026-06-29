/** 登录/注册表单模式 */
export type AuthMode = 'login' | 'register';

/** 登录表单字段 */
export interface LoginFields {
  username: string;
  password: string;
}

/** 注册表单字段 */
export interface RegisterFields {
  username: string;
  password: string;
  confirmPassword: string;
}

/** 单个字段的校验错误 */
export interface FieldError {
  field: string;
  message: string;
}

/** 表单校验结果 */
export interface ValidationResult {
  valid: boolean;
  errors: FieldError[];
}
