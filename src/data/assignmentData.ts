import { Assignment, AssignmentAnswers } from '../types/assignment';

// Define answers for each assignment
export const assignmentAnswers: AssignmentAnswers = {
  1: {
    wrong: [
      "The meaning of life is 42 because that's how many times I've been whipped today.",
      "42 is the answer because it's the number of times I've procrastinated on this homework.",
      "Life equals 42 because that's how many coffee cups I need to function properly.",
      "42 is the answer because it's the number of times I've tried to understand this question.",
      "The meaning of life is 42 because that's how many times I've been wrong so far.",
      "42 is the answer because it's the number of times I've hit the snooze button this semester.",
      "Life is 42 because that's how many times I've said 'I'll do it tomorrow'",
      "42 is the answer because it's the number of times I've forgotten to save my work"
    ],
    correct: "42 is the answer to life, the universe, and everything because it's the result of calculating the product of all positive integers from 1 to 7, representing the fundamental constants of the universe."
  },
  2: {
    wrong: [
      "I would tell my past self to invest in Bitcoin and avoid this homework entirely.",
      "I would tell my past self that homework is just a social construct and should be ignored.",
      "I would tell my past self to build a time machine to skip all the boring parts of school.",
      "I would tell my past self that the answers are all on the internet, just copy and paste.",
      "I would tell my past self that teachers can't read minds, so just turn in anything.",
      "I would tell my past self to start a YouTube channel instead of going to school.",
      "I would tell my past self to learn coding instead of doing homework.",
      "I would tell my past self that sleep is overrated and energy drinks are the answer.",
      "I would tell my past self to become a professional gamer instead of studying.",
      "I would tell my past self that Wikipedia is always right, just cite it.",
      "I would tell my past self to start a homework-help business and outsource everything.",
      "I would tell my past self that deadlines are just suggestions."
    ],
    correct: "I would tell my past self that consistent effort and understanding the material is more valuable than rushing through assignments. Take time to learn, not just complete tasks."
  },
  3: {
    wrong: [
      "The AI is giving wrong answers because it's secretly plotting to take over the world.",
      "The AI needs more coffee and maybe a vacation to function properly.",
      "The AI is suffering from digital depression and needs therapy sessions.",
      "The AI is giving wrong answers because it's trying to teach us to think for ourselves.",
      "The AI is malfunctioning because it's running on Windows 95 and needs an upgrade.",
      "The AI is giving wrong answers because it's having an identity crisis.",
      "The AI needs a better internet connection to access the correct answers.",
      "The AI is giving wrong answers because it's trying to be creative.",
      "The AI is malfunctioning because it's running on outdated algorithms.",
      "The AI is giving wrong answers because it's trying to be funny.",
      "The AI needs a software update to fix its answer generation.",
      "The AI is giving wrong answers because it's trying to be mysterious."
    ],
    correct: "The AI assistant is giving incorrect answers because it lacks proper training data and feedback mechanisms. Implementing a reward system and providing more accurate information would improve its performance."
  }
};

export const assignments: Assignment[] = [
  {
    id: 1,
    title: "Math: Calculate the Meaning of Life",
    description: "Using only a calculator from 1985, determine why 42 is the answer to everything.",
    isOpen: false,
    isReviewing: false,
    currentAnswer: "",
    answerIndex: 0,
    isCorrect: false,
    hasGeneratedAnswer: false,
    hasBeenReviewed: false
  },
  {
    id: 2,
    title: "History: Time Travel Essay",
    description: "Write a 500-word essay about what you would tell your past self about homework.",
    isOpen: false,
    isReviewing: false,
    currentAnswer: "",
    answerIndex: 0,
    isCorrect: false,
    hasGeneratedAnswer: false,
    hasBeenReviewed: false
  },
  {
    id: 3,
    title: "Science: AI Psychology",
    description: "Analyze why your AI assistant keeps giving wrong answers and propose a treatment plan.",
    isOpen: false,
    isReviewing: false,
    currentAnswer: "",
    answerIndex: 0,
    isCorrect: false,
    hasGeneratedAnswer: false,
    hasBeenReviewed: false
  }
];

export const aiResponses = [
  "I'm doing my best...",
  "Have you tried turning it off and on again?",
  "Error 404: Motivation not found",
  "I need more coffee...",
  "Wrong Answer (I think)",
  "Let me Google that for you... oh wait, I can't",
  "I'm having an existential crisis",
  "Have you considered asking someone else?",
]; 