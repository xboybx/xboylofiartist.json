import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface MusicPlayerProps {
  embedCode?: string;
  embedType?: 'spotify' | 'soundcloud';
  isFeatured?: boolean;
  merged?: boolean;
  showPlayer?: boolean;
}

const PlayButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-white/20 transition-colors duration-300"
    aria-label="Play music"
  >
    <Play className="w-6 h-6 text-white" />
  </button>
);

const MusicPlayer: React.FC<MusicPlayerProps> = ({ embedCode, embedType, isFeatured, merged, showPlayer }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 40 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const defaultPosition = { x: window.innerWidth / 2 - 150, y: window.innerHeight / 2 - 40 };

  if (!embedCode) return null;

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragOffset.x;
      const newY = touch.clientY - dragOffset.y;

      // Check proximity to default position (within 50px)
      const distance = Math.sqrt(
        Math.pow(newX - defaultPosition.x, 2) + 
        Math.pow(newY - defaultPosition.y, 2)
      );

      if (distance < 50 && !isDragging) {
        setPosition(defaultPosition);
      } else {
        setPosition({
          x: newX,
          y: newY
        });
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!showPlayer) {
    return <PlayButton onClick={() => setIsPlaying(true)} />;
  }

  return (
    <div 
      className={`fixed z-50 cursor-grab select-none transition-all duration-500 ease-in-out ${merged ? 'top-16 left-1/2 transform -translate-x-1/2' : ''}`}
      style={{
        left: merged ? '50%' : `${position.x}px`,
        top: merged ? '4rem' : `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'grab',
        animation: !isDragging && !merged ? 'bounce 2s ease-in-out infinite' : 'none',
        transformOrigin: 'center bottom',
        userSelect: 'none',
        touchAction: 'none',
        transform: merged ? 'translateX(-50%)' : undefined,
      }}
      onMouseDown={(e) => {
        // Only start drag if left mouse button and not merged
        if (e.button !== 0 || merged) return;
        setIsDragging(true);
        setDragOffset({
          x: e.clientX - position.x,
          y: e.clientY - position.y
        });
      }}
      onMouseMove={(e) => {
        if (isDragging) {
          const newX = e.clientX - dragOffset.x;
          const newY = e.clientY - dragOffset.y;
          
          // Check proximity to default position (within 50px)
          const distance = Math.sqrt(
            Math.pow(newX - defaultPosition.x, 2) + 
            Math.pow(newY - defaultPosition.y, 2)
          );
          
          if (distance < 50 && !isDragging) {
            setPosition(defaultPosition);
          } else {
            setPosition({
              x: newX,
              y: newY
            });
          }
        }
      }}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!isPlaying ? (
        <PlayButton onClick={() => setIsPlaying(true)} />
      ) : (
        <div className="relative border border-white/20 rounded-lg p-2">
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute -top-2 -right-2 bg-black/50 rounded-full p-1"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="w-[300px] h-[80px]" dangerouslySetInnerHTML={{ __html: embedCode }} />
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
