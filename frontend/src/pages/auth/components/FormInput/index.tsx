import React from 'react';
import './style.css';

interface FormInputProps {
  label: string;
  name: string;
  type?: 'text' | 'password';
  value: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

/**
 * FormInput — 通用输入组件
 *
 * 职责：渲染 label + input + 错误提示
 * 不关心：业务校验规则、API 调用
 */
export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = 'text',
  value,
  placeholder,
  error,
  autoComplete,
  onChange,
  onBlur,
}) => {
  return (
    <div className={`form-input${error ? ' form-input--error' : ''}`}>
      <label className="form-input__label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className="form-input__field"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
      {error && <span className="form-input__error">{error}</span>}
    </div>
  );
};
