import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string;
  onPlay?: () => void;
  onPause?: () => void;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioUrl,
  onPlay,
  onPause,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPause?.();
    } else {
      audio.play();
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const generateWaveform = () => {
    const bars = Array.from({ length: 20 }, (_, i) => {
      const height = Math.random() * 32 + 8;
      const isActive = isPlaying && (currentTime / duration) * 20 > i;
      return (
        <div
          key={i}
          className={`w-1 rounded-full transition-all duration-200 ${
            isActive ? 'bg-blue-400' : 'bg-purple-300'
          }`}
          style={{ height: `${height}px` }}
        />
      );
    });
    return bars;
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <button
        onClick={togglePlayPause}
        className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
      >
        {isPlaying ? (
          <Pause className="text-white" size={20} />
        ) : (
          <Play className="text-white ml-1" size={20} />
        )}
      </button>
      
      <div className="flex-1 flex items-center gap-1">
        {generateWaveform()}
      </div>
      
      <Volume2 className="text-purple-300" size={20} />
      
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};