import React, { useState } from 'react';
import { HamburgerMenu, type MenuItem } from '../HamburgerMenu';
import logo from '@shared/assets/logo.svg';
import './style.css';

interface HeaderProps {
  username: string;
  avatarUrl?: string;
  menuItems: MenuItem[];
  onLogout: () => void;
}

/**
 * Header — 顶栏
 *
 * 职责: 左上角 Logo + 右上角汉堡按钮 → 下拉菜单
 * 不关心: 菜单项的具体业务逻辑
 */
export const Header: React.FC<HeaderProps> = ({
  username,
  avatarUrl,
  menuItems,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      {/* 左侧 Logo */}
      <img className="header__logo" src={logo} alt="AstarVia" />

      {/* 右侧汉堡按钮 */}
      <button
        className={`header__hamburger${menuOpen ? ' header__hamburger--active' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="菜单"
      >
        <span />
        <span />
        <span />
      </button>

      {/* 下拉菜单 */}
      <HamburgerMenu
        open={menuOpen}
        avatarUrl={avatarUrl}
        username={username}
        items={menuItems}
        onLogout={onLogout}
        onClose={() => setMenuOpen(false)}
      />
    </header>
  );
};
