import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 w-full px-4 md:px-10 py-4 flex justify-between items-center z-[90] transition-all duration-300 ${
        scrolled
          ? "bg-constellation-dark/70 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Link
        to="/"
        className="text-constellation-glow text-xl md:text-2xl font-serif z-[91] hover:text-white transition-colors"
      >
        Дурсамж Дүүрэн Одод
      </Link>

      {/* Mobile menu button */}
      <motion.button
        className="md:hidden text-white z-[91] focus:outline-none h-10 w-10 flex items-center justify-center
                   rounded-full bg-constellation-dark/40 backdrop-blur-sm border border-constellation-purple/20"
        onClick={toggleMenu}
        aria-label="Цэс нээх"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isMenuOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5 text-constellation-glow" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5 text-constellation-glow" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden fixed top-16 left-0 right-0 p-4 bg-constellation-dark/90 backdrop-blur-md border-t border-constellation-purple/20 z-[85]
                     flex flex-col space-y-6 items-center rounded-b-xl shadow-lg mx-3"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink
              to="/starmap"
              isActive={location.pathname === "/starmap"}
              onClick={toggleMenu}
            >
              Бидний Одод
            </MobileNavLink>
            <MobileNavLink
              to="/dreams"
              isActive={location.pathname === "/dreams"}
              onClick={toggleMenu}
            >
              Ирээдүйн Мөрөөдөл
            </MobileNavLink>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop menu */}
      <div className="hidden md:flex gap-8 items-center">
        <NavLink to="/starmap" isActive={location.pathname === "/starmap"}>
          Бидний Одод
        </NavLink>
        <NavLink to="/dreams" isActive={location.pathname === "/dreams"}>
          Ирээдүйн Мөрөөдөл
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
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // First close the menu
    onClick();
    // Then navigate after a small delay to allow menu animation to start
    setTimeout(() => {
      navigate(to);
    }, 100);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <a
        href={to}
        className="w-full text-center py-2 px-8 relative block rounded-lg"
        onClick={handleClick}
      >
        <span
          className={`text-lg ${
            isActive ? "text-constellation-purple font-medium" : "text-white"
          }`}
        >
          {children}
        </span>
        {isActive ? (
          <motion.div
            className="absolute -bottom-1 left-1/4 w-1/2 h-0.5 bg-constellation-purple mx-auto"
            layoutId="mobileNavUnderline"
          />
        ) : (
          <motion.div
            className="absolute -bottom-1 left-1/4 w-0 h-0.5 bg-constellation-purple/50 mx-auto"
            whileHover={{ width: "50%" }}
            transition={{ duration: 0.3 }}
          />
        )}
      </a>
    </motion.div>
  );
};

export default Navigation;
