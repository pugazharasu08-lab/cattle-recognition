import React from 'react';
import { motion } from 'framer-motion';

interface ConfidenceRingProps {
  confidence: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export const ConfidenceRing: React.FC<ConfidenceRingProps> = ({
  confidence,
  size = 110,
  strokeWidth = 9,
  showLabel = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  // Determine color theme based on confidence thresholds
  const getColor = (val: number) => {
    if (val >= 85) {
      return {
        stroke: '#16a34a', // emerald-600
        text: 'text-emerald-700',
        bg: 'bg-emerald-50',
        badge: 'High Confidence',
        badgeBg: 'bg-emerald-100 text-emerald-800'
      };
    }
    if (val >= 65) {
      return {
        stroke: '#eab308', // amber-500
        text: 'text-amber-700',
        bg: 'bg-amber-50',
        badge: 'Moderate Match',
        badgeBg: 'bg-amber-100 text-amber-800'
      };
    }
    return {
      stroke: '#ef4444', // red-500
      text: 'text-red-700',
      bg: 'bg-red-50',
      badge: 'Uncertain Identification',
      badgeBg: 'bg-red-100 text-red-800'
    };
  };

  const color = getColor(confidence);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated fill */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color.stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`font-heading text-2xl font-black ${color.text} tracking-tight leading-none`}
          >
            {confidence}%
          </motion.span>
          <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider mt-0.5">
            Confidence
          </span>
        </div>
      </div>

      {showLabel && (
        <span className={`mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full ${color.badgeBg}`}>
          {color.badge}
        </span>
      )}
    </div>
  );
};
