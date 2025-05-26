'use client';

import React from 'react';
import { useRouter } from 'next/navigation';


export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/milking-session');
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundImage: 'url("/images/cow1.jpg")', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1>Welcome to the Milking App</h1>
      <p>Click below to get started!</p>

      <button
        onClick={handleGetStarted}
        style={{
          padding: '0.8rem 2rem',
          fontSize: '1.2rem',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#0070f3',
          color: 'white',
          marginTop: '1.5rem',
        }}
      >
        Get Started
      </button>
    </main>
  );
}