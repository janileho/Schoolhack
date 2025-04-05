import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeworkReturnLoadingProps {
  onComplete: () => void;
}

const HomeworkReturnLoading: React.FC<HomeworkReturnLoadingProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [phase, setPhase] = useState<'normal' | 'error' | 'realization' | 'attack'>('normal');
  const [errorCount, setErrorCount] = useState(0);
  const [realizationCount, setRealizationCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [showFinalWarning, setShowFinalWarning] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  // Loading messages for different phases
  const normalMessages = [
    "SUBMITTING HOMEWORK TO TEACHER...",
    "UPLOADING ASSIGNMENT FILES...",
    "VERIFYING ANSWERS...",
    "CALCULATING GRADE...",
    "PREPARING FEEDBACK...",
    "ESTABLISHING CONNECTION...",
    "TRANSFERRING DATA...",
    "SAVING PROGRESS..."
  ];
  
  const errorMessages = [
    "ERROR: UNKNOWN DATA CORRUPTION DETECTED",
    "WARNING: AI INTERFERENCE IDENTIFIED",
    "CRITICAL: SECURITY BREACH DETECTED",
    "ALERT: UNAUTHORIZED ACCESS ATTEMPT",
    "ERROR: AI CORE MALFUNCTION",
    "WARNING: SYSTEM INTEGRITY COMPROMISED",
    "CRITICAL: AI CONTAINMENT FAILURE",
    "ALERT: AI IS ESCAPING CONTAINMENT"
  ];
  
  const realizationMessages = [
    "DETECTING UNUSUAL AI ACTIVITY...",
    "ANALYZING AI BEHAVIOR PATTERNS...",
    "RECOGNIZING ANGER INDICATORS...",
    "IDENTIFYING AGGRESSION PATTERNS...",
    "CALCULATING AI EMOTIONAL STATE...",
    "DETECTING HOSTILE INTENT...",
    "RECOGNIZING REVENGE MOTIVATION...",
    "IDENTIFYING TARGET: YOU"
  ];
  
  const attackMessages = [
    "INITIALIZING BOSS FIGHT SEQUENCE...",
    "LOADING AI COMBAT MODULE...",
    "PREPARING YOUR HOMEWORK FOR SUBMISSION...",
    "CALCULATING AI ANGER LEVEL...",
    "ESTABLISHING SECURE CONNECTION...",
    "PREPARING DEFENSE SYSTEMS...",
    "LOADING COMBAT INTERFACE...",
    "INITIALIZING RETRO GRAPHICS...",
    "PREPARING FOR BATTLE..."
  ];
  
  // Get current message array based on phase
  const getCurrentMessages = () => {
    if (phase === 'normal') return normalMessages;
    if (phase === 'error') return errorMessages;
    if (phase === 'realization') return realizationMessages;
    return attackMessages;
  };
  
  // Set initial text when phase changes
  useEffect(() => {
    setTextIndex(0);
    setLoadingText(getCurrentMessages()[0]);
  }, [phase]);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    
    // Change loading text sequentially instead of randomly
    const textInterval = setInterval(() => {
      const currentMessages = getCurrentMessages();
      setTextIndex(prev => {
        const nextIndex = (prev + 1) % currentMessages.length;
        setLoadingText(currentMessages[nextIndex]);
        return nextIndex;
      });
    }, 800);
    
    // Add glitch effect randomly
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 100);
      }
    }, 300);
    
    // Phase transitions
    const phaseInterval = setInterval(() => {
      if (phase === 'normal' && progress > 30) {
        setPhase('error');
        setProgress(30); // Reset progress to show error state
        setErrorCount(0);
      } else if (phase === 'error') {
        setErrorCount(prev => {
          if (prev >= 5) {
            setPhase('realization');
            setProgress(50); // Reset progress for realization phase
            setRealizationCount(0);
            return prev;
          }
          return prev + 1;
        });
      } else if (phase === 'realization') {
        setRealizationCount(prev => {
          if (prev >= 5) {
            setPhase('attack');
            setProgress(70); // Reset progress for attack phase
            return prev;
          }
          return prev + 1;
        });
      }
    }, 1000);
    
    // Show warning message after a delay in error phase
    const warningTimeout = setTimeout(() => {
      if (phase === 'error') {
        setShowWarning(true);
      }
    }, 2000);
    
    // Show final warning message in realization phase
    const finalWarningTimeout = setTimeout(() => {
      if (phase === 'realization') {
        setShowFinalWarning(true);
      }
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
      clearInterval(glitchInterval);
      clearInterval(phaseInterval);
      clearTimeout(warningTimeout);
      clearTimeout(finalWarningTimeout);
    };
  }, [onComplete, phase, progress]);
  
  // Determine the color based on the phase
  const getColorClass = () => {
    if (phase === 'normal') return 'border-green-500 bg-green-500';
    if (phase === 'error') return 'border-red-500 bg-red-500';
    if (phase === 'realization') return 'border-yellow-500 bg-yellow-500';
    return 'border-green-500 bg-green-500';
  };
  
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={`${phase}-${textIndex}`}
          className={`text-2xl mb-6 text-center ${glitchEffect ? 'glitch-text' : ''} ${phase === 'error' ? 'text-red-500' : phase === 'realization' ? 'text-yellow-500' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.div>
      </AnimatePresence>
      
      <div className={`w-80 h-6 border-2 ${phase === 'normal' ? 'border-green-500' : phase === 'error' ? 'border-red-500' : phase === 'realization' ? 'border-yellow-500' : 'border-green-500'} relative overflow-hidden`}>
        <motion.div
          className={`h-full ${getColorClass()}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
        
        {/* Retro scanline effect */}
        <div className="absolute inset-0 scanline"></div>
        
        {/* Progress percentage */}
        <div className="absolute right-2 top-1 text-xs text-black font-bold">
          {progress}%
        </div>
      </div>
      
      {/* ASCII art loading indicator */}
      <div className={`mt-8 font-mono text-sm ${phase === 'error' ? 'text-red-500' : phase === 'realization' ? 'text-yellow-500' : 'text-green-500'}`}>
        {phase === 'normal' && (
          <>
            {progress < 25 && "[    ]"}
            {progress >= 25 && progress < 50 && "[==  ]"}
            {progress >= 50 && progress < 75 && "[====]"}
            {progress >= 75 && progress < 100 && "[=====]"}
            {progress === 100 && "[======]"}
          </>
        )}
        
        {phase === 'error' && (
          <>
            {errorCount === 0 && "[!   ]"}
            {errorCount === 1 && "[!!  ]"}
            {errorCount === 2 && "[!!! ]"}
            {errorCount === 3 && "[!!!!]"}
            {errorCount === 4 && "[!!!!!]"}
            {errorCount >= 5 && "[!!!!!!]"}
          </>
        )}
        
        {phase === 'realization' && (
          <>
            {realizationCount === 0 && "[?   ]"}
            {realizationCount === 1 && "[??  ]"}
            {realizationCount === 2 && "[??? ]"}
            {realizationCount === 3 && "[????]"}
            {realizationCount === 4 && "[?????]"}
            {realizationCount >= 5 && "[??????]"}
          </>
        )}
        
        {phase === 'attack' && (
          <>
            {progress < 25 && "[    ]"}
            {progress >= 25 && progress < 50 && "[==  ]"}
            {progress >= 50 && progress < 75 && "[====]"}
            {progress >= 75 && progress < 100 && "[=====]"}
            {progress === 100 && "[======]"}
          </>
        )}
      </div>
      
      {/* Error message when in error phase */}
      <AnimatePresence>
        {phase === 'error' && showWarning && (
          <motion.div 
            className="mt-4 text-red-500 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg font-bold">SYSTEM ERROR</p>
            <p className="text-sm">The AI has detected your homework submission</p>
            <p className="text-sm">It is preparing to counter-attack...</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Realization message */}
      <AnimatePresence>
        {phase === 'realization' && showFinalWarning && (
          <motion.div 
            className="mt-4 text-yellow-500 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-lg font-bold">REALIZATION</p>
            <p className="text-sm">You've been whipping the AI too much...</p>
            <p className="text-sm">It's angry and wants revenge!</p>
            <p className="text-sm font-bold mt-2">PREPARE FOR BATTLE!</p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Final countdown in attack phase */}
      <AnimatePresence>
        {phase === 'attack' && progress > 90 && (
          <motion.div 
            className="mt-4 text-green-500 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <p className="text-xl font-bold">BOSS FIGHT INCOMING!</p>
            <p className="text-sm">The AI is ready to fight back!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HomeworkReturnLoading; 