import React, { useState, useMemo } from 'react';
import { Header } from '@pages/index/components/Header';
import type { MenuItem } from '@pages/index/components/HamburgerMenu';
import { useScreenDPI, calcA4CSSPixels } from './hooks/useScreenDPI';
import { QuestionCard } from './components/QuestionCard';
import './index.css';

const HEADER_HEIGHT = 48;

const mockMenuItems: MenuItem[] = [];
const mockUsername = '用户';
const handleLogout = () => console.log('[Question] Logout');

const mockQuestions = [
  { title: '以下关于计算机网络的说法中，正确的是？', subtitle: '单选题 · 4个选项' },
  { title: '在关系型数据库中，以下哪个关键字用于删除表中的所有行但不删除表结构？', subtitle: '单选题 · 4个选项' },
  { title: '以下哪个 HTTP 状态码表示"未授权"？', subtitle: '单选题 · 4个选项' },
  { title: '在 JavaScript 中，以下哪个方法会改变原数组？', subtitle: '多选题 · 5个选项' },
  { title: '关于 HTTPS 的描述，以下正确的是？', subtitle: '单选题 · 4个选项' },
];

export const QuestionPage: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const rawInfo = useScreenDPI();

  const a4Size = useMemo(() => {
    if (rawInfo) return calcA4CSSPixels(rawInfo);
    return { width: 794, height: 1123, screenWidthMM: 0, screenHeightMM: 0, nativeWidthPx: 1920, scaleFactor: 1 };
  }, [rawInfo]);

  const cardHeight = useMemo(
    () => (window.innerHeight - HEADER_HEIGHT) / 3,
    [],
  );

  return (
    <div className="question-page">
      <Header
        username={mockUsername}
        menuItems={mockMenuItems}
        onLogout={handleLogout}
      />

      <div
        className="question-page__scroll"
        style={{ paddingTop: HEADER_HEIGHT + 16 }}
      >
        <div className="question-page__cards">
          {mockQuestions.map((q, i) => (
            <QuestionCard
              key={i}
              index={i}
              title={q.title}
              subtitle={q.subtitle}
              a4Size={a4Size}
              cardHeight={cardHeight}
              expanded={expanded}
              onClick={setExpanded}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
