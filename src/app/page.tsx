'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import Desktop from '../components/Desktop';
import LoadingBar from '../components/LoadingBar';

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
              <LoadingBar progress={bootProgress} message={currentMessage} />
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