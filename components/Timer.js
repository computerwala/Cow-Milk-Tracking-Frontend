'use client';
import { useEffect, useState, useRef } from 'react';

export default function Timer({ isRunning, isPaused, onTimeUpdate }) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          const newSeconds = s + 1;
          onTimeUpdate?.(newSeconds);
          return newSeconds;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  useEffect(() => {
    return () => {
      onTimeUpdate?.(seconds);
    };
  }, []);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <h2 style={{ fontSize: '2rem', margin: '1rem' }}>
      🕒 {formatTime(seconds)}
    </h2>
  );
}