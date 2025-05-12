
import { useEffect, useState } from "react";

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  animationDelay: number;
  animationType: string;
};

const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = Math.floor((window.innerWidth * window.innerHeight) / 1500);

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 0.15 + 0.05;
        const opacity = Math.random() * 0.7 + 0.3;
        const animationDelay = Math.random() * 5;

        const animationTypes = ["twinkle-fast", "twinkle-slow", "twinkle-slower"];
        const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];

        newStars.push({
          id: i,
          x,
          y,
          size,
          opacity,
          animationDelay,
          animationType,
        });
      }
      setStars(newStars);
    };

    generateStars();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star animate-${star.animationType}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
            opacity: star.opacity,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
