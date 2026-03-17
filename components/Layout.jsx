//Layout.jsx

import { useState, useEffect } from 'react';
import Header from './Header';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted) return;
    const stored = localStorage.getItem('darkMode') === 'true';
    setDarkMode(stored);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode, mounted]);

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}
    >
      {/* Pass darkMode to Header */}
      <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <main className="flex-grow">{children}</main>

<footer
  className="py-6 text-center mt-16"
  style={{ backgroundColor: 'var(--primary-color)', color: darkMode ? '#fff' : '#111827' }}
>
  <p className="text-sm opacity-90">
    Designed + Developed by{' '}
    <a
      href="https://dannyholmanmedia.com"
      target="_blank"
      rel="noopener noreferrer"
      className="underline hover:opacity-80 transition"
    >
      Danny Holman
    </a>
  </p>
</footer>
    </div>
  );
}
