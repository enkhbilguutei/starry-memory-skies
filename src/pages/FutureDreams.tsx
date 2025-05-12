import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { DREAMS } from "../data/dreams";
import { FaHeart } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FutureDreams = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check if we can scroll either direction
  useEffect(() => {
    const checkScrollability = () => {
      if (!containerRef.current) return;

      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    // Check initially
    checkScrollability();

    // Set up listeners
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollability);
      window.addEventListener("resize", checkScrollability);
    }

    // Check if we need controls (on larger screens)
    setShowControls(window.innerWidth > 768);

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
      }
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  // Scroll the container left or right
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = 300;
    const currentScroll = containerRef.current.scrollLeft;
    const newScroll =
      direction === "left"
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    containerRef.current.scrollTo({
      left: newScroll,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen py-6 sm:py-8 px-3 sm:px-4">
      <motion.h1
        className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-white mb-8 sm:mb-10 md:mb-12 mt-3 sm:mt-4 tracking-tight leading-relaxed max-w-[90%] md:max-w-[600px] mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textShadow:
            "0 0 3px rgba(241, 231, 254, 0.6), 0 0 7px rgba(169, 112, 255, 0.4)",
        }}
      >
        Future Dreams
      </motion.h1>

      <div className="max-w-7xl mx-auto overflow-hidden relative px-1 sm:px-2">
        {/* Scroll indicators / controls */}
        {showControls && (
          <>
            <motion.button
              className={`absolute left-1 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full 
                bg-black/30 backdrop-blur-sm flex items-center justify-center transition
                border border-constellation-purple/20
                ${
                  canScrollLeft
                    ? "opacity-80 hover:opacity-100"
                    : "opacity-30 cursor-not-allowed"
                }`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollLeft ? 0.8 : 0.3 }}
              whileHover={{ scale: canScrollLeft ? 1.1 : 1 }}
              whileTap={{ scale: canScrollLeft ? 0.95 : 1 }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>

            <motion.button
              className={`absolute right-1 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full 
                bg-black/30 backdrop-blur-sm flex items-center justify-center transition
                border border-constellation-purple/20
                ${
                  canScrollRight
                    ? "opacity-80 hover:opacity-100"
                    : "opacity-30 cursor-not-allowed"
                }`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollRight ? 0.8 : 0.3 }}
              whileHover={{ scale: canScrollRight ? 1.1 : 1 }}
              whileTap={{ scale: canScrollRight ? 0.95 : 1 }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </>
        )}

        {/* Cards container */}
        <motion.div
          className="px-2 sm:px-4 flex space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto pb-6 sm:pb-8 scrollbar-hide snap-x"
          ref={containerRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {DREAMS.map((dream, index) => (
            <motion.div
              key={dream.id}
              className="w-[90%] sm:w-64 md:w-80 flex-shrink-0 snap-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <div className="memory-card h-full flex flex-col">
                <div
                  className="w-full aspect-square bg-gradient-to-br from-constellation-navy to-constellation-dark 
                  flex items-center justify-center relative overflow-hidden"
                >
                  <motion.div
                    className="w-20 h-20 sm:w-20 sm:h-20 md:w-28 md:h-28 rounded-full bg-constellation-purple opacity-70 shadow-[0_0_30px_rgba(155,135,245,0.8)]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  />
                  <p className="absolute text-white font-medium text-2xl md:text-xl">
                    {dream.emoji}
                  </p>
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h3 className="text-constellation-purple font-playfair tracking-tight font-medium text-xl sm:text-xl mb-3 leading-relaxed">
                    {dream.title}
                  </h3>
                  <p className="text-white text-sm sm:text-sm flex-grow font-outfit leading-relaxed">
                    {dream.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-12 sm:mt-14 mb-6 sm:mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-constellation-purple to-transparent w-12 sm:w-16 md:w-24" />
          <span className="mx-2 sm:mx-3 text-constellation-purple text-lg sm:text-xl">
            ✧
          </span>
          <div className="h-px bg-gradient-to-r from-constellation-purple via-constellation-purple to-transparent w-12 sm:w-16 md:w-24" />
          <span className="mx-2 sm:mx-3 text-constellation-purple text-lg sm:text-xl">
            ✧
          </span>
          <div className="h-px bg-gradient-to-r from-transparent via-constellation-purple to-transparent w-12 sm:w-16 md:w-24" />
        </div>

        <motion.div
          className="inline-flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <motion.p
            className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-playfair text-white mr-2 tracking-tight leading-relaxed"
            animate={{
              scale: [1, 1.03, 1],
              textShadow: [
                "0 0 3px rgba(241, 231, 254, 0.6), 0 0 7px rgba(169, 112, 255, 0.4)",
                "0 0 6px rgba(241, 231, 254, 0.7), 0 0 12px rgba(169, 112, 255, 0.5)",
                "0 0 3px rgba(241, 231, 254, 0.6), 0 0 7px rgba(169, 112, 255, 0.4)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          >
            I Love You Forever
          </motion.p>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              color: ["#9b87f5", "#f587e2", "#9b87f5"],
            }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="text-constellation-purple"
          >
            <FaHeart size={20} className="sm:text-lg md:text-xl" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FutureDreams;
