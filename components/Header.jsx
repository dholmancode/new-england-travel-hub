import { useState } from 'react';
import Link from 'next/link';

export default function Header({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`w-full sticky top-0 z-50 border-b ${
        darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <img
            src={darkMode ? '/images/logo_DarkMode.png' : '/images/logo_LightMode.png'}
            alt="Explore New England"
            className="h-20 w-auto sm:h-12 md:h-30"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 font-medium">
          <Link
            href="/states"
            className={`transition hover:text-blue-500 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            States
          </Link>
          <Link
            href="/destinations"
            className={`transition hover:text-blue-500 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            Destinations
          </Link>
        </nav>

        {/* DARK MODE TOGGLE */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className={`px-3 py-1 border rounded-lg text-sm transition
              ${darkMode ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="space-y-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-6 h-0.5 transition-colors ${
                  darkMode ? 'bg-white' : 'bg-black'
                }`}
              />
            ))}
          </div>
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div
          className={`md:hidden border-t px-6 py-4 space-y-4 transition-colors ${
            darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
          }`}
        >
          <Link href="/states" onClick={() => setMenuOpen(false)}>
            States
          </Link>
          <Link href="/destinations" onClick={() => setMenuOpen(false)}>
            Destinations
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <button
            onClick={toggleDarkMode}
            className={`w-full px-3 py-2 border rounded-lg transition
              ${darkMode ? 'border-gray-600 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      )}
    </header>
  );
}
