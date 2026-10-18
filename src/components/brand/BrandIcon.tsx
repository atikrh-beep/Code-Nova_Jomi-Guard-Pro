import React from 'react';

interface BrandIconProps {
  size?: number | string;
  className?: string;
  variant?: 'full' | 'glyph' | 'monochrome';
}

export const BrandIcon: React.FC<BrandIconProps> = ({
  size = 40,
  className = '',
  variant = 'full',
}) => {
  // Geometric icon: Cadastral boundary polygon + layered administrative record + verification node
  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <svg
      width={size}
      height={size}
      style={{ minWidth: dimension, minHeight: dimension }}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 block ${className}`}
      aria-hidden="true"
    >
      {/* Background cadastral parcel boundary polygon */}
      <path
        d="M8 12L24 5L40 12V24C40 33.2 24 43 24 43C24 43 8 33.2 8 24V12Z"
        fill={variant === 'monochrome' ? 'currentColor' : '#14263A'}
        fillOpacity={variant === 'monochrome' ? '0.15' : '1'}
        stroke={variant === 'monochrome' ? 'currentColor' : '#14263A'}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Folded internal record / document layer */}
      <path
        d="M17 16H31C31.5523 16 32 16.4477 32 17V29C32 29.5523 31.5523 30 31 30H17C16.4477 30 16 29.5523 16 29V17C16 16.4477 16.4477 16 17 16Z"
        fill="#FFFFFF"
        stroke={variant === 'monochrome' ? 'currentColor' : '#087F79'}
        strokeWidth="2"
      />

      {/* Cadastral grid / document lines */}
      <line
        x1="20"
        y1="20"
        x2="28"
        y2="20"
        stroke={variant === 'monochrome' ? 'currentColor' : '#14263A'}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="23.5"
        x2="26"
        y2="23.5"
        stroke={variant === 'monochrome' ? 'currentColor' : '#526174'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Precise focal verification nodal indicator */}
      <circle
        cx="28.5"
        cy="26.5"
        r="4"
        fill={variant === 'monochrome' ? 'currentColor' : '#087F79'}
      />
      <path
        d="M27 26.5L28 27.5L30 25.5"
        stroke="#FFFFFF"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
