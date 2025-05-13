import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DREAMS } from "../data/dreams";
import { FaHeart } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const FutureDreams = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeDream, setActiveDream] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [stars, setStars] = useState<any[]>([]);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize.width, windowSize.height]);

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

    // Add intersection observer to animate content when in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollability);
        observer.unobserve(container);
      }
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  // Scroll the container left or right
  const scroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const scrollAmount = window.innerWidth > 768 ? 400 : 300;
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
    <motion.div
      className="min-h-screen py-6 sm:py-8 px-3 sm:px-4"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Extended background that matches the StarBackground component */}
      <motion.div
        className="fixed inset-0 z-0 bg-gradient-radial from-constellation-purple/30 via-constellation-navy to-constellation-dark"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

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

      <motion.h1
        className="text-center text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-white mb-8 sm:mb-10 md:mb-12 mt-3 sm:mt-4 tracking-tight leading-relaxed max-w-[90%] md:max-w-[600px] mx-auto relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          textShadow:
            "0 0 3px rgba(241, 231, 254, 0.6), 0 0 7px rgba(169, 112, 255, 0.4)",
        }}
      >
        Ирээдүйн Мөрөөдлүүд
      </motion.h1>

      <div className="max-w-7xl mx-auto overflow-hidden relative px-1 sm:px-2 -mt-3">
        {/* Scroll indicators / controls */}
        {showControls && (
          <>
            <motion.button
              className={`absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full 
                bg-black/40 backdrop-blur-sm flex items-center justify-center transition
                border border-constellation-purple/30 ${
                  canScrollLeft
                    ? "opacity-80 hover:opacity-100"
                    : "opacity-30 cursor-not-allowed"
                }`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: canScrollLeft ? 0.8 : 0.3, x: 0 }}
              whileHover={{ scale: canScrollLeft ? 1.1 : 1 }}
              whileTap={{ scale: canScrollLeft ? 0.95 : 1 }}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </motion.button>

            <motion.button
              className={`absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full 
                bg-black/40 backdrop-blur-sm flex items-center justify-center transition
                border border-constellation-purple/30 ${
                  canScrollRight
                    ? "opacity-80 hover:opacity-100"
                    : "opacity-30 cursor-not-allowed"
                }`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: canScrollRight ? 0.8 : 0.3, x: 0 }}
              whileHover={{ scale: canScrollRight ? 1.1 : 1 }}
              whileTap={{ scale: canScrollRight ? 0.95 : 1 }}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </motion.button>
          </>
        )}

        {/* Cards container */}
        <motion.div
          className="px-2 sm:px-4 py-8 flex space-x-6 sm:space-x-8 md:space-x-10 overflow-x-auto pb-12 sm:pb-12 scrollbar-hide snap-x"
          ref={containerRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
          transition={{ duration: 0.8 }}
        >
          {DREAMS.map((dream, index) => (
            <motion.div
              key={dream.id}
              className="w-[85%] xs:w-[75%] sm:w-64 md:w-80 flex-shrink-0 snap-center py-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isInView ? 1 : 0,
                y: isInView ? 0 : 20,
                scale: activeDream === index ? 1.03 : 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.2 + index * 0.1,
                scale: { type: "spring", stiffness: 300 },
              }}
              whileHover={{
                scale: 1.03,
                transformOrigin: "center center",
              }}
              onHoverStart={() => setActiveDream(index)}
              onHoverEnd={() => setActiveDream(null)}
              onClick={() =>
                setActiveDream(activeDream === index ? null : index)
              }
            >
              <div className="memory-card h-full flex flex-col rounded-xl overflow-hidden shadow-lg backdrop-blur-sm transform-gpu">
                <div
                  className="w-full aspect-square bg-gradient-to-br from-constellation-navy to-constellation-dark 
                  flex items-center justify-center relative overflow-hidden"
                >
                  <motion.div
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-constellation-purple opacity-70 filter blur-sm shadow-[0_0_30px_rgba(155,135,245,0.8)]"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.p
                    className="absolute text-white font-medium text-4xl md:text-5xl"
                    animate={{
                      scale: activeDream === index ? [1, 1.2, 1] : 1,
                      rotate: activeDream === index ? [0, 5, -5, 0] : 0,
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: activeDream === index ? Infinity : 0,
                      repeatDelay: 1,
                    }}
                  >
                    {dream.emoji}
                  </motion.p>
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                  <h3 className="text-constellation-purple font-playfair tracking-tight font-medium text-xl sm:text-xl mb-3 leading-relaxed">
                    {dream.title}
                  </h3>
                  <p className="text-white/90 text-sm sm:text-sm flex-grow font-outfit leading-relaxed">
                    {dream.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="text-center mt-12 sm:mt-14 mb-6 sm:mb-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-constellation-purple to-transparent w-12 sm:w-16 md:w-24"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <motion.span
            className="mx-2 sm:mx-3 text-constellation-purple text-lg sm:text-xl"
            animate={{
              scale: [1, 1.2, 1],
              textShadow: [
                "0 0 3px rgba(169, 112, 255, 0.4)",
                "0 0 8px rgba(169, 112, 255, 0.7)",
                "0 0 3px rgba(169, 112, 255, 0.4)",
              ],
            }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            ✧
          </motion.span>
          <motion.div
            className="h-px bg-gradient-to-r from-constellation-purple via-constellation-purple to-transparent w-12 sm:w-16 md:w-24"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
          <motion.span
            className="mx-2 sm:mx-3 text-constellation-purple text-lg sm:text-xl"
            animate={{
              scale: [1, 1.2, 1],
              textShadow: [
                "0 0 3px rgba(169, 112, 255, 0.4)",
                "0 0 8px rgba(169, 112, 255, 0.7)",
                "0 0 3px rgba(169, 112, 255, 0.4)",
              ],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            ✧
          </motion.span>
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-constellation-purple to-transparent w-12 sm:w-16 md:w-24"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <motion.div
          className="inline-flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
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
            Хайр нь чамдаа хязгааргүй их хайртай шүү!
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
    </motion.div>
  );
};

export default FutureDreams;
