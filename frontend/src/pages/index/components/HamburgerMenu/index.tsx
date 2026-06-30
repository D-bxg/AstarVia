import React from 'react';
import './style.css';

export interface MenuItem {
  id: string;
  label: string;
  onClick?: () => void;
}

interface HamburgerMenuProps {
  open: boolean;
  avatarUrl?: string;
  username: string;
  items: MenuItem[];
  onLogout: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

/**
 * HamburgerMenu — 下拉菜单
 *
 * 结构:
 *   第一行: 头像 + 用户名
 *   中间:   动态菜单项（后续扩展）
 *   最后一行: 退出登录
 */
export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  open,
  avatarUrl,
  username,
  items,
  onLogout,
  onClose,
  children,
}) => {
  if (!open) return null;

  return (
    <>
      {/* 点击遮罩关闭 */}
      <div className="hamburger-overlay" onClick={onClose} />

      <div className="hamburger-menu">
        {/* 用户信息 */}
        <div className="hamburger-menu__user">
          <div className="hamburger-menu__avatar">
            {avatarUrl ? (
              <img src={avatarUrl} alt={username} />
            ) : (
              <span className="hamburger-menu__avatar-placeholder">
                {username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <span className="hamburger-menu__name">{username}</span>
        </div>

        {/* 动态菜单项 */}
        {items.length > 0 && (
          <div className="hamburger-menu__items">
            {items.map((item) => (
              <button
                key={item.id}
                className="hamburger-menu__item"
                onClick={() => {
                  item.onClick?.();
                  onClose();
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* 控制面板插槽（后续扩展） */}
        {children && (
          <div className="hamburger-menu__panel">
            {children}
          </div>
        )}

        {/* 退出登录 */}
        <div className="hamburger-menu__footer">
          <button
            className="hamburger-menu__logout"
            onClick={() => {
              onLogout();
              onClose();
            }}
          >
            退出登录
          </button>
        </div>
      </div>
    </>
  );
};
