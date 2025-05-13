import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MEMORIES } from "../data/memories";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";

// Lazy load the memory modal component
const MemoryModal = lazy(() => import("../components/MemoryModal"));

// Mobile position adjustments for the constellation
const getMobileAdjustedPosition = (
  position: { x: number; y: number },
  isMobile: boolean
) => {
  if (!isMobile) return position;

  // Center the constellation more on mobile screens
  // This helps prevent stars from going off-screen on narrow displays
  const centerX = 50;
  const adjustmentFactor = 0.7; // Compress the constellation by 30%

  return {
    x: centerX + (position.x - centerX) * adjustmentFactor,
    y: position.y, // Keep vertical position the same
  };
};

const StarMap = () => {
  const [selectedMemory, setSelectedMemory] = useState<
    (typeof MEMORIES)[0] | null
  >(null);
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(
    null
  );
  const [stars, setStars] = useState<any[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [hoveredMemory, setHoveredMemory] = useState<number | null>(null);
  const [isEnteringPage, setIsEnteringPage] = useState(true);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate stars and handle window resize
  useEffect(() => {
    // Increase star count significantly
    const starCount = Math.min(
      Math.floor((windowSize.width * windowSize.height) / 2000), // Reduced divisor to increase density
      300 // Increased maximum stars
    );

    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (isMobile ? 3 : 2) + (isMobile ? 1 : 0.5), // Slightly larger stars
        opacity: Math.random() * 0.8 + 0.2, // Increased minimum opacity
        animationDelay: Math.random() * 5,
        color:
          Math.random() > 0.8
            ? "bg-constellation-star1"
            : Math.random() > 0.4
            ? "bg-constellation-star2"
            : "bg-constellation-star3",
      });
    }
    setStars(stars);

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

    // Hide the tooltip after 8 seconds on desktops, 5 on mobile
    const tooltipTimer = setTimeout(
      () => {
        setShowTooltip(false);
      },
      window.innerWidth <= 768 ? 5000 : 8000
    );

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
    };
  }, [windowSize.width, windowSize.height, isMobile]);

  // Handle memory selection
  const handleMemoryClick = (memory: (typeof MEMORIES)[0], index: number) => {
    setSelectedMemory(memory);
    setSelectedMemoryIndex(index);
    setHoveredMemory(null);
  };

  // For touch devices - handle tap to either hover or select
  const handleMemoryTap = (memory: (typeof MEMORIES)[0], index: number) => {
    if (hoveredMemory === memory.id) {
      setSelectedMemory(memory);
      setSelectedMemoryIndex(index);
      setHoveredMemory(null);
    } else {
      setHoveredMemory(memory.id);
    }
  };

  // Handle navigation between memories in the modal
  const handleMemoryNavigation = useCallback(
    (direction: "prev" | "next") => {
      if (selectedMemoryIndex === null) return;

      let newIndex: number;
      if (direction === "prev") {
        newIndex =
          selectedMemoryIndex <= 0
            ? MEMORIES.length - 1
            : selectedMemoryIndex - 1;
      } else {
        newIndex =
          selectedMemoryIndex >= MEMORIES.length - 1
            ? 0
            : selectedMemoryIndex + 1;
      }

      setSelectedMemory(MEMORIES[newIndex]);
      setSelectedMemoryIndex(newIndex);
    },
    [selectedMemoryIndex]
  );

  // Reset tooltip when modal is closed
  const handleCloseModal = () => {
    setSelectedMemory(null);
    setSelectedMemoryIndex(null);
    setShowTooltip(true);

    // Hide tooltip after 5 seconds
    setTimeout(() => {
      setShowTooltip(false);
    }, 5000);
  };

  return (
    <motion.div
      className="min-h-screen relative py-10 md:py-12 px-3 md:px-4 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Extended background that matches the StarBackground component */}
      <motion.div
        className="fixed inset-0 z-0 bg-gradient-radial from-constellation-purple/30 via-constellation-navy to-constellation-dark"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Rotating starfield container */}
      <div
        className="fixed inset-0 z-0 animate-earth-spin origin-center perspective-1000"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Starfield background */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <div
              key={star.id}
              className={`absolute rounded-full ${star.color}`}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: isMobile ? `${star.size * 2}px` : `${star.size}px`,
                height: isMobile ? `${star.size * 2}px` : `${star.size}px`,
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
      </div>

      {/* Content - higher z-index to stay above rotating stars */}
      <div className="relative z-10">
        <motion.h1
          className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-white mb-8 sm:mb-12 md:mb-14 mt-5 sm:mt-6 tracking-tight leading-relaxed max-w-[90%] md:max-w-[600px] mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: isEnteringPage ? 0.8 : 0 }}
          style={{
            textShadow:
              "0 0 3px rgba(241, 231, 254, 0.6), 0 0 7px rgba(169, 112, 255, 0.4)",
          }}
        >
          Бидний Одон Орон
        </motion.h1>

        <motion.div
          className="max-w-6xl mx-auto h-[65vh] xs:h-[68vh] sm:h-[75vh] md:h-[82vh] relative px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: isEnteringPage ? 1 : 0.3 }}
        >
          {/* First-time user guide */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                className="absolute top-2 xs:top-3 sm:top-4 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm rounded-xl 
                      px-6 py-3 border border-white/20 text-center z-10 max-w-[90%] sm:max-w-md
                      shadow-[0_0_15px_rgba(169,112,255,0.2)]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: isEnteringPage ? 2.5 : 2, duration: 0.5 }}
                id="guide-tooltip"
              >
                <div className="flex items-center justify-center gap-2 xs:gap-3">
                  <Info className="h-4 w-4 xs:h-5 xs:w-5 text-white/70" />
                  <p className="text-white/90 text-sm xs:text-base sm:text-lg font-medium leading-relaxed">
                    Одууд дээр дараад, дурсамжуудаа нээж үзээрэй :)
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Memory stars */}
          {MEMORIES.map((memory, index) => {
            const adjustedPosition = getMobileAdjustedPosition(
              memory.position,
              isMobile
            );
            return (
              <motion.div
                key={memory.id}
                className="absolute"
                style={{
                  left: `${adjustedPosition.x}%`,
                  top: `${adjustedPosition.y}%`,
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
                      ? handleMemoryTap(memory, index)
                      : handleMemoryClick(memory, index)
                  }
                >
                  {/* Star with glow effect */}
                  <motion.div
                    className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-constellation-star1 
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
                          ? "0 0 30px rgba(255,255,255,0.9), 0 0 40px rgba(169,112,255,0.7)"
                          : isMobile
                          ? "0 0 25px rgba(255,255,255,0.7), 0 0 35px rgba(169,112,255,0.5)"
                          : "0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(169,112,255,0.4)",
                      scale: hoveredMemory === memory.id ? 1.3 : 1,
                      width: isMobile ? "16px" : "16px",
                      height: isMobile ? "16px" : "16px",
                    }}
                    transition={{ duration: 0.2 }}
                    style={{
                      transform: `scale(${isMobile ? 1.5 : 1.2})`,
                    }}
                  />

                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredMemory === memory.id && (
                      <motion.div
                        className="absolute -top-12 xs:-top-14 sm:-top-16 left-1/2 -translate-x-1/2 
                        bg-black/70 backdrop-blur-sm rounded-md px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 sm:py-2.5 min-w-[100px] xs:min-w-[120px] sm:min-w-[150px] text-center 
                        border border-constellation-purple/40 shadow-[0_0_15px_rgba(169,112,255,0.3)]
                        z-20 pointer-events-none"
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="text-constellation-glow text-xs xs:text-sm sm:text-base md:text-base whitespace-nowrap font-medium">
                          {memory.title}
                        </p>
                        <p className="text-constellation-glow/70 text-[10px] xs:text-xs sm:text-sm mt-0.5">
                          {memory.date}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}

          {/* Constellation Lines */}
          <svg className="absolute inset-0 z-0 w-full h-full pointer-events-none">
            {/* Constellation pattern based on the image */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 1.5, delay: 2 }}
            >
              {/* V-shape on the left side */}
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[0].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[0].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[1].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[1].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[1].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[1].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[2].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[2].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[2].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[2].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[3].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[3].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[3].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[3].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[4].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[4].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />

              {/* Horizontal connection line */}
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[2].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[2].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[5].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[5].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[5].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[5].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[6].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[6].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[6].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[6].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[7].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[7].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />

              {/* Pentagon on the right side */}
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[7].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[7].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[8].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[8].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[8].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[8].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[9].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[9].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[9].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[9].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[10].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[10].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[10].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[10].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[11].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[11].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
              <line
                x1={`${
                  getMobileAdjustedPosition(MEMORIES[11].position, isMobile).x
                }%`}
                y1={`${
                  getMobileAdjustedPosition(MEMORIES[11].position, isMobile).y
                }%`}
                x2={`${
                  getMobileAdjustedPosition(MEMORIES[7].position, isMobile).x
                }%`}
                y2={`${
                  getMobileAdjustedPosition(MEMORIES[7].position, isMobile).y
                }%`}
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth={isMobile ? "1" : "1.5"}
              />
            </motion.g>
          </svg>

          {/* Memory navigation hints */}
          {MEMORIES.length > 1 && (
            <div className="absolute bottom-4 xs:bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 text-white/60 text-xs">
              {/* <ChevronLeft className="h-3 w-3" />
              <span>Navigate memories</span>
              <ChevronRight className="h-3 w-3" /> */}
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMemory && (
          <Suspense fallback={<div>Loading...</div>}>
            <MemoryModal
              memory={selectedMemory}
              onClose={handleCloseModal}
              memories={MEMORIES}
              onNavigate={handleMemoryNavigation}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StarMap;
