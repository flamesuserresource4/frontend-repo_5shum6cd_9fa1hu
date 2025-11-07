import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, X } from 'lucide-react';

const frameOptions = [
  { id: 'classic', name: 'Classic Round', base: 120, image: 'https://images.unsplash.com/photo-1626624340240-aadc087844fa?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwUm91bmR8ZW58MHwwfHx8MTc2MjUyMDA4NHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 'square', name: 'Modern Square', base: 140, image: 'https://images.unsplash.com/photo-1626624340240-aadc087844fa?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwUm91bmR8ZW58MHwwfHx8MTc2MjUyMDA4NHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
  { id: 'aviator', name: 'Aviator', base: 160, image: 'https://images.unsplash.com/photo-1626624340240-aadc087844fa?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxDbGFzc2ljJTIwUm91bmR8ZW58MHwwfHx8MTc2MjUyMDA4NHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80' },
];

const lensOptions = [
  { id: 'standard', name: 'Standard CR-39', price: 0 },
  { id: 'blue', name: 'Blue Light Filter', price: 40 },
  { id: 'photo', name: 'Photochromic', price: 70 },
  { id: 'ultra', name: 'Ultra Thin (1.67)', price: 120 },
];

export default function Configurator() {
  const [frame, setFrame] = useState(frameOptions[0]);
  const [lens, setLens] = useState(lensOptions[0]);
  const [engraving, setEngraving] = useState('');
  const [pd, setPd] = useState(62);
  const [tryOn, setTryOn] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const price = useMemo(() => frame.base + lens.price + (engraving ? 15 : 0), [frame, lens, engraving]);

  useEffect(() => {
    let mounted = true;
    async function start() {
      if (!tryOn) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
        if (!mounted) return;
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => {});
        }
      } catch (err) {
        console.error('Camera access denied', err);
      }
    }
    start();
    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [tryOn]);

  return (
    <section id="customize" className="py-12 sm:py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white">Customize Your Specs</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Real-time pricing as you build</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <img src={frame.image} alt={frame.name} className="w-full h-80 object-cover" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Frame Style</h3>
              <div className="mt-4 grid sm:grid-cols-3 gap-3">
                {frameOptions.map((f) => (
                  <button
                    key={f.id}
                    className={`rounded-xl border px-4 py-3 text-sm text-left transition ${
                      frame.id === f.id
                        ? 'border-[var(--accent-color,#FFD700)] bg-[var(--accent-color,#FFD700)]/10'
                        : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                    onClick={() => setFrame(f)}
                  >
                    <div className="font-medium text-neutral-900 dark:text-white">{f.name}</div>
                    <div className="text-neutral-600 dark:text-neutral-400">${f.base}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6">
            <div>
              <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Lens Type</label>
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                {lensOptions.map((l) => (
                  <button
                    key={l.id}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      lens.id === l.id
                        ? 'border-[var(--accent-color,#FFD700)] bg-[var(--accent-color,#FFD700)]/10'
                        : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                    }`}
                    onClick={() => setLens(l)}
                  >
                    <div className="font-medium text-neutral-900 dark:text-white">{l.name}</div>
                    <div className="text-neutral-600 dark:text-neutral-400">{l.price ? `+ $${l.price}` : 'Included'}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="engraving" className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Engraving (optional)</label>
              <input
                id="engraving"
                type="text"
                value={engraving}
                onChange={(e) => setEngraving(e.target.value.slice(0, 15))}
                placeholder="Your initials"
                className="mt-2 w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent-color,#FFD700)]"
                aria-describedby="engraving-help"
              />
              <p id="engraving-help" className="mt-1 text-xs text-neutral-500">Max 15 characters • +$15</p>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Pupillary Distance (PD)</label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="range"
                  min={54}
                  max={72}
                  value={pd}
                  onChange={(e) => setPd(parseInt(e.target.value))}
                  className="w-full"
                  aria-label="Pupillary distance"
                />
                <span className="text-sm text-neutral-700 dark:text-neutral-300 w-10">{pd}mm</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setTryOn(true)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <Camera className="h-4 w-4" /> Virtual Try-On
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center justify-between"
            >
              <div>
                <p className="text-sm text-neutral-500">Estimated total</p>
                <p className="text-2xl font-semibold text-neutral-900 dark:text-white">${price}</p>
              </div>
              <button className="inline-flex items-center rounded-full bg-[var(--accent-color,#FFD700)] text-neutral-900 px-6 py-3 font-semibold hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color,#FFD700)]">
                Add to Cart
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {tryOn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" role="dialog" aria-modal="true" aria-label="Virtual Try-On">
          <div className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800">
            <button
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900/80 hover:bg-neutral-800"
              aria-label="Close try-on"
              onClick={() => setTryOn(false)}
            >
              <X className="h-5 w-5 text-white" />
            </button>
            <div className="relative aspect-video">
              <video ref={videoRef} className="h-full w-full object-cover" playsInline muted />
              {/* Simple overlay representing glasses for demo */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-16 rounded-full border-2 border-[var(--accent-color,#FFD700)]/80" aria-hidden="true" />
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="text-sm text-neutral-300">Move closer and center your face to preview fit.</div>
              <button
                onClick={() => setTryOn(false)}
                className="inline-flex items-center rounded-full bg-[var(--accent-color,#FFD700)] text-neutral-900 px-4 py-2 text-sm font-semibold"
              >
                Looks Good
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
