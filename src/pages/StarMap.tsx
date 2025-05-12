import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEMORIES } from "../data/memories";
import MemoryModal from "../components/MemoryModal";

// Generate random stars for the background
const generateStars = (count: number) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      animationDelay: Math.random() * 10,
      color:
        Math.random() > 0.7
          ? "bg-constellation-star1"
          : Math.random() > 0.5
          ? "bg-constellation-star2"
          : "bg-constellation-star3",
    });
  }
  return stars;
};

const StarMap = () => {
  const [selectedMemory, setSelectedMemory] = useState<
    (typeof MEMORIES)[0] | null
  >(null);
  const [stars, setStars] = useState<any[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [hoveredMemory, setHoveredMemory] = useState<number | null>(null);
  const [isEnteringPage, setIsEnteringPage] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);

  // Generate stars and handle window resize
  useEffect(() => {
    // Adjust star count based on screen size
    const starCount = Math.min(
      Math.floor((windowSize.width * windowSize.height) / 5000),
      150
    );
    setStars(generateStars(starCount));

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Reset the entering state after animation completes
    const timer = setTimeout(() => {
      setIsEnteringPage(false);
    }, 1500);

    // Hide the tooltip after 5 seconds
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, [windowSize.width, windowSize.height]);

  // Handle memory selection
  const handleMemoryClick = (memory: (typeof MEMORIES)[0]) => {
    setSelectedMemory(memory);
    setHoveredMemory(null);
  };

  // For touch devices - handle tap to either hover or select
  const handleMemoryTap = (memory: (typeof MEMORIES)[0]) => {
    if (hoveredMemory === memory.id) {
      setSelectedMemory(memory);
      setHoveredMemory(null);
    } else {
      setHoveredMemory(memory.id);
    }
  };

  return (
    <motion.div
      className="min-h-screen relative py-6 md:py-8 px-3 md:px-4 overflow-hidden bg-constellation-dark"
      initial={{
        scale: isEnteringPage ? 0.9 : 1,
        opacity: isEnteringPage ? 0 : 1,
      }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Starfield background */}
      <div className="fixed inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full ${star.color}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `twinkle-${
                star.id % 3 === 0
                  ? "fast"
                  : star.id % 3 === 1
                  ? "slow"
                  : "slower"
              } ${3 + star.animationDelay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <motion.h1
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-white mb-6 sm:mb-10 md:mb-12 mt-3 sm:mt-4 tracking-tight leading-relaxed max-w-[90%] md:max-w-[600px] mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isEnteringPage ? 0.8 : 0 }}
          style={{
            textShadow:
              "0 0 3px rgba(241, 231, 254, 0.6), 0 0 7px rgba(169, 112, 255, 0.4)",
          }}
        >
          Our Constellation
        </motion.h1>

        <motion.div
          className="max-w-6xl mx-auto h-[68vh] sm:h-[75vh] md:h-[80vh] relative px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: isEnteringPage ? 1 : 0.3 }}
        >
          {/* First-time user guide */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-md 
                      px-4 py-2 border border-constellation-purple/30 text-center z-10 max-w-[90%] sm:max-w-xs"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: isEnteringPage ? 2.5 : 2, duration: 0.5 }}
                id="guide-tooltip"
              >
                <p className="text-constellation-glow text-xs sm:text-sm font-outfit leading-relaxed">
                  ✨
                  {window.innerWidth <= 768
                    ? " Tap a star once to preview, twice to view memory"
                    : " Tap a star to explore our memories"}{" "}
                  ✨
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Memory stars */}
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
                delay: isEnteringPage ? 1.2 + index * 0.1 : 0.5 + index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
            >
              <div
                className="relative cursor-pointer touch-manipulation"
                onMouseEnter={() => setHoveredMemory(memory.id)}
                onMouseLeave={() => setHoveredMemory(null)}
                onClick={() =>
                  window.innerWidth <= 768
                    ? handleMemoryTap(memory)
                    : handleMemoryClick(memory)
                }
              >
                {/* Star with glow effect */}
                <motion.div
                  className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-constellation-star1 
                  relative z-10 mx-auto"
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{
                    boxShadow:
                      "0 0 15px rgba(255,255,255,0.5), 0 0 25px rgba(169,112,255,0.3)",
                  }}
                  animate={{
                    boxShadow:
                      hoveredMemory === memory.id
                        ? "0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(169,112,255,0.6)"
                        : "0 0 15px rgba(255,255,255,0.5), 0 0 25px rgba(169,112,255,0.3)",
                    scale: hoveredMemory === memory.id ? 1.3 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Tooltip */}
                <AnimatePresence>
                  {hoveredMemory === memory.id && (
                    <motion.div
                      className="absolute -top-14 sm:-top-16 left-1/2 -translate-x-1/2 
                        bg-black/60 backdrop-blur-sm rounded-md px-3 sm:px-3 py-2 sm:py-2 min-w-[100px] sm:min-w-[120px] text-center 
                        border border-constellation-purple/30 shadow-[0_0_15px_rgba(169,112,255,0.3)]
                        z-20 pointer-events-none"
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="text-constellation-glow text-sm sm:text-sm md:text-base whitespace-nowrap font-medium">
                        {memory.title}
                      </p>
                      <p className="text-constellation-glow/70 text-xs sm:text-xs mt-0.5">
                        {memory.date}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <MemoryModal
            memory={selectedMemory}
            onClose={() => setSelectedMemory(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StarMap;
