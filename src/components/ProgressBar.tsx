
import React from 'react';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
      <div 
        className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      >
      </div>
      <div className="mt-2 text-sm text-gray-500 text-right">
        {percentage}% Complete
      </div>
    </div>
  );
};

export default ProgressBar;
