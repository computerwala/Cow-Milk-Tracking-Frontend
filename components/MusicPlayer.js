'use client';
import { useEffect, useRef } from 'react';

export default function MusicPlayer({ isPlaying, selectedTrack }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, selectedTrack]);

  return <audio ref={audioRef} src={`/music/${selectedTrack}`} loop />;
}