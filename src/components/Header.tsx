import React from 'react';
import { motion } from 'framer-motion';

interface HeaderProps {
  activeAssignment: number | null;
  toggleDevMode: () => void;
  toggleAssignment: (id: number) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  activeAssignment, 
  toggleDevMode, 
  toggleAssignment 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mb-4 flex justify-between items-center"
    >
      {activeAssignment === null ? (
        <h1 className="text-2xl">Homework Terminal v1.0</h1>
      ) : (
        <button 
          onClick={() => toggleAssignment(activeAssignment)}
          className="retro-button"
        >
          ← Back to Assignments
        </button>
      )}
      <div className="flex items-center gap-4">
        <div 
          className="w-4 h-4 bg-gray-300 cursor-pointer hover:bg-gray-400 rounded-full"
          onClick={toggleDevMode}
          title="Developer Mode"
        />
      </div>
    </motion.div>
  );
};

export default Header; 