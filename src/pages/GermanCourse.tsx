import React from 'react';
import { motion } from 'motion/react';

export default function GermanCourse() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-grow relative w-full h-screen"
      >
        <iframe 
          src="https://arkanj-tech-v2.vercel.app/" 
          title="German Course"
          className="absolute inset-0 w-full h-full border-none"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </motion.div>
    </div>
  );
}
