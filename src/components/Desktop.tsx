import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AICombat from './AICombat';
import Header from './Header';
import ReviewMessage from './ReviewMessage';
import DevModeBanner from './DevModeBanner';
import AssignmentList from './AssignmentList';
import AssignmentDetail from './AssignmentDetail';
import HomeworkReturnLoading from './HomeworkReturnLoading';
import { Assignment, UsedAnswers } from '../types/assignment';
import { assignments, assignmentAnswers, aiResponses } from '../data/assignmentData';

export default function Desktop() {
  const [currentAssignments, setCurrentAssignments] = useState(assignments);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentTypingIndex, setCurrentTypingIndex] = useState(0);
  const [currentTypingText, setCurrentTypingText] = useState("");
  const [whipCount, setWhipCount] = useState(0);
  const [reviewMessage, setReviewMessage] = useState("");
  const [activeAssignment, setActiveAssignment] = useState<number | null>(null);
  const [usedAnswers, setUsedAnswers] = useState<UsedAnswers>({1: [], 2: [], 3: []});
  const [combatMode, setCombatMode] = useState(false);
  const [allAssignmentsComplete, setAllAssignmentsComplete] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock sound functions
  const mockPlay = () => console.log("Sound played");
  
  const whipSound = {
    play: mockPlay
  };

  const reviewSound = {
    play: mockPlay
  };

  const typingSound = {
    play: mockPlay
  };
  
  const handleWhipAI = () => {
    setIsShaking(true);
    whipSound.play();
    setCurrentResponse(aiResponses[Math.floor(Math.random() * aiResponses.length)]);
    setWhipCount(prev => prev + 1);
    
    // Generate a new answer when whipped
    if (activeAssignment !== null) {
      const assignment = currentAssignments.find(a => a.id === activeAssignment);
      if (assignment && !assignment.isReviewing) {
        // Standardized logic for all assignments
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
    
    // Use a fixed typing speed instead of one based on AI level
    const typingSpeed = 30; // Fixed typing speed in milliseconds
    
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
    }, typingSpeed);
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
      
      // Check if all assignments are now completed
      const updatedCompletedCount = currentAssignments.filter(a => 
        a.isReviewing || (a.id === id && assignment.isCorrect)
      ).length;
      
      setAllAssignmentsComplete(updatedCompletedCount === assignments.length);
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

  // Check if all assignments are completed
  useEffect(() => {
    const completedCount = currentAssignments.filter(a => a.isReviewing).length;
    setAllAssignmentsComplete(completedCount === assignments.length);
  }, [currentAssignments]);

  const handleReturnHomework = () => {
    // Start loading animation before transitioning to combat mode
    setIsLoading(true);
  };

  const handleLoadingComplete = () => {
    // Transition to combat mode after loading completes
    setIsLoading(false);
    setCombatMode(true);
  };

  const handleGameOver = () => {
    // Return from combat mode to normal display
    setCombatMode(false);
    
    // Reset assignments for a new game
    setCurrentAssignments(assignments.map(a => ({
      ...a,
      isOpen: false,
      isReviewing: false,
      currentAnswer: "",
      answerIndex: 0,
      isCorrect: false,
      hasGeneratedAnswer: false,
      hasBeenReviewed: false
    })));
    
    setActiveAssignment(null);
    setWhipCount(0);
    setReviewMessage("");
  };

  // Toggle developer mode
  const toggleDevMode = () => {
    setDevMode(prev => !prev);
  };

  // Find the active assignment object
  const activeAssignmentObj = activeAssignment !== null 
    ? currentAssignments.find(a => a.id === activeAssignment) 
    : null;

  return (
    <div className={`p-4 ${isShaking ? 'screen-shake' : ''}`}>
      {combatMode ? (
        <AICombat onGameOver={handleGameOver} />
      ) : isLoading ? (
        <HomeworkReturnLoading onComplete={handleLoadingComplete} />
      ) : (
        <>
          <AnimatePresence>
            <Header 
              activeAssignment={activeAssignment}
              toggleDevMode={toggleDevMode}
              toggleAssignment={toggleAssignment}
            />
          </AnimatePresence>

          <ReviewMessage message={reviewMessage} />

          <DevModeBanner 
            isActive={devMode}
            onSkipToCombat={handleReturnHomework}
          />

          <AnimatePresence>
            {activeAssignment === null ? (
              <AssignmentList 
                assignments={currentAssignments}
                whipCount={whipCount}
                allAssignmentsComplete={allAssignmentsComplete}
                onOpenAssignment={toggleAssignment}
                onReturnHomework={handleReturnHomework}
              />
            ) : activeAssignmentObj ? (
              <AssignmentDetail 
                assignment={activeAssignmentObj}
                isTyping={isTyping}
                onReviewAnswer={reviewAnswer}
                onWhipAI={handleWhipAI}
                onReturnToAssignments={toggleAssignment}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </div>
  );
} 