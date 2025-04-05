import React from 'react';
import { motion } from 'framer-motion';

interface ReturnHomeworkButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

const ReturnHomeworkButton: React.FC<ReturnHomeworkButtonProps> = ({ isVisible, onClick }) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full text-center mt-4"
    >
      <button 
        onClick={onClick}
        className="retro-button bg-green-700 hover:bg-green-600 text-xl py-3 px-8"
      >
        Return Homework
      </button>
    </motion.div>
  );
};

export default ReturnHomeworkButton; 