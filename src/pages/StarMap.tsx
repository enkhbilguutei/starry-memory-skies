
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEMORIES } from "../data/memories";
import MemoryModal from "../components/MemoryModal";

const StarMap = () => {
  const [selectedMemory, setSelectedMemory] = useState<typeof MEMORIES[0] | null>(null);

  return (
    <div className="min-h-screen relative py-8 px-4">
      <motion.h1 
        className="text-center text-3xl md:text-4xl lg:text-5xl font-playfair glow-text mb-12 mt-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Constellation
      </motion.h1>
      
      <motion.div 
        className="max-w-6xl mx-auto h-[80vh] relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {MEMORIES.map((memory, index) => (
          <motion.div
            key={memory.id}
            className="absolute"
            style={{
              left: `${memory.position.x}%`,
              top: `${memory.position.y}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.5 + index * 0.1,
              type: "spring", 
              stiffness: 100
            }}
          >
            <motion.div
              className="relative group"
              whileHover={{ scale: 1.2 }}
            >
              <div 
                className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-constellation-purple 
                cursor-pointer animate-pulse-slow shadow-[0_0_8px_rgba(155,135,245,0.8)]"
                onClick={() => setSelectedMemory(memory)}
              />
              <div className="absolute opacity-0 group-hover:opacity-100 -top-10 left-1/2 -translate-x-1/2 
                bg-black bg-opacity-70 rounded-md px-3 py-1 min-w-[100px] text-center transition-opacity duration-200">
                <p className="text-constellation-glow text-xs md:text-sm whitespace-nowrap">{memory.title}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedMemory && (
          <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarMap;
