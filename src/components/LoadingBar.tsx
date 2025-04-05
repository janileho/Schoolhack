import React from 'react';
import { motion } from 'framer-motion';

interface LoadingBarProps {
  progress: number;
  message: string;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress, message }) => {
  return (
    <div className="space-y-4">
      <div className="text-2xl mb-4">{message}</div>
      <div className="w-64 h-4 border-2 border-green-500">
        <motion.div
          className="h-full bg-green-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <div className="text-sm">{progress}%</div>
    </div>
  );
};

export default LoadingBar; 