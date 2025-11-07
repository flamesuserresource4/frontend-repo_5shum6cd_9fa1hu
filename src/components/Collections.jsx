import React from 'react';
import { motion } from 'framer-motion';

const collections = [
  {
    id: 'new',
    title: 'New Arrivals',
    image: 'https://images.unsplash.com/photo-1749251891239-972cd3f3f935?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxOZXclMjBBcnJpdmFsc3xlbnwwfDB8fHwxNzYyNTIwMDgzfDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    cta: 'Shop New',
  },
  {
    id: 'best',
    title: 'Best Sellers',
    image: 'https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=1600&auto=format&fit=crop',
    cta: 'Shop Best',
  },
  {
    id: 'customize',
    title: 'Customize Your Specs',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=1600&auto=format&fit=crop',
    cta: 'Start Customizing',
  },
];

export default function Collections() {
  return (
    <section id="collections" className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex items-end justify-between mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white">Curated Collections</h2>
          <a href="#" className="text-sm font-medium text-[var(--accent-color,#FFD700)] hover:underline">View all</a>
        </header>
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col, idx) => (
            <motion.a
              key={col.id}
              href={`#${col.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-color,#FFD700)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <img src={col.image} alt={col.title} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="text-white text-xl font-semibold">{col.title}</h3>
                <span className="inline-flex text-sm mt-2 text-white/90 group-hover:underline">{col.cta}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
