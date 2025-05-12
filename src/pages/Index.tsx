
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import StarBackground from "../components/StarBackground";

const Index = () => {
  const navigate = useNavigate();
  const [isEntering, setIsEntering] = useState(false);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      navigate("/starmap");
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-starry-sky overflow-hidden relative">
      <StarBackground />
      
      <motion.div
        className="z-10 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1 
          className="text-3xl md:text-5xl lg:text-6xl font-playfair glow-text mb-8"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          Every Star is a Memory
        </motion.h1>
        
        <p className="text-constellation-glow text-sm md:text-base max-w-md mx-auto mb-12">
          Explore our journey through the stars, where each light represents a moment we've shared together.
        </p>
        
        <motion.button
          onClick={handleEnter}
          className="glow-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          animate={isEntering ? { scale: 0.9, opacity: 0 } : {}}
        >
          Enter the Sky
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Index;
