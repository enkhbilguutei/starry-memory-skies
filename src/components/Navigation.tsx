
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <motion.nav 
      className="w-full px-4 md:px-10 py-4 flex justify-between items-center z-20 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link to="/" className="text-constellation-glow text-xl md:text-2xl font-playfair">
        Constellation of Love
      </Link>
      <div className="flex gap-6">
        <NavLink to="/starmap" isActive={location.pathname === "/starmap"}>
          Our Stars
        </NavLink>
        <NavLink to="/dreams" isActive={location.pathname === "/dreams"}>
          Future Dreams
        </NavLink>
      </div>
    </motion.nav>
  );
};

const NavLink = ({ to, isActive, children }: { to: string; isActive: boolean; children: React.ReactNode }) => {
  return (
    <Link to={to} className="relative">
      <span className={`text-sm md:text-base ${isActive ? 'text-constellation-purple' : 'text-white'}`}>
        {children}
      </span>
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-constellation-purple"
          layoutId="navUnderline"
        />
      )}
    </Link>
  );
};

export default Navigation;
