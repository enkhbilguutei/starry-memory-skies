
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
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div
        className="bg-black bg-opacity-90 border border-constellation-purple rounded-lg max-w-md w-full overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="w-full aspect-video bg-constellation-dark relative flex items-center justify-center overflow-hidden">
          {memory.image ? (
            <img 
              src={memory.image} 
              alt={memory.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-3xl">✨</div>
          )}
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-constellation-purple text-xl font-bold">{memory.title}</h3>
              <p className="text-constellation-glow text-sm">{memory.date}</p>
            </div>
            <button 
              onClick={onClose} 
              className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-constellation-purple hover:bg-opacity-20"
            >
              <span className="text-white text-xl">&times;</span>
            </button>
          </div>
          <p className="text-white text-sm md:text-base mb-4">{memory.description}</p>
          
          {/* Spotify embed if available */}
          {hasSpotifyEmbed && (
            <div className="mt-4 w-full">
              <iframe 
                src={`https://open.spotify.com/embed/track/${memory.spotifyTrack}?utm_source=generator`}
                width="100%" 
                height="80" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-md"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default MemoryModal;
