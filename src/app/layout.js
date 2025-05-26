import './globals.css';

export const metadata = {
  title: 'Milking Tracker',
  description: 'Track milking sessions with relaxing music',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif' }}>{children}</body>
    </html>
  );
}