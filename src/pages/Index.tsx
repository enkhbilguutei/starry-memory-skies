import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import StarBackground from "../components/StarBackground";

const Index = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Initialize audio on component mount and check device
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize
    window.addEventListener("resize", checkMobile);

    // Create audio element for the chime sound
    audioRef.current = new Audio();
    // Using a reliable source for the sound effect
    audioRef.current.src =
      "https://cdn.freesound.org/previews/521/521876_7542131-lq.mp3";
    audioRef.current.preload = "auto";

    return () => {
      // Cleanup
      window.removeEventListener("resize", checkMobile);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleEnter = () => {
    setIsEntering(true);

    // Play sound effect
    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current
        .play()
        .catch((e) => console.error("Audio playback failed:", e));
    }

    // Navigate after transition completes
    setTimeout(() => {
      navigate("/starmap");
    }, 2000); // Extended to 2 seconds for a more immersive transition
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-starry-sky overflow-hidden relative">
      <AnimatePresence>
        {!isEntering ? (
          <StarBackground />
        ) : (
          <motion.div
            className="fixed inset-0 z-20"
            initial={{ scale: 1 }}
            animate={{
              scale: 3,
              opacity: [1, 1, 0.8, 0],
            }}
            transition={{
              duration: 2,
              times: [0, 0.7, 0.85, 1],
            }}
          >
            <StarBackground />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="z-10 text-center px-4 max-w-xl mx-auto flex flex-col items-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isEntering ? 0 : 1 }}
        transition={{ duration: isEntering ? 0.6 : 1.5 }}
      >
        <motion.h1
          className="text-4xl xs:text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-cormorant mb-3 sm:mb-4 text-constellation-glow tracking-tight leading-snug sm:leading-relaxed w-full max-w-[95%] sm:max-w-[90%] md:max-w-[600px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isEntering ? 0 : 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            textShadow:
              "0 0 8px rgba(255,255,255,0.3), 0 0 12px rgba(203,174,255,0.5)",
            wordBreak: "keep-all",
            overflowWrap: "normal",
          }}
        >
          Од Бүр Дурсамжтай
        </motion.h1>

        <motion.p
          className="text-base xs:text-lg sm:text-lg md:text-xl max-w-[95%] sm:max-w-lg mx-auto mb-10 sm:mb-12 md:mb-16 font-satoshi leading-relaxed text-constellation-glow w-full px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isEntering ? 0 : 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            wordBreak: "keep-all",
            overflowWrap: "normal",
          }}
        >
          Хамтдаа одон орноор аялцгаая, зөвхөн бидэнд зориулагдсан :) ✨
        </motion.p>

        <motion.button
          onClick={handleEnter}
          className="enter-button px-6 xs:px-8 sm:px-10 py-3 sm:py-4 rounded-full border-2 border-constellation-purple 
          bg-black bg-opacity-30 text-white text-base xs:text-lg sm:text-xl font-medium relative overflow-hidden backdrop-blur-sm font-inter mt-2 sm:mt-0 w-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isEntering ? 0 : 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 25px rgba(169, 112, 255, 0.8)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          Аялах
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Index;
