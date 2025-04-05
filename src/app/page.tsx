'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import Desktop from '../components/Desktop';

const bootMessages = [
  "System Booting...",
  "Initializing Homework Protocol...",
  "Memory Corruption Detected...",
  "AI Assistant Malfunctioning...",
  "Loading Retro Interface...",
  "Calibrating CRT Display...",
  "ERROR: AI Being Lazy...",
  "Attempting to Motivate AI...",
  "System Ready (Maybe)..."
];

export default function Home() {
  const [isBooting, setIsBooting] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("");
  const [showDesktop, setShowDesktop] = useState(false);

  const bootSound = new Howl({
    src: ['/sounds/boot.mp3'],
    volume: 0.5,
  });

  const handleStart = () => {
    setIsBooting(true);
    bootSound.play();
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setBootProgress(progress);
      setCurrentMessage(bootMessages[Math.floor(Math.random() * bootMessages.length)]);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowDesktop(true);
        }, 1000);
      }
    }, 50);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <AnimatePresence>
        {!showDesktop ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            {!isBooting ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="retro-button text-4xl"
                onClick={handleStart}
              >
                Start Homework
              </motion.button>
            ) : (
              <div className="space-y-4">
                <div className="text-2xl mb-4">{currentMessage}</div>
                <div className="w-64 h-4 border-2 border-green-500">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${bootProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <div className="text-sm">{bootProgress}%</div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full p-4"
          >
            <Desktop />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
} 