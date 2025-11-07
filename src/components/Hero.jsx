import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/70 dark:to-neutral-950/80 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center py-12 sm:py-16 lg:py-24">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 dark:text-white"
            >
              Personalized eyewear crafted for your world.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-neutral-600 dark:text-neutral-300 text-base sm:text-lg max-w-xl"
            >
              Discover frames tailored to your features, lenses optimized for your lifestyle, and a seamless luxury experience from try-on to delivery.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex items-center gap-3"
            >
              <a href="#customize" className="inline-flex items-center rounded-full bg-[var(--accent-color,#FFD700)] text-neutral-900 px-6 py-3 font-semibold hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-color,#FFD700)]">Customize Now</a>
              <a href="#collections" className="inline-flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 px-6 py-3 font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800">Explore Collections</a>
            </motion.div>
          </div>

          <div className="relative h-[360px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-full object-cover"
              src="https://cdn.coverr.co/videos/coverr-a-young-woman-wearing-glasses-0951/1080p.mp4"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Specsmart lifestyle video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
