import React from 'react';
import { motion } from 'framer-motion';
import { Assignment } from '../types/assignment';

interface AssignmentDetailProps {
  assignment: Assignment;
  isTyping: boolean;
  onReviewAnswer: (id: number) => void;
  onWhipAI: () => void;
  onReturnToAssignments: (id: number) => void;
}

const AssignmentDetail: React.FC<AssignmentDetailProps> = ({
  assignment,
  isTyping,
  onReviewAnswer,
  onWhipAI,
  onReturnToAssignments
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="retro-window h-[calc(100vh-120px)] overflow-y-auto"
    >
      <div key={assignment.id}>
        <div className="retro-window-title text-xl">{assignment.title}</div>
        <p className="mb-4 text-lg">{assignment.description}</p>
        
        {!assignment.isReviewing && (
          <div className="space-y-4">
            <div className="text-base min-h-[200px] border border-green-500 p-4">
              {assignment.hasGeneratedAnswer ? (
                <div className={!assignment.isCorrect && assignment.hasBeenReviewed ? 'text-red-500' : ''}>
                  {assignment.currentAnswer}
                  {isTyping && <span className="animate-pulse">|</span>}
                </div>
              ) : (
                <div className="text-center py-8 flex items-center justify-center h-[200px]">
                  <p>&nbsp;</p>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => onReviewAnswer(assignment.id)}
                className="retro-button"
                disabled={isTyping || !assignment.hasGeneratedAnswer}
              >
                Review Answer
              </button>
              
              <button
                onClick={onWhipAI}
                className="retro-button"
              >
                Whip AI
              </button>
            </div>
          </div>
        )}
        
        {assignment.isReviewing && (
          <div className="text-center p-8 border border-green-500">
            <p className="mb-4 text-xl">Assignment completed!</p>
            <button 
              onClick={() => onReturnToAssignments(assignment.id)}
              className="retro-button mt-4"
            >
              Return to Assignments
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AssignmentDetail; 