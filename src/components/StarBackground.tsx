import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import type { ISourceOptions, MoveDirection } from "tsparticles-engine";

type NebulaCloud = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  animationDelay: number;
  parallaxFactor: number;
  parallaxClass: string;
};

const StarBackground = () => {
  const [init, setInit] = useState(false);
  const [nebulaClouds, setNebulaClouds] = useState<NebulaCloud[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Initialize particles
  useEffect(() => {
    setInit(true);
  }, []);

  // Generate static nebula clouds
  useEffect(() => {
    const generateNebulaClouds = () => {
      const newClouds: NebulaCloud[] = [];
      // Reduce cloud count on mobile for better performance
      const cloudCount = isMobile ? 8 : 12;

      const colors = [
        "rgba(169, 112, 255, 0.2)", // Purple
        "rgba(77, 214, 255, 0.2)", // Blue
        "rgba(241, 231, 254, 0.15)", // Lavender
        "rgba(130, 170, 255, 0.2)", // Light blue
        "rgba(200, 100, 255, 0.15)", // Pink-purple
      ];

      for (let i = 0; i < cloudCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 30 + 20;
        const opacity = Math.random() * 0.3 + 0.1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const animationDelay = Math.random() * 10;

        // Gentle parallax movement
        const parallaxFactor = Math.random() * 0.05;
        const parallaxClass = [
          "animate-drift-slow",
          "animate-drift-medium",
          "animate-drift-fast",
        ][Math.floor(Math.random() * 3)];

        newClouds.push({
          id: i,
          x,
          y,
          size,
          opacity,
          color,
          animationDelay,
          parallaxFactor,
          parallaxClass,
        });
      }
      setNebulaClouds(newClouds);
    };

    generateNebulaClouds();

    const handleResize = () => {
      generateNebulaClouds();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  // Memoize particle options for better performance
  const particleOptions = useMemo((): ISourceOptions => {
    return {
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: isMobile ? 40 : 70,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#ffffff", "#b5cfff", "#e0d0ff"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: { min: 0.1, max: 1 },
          animation: {
            enable: true,
            speed: 0.2,
            minimumValue: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3 },
          random: true,
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none" as MoveDirection,
          random: true,
          straight: false,
          outMode: "out",
        },
        twinkle: {
          particles: {
            enable: true,
            color: ["#ffffff", "#e0d0ff", "#b5cfff"],
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
    };
  }, [isMobile]);

  // Callback for particles initialization
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      {/* Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-constellation-purple/30 via-constellation-navy to-constellation-dark z-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Particles for twinkling stars */}
      {init && (
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particleOptions}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Static stars (no scrolling parallax) */}
      <div className="absolute inset-0 z-20">
        {Array.from({ length: isMobile ? 30 : 50 }).map((_, index) => {
          const depth = Math.floor(index % 3);
          const size = [1.5, 2, 3][depth];

          // Static positions
          const x = Math.random() * 100;
          const y = Math.random() * 100;

          // Twinkling animation based on depth
          const twinkleSpeed = [
            "animate-twinkle-slower",
            "animate-twinkle-slow",
            "animate-twinkle-fast",
          ][depth];
          const delay = Math.random() * 10;

          // Add a gentle drift animation class based on depth
          const driftClass = [
            "animate-drift-slow",
            "animate-drift-medium",
            "animate-drift-fast",
          ][depth];

          return (
            <div
              key={`static-star-${index}`}
              className={`absolute rounded-full bg-white ${twinkleSpeed} ${driftClass}`}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: Math.random() * 0.5 + 0.5,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      {/* Nebula clouds with improved animation */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {nebulaClouds.map((cloud) => (
          <motion.div
            key={cloud.id}
            className={`absolute rounded-full ${cloud.parallaxClass}`}
            initial={{
              x: `${cloud.x}vw`,
              y: `${cloud.y}vh`,
              opacity: 0,
            }}
            animate={{
              x: `${cloud.x}vw`,
              y: `${cloud.y}vh`,
              opacity: cloud.opacity,
            }}
            transition={{
              opacity: { duration: 2 },
              delay: cloud.animationDelay * 0.1,
            }}
            style={{
              width: `${cloud.size}rem`,
              height: `${cloud.size}rem`,
              backgroundColor: cloud.color,
              filter: "blur(40px)",
              animationDelay: `${cloud.animationDelay}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default StarBackground;
