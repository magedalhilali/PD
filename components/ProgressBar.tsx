import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 1
  height?: string;
  className?: string; // specific override for color
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  height = 'h-2', 
  className
}) => {
  const percent = Math.min(Math.max(progress * 100, 0), 100);
  
  // Determine gradient based on score if no specific class provided
  const getGradient = (p: number) => {
    if (className) return className;
    if (p < 30) return 'bg-gradient-to-r from-rose-500 to-red-500';
    if (p < 70) return 'bg-gradient-to-r from-amber-400 to-orange-500';
    return 'bg-gradient-to-r from-emerald-400 to-emerald-600';
  };

  const barClass = getGradient(percent);

  return (
    <div className="w-full">
      <div className={`w-full bg-slate-100 dark:bg-slate-700/50 rounded-full ${height} overflow-hidden shadow-inner`}>
        <div
          className={`${barClass} ${height} rounded-full transition-all duration-1000 ease-out shadow-[0_2px_4px_rgba(0,0,0,0.1)] relative`}
          style={{ width: `${percent}%` }}
        >
          {/* Subtle shine effect */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;