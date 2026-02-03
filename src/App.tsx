import { useState, useEffect, useRef } from 'react';
import Wedding from './imports/Wedding';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scale, setScale] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Calculate responsive scale based on viewport
  useEffect(() => {
    const calculateScale = () => {
      const baseWidth = 393; // iPhone 14/15 Pro design width
      const viewportWidth = window.innerWidth;
      
      // On mobile, scale to fit viewport width
      if (viewportWidth <= 768) {
        const newScale = Math.min(viewportWidth / baseWidth, 1);
        setScale(newScale);
      } else {
        // On desktop, keep at 1:1 scale
        setScale(1);
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  useEffect(() => {
    // Create audio element with a placeholder URL
    // Replace this URL with your actual MP3 file path
    const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    
    audioRef.current = new Audio(audioUrl);
    audioRef.current.loop = true;
    
    // Attempt to autoplay
    const playAudio = async () => {
      try {
        await audioRef.current?.play();
        setIsPlaying(true);
      } catch (error) {
        // Auto-play was prevented - user needs to interact first
        console.log('Autoplay prevented. Click the music button to start.');
        setIsPlaying(false);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleMusicToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Failed to play audio:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-100 flex justify-center items-start overflow-x-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* Responsive container */}
      <div 
        ref={containerRef}
        className="relative bg-white shadow-lg"
        style={{
          width: '393px',
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: scale < 1 ? `calc((1 - ${scale}) * -50%)` : '0',
        }}
      >
        <Wedding />
        {/* Overlay for music buttons */}
        <div 
          className="absolute left-[315px] top-[64px] w-[51px] h-[49px] cursor-pointer z-10"
          onClick={handleMusicToggle}
          style={{ pointerEvents: 'auto' }}
        >
          {/* This is just the clickable area - the actual images are rendered by Wedding component */}
        </div>
        
        {/* Control visibility of music images via CSS */}
        <style>{`
          [data-name="Music_Default"] {
            display: ${isPlaying ? 'block' : 'none'};
          }
          [data-name="Music_Stop"] {
            display: ${isPlaying ? 'none' : 'block'};
          }
        `}</style>
      </div>
    </div>
  );
}