import React from 'react';
import type { A4Pixels } from '../../hooks/useScreenDPI';
import './style.css';

interface QuestionCardProps {
  index: number;
  title: string;
  subtitle?: string;
  a4Size: A4Pixels | null;
  cardHeight: number;
  expanded: number | null;
  onClick: (index: number | null) => void;
}

/**
 * QuestionCard — 题目卡片
 *
 * 宽度 = A4 宽，未展开时高度 = (视口 - header) / 3
 * 点击后原地撑开至 A4 高度，其他卡片淡出
 */
export const QuestionCard: React.FC<QuestionCardProps> = ({
  index,
  title,
  subtitle,
  a4Size,
  cardHeight,
  expanded,
  onClick,
}) => {
  const isExpanded = expanded === index;
  const isFading = expanded !== null && !isExpanded;

  const style: React.CSSProperties = {};
  if (a4Size) {
    style.width = `${a4Size.width}px`;
  }
  // 展开 → A4 高度，未展开 → 卡片高度
  style.height = isExpanded ? (a4Size ? `${a4Size.height}px` : 'auto') : `${cardHeight}px`;

  return (
    <div
      className={`question-card${isExpanded ? ' question-card--expanded' : ''}${isFading ? ' question-card--fading' : ''}`}
      style={style}
      onClick={() => onClick(isExpanded ? null : index)}
      role="button"
      tabIndex={0}
    >
      <div className="question-card__inner">
        <span className="question-card__number">第 {index + 1} 题</span>
        <h3 className="question-card__title">{title}</h3>
        {subtitle && <p className="question-card__subtitle">{subtitle}</p>}
        {isExpanded && (
          <div className="question-card__expanded-content">
            <p className="question-card__placeholder">题目内容区域（后续扩展）</p>
          </div>
        )}
      </div>
    </div>
  );
};
