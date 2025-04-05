export interface Assignment {
  id: number;
  title: string;
  description: string;
  isOpen: boolean;
  isReviewing: boolean;
  currentAnswer: string;
  answerIndex: number;
  isCorrect: boolean;
  hasGeneratedAnswer: boolean;
  hasBeenReviewed: boolean;
}

export interface AssignmentAnswers {
  [key: number]: {
    wrong: string[];
    correct: string;
  };
}

export interface UsedAnswers {
  [key: number]: number[];
} 