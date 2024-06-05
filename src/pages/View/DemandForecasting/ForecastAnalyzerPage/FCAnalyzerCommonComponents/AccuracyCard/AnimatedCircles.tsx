import React, { FC } from 'react';
import './AccuracyCard.css';

interface Props {
  gradientId: string;
  circleClassName: string;
  cx: number;
  cy: number;
  r: number;
  style?: React.CSSProperties;
}

const AnimatedCircle: FC<Props> = ({ gradientId, circleClassName, cx, cy, r, style = {} }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 66 80"
      fill="none"
      style={{ position: 'absolute', ...style }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(10, 165, 255, 0.10)" />
          <stop offset="100%" stopColor="rgba(71, 198, 255, 0.00)" />
        </linearGradient>
      </defs>
      <circle
        opacity="0.64"
        cx={cx}
        cy={cy}
        r={r}
        fill={`url(#${gradientId})`}
        className={circleClassName}
      />
    </svg>
  );
};

export const AnimatedCircles1 = () => {
  return (
    <AnimatedCircle
      gradientId="gradient1"
      circleClassName="rotate1"
      cx={16}
      cy={20}
      r={94}
      style={{ top: 0, left: -65 }}
    />
  );
};

export const AnimatedCircles2 = () => {
  return (
    <AnimatedCircle
      gradientId="gradient2"
      circleClassName="rotate2"
      cx={10}
      cy={20}
      r={35}
      style={{ top: -45, right: -85 }}
    />
  );
};

export const AnimatedCircles3 = () => {
  return (
    <AnimatedCircle
      gradientId="gradient3"
      circleClassName="rotate3"
      cx={10}
      cy={20}
      r={67}
      style={{ bottom: 0, right: -180 }}
    />
  );
};
