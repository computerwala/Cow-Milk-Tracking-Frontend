'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function History() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/sessions')
      .then((res) => res.json())
      .then((data) => setSessions(data));
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
        backgroundImage: 'url("/images/cow1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: '#fff',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          padding: '2rem',
          borderRadius: '12px',
          maxWidth: '1000px',
          margin: '0 auto',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
        }}
      >
        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          📜 Milking History
        </h1>

        <div style={tableContainerStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thTdStyle}>Date</th>
                <th style={thTdStyle}>Start</th>
                <th style={thTdStyle}>End</th>
                <th style={thTdStyle}>Duration (s)</th>
                <th style={thTdStyle}>Milk (L)</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s, i) => (
                <tr key={i}>
                  <td style={thTdStyle}>{new Date(s.created_at).toLocaleDateString()}</td>
                  <td style={thTdStyle}>{new Date(s.start_time).toLocaleTimeString()}</td>
                  <td style={thTdStyle}>{new Date(s.end_time).toLocaleTimeString()}</td>
                  <td style={thTdStyle}>{s.duration}</td>
                  <td style={thTdStyle}>{s.milk_quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/" style={backBtnStyle}>
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

const tableContainerStyle = {
  maxHeight: '400px',
  overflowY: 'auto',
  overflowX: 'auto',
  borderRadius: '8px',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '1rem',
  backgroundColor: '#fff',
  color: '#333',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
};

const thTdStyle = {
  padding: '12px 8px',
  border: '1px solid #ccc',
  textAlign: 'center',
};

const backBtnStyle = {
  display: 'inline-block',
  padding: '10px 20px',
  backgroundColor: '#00bcd4',
  color: '#fff',
  borderRadius: '8px',
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'background 0.3s',
};