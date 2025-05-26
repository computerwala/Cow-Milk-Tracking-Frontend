'use client';
import { useState } from 'react';
import Link from 'next/link';
import Timer from '../../../components/Timer';
import MusicPlayer from '../../../components/MusicPlayer';

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState('music1.mp3');
  const [showMilkModal, setShowMilkModal] = useState(false);
  const [milkQuantity, setMilkQuantity] = useState('');
  const [showSavedModal, setShowSavedModal] = useState(false);

  const handleStart = () => {
    setStartTime(new Date());
    setDuration(0); 
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(prev => !prev);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setShowMilkModal(true);
  };

  const handleMilkSubmit = async () => {
    const endTime = new Date();
    const milk_quantity = parseFloat(milkQuantity);

    if (isNaN(milk_quantity)) {
      alert(' Please enter a valid number for milk quantity.');
      return;
    }

    const session = {
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      duration,
      milk_quantity
    };

    await fetch('https://cow-milk-tracking-backend.onrender.com/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(session)
    });

    setShowMilkModal(false);
    setMilkQuantity('');
    setShowSavedModal(true);
  };

  return (
    <main style={mainStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>🐄 Milking Tracker</h1>

        {!isRunning && (
          <div style={dropdownWrapper}>
            <label style={{ marginRight: '0.5rem' }}>🎵 Choose Music:</label>
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
              style={selectStyle}
            >
              <option value="music1.mp3">Music 1</option>
              <option value="music2.mp3">Music 2</option>
              <option value="music3.mp3">Music 3</option>
              <option value="music4.mp3">Music 4</option>
            </select>
          </div>
        )}

        <Timer
          isRunning={isRunning}
          isPaused={isPaused}
          onTimeUpdate={(val) => setDuration(val)}
        />
        <MusicPlayer isPlaying={isRunning && !isPaused} selectedTrack={selectedTrack} />

        {!isRunning ? (
          <button onClick={handleStart} style={btnStyle}>Start Milking</button>
        ) : (
          <div style={{ marginTop: '1rem' }}>
            <button onClick={handlePauseResume} style={btnStyle}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={handleStop}
              style={{ ...btnStyle, backgroundColor: '#e74c3c', marginLeft: '1rem' }}
            >
               Stop
            </button>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <Link href="/milking-history" style={linkStyle}> View History</Link>
        </div>
      </div>

      
      {showMilkModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h2>Enter Milk Quantity (liters)</h2>
            <input
              type="number"
              step="0.01"
              value={milkQuantity}
              onChange={(e) => setMilkQuantity(e.target.value)}
              placeholder="e.g. 2.5"
              style={inputStyle}
            />
            <div>
              <button onClick={handleMilkSubmit} style={btnStyle}>Save</button>
              <button
                onClick={() => setShowMilkModal(false)}
                style={{ ...btnStyle, backgroundColor: '#e74c3c', marginLeft: '1rem' }}
              >
                 Cancel
              </button>
            </div>
          </div>
        </div>
      )}

  
      {showSavedModal && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <h2>Session Saved!</h2>
            <button onClick={() => setShowSavedModal(false)} style={{ ...btnStyle, marginTop: '1rem' }}>
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  );
}


const mainStyle = {
  minHeight: '100vh',
  backgroundImage: 'url("/images/cow2.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  textAlign: 'center',
};

const containerStyle = {
  backgroundColor: 'rgba(0,0,0,0.65)',
  padding: '3rem 2rem',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '550px',
  boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
  color: '#fff',
};

const titleStyle = {
  fontSize: '2.5rem',
  marginBottom: '1.5rem',
  fontWeight: '600',
};

const dropdownWrapper = {
  marginBottom: '1.5rem',
  fontSize: '1rem',
};

const selectStyle = {
  padding: '0.5rem',
  borderRadius: '6px',
  border: 'none',
  fontSize: '1rem',
  backgroundColor: '#f5f5f5',
  color: '#333',
};

const btnStyle = {
  fontSize: '1.1rem',
  padding: '12px 28px',
  marginTop: '1rem',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '8px',
  backgroundColor: '#4CAF50',
  color: 'white',
  fontWeight: 'bold',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.2s ease-in-out',
};

const linkStyle = {
  color: '#00eaff',
  fontWeight: 'bold',
  fontSize: '1rem',
  textDecoration: 'underline',
};

const modalOverlay = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
};

const modalBox = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '12px',
  textAlign: 'center',
  width: '90%',
  maxWidth: '400px',
  color: '#000',
  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
};

const inputStyle = {
  padding: '0.6rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginTop: '1rem',
  marginBottom: '1rem',
  width: '80%',
};