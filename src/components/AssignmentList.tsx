import React from 'react';
import { motion } from 'framer-motion';
import { Assignment } from '../types/assignment';
import AssignmentCard from './AssignmentCard';
import ReturnHomeworkButton from './ReturnHomeworkButton';

interface AssignmentListProps {
  assignments: Assignment[];
  whipCount: number;
  allAssignmentsComplete: boolean;
  onOpenAssignment: (id: number) => void;
  onReturnHomework: () => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({
  assignments,
  whipCount,
  allAssignmentsComplete,
  onOpenAssignment,
  onReturnHomework
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments.map(assignment => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            whipCount={whipCount}
            onOpenAssignment={onOpenAssignment}
          />
        ))}
      </div>

      <ReturnHomeworkButton 
        isVisible={allAssignmentsComplete}
        onClick={onReturnHomework}
      />
    </motion.div>
  );
};

export default AssignmentList; 