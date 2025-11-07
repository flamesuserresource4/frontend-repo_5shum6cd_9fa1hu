import React, { useEffect, useState } from 'react';
import { Search, ShoppingCart, User, ChevronDown, Moon, Sun } from 'lucide-react';

const categories = [
  {
    title: 'Women',
    items: ['Cat-Eye', 'Oversized', 'Round', 'Square', 'Aviator'],
  },
  {
    title: 'Men',
    items: ['Wayfarer', 'Rectangle', 'Round', 'Clubmaster', 'Aviator'],
  },
  {
    title: 'Collections',
    items: ['New Arrivals', 'Best Sellers', 'Limited Edition', 'Blue Light'],
  },
  {
    title: 'Accessories',
    items: ['Lens Cloths', 'Cases', 'Chains', 'Travel Kits'],
  },
];

export default function Navbar({ dark, onToggleDark }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-900/60 border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Left: Brand */}
          <div className="flex items-center gap-6">
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Open menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${mobileOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            <a href="#" className="text-2xl font-serif tracking-wide">
              <span className="text-neutral-900 dark:text-white">Spec</span>
              <span className="text-[var(--accent-color,#FFD700)]">smart</span>
            </a>
            <nav className="hidden md:flex items-center gap-6">
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white"
                  aria-haspopup="true"
                  aria-expanded={open}
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                  onClick={() => setOpen((v) => !v)}
                >
                  Shop
                  <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                {open && (
                  <div
                    className="absolute left-0 mt-3 w-[720px] rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-xl p-6 grid grid-cols-4 gap-6"
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    role="menu"
                  >
                    {categories.map((col) => (
                      <div key={col.title}>
                        <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">{col.title}</h3>
                        <ul className="space-y-2">
                          {col.items.map((i) => (
                            <li key={i}>
                              <a href="#collections" className="text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white">
                                {i}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <a href="#customize" className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white">Customize</a>
              <a href="#best" className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white">Best Sellers</a>
              <a href="#new" className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white">New Arrivals</a>
            </nav>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative w-full">
              <input
                id="search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search frames, lenses, collections"
                className="w-full rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 px-4 py-2.5 pl-10 pr-4 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color,#FFD700)] text-neutral-900 dark:text-neutral-100"
                aria-label="Search"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleDark}
              className="inline-flex items-center justify-center rounded-full p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button className="hidden sm:inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <User className="h-4 w-4" />
              <span>Account</span>
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4">
            <div className="mb-3">
              <label htmlFor="msearch" className="sr-only">Search</label>
              <div className="relative">
                <input
                  id="msearch"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search frames, lenses, collections"
                  className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 px-3 py-2 pl-10 text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color,#FFD700)] text-neutral-900 dark:text-neutral-100"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Shop', 'Customize', 'Best Sellers', 'New Arrivals', 'Accessories'].map((item) => (
                <a key={item} href="#" className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-3 text-sm text-center hover:bg-neutral-100 dark:hover:bg-neutral-800">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
