
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
        className="text-center z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-playfair glow-text mb-4">404</h1>
        <p className="text-xl text-constellation-glow mb-8">Star not found in our constellation</p>
        <Link to="/" className="glow-button inline-block">
          Return to Our Sky
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
