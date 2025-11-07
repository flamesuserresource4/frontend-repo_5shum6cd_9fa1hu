import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: 'Ava R.',
    text: 'Impeccable quality and the customization options are brilliant. The try-on gave me confidence to purchase.',
    rating: 5,
  },
  {
    name: 'Daniel K.',
    text: 'Sleek design, super comfortable. The blue light lenses are a game changer for my screen time.',
    rating: 5,
  },
  {
    name: 'Mina S.',
    text: 'Packaging felt premium and the checkout was smooth. Arrived earlier than expected.',
    rating: 4,
  },
];

export default function Reviews() {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 dark:text-white mb-8">Customer Reviews</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6">
              <div className="flex items-center gap-1" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'text-[var(--accent-color,#FFD700)] fill-[var(--accent-color,#FFD700)]' : 'text-neutral-400'}`} />
                ))}
              </div>
              <p className="mt-3 text-neutral-700 dark:text-neutral-300 text-sm">{r.text}</p>
              <div className="mt-4 text-sm font-medium text-neutral-900 dark:text-white">{r.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
