import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

interface Assignment {
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

// Define answers for each assignment
const assignmentAnswers = {
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

const assignments: Assignment[] = [
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

const aiResponses = [
  "I'm doing my best...",
  "Have you tried turning it off and on again?",
  "Error 404: Motivation not found",
  "I need more coffee...",
  "Wrong Answer (I think)",
  "Let me Google that for you... oh wait, I can't",
  "I'm having an existential crisis",
  "Have you considered asking someone else?",
];

export default function Desktop() {
  const [currentAssignments, setCurrentAssignments] = useState(assignments);
  const [aiLevel, setAiLevel] = useState(1);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [whipCount, setWhipCount] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [activeAssignment, setActiveAssignment] = useState<number | null>(null);
  const [usedAnswers, setUsedAnswers] = useState<{[key: number]: number[]}>({1: [], 2: [], 3: []});

  const whipSound = new Howl({
    src: ['/sounds/whip.mp3'],
    volume: 0.5,
  });

  const reviewSound = new Howl({
    src: ['/sounds/review.mp3'],
    volume: 0.5,
  });

  const typingSound = new Howl({
    src: ['/sounds/typing.mp3'],
    volume: 0.2,
  });

  const handleWhipAI = () => {
    setIsShaking(true);
    whipSound.play();
    setAiLevel(prev => Math.min(prev + 1, 10));
    setCurrentResponse(aiResponses[Math.floor(Math.random() * aiResponses.length)]);
    setWhipCount(prev => prev + 1);
    
    // Generate a new answer when whipped
    if (activeAssignment !== null) {
      const assignment = currentAssignments.find(a => a.id === activeAssignment);
      if (assignment && !assignment.isReviewing) {
        // For History assignment (id=2), use random answers
        if (activeAssignment === 2) {
          const wrongAnswers = assignmentAnswers[activeAssignment as keyof typeof assignmentAnswers].wrong;
          const previouslyUsed = usedAnswers[activeAssignment] || [];
          const isFirstWhip = whipCount === 1;
          
          // For the first whip, ensure it's wrong
          if (isFirstWhip) {
            const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
            const answer = wrongAnswers[randomIndex];
            
            setCurrentAssignments(prev =>
              prev.map(a => 
                a.id === activeAssignment 
                  ? { 
                      ...a, 
                      currentAnswer: "",
                      answerIndex: randomIndex,
                      isCorrect: false,
                      hasGeneratedAnswer: true,
                      hasBeenReviewed: false
                    } 
                  : a
              )
            );
            
            // Add this answer index to used answers
            setUsedAnswers(prev => ({
              ...prev,
              [activeAssignment]: [randomIndex]
            }));
            
            // Start typing the new answer
            startTyping(activeAssignment, answer);
            
          } else {
            // For subsequent whips, decide randomly if it's correct
            // 20% chance of correct answer after first whip
            const shouldBeCorrect = Math.random() < 0.2;
            
            if (shouldBeCorrect) {
              const answer = assignmentAnswers[activeAssignment as keyof typeof assignmentAnswers].correct;
              
              setCurrentAssignments(prev =>
                prev.map(a => 
                  a.id === activeAssignment 
                    ? { 
                        ...a, 
                        currentAnswer: "",
                        answerIndex: -1, // Use -1 for correct answer
                        isCorrect: true,
                        hasGeneratedAnswer: true,
                        hasBeenReviewed: false
                      } 
                    : a
                )
              );
              
              // Start typing the new answer
              startTyping(activeAssignment, answer);
              
            } else {
              // Filter out previously used answers for wrong answers
              const availableAnswers = wrongAnswers.filter((_, idx) => !previouslyUsed.includes(idx));
              
              // If all answers have been used, reset the used answers array
              if (availableAnswers.length === 0) {
                setUsedAnswers(prev => ({
                  ...prev,
                  [activeAssignment]: []
                }));
                
                // Use any answer from the wrong answers
                const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
                const answer = wrongAnswers[randomIndex];
                
                setCurrentAssignments(prev =>
                  prev.map(a => 
                    a.id === activeAssignment 
                      ? { 
                          ...a, 
                          currentAnswer: "",
                          answerIndex: randomIndex,
                          isCorrect: false,
                          hasGeneratedAnswer: true,
                          hasBeenReviewed: false
                        } 
                      : a
                  )
                );
                
                // Add this answer index to used answers
                setUsedAnswers(prev => ({
                  ...prev,
                  [activeAssignment]: [randomIndex]
                }));
                
                // Start typing the new answer
                startTyping(activeAssignment, answer);
                
              } else {
                // Select a random unused answer
                const randomIndex = Math.floor(Math.random() * availableAnswers.length);
                const originalIndex = wrongAnswers.indexOf(availableAnswers[randomIndex]);
                const answer = availableAnswers[randomIndex];
                
                setCurrentAssignments(prev =>
                  prev.map(a => 
                    a.id === activeAssignment 
                      ? { 
                          ...a, 
                          currentAnswer: "",
                          answerIndex: originalIndex,
                          isCorrect: false,
                          hasGeneratedAnswer: true,
                          hasBeenReviewed: false
                        } 
                      : a
                  )
                );
                
                // Add this answer index to used answers
                setUsedAnswers(prev => ({
                  ...prev,
                  [activeAssignment]: [...previouslyUsed, originalIndex]
                }));
                
                // Start typing the new answer
                startTyping(activeAssignment, answer);
              }
            }
          }
        } else {
          // For other assignments, use the original logic
          // Calculate which answer index we should be at based on whip count
          const targetIndex = Math.min(Math.floor(whipCount / 2), 5);
          const isCorrect = targetIndex === 5;
          
          if (isCorrect) {
            // If it's time for the correct answer, use it
            const answer = assignmentAnswers[activeAssignment as keyof typeof assignmentAnswers].correct;
            
            setCurrentAssignments(prev =>
              prev.map(a => 
                a.id === activeAssignment 
                  ? { 
                      ...a, 
                      currentAnswer: "",
                      answerIndex: targetIndex,
                      isCorrect: true,
                      hasGeneratedAnswer: true,
                      hasBeenReviewed: false
                    } 
                  : a
              )
            );
            
            // Start typing the new answer
            startTyping(activeAssignment, answer);
          } else {
            // For wrong answers, make sure we don't repeat
            const wrongAnswers = assignmentAnswers[activeAssignment as keyof typeof assignmentAnswers].wrong;
            const previouslyUsed = usedAnswers[activeAssignment] || [];
            
            // Filter out previously used answers
            const availableAnswers = wrongAnswers.filter((_, idx) => !previouslyUsed.includes(idx));
            
            // If all answers have been used, reset the used answers array
            if (availableAnswers.length === 0) {
              setUsedAnswers(prev => ({
                ...prev,
                [activeAssignment]: []
              }));
              
              // Use any answer from the wrong answers
              const randomIndex = Math.floor(Math.random() * wrongAnswers.length);
              const answer = wrongAnswers[randomIndex];
              
              setCurrentAssignments(prev =>
                prev.map(a => 
                  a.id === activeAssignment 
                    ? { 
                        ...a, 
                        currentAnswer: "",
                        answerIndex: randomIndex,
                        isCorrect: false,
                        hasGeneratedAnswer: true,
                        hasBeenReviewed: false
                      } 
                    : a
                )
              );
              
              // Add this answer index to used answers
              setUsedAnswers(prev => ({
                ...prev,
                [activeAssignment]: [randomIndex]
              }));
              
              // Start typing the new answer
              startTyping(activeAssignment, answer);
            } else {
              // Select a random unused answer
              const randomIndex = Math.floor(Math.random() * availableAnswers.length);
              const originalIndex = wrongAnswers.indexOf(availableAnswers[randomIndex]);
              const answer = availableAnswers[randomIndex];
              
              setCurrentAssignments(prev =>
                prev.map(a => 
                  a.id === activeAssignment 
                    ? { 
                        ...a, 
                        currentAnswer: "",
                        answerIndex: originalIndex,
                        isCorrect: false,
                        hasGeneratedAnswer: true,
                        hasBeenReviewed: false
                      } 
                    : a
                )
              );
              
              // Add this answer index to used answers
              setUsedAnswers(prev => ({
                ...prev,
                [activeAssignment]: [...previouslyUsed, originalIndex]
              }));
              
              // Start typing the new answer
              startTyping(activeAssignment, answer);
            }
          }
        }
      }
    }
    
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  };

  const toggleAssignment = (id: number) => {
    setCurrentAssignments(prev =>
      prev.map(assignment => {
        if (assignment.id === id) {
          const isOpening = !assignment.isOpen;
          
          if (isOpening) {
            setActiveAssignment(id);
            return { ...assignment, isOpen: true };
          } else {
            setActiveAssignment(null);
            return { ...assignment, isOpen: false };
          }
        }
        return assignment;
      })
    );
  };

  const startTyping = (id: number, answer: string) => {
    setIsTyping(true);
    setCurrentTypingIndex(0);
    setCurrentTypingText("");
    
    const interval = setInterval(() => {
      setCurrentTypingIndex(prev => {
        if (prev >= answer.length) {
          clearInterval(interval);
          setIsTyping(false);
          return prev;
        }
        
        // Play typing sound occasionally
        if (prev % 3 === 0) {
          typingSound.play();
        }
        
        return prev + 1;
      });
    }, 30);
  };

  const reviewAnswer = (id: number) => {
    const assignment = currentAssignments.find(a => a.id === id);
    if (!assignment || !assignment.hasGeneratedAnswer) return;
    
    reviewSound.play();
    
    if (assignment.isCorrect) {
      setReviewMessage("Correct! The AI has finally given a proper answer.");
      setCurrentAssignments(prev =>
        prev.map(a => 
          a.id === id ? { ...a, isReviewing: true } : a
        )
      );
    } else {
      setIsShaking(true);
      setReviewMessage("Wrong answer! The AI needs more motivation.");
      setCurrentAssignments(prev =>
        prev.map(a => 
          a.id === id ? { ...a, hasBeenReviewed: true } : a
        )
      );
      setTimeout(() => {
        setIsShaking(false);
      }, 500);
    }
  };

  // Update the typing text whenever the index changes
  useEffect(() => {
    if (isTyping && activeAssignment !== null) {
      const assignment = currentAssignments.find(a => a.id === activeAssignment);
      if (assignment && assignment.hasGeneratedAnswer) {
        const answer = assignment.isCorrect 
          ? assignmentAnswers[activeAssignment as keyof typeof assignmentAnswers].correct
          : assignmentAnswers[activeAssignment as keyof typeof assignmentAnswers].wrong[assignment.answerIndex];
        
        setCurrentTypingText(answer.substring(0, currentTypingIndex));
        
        setCurrentAssignments(prev =>
          prev.map(a => 
            a.id === activeAssignment ? { ...a, currentAnswer: answer.substring(0, currentTypingIndex) } : a
          )
        );
      }
    }
  }, [currentTypingIndex, isTyping, activeAssignment, currentAssignments]);

  return (
    <div className={`p-4 ${isShaking ? 'screen-shake' : ''}`}>
      <AnimatePresence>
        {activeAssignment === null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 flex justify-between items-center"
          >
            <h1 className="text-2xl">Homework Terminal v1.0</h1>
            <div className="text-xl">AI Level: {aiLevel}</div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 flex justify-between items-center"
          >
            <button 
              onClick={() => toggleAssignment(activeAssignment)}
              className="retro-button"
            >
              ← Back to Assignments
            </button>
            <div className="text-xl">AI Level: {aiLevel}</div>
          </motion.div>
        )}
      </AnimatePresence>

      {reviewMessage && (
        <div className="mb-4 p-2 border border-green-500 text-center">
          {reviewMessage}
        </div>
      )}

      <AnimatePresence>
        {activeAssignment === null ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {currentAssignments.map(assignment => (
              <motion.div
                key={assignment.id}
                className="retro-window"
                whileHover={{ scale: 1.02 }}
              >
                <div className="retro-window-title">{assignment.title}</div>
                <p className="mb-4">{assignment.description}</p>
                
                {!assignment.isReviewing && (
                  <button 
                    onClick={() => toggleAssignment(assignment.id)}
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
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="retro-window h-[calc(100vh-120px)] overflow-y-auto"
          >
            {currentAssignments.map(assignment => {
              if (assignment.id === activeAssignment) {
                return (
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
                            onClick={() => reviewAnswer(assignment.id)}
                            className="retro-button"
                            disabled={isTyping || !assignment.hasGeneratedAnswer}
                          >
                            Review Answer
                          </button>
                          
                          <button
                            onClick={handleWhipAI}
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
                        <p className="text-lg">Whip count: {whipCount}</p>
                        <button 
                          onClick={() => toggleAssignment(assignment.id)}
                          className="retro-button mt-4"
                        >
                          Return to Assignments
                        </button>
                      </div>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 