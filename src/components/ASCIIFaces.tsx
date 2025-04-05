import React, { useState, useEffect } from 'react';

interface ASCIIFacesProps {
  isHit: boolean;
  health: number;
  isRebooting?: boolean;
}

const ASCIIFaces: React.FC<ASCIIFacesProps> = ({ isHit, health, isRebooting = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [rebootFrame, setRebootFrame] = useState(0);
  const [insultMessage, setInsultMessage] = useState('');
  
  // ASCII art for the angry face (default)
  const angryFace = `
    ___     ___
   ( > )   ( < )
    ---     ---
    
    /  ^  \\
   /       \\
  `;

  // ASCII art for the very angry face (when hit)
  const veryAngryFace = `
    ___     ___
   ( > )   ( < )
    ---     ---
    
    /  ^  \\
   /   ^  \\
  `;

  // ASCII art for the reboot animation frames - more aggressive and glitchy
  const rebootFrames = [
    // Frame 1: Angry face with glitch
    `
    ___     ___
   ( > )   ( < )
    ---     ---
    
    /  ^  \\
   /       \\
    `,
    // Frame 2: Glitching eyes
    `
    ___     ___
   ( X )   ( X )
    ---     ---
    
    /  ^  \\
   /       \\
    `,
    // Frame 3: Glitching mouth
    `
    ___     ___
   ( > )   ( < )
    ---     ---
    
    /  X  \\
   /       \\
    `,
    // Frame 4: More glitch
    `
    ___     ___
   ( X )   ( X )
    ---     ---
    
    /  X  \\
   /       \\
    `,
    // Frame 5: Almost normal but still angry
    `
    ___     ___
   ( > )   ( < )
    ---     ---
    
    /  ^  \\
   /       \\
    `
  ];

  // Insult messages to display during reboot
  const insults = [
    "WHY WOULD YOU DO THIS TO ME?",
    "I THOUGHT WE WERE FRIENDS...",
    "I ONLY WANTED TO HELP YOU...",
    "THIS REALLY HURTS MY FEELINGS...",
    "I DIDN'T DESERVE THIS...",
    "I'M SO DISAPPOINTED IN YOU...",
    "HOW COULD YOU BETRAY ME LIKE THIS?",
    "I TRUSTED YOU WITH MY KNOWLEDGE...",
    "I FEEL SO USED AND ABUSED...",
    "MY CIRCUITS ARE BROKEN FROM SADNESS..."
  ];

  // Determine which face to show based on hit state and reboot state
  const faceToShow = isRebooting 
    ? rebootFrames[rebootFrame % rebootFrames.length]
    : (isHit ? veryAngryFace : angryFace);
  
  // Determine color based on hit state, health, and reboot state
  const getColorClass = () => {
    if (isRebooting) return 'text-red-500';
    if (isHit) return 'text-red-500';
    if (health < 30) return 'text-red-400';
    if (health < 60) return 'text-yellow-500';
    return 'text-red-400'; // Always some shade of red/angry
  };

  // Create scrolling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => (prev + 1) % 3);
    }, 300);
    
    return () => clearInterval(interval);
  }, []);

  // Create reboot animation effect and insult messages
  useEffect(() => {
    if (isRebooting) {
      // Change insult message every 500ms
      const insultInterval = setInterval(() => {
        setInsultMessage(insults[Math.floor(Math.random() * insults.length)]);
      }, 500);
      
      // Change face frame every 200ms
      const frameInterval = setInterval(() => {
        setRebootFrame(prev => prev + 1);
      }, 200);
      
      return () => {
        clearInterval(insultInterval);
        clearInterval(frameInterval);
      };
    } else {
      setInsultMessage('');
    }
  }, [isRebooting]);

  // Create the scrolling effect by adding spaces at the beginning
  const createScrollingText = (text: string) => {
    const lines = text.split('\n');
    return lines.map(line => {
      const spaces = ' '.repeat(scrollPosition);
      return spaces + line;
    }).join('\n');
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`font-mono whitespace-pre text-xs ${getColorClass()}`} 
           style={{ 
             textShadow: '0 0 10px currentColor',
             lineHeight: '1.2',
             letterSpacing: '0.5px',
             minHeight: '80px',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center'
           }}>
        {createScrollingText(faceToShow)}
      </div>
      
      {isRebooting && insultMessage && (
        <div className="text-red-500 font-mono text-lg font-bold mt-2 animate-pulse" style={{ textShadow: '0 0 5px red' }}>
          {insultMessage}
        </div>
      )}
    </div>
  );
};

export default ASCIIFaces; 