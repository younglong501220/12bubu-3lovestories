import React from 'react';

interface AvatarProps {
  size?: number;
  className?: string;
  expression?: 'happy' | 'tongue' | 'pout' | 'smile' | 'open';
}

/**
 * Exact Dudu (一二) character based on the uploaded photo:
 * Chubby round white panda head, black rounded ears, pink round blush,
 * round black eyes, cute open mouth with tongue out, optional yellow bag / black bow.
 */
export const DuduAvatar: React.FC<AvatarProps> = ({
  size = 64,
  className = '',
  expression = 'tongue',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      {/* Left Panda Ear */}
      <circle cx="20" cy="24" r="14" fill="#2d221e" stroke="#221815" strokeWidth="3" />
      <circle cx="21" cy="24" r="7" fill="#3f312b" opacity="0.4" />

      {/* Right Panda Ear */}
      <circle cx="80" cy="24" r="14" fill="#2d221e" stroke="#221815" strokeWidth="3" />
      <circle cx="79" cy="24" r="7" fill="#3f312b" opacity="0.4" />

      {/* Chubby Round White Face */}
      <path
        d="M 50 16 C 76 16 89 33 89 57 C 89 80 73 90 50 90 C 27 90 11 80 11 57 C 11 33 24 16 50 16 Z"
        fill="#FFFFFF"
        stroke="#2d221e"
        strokeWidth="3.8"
      />

      {/* Left Rosy Cheek Blush */}
      <ellipse cx="26" cy="62" rx="9" ry="6.5" fill="#ff9ebb" opacity="0.85" />

      {/* Right Rosy Cheek Blush */}
      <ellipse cx="74" cy="62" rx="9" ry="6.5" fill="#ff9ebb" opacity="0.85" />

      {/* Left Eye */}
      <circle cx="34" cy="49" r="4.8" fill="#2d221e" />
      <circle cx="33" cy="47.5" r="1.6" fill="#FFFFFF" />

      {/* Right Eye */}
      <circle cx="66" cy="49" r="4.8" fill="#2d221e" />
      <circle cx="65" cy="47.5" r="1.6" fill="#FFFFFF" />

      {/* Expressions */}
      {expression === 'tongue' && (
        <g>
          {/* Cute Open Mouth with Tongue (like in photo 1 & 2) */}
          <path
            d="M 44 54 Q 50 51 56 54 Q 50 67 44 54 Z"
            fill="#ff6b81"
            stroke="#2d221e"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Tongue highlight */}
          <ellipse cx="50" cy="58" rx="3.5" ry="4" fill="#ff8599" />
          {/* Upper lip cute line */}
          <path d="M 43 53 Q 50 56 57 53" stroke="#2d221e" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      )}

      {expression === 'happy' && (
        <path
          d="M 43 54 Q 50 63 57 54"
          stroke="#2d221e"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {expression === 'open' && (
        <g>
          {/* Open mouth waiting for snacks/boba */}
          <ellipse cx="50" cy="56" rx="6" ry="7" fill="#ff6b81" stroke="#2d221e" strokeWidth="2.5" />
          <ellipse cx="50" cy="58" rx="3" ry="3" fill="#ff4757" />
        </g>
      )}

      {expression === 'pout' && (
        <path
          d="M 45 58 Q 50 53 55 58"
          stroke="#2d221e"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      )}
    </svg>
  );
};

/**
 * Exact Bubu (布布) character based on the uploaded photo:
 * Round milk-tea light brown chubby bear head, darker chocolate round ears,
 * round peachy-orange cheeks, cute cat-like mouth (3 / w), loving expression.
 */
export const BubuAvatar: React.FC<AvatarProps> = ({
  size = 64,
  className = '',
  expression = 'smile',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      {/* Left Bear Ear */}
      <circle cx="21" cy="25" r="14" fill="#a47551" stroke="#2d221e" strokeWidth="3" />
      <circle cx="21" cy="25" r="8" fill="#835634" />

      {/* Right Bear Ear */}
      <circle cx="79" cy="25" r="14" fill="#a47551" stroke="#2d221e" strokeWidth="3" />
      <circle cx="79" cy="25" r="8" fill="#835634" />

      {/* Chubby Round Milk-Tea Brown Face */}
      <path
        d="M 50 16 C 76 16 89 33 89 57 C 89 80 73 90 50 90 C 27 90 11 80 11 57 C 11 33 24 16 50 16 Z"
        fill="#cf9f76"
        stroke="#2d221e"
        strokeWidth="3.8"
      />

      {/* Big Peach-Orange Cheek Blush (signature Bubu) */}
      <ellipse cx="25" cy="62" rx="10" ry="7" fill="#ffb076" opacity="0.9" />
      <ellipse cx="75" cy="62" rx="10" ry="7" fill="#ffb076" opacity="0.9" />

      {/* Left Eye */}
      <circle cx="34" cy="49" r="4.8" fill="#2d221e" />
      <circle cx="33" cy="47.5" r="1.6" fill="#FFFFFF" />

      {/* Right Eye */}
      <circle cx="66" cy="49" r="4.8" fill="#2d221e" />
      <circle cx="65" cy="47.5" r="1.6" fill="#FFFFFF" />

      {/* Cute Bubu 'w' / '3' cat mouth */}
      {expression === 'smile' && (
        <path
          d="M 43 54 Q 46.5 58 50 54 Q 53.5 58 57 54"
          stroke="#2d221e"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {expression === 'happy' && (
        <g>
          {/* Open happy smile feeding snacks */}
          <path
            d="M 45 53 Q 50 51 55 53 Q 50 63 45 53 Z"
            fill="#e75e6f"
            stroke="#2d221e"
            strokeWidth="2.4"
          />
        </g>
      )}

      {expression === 'open' && (
        <g>
          <path
            d="M 44 54 Q 50 60 56 54"
            stroke="#2d221e"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      )}
    </svg>
  );
};
