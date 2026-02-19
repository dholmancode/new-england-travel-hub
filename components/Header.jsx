import { useState } from 'react';
import Link from 'next/link';

const NEW_ENGLAND_STATES = [
  { title: 'Massachusetts', slug: 'massachusetts' },
  { title: 'Maine', slug: 'maine' },
  { title: 'New Hampshire', slug: 'new-hampshire' },
  { title: 'Vermont', slug: 'vermont' },
  { title: 'Rhode Island', slug: 'rhode-island' },
];

export default function Header({ darkMode, toggleDarkMode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false); // Dropdown state

  return (
    <header
      className={`w-full sticky top-0 z-50 border-b ${
        darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-32 flex items-center justify-between relative">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <img
            src={darkMode ? '/images/logo_DarkMode.png' : '/images/logo_LightMode.png'}
            alt="Explore New England"
            className="h-20 w-auto sm:h-12 md:h-30"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 font-medium items-center">
          {/* States Dropdown */}
          <div className="relative">
            <button
              onClick={() => setStatesOpen(!statesOpen)}
              className={`transition hover:text-blue-500 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              } flex items-center gap-1`}
            >
              States
              <svg
                className={`w-4 h-4 transform transition-transform ${statesOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {statesOpen && (
              <div
                className={`absolute left-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                }`}
              >
                {NEW_ENGLAND_STATES.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/states/${state.slug}`}
                    className="block px-4 py-2 hover:bg-blue-500 hover:text-white transition-colors"
                    onClick={() => setStatesOpen(false)}
                  >
                    {state.title}
                  </Link>
                ))}
              </div>
            )}
          </div>


          <Link
            href="/destinations"
            className={`transition hover:text-blue-500 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            Destinations
          </Link>
                    {/* Other Links */}
          <Link
            href="/about"
            className={`transition hover:text-blue-500 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          >
            About
          </Link>
        </nav>

        {/* DARK MODE TOGGLE */}
        <div className="hidden md:flex items-center">
          <button
            onClick={toggleDarkMode}
            className={`relative w-20 h-10 flex items-center rounded-full p-1 transition-all duration-500 ease-in-out ${
              darkMode ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          >
            {/* Sliding Knob */}
            <div
              className={`absolute top-1 left-1 w-8 h-8 rounded-full bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
                darkMode ? 'translate-x-10' : 'translate-x-0'
              }`}
              style={{
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={darkMode ? '/images/LightToggle.svg' : '/images/DarkToggle.svg'}
                alt={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-5 h-5 m-1.5"
                style={{ transition: 'all 0.5s ease-in-out' }}
              />
            </div>
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="space-y-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-6 h-0.5 transition-colors ${darkMode ? 'bg-white' : 'bg-black'}`}
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
          {/* States Accordion */}
          <div>
            <button
              onClick={() => setStatesOpen(!statesOpen)}
              className="w-full flex justify-between px-4 py-2 border rounded-lg mb-2"
            >
              States
              <span>{statesOpen ? '▲' : '▼'}</span>
            </button>
            {statesOpen && (
              <div className="pl-4 space-y-1">
                {NEW_ENGLAND_STATES.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/states/${state.slug}`}
                    onClick={() => {
                      setStatesOpen(false);
                      setMenuOpen(false);
                    }}
                    className="block px-2 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    {state.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/destinations" onClick={() => setMenuOpen(false)}>
            Destinations
          </Link>

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`relative w-16 h-8 flex items-center rounded-full p-1 transition-all duration-300 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                darkMode ? 'translate-x-8' : 'translate-x-0'
              }`}
            >
              <img
                src={darkMode ? '/images/LightToggle.svg' : '/images/DarkToggle.svg'}
                alt={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                className="w-4 h-4 m-1"
              />
            </div>
          </button>
        </div>
      )}
    </header>
  );
}
