import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav
      className="w-full px-4 md:px-10 py-4 flex justify-between items-center z-50 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link
        to="/"
        className="text-constellation-glow text-xl md:text-2xl font-serif z-10"
      >
        Оддын Хайр
      </Link>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-white z-10 focus:outline-none"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-constellation-glow" />
        ) : (
          <Menu className="h-6 w-6 text-constellation-glow" />
        )}
      </button>

      {/* Mobile menu overlay */}
      <motion.div
        className={`md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-0 ${
          isMenuOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={toggleMenu}
      />

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden fixed top-16 left-0 right-0 p-4 bg-constellation-dark/90 backdrop-blur-md border-t border-constellation-purple/20 z-40 ${
          isMenuOpen ? "flex" : "hidden"
        } flex-col space-y-4 items-center`}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          y: isMenuOpen ? 0 : -10,
        }}
        transition={{ duration: 0.3 }}
      >
        <MobileNavLink
          to="/starmap"
          isActive={location.pathname === "/starmap"}
          onClick={toggleMenu}
        >
          Our Stars
        </MobileNavLink>
        <MobileNavLink
          to="/dreams"
          isActive={location.pathname === "/dreams"}
          onClick={toggleMenu}
        >
          Future Dreams
        </MobileNavLink>
      </motion.div>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-8 items-center">
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

const NavLink = ({
  to,
  isActive,
  children,
}: {
  to: string;
  isActive: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Link to={to} className="relative group">
      <span
        className={`text-base ${
          isActive
            ? "text-constellation-purple font-medium"
            : "text-white hover:text-constellation-glow transition-colors"
        }`}
      >
        {children}
      </span>
      {isActive ? (
        <motion.div
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-constellation-purple"
          layoutId="navUnderline"
          transition={{ duration: 0.3 }}
        />
      ) : (
        <div className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-0.5 bg-constellation-purple/50 transition-all duration-300" />
      )}
    </Link>
  );
};

const MobileNavLink = ({
  to,
  isActive,
  onClick,
  children,
}: {
  to: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={to}
      className="w-full text-center py-2 relative"
      onClick={onClick}
    >
      <span
        className={`text-lg ${
          isActive ? "text-constellation-purple font-medium" : "text-white"
        }`}
      >
        {children}
      </span>
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/4 w-1/2 h-0.5 bg-constellation-purple mx-auto"
          layoutId="mobileNavUnderline"
        />
      )}
    </Link>
  );
};

export default Navigation;
