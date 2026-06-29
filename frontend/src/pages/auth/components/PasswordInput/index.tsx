import React, { useState } from 'react';
import './style.css';

interface PasswordInputProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

/**
 * PasswordInput — 密码输入组件
 *
 * 职责：密码框 + 显示/隐藏切换按钮
 * 不关心：业务校验规则、API 调用
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  name,
  value,
  placeholder,
  error,
  autoComplete,
  onChange,
  onBlur,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`password-input${error ? ' password-input--error' : ''}`}>
      <label className="password-input__label" htmlFor={name}>
        {label}
      </label>
      <div className="password-input__wrap">
        <input
          id={name}
          className="password-input__field"
          type={visible ? 'text' : 'password'}
          name={name}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
        <button
          type="button"
          className="password-input__toggle"
          onClick={() => setVisible(!visible)}
          tabIndex={-1}
          aria-label={visible ? '隐藏密码' : '显示密码'}
        >
          {visible ? '👁' : '👁‍🗨'}
        </button>
      </div>
      {error && <span className="password-input__error">{error}</span>}
    </div>
  );
};
