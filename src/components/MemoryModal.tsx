
import { motion } from "framer-motion";

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
  spotifyTrack?: string; // New optional property for Spotify track ID
};

type MemoryModalProps = {
  memory: Memory;
  onClose: () => void;
};

const MemoryModal = ({ memory, onClose }: MemoryModalProps) => {
  // Check if the memory has a Spotify track to embed
  const hasSpotifyEmbed = Boolean(memory.spotifyTrack);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-md">
      <motion.div
        className="bg-constellation-dark/90 border border-constellation-purple/30 rounded-xl max-w-md w-full overflow-hidden shadow-[0_0_25px_rgba(155,135,245,0.2)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="w-full aspect-video bg-black relative flex items-center justify-center overflow-hidden">
          {memory.image ? (
            <img 
              src={memory.image} 
              alt={memory.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-3xl">✨</div>
          )}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-constellation-dark to-transparent opacity-60"
            aria-hidden="true"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-constellation-purple text-xl font-bold">{memory.title}</h3>
              <p className="text-constellation-glow/80 text-sm mt-1">{memory.date}</p>
            </div>
            <button 
              onClick={onClose} 
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-constellation-purple/20 transition-colors"
              aria-label="Close modal"
            >
              <span className="text-white text-xl">&times;</span>
            </button>
          </div>
          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-5">{memory.description}</p>
          
          {/* Spotify embed if available */}
          {hasSpotifyEmbed && (
            <div className="mt-6 w-full rounded-md overflow-hidden border border-constellation-purple/20">
              <iframe 
                src={`https://open.spotify.com/embed/track/${memory.spotifyTrack}?utm_source=generator&theme=0`}
                width="100%" 
                height="80" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="bg-black/50"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryModal;
