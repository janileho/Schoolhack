import React from 'react';
import { motion } from 'framer-motion';
import { Assignment } from '../types/assignment';

interface AssignmentCardProps {
  assignment: Assignment;
  whipCount: number;
  onOpenAssignment: (id: number) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
  assignment, 
  whipCount, 
  onOpenAssignment 
}) => {
  return (
    <motion.div
      key={assignment.id}
      className="retro-window"
      whileHover={{ scale: 1.02 }}
    >
      <div className="retro-window-title">{assignment.title}</div>
      <p className="mb-4">{assignment.description}</p>
      
      {!assignment.isReviewing && (
        <button 
          onClick={() => onOpenAssignment(assignment.id)}
          className="retro-button w-full"
        >
          Open Assignment
        </button>
      )}
      
      {assignment.isReviewing && (
        <div className="text-center p-4 border border-green-500">
          <p className="mb-2">Assignment completed!</p>
          <p className="text-sm">Whip count: {whipCount}</p>
        </div>
      )}
    </motion.div>
  );
};

export default AssignmentCard; 