import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import StarBackground from "../components/StarBackground";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-starry-sky overflow-hidden relative">
      <StarBackground />
      <motion.div
        className="text-center z-10 px-4 py-10 max-w-[350px] sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-playfair glow-text mb-4">
            404
          </h1>
        </motion.div>
        <motion.p
          className="text-lg sm:text-xl text-constellation-glow mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Star not found in our constellation
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link
            to="/"
            className="glow-button inline-block px-6 py-2 rounded-full
              border border-constellation-purple/50 bg-black/30 backdrop-blur-sm
              text-white hover:bg-constellation-purple/20 transition-colors"
          >
            Return to Our Sky
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
