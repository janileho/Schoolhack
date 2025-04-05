import React from 'react';

interface ReviewMessageProps {
  message: string;
}

const ReviewMessage: React.FC<ReviewMessageProps> = ({ message }) => {
  if (!message) return null;
  
  // Determine the color class based on the message content
  const getColorClass = () => {
    if (message.includes("Wrong answer")) {
      return "border-orange-500 text-orange-500";
    }
    return "border-green-500 text-green-500";
  };
  
  return (
    <div className={`mb-4 p-2 border text-center ${getColorClass()}`}>
      {message}
    </div>
  );
};

export default ReviewMessage; 