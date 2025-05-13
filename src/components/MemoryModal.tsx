import { motion } from "framer-motion";
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Memory = {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  position: {
    x: number;
    y: number;
  };
  spotifyTrack?: string; // Can be a track ID or playlist ID
};

type MemoryModalProps = {
  memory: Memory;
  onClose: () => void;
  memories?: Memory[];
  onNavigate?: (direction: "prev" | "next") => void;
};

const MemoryModal = ({
  memory,
  onClose,
  memories,
  onNavigate,
}: MemoryModalProps) => {
  // Check if the memory has a Spotify track to embed
  const hasSpotifyEmbed = Boolean(memory.spotifyTrack);
  const [liked, setLiked] = useState(false);

  // Special case for "Our Song" - use the playlist
  const isOurSong = memory.title === "Our Song";

  // Support for navigation between memories
  const hasNavigation = memories && memories.length > 1 && onNavigate;

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: 0.1,
      },
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-lg"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-md rounded-xl w-full max-h-[85vh] mt-14 sm:mt-16 overflow-y-auto
                  overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] 
                  border border-white/20 sm:max-w-lg"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation controls - only shown if there are multiple memories */}
        {hasNavigation && (
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 z-[30] flex justify-between px-2 sm:px-6 md:px-10 pointer-events-none">
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                if (onNavigate) onNavigate("prev");
              }}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/60 backdrop-blur-sm 
                       flex items-center justify-center border border-white/10 
                       text-white/90 shadow-lg pointer-events-auto"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                if (onNavigate) onNavigate("next");
              }}
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/60 backdrop-blur-sm 
                       flex items-center justify-center border border-white/10 
                       text-white/90 shadow-lg pointer-events-auto"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </motion.button>
          </div>
        )}

        {/* Polaroid-style image container */}
        <div className="p-3 pt-6 sm:p-5 sm:pt-7">
          <div className="relative bg-white shadow-lg rounded-md mb-4 p-2 sm:p-3 pb-10 sm:pb-12 transform rotate-1 mx-auto max-w-[90%] sm:max-w-[85%]">
            {memory.image ? (
              <motion.div
                className="aspect-square w-full overflow-hidden rounded-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={memory.image}
                  alt={memory.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ) : (
              <motion.div
                className="aspect-square w-full rounded-sm flex items-center justify-center bg-gradient-to-br from-constellation-purple/20 to-constellation-navy/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="text-4xl sm:text-5xl">✨</span>
              </motion.div>
            )}
          </div>

          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center 
                    rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 
                    transition-colors z-[31] border border-white/20"
            aria-label="Хаах"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </motion.button>

          {/* Like button */}
          <motion.button
            className="absolute top-2 left-2 sm:top-3 sm:left-3 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center 
                    rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 
                    transition-colors z-[31] border border-white/20"
            aria-label="Дурсамжийг таалах"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
          >
            <Heart
              className={`h-4 w-4 sm:h-5 sm:w-5 ${
                liked ? "text-pink-300 fill-pink-300" : "text-white"
              }`}
            />
          </motion.button>

          {/* Content */}
          <motion.div
            className="text-center mb-4 sm:mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="text-white text-xl sm:text-2xl md:text-2xl font-playfair tracking-tight leading-relaxed max-w-[90%] mx-auto">
              {memory.title}
            </h3>
            <p className="text-white/70 text-sm sm:text-sm mt-1 font-inter">
              {memory.date}
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 backdrop-blur-sm p-4 sm:p-5 rounded-lg border border-white/10 mb-5 sm:mb-6 shadow-inner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-white/90 text-sm sm:text-base leading-relaxed italic font-outfit">
              "{memory.description}"
            </p>
          </motion.div>

          {/* Spotify embed */}
          {isOurSong ? (
            <motion.div
              className="mt-3 w-full"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-md">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/0mJhvgLx6WMZ4JUvXJIzzg?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  className="bg-black/20"
                />
              </div>
            </motion.div>
          ) : (
            hasSpotifyEmbed && (
              <motion.div
                className="mt-3 w-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="bg-white/5 backdrop-blur-sm p-3 rounded-xl border border-white/10 shadow-md">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${memory.spotifyTrack}?utm_source=generator&theme=0`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="bg-black/20"
                  />
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MemoryModal;
