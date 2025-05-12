
import { useRef } from "react";
import { motion } from "framer-motion";
import { DREAMS } from "../data/dreams";

const FutureDreams = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen py-8 px-4">
      <motion.h1 
        className="text-center text-3xl md:text-4xl lg:text-5xl font-playfair glow-text mb-12 mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Future Dreams
      </motion.h1>
      
      <div className="max-w-7xl mx-auto overflow-hidden">
        <motion.div 
          className="px-4 flex space-x-8 overflow-x-auto pb-8 scrollbar-hide"
          ref={containerRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {DREAMS.map((dream, index) => (
            <motion.div
              key={dream.id}
              className="w-64 md:w-80 flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="memory-card h-full flex flex-col">
                <div className="w-full aspect-square bg-gradient-to-br from-constellation-navy to-constellation-dark 
                  flex items-center justify-center relative overflow-hidden">
                  <motion.div 
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-constellation-purple opacity-70 shadow-[0_0_30px_rgba(155,135,245,0.8)]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  />
                  <p className="absolute text-white font-medium text-lg md:text-xl">{dream.emoji}</p>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-constellation-purple font-bold text-xl mb-2">{dream.title}</h3>
                  <p className="text-white text-sm flex-grow">{dream.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      <motion.div 
        className="text-center mt-12 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl font-playfair glow-text"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          I Love You Forever
        </motion.p>
      </motion.div>
    </div>
  );
};

export default FutureDreams;
