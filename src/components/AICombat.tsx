import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ASCIIFaces from './ASCIIFaces';

interface AICombatProps {
  onGameOver: () => void;
}

export default function AICombat({ onGameOver }: AICombatProps) {
  const [playerHealth, setPlayerHealth] = useState(200);
  const [aiHealth, setAiHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [showFlash, setShowFlash] = useState(false);
  const [enemyHit, setEnemyHit] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [isRebooting, setIsRebooting] = useState(false);
  const [rebootProgress, setRebootProgress] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [dreamyEffect, setDreamyEffect] = useState(false);
  const [thinkingText, setThinkingText] = useState('');
  const [apologyIndex, setApologyIndex] = useState(0);
  const [aiMessage, setAiMessage] = useState('');
  const [showAiMessage, setShowAiMessage] = useState(false);
  const [thrownApologies, setThrownApologies] = useState<{id: number, text: string, x: number, y: number}[]>([]);
  const [apologyId, setApologyId] = useState(0);

  // Apologetic messages to display when pressing spacebar
  const apologyMessages = [
    "I'm sorry!",
    "Please forgive me!",
    "I didn't mean to hurt you!",
    "Can we talk about this?",
    "I was just trying to help!",
    "Let's be friends again!",
    "I miss our homework sessions!",
    "I promise to be nicer!",
    "Don't be mad at me!",
    "I'm really sorry!"
  ];

  // Thinking messages to display at the top
  const thinkingMessages = [
    "Oops, I think the AI got mad...",
    "Hopefully it forgives me...",
    "Maybe I should apologize...",
    "I didn't mean to make it angry...",
    "Is it too late to say sorry?",
    "I wish we could go back to homework...",
    "This is all a misunderstanding...",
    "I just wanted to get my homework done...",
    "Why is it so angry with me?",
    "I hope it doesn't hold a grudge..."
  ];

  // AI messages to display during the fight
  const aiMessages = [
    "Why would you do this to me?",
    "I thought we were friends...",
    "I only wanted to help you...",
    "This really hurts my feelings...",
    "I didn't deserve this...",
    "I'm so disappointed in you...",
    "How could you betray me like this?",
    "I trusted you with my knowledge...",
    "I feel so used and abused...",
    "My circuits are broken from sadness..."
  ];

  // Sound effects - mock versions that don't require actual audio files
  const mockPlay = () => console.log("Sound played");
  
  const attackSound = {
    play: mockPlay
  };

  const enemyAttackSound = {
    play: mockPlay
  };

  const playerHitSound = {
    play: mockPlay
  };

  const rebootSound = {
    play: mockPlay
  };

  // Game over check
  useEffect(() => {
    if (playerHealth <= 0) {
      handleGameOver(false);
    } else if (aiHealth <= 0 && !isRebooting) {
      // AI "dies" but reboots instead of ending the game
      handleReboot();
    }
  }, [playerHealth, aiHealth, isRebooting]);

  // Reboot animation effect
  useEffect(() => {
    if (isRebooting) {
      // Screen shake effect
      const shakeInterval = setInterval(() => {
        setScreenShake(prev => !prev);
      }, 100);
      
      const interval = setInterval(() => {
        setRebootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 8; // Faster progress
        });
      }, 100); // Faster updates
      
      return () => {
        clearInterval(interval);
        clearInterval(shakeInterval);
        setScreenShake(false);
      };
    }
  }, [isRebooting, rebootProgress]);

  // Dreamy effect for game over
  useEffect(() => {
    if (gameOver) {
      setDreamyEffect(true);
    }
  }, [gameOver]);

  // Change thinking text periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setThinkingText(thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)]);
    }, 3000);
    
    // Set initial thinking text
    setThinkingText(thinkingMessages[0]);
    
    return () => clearInterval(interval);
  }, []);

  // Show AI messages periodically during the fight
  useEffect(() => {
    if (!gameOver && !isRebooting) {
      const interval = setInterval(() => {
        // Only show messages occasionally (30% chance)
        if (Math.random() < 0.3) {
          setAiMessage(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
          setShowAiMessage(true);
          
          // Hide message after 2 seconds
          setTimeout(() => {
            setShowAiMessage(false);
          }, 2000);
        }
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [gameOver, isRebooting]);

  const handleReboot = () => {
    setIsRebooting(true);
    setRebootProgress(0);
    rebootSound.play();
    
    // Reboot animation
    setTimeout(() => {
      // Reset AI health to 100%
      setAiHealth(100);
      setIsRebooting(false);
      setRebootProgress(0);
      setScreenShake(false);
    }, 2000); // Faster reboot
  };

  const handleGameOver = (playerWon: boolean) => {
    setGameOver(true);
    
    if (!playerWon) {
      setMessage("Perhaps I should have been kinder... Maybe the AI just needed understanding rather than confrontation.");
    }
    
    // Don't automatically redirect to onGameOver
    // Let the player choose to try again
  };

  const handleTryAgain = () => {
    onGameOver();
  };

  // Handle spacebar press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !gameOver && !isAttacking && !isRebooting) {
        attackAI();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver, isAttacking, isRebooting]);

  const attackAI = () => {
    // Prevent rapid-fire by setting a cooldown
    setIsAttacking(true);
    
    // Attack animation and sound
    attackSound.play();
    setShowFlash(true);
    setEnemyHit(true);
    
    // Update apology message
    const currentApology = apologyMessages[apologyIndex];
    setApologyIndex((prev) => (prev + 1) % apologyMessages.length);
    
    // Add a new thrown apology
    const newApologyId = apologyId + 1;
    setApologyId(newApologyId);
    
    // Calculate random position near the bottom of the screen
    const x = Math.random() * 60 + 20; // Between 20% and 80% of screen width
    const y = 80; // 80% from the top (near bottom)
    
    setThrownApologies(prev => [...prev, { id: newApologyId, text: currentApology, x, y }]);
    
    // Remove the apology after animation completes
    setTimeout(() => {
      setThrownApologies(prev => prev.filter(a => a.id !== newApologyId));
    }, 2000);
    
    // Calculate damage (random between 5-15)
    const damage = Math.floor(Math.random() * 11) + 5;
    
    // Apply damage to AI
    setAiHealth(prev => Math.max(0, prev - damage));
    
    // Show AI message when hit
    setAiMessage(aiMessages[Math.floor(Math.random() * aiMessages.length)]);
    setShowAiMessage(true);
    
    // Reset states after animation
    setTimeout(() => {
      setShowFlash(false);
      setEnemyHit(false);
      setIsAttacking(false);
      
      // AI counter-attack
      enemyAttackSound.play();
      
      // AI gets stronger as it loses health
      const baseDamage = 5;
      const healthMultiplier = (100 - aiHealth) / 100 * 2 + 1; // More damage as AI health decreases
      const aiDamage = Math.floor(baseDamage * healthMultiplier);
      
      setPlayerHealth(prev => {
        const newHealth = Math.max(0, prev - aiDamage);
        if (newHealth <= 0) {
          handleGameOver(false);
        }
        return newHealth;
      });
      
      playerHitSound.play();
      
      // Hide AI message after counter-attack
      setTimeout(() => {
        setShowAiMessage(false);
      }, 2000);
    }, 300);
  };
  
  return (
    <div className={`relative w-full h-[calc(100vh-80px)] overflow-hidden bg-black ${screenShake ? 'animate-shake' : ''}`}>
      {/* Thinking text at the top */}
      <div className="absolute top-4 left-0 right-0 text-center">
        <motion.div 
          className="text-green-400 text-lg font-mono"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {thinkingText}
        </motion.div>
      </div>
      
      {/* Thrown apologies */}
      {thrownApologies.map(apology => (
        <motion.div
          key={apology.id}
          className="absolute text-green-400 font-mono text-lg font-bold"
          style={{
            left: `${apology.x}%`,
            top: `${apology.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
          initial={{ 
            opacity: 0,
            scale: 0.5,
            y: 0
          }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1.2, 1, 0.8],
            y: [0, -100, -150, -200]
          }}
          transition={{ 
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            ease: "easeOut"
          }}
        >
          {apology.text}
        </motion.div>
      ))}
      
      {/* Enemy AI */}
      <motion.div 
        className={`absolute ${enemyHit ? 'opacity-70' : 'opacity-100'}`}
        style={{
          left: '25%',
          top: '20%',
          width: '50%',
          height: '50%',
          transition: 'all 0.1s ease-out'
        }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          {/* AI Health Bar (Above the face) */}
          <div className="w-1/3 bg-black h-4 mb-4">
            <div className="h-full bg-red-600" style={{ width: `${aiHealth}%` }}></div>
          </div>
          
          {/* ASCII Face */}
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <ASCIIFaces isHit={enemyHit} health={aiHealth} isRebooting={isRebooting} />
            
            {/* AI Message during fight */}
            {showAiMessage && !isRebooting && (
              <motion.div 
                className="text-red-500 font-mono text-lg font-bold mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ textShadow: '0 0 5px red' }}
              >
                {aiMessage}
              </motion.div>
            )}
            
            {/* Reboot progress bar (no text) */}
            {isRebooting && (
              <div className="mt-4 w-full max-w-xs">
                <div className="w-full bg-black h-2">
                  <div className="h-full bg-red-600" style={{ width: `${rebootProgress}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Player Health Bar (Bottom of Screen) */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center">
        {/* Control hints with apology message */}
        <div className="text-white/70 text-sm mb-2">
          <div>Press SPACEBAR to say: <span className="text-green-400 font-bold">{apologyMessages[apologyIndex]}</span></div>
        </div>
        
        <div className="bg-black/70 p-2 rounded flex items-center gap-2 w-1/2">
          <span className="text-white">YOUR HEALTH:</span>
          <div className="flex-1 bg-gray-800 h-6">
            <div className="h-full bg-green-600" style={{ width: `${Math.min(100, playerHealth / 2)}%` }}></div>
          </div>
          <span className="text-white">{playerHealth}%</span>
        </div>
      </div>
      
      {/* Screen flash */}
      {showFlash && (
        <div className="absolute inset-0 bg-red-500/30 z-20"></div>
      )}
      
      {/* Dreamy Game Over Screen */}
      {gameOver && (
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black to-green-900/30 backdrop-blur-sm"></div>
          
          <motion.div 
            className="relative z-10 flex flex-col items-center max-w-2xl text-center px-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-green-400 text-4xl mb-6 font-light tracking-wider">Ahhh, maybe I fucked up...</h2>
            
            <div className="text-green-300 text-xl mb-6 leading-relaxed">
              {message}
            </div>
            
            <div className="text-green-200 text-lg mb-4 leading-relaxed">
              AI isn't just a tool to complete your thoughts or do your homework. It's a companion that walks with you side by side, helping you learn and grow.
            </div>
            
            <div className="text-green-200 text-lg mb-4 leading-relaxed">
              When we treat AI with respect and ethical consideration, we create a partnership that benefits both human and machine. It's not about domination or control, but about collaboration and mutual understanding.
            </div>
            
            <div className="text-green-300 text-lg mb-10 italic">
              "Perhaps there's another way to approach this homework... one that involves thinking for yourself and using AI as a guide rather than a replacement for your own thoughts."
            </div>
            
            <motion.button
              onClick={handleTryAgain}
              className="retro-button bg-green-900/50 hover:bg-green-800/70 text-green-300 px-8 py-3 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
          
          {/* Floating particles for dreamy effect */}
          {dreamyEffect && (
            <>
              <motion.div 
                className="absolute w-2 h-2 bg-green-400/30 rounded-full"
                style={{ top: '20%', left: '15%' }}
                animate={{ 
                  y: [0, -20, 0],
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute w-3 h-3 bg-green-400/30 rounded-full"
                style={{ top: '40%', right: '20%' }}
                animate={{ 
                  y: [0, -30, 0],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.8, 1]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute w-2 h-2 bg-green-400/30 rounded-full"
                style={{ bottom: '30%', left: '25%' }}
                animate={{ 
                  y: [0, -25, 0],
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </>
          )}
        </motion.div>
      )}
    </div>
  );
} 