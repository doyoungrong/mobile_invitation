import { useState, useEffect, useRef } from 'react';
import Wedding from './imports/Wedding';
import StageScaler from './components/StageScaler';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      className="min-h-screen bg-gray-100 overflow-x-hidden"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }}
    >
      {/* ✅ 393 기준 디자인을 "모바일이면 항상 화면 폭에 꽉 차게(확대 포함)" 스케일 */}
      <StageScaler designWidth={393}>
        {/* StageScaler가 width/scale을 담당하니 여기선 transform/width 지정하지 말기 */}
        <div className="relative bg-white shadow-lg">
          <Wedding />

          {/* Overlay for music buttons (좌표는 393 기준 그대로 둬도 StageScaler가 같이 스케일함) */}
          <div
            className="absolute left-[315px] top-[64px] w-[51px] h-[49px] cursor-pointer z-10"
            onClick={handleMusicToggle}
            style={{ pointerEvents: 'auto' }}
          />

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
      </StageScaler>
    </div>
  );
}
