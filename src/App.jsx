import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import Configurator from './components/Configurator';
import Reviews from './components/Reviews';

export default function App() {
  const [dark, setDark] = useState(false);
  const [accent, setAccent] = useState('#FFD700');

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDark(mq.matches);
    const listener = (e) => setDark(e.matches);
    mq.addEventListener('change', listener);
    return () => mq.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.setProperty('--accent-color', accent);
  }, [dark, accent]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <Navbar dark={dark} onToggleDark={() => setDark((d) => !d)} />

      {/* Accent toggle */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4">
        <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
          <span>Accent:</span>
          <button
            onClick={() => setAccent('#FFD700')}
            className={`h-6 w-6 rounded-full border ${accent === '#FFD700' ? 'ring-2 ring-offset-2 ring-[#FFD700]' : ''}`}
            style={{ backgroundColor: '#FFD700' }}
            aria-label="Use gold accent"
          />
          <button
            onClick={() => setAccent('#285943')}
            className={`h-6 w-6 rounded-full border ${accent === '#285943' ? 'ring-2 ring-offset-2 ring-[#285943]' : ''}`}
            style={{ backgroundColor: '#285943' }}
            aria-label="Use emerald accent"
          />
        </div>
      </div>

      <main>
        <Hero />
        <Collections />
        <Configurator />
        <Reviews />
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 mt-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">© {new Date().getFullYear()} Specsmart. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">TikTok</a>
            <a href="#" className="hover:underline">Facebook</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
