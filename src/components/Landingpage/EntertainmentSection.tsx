'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Gallery {
  _id: string;
  name: string;
  category: string;
  image: string;
}

const EntertainmentSection = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Fetch galleries from API and filter for 'games' category
  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        const games = data.data.filter((item: Gallery) => item.category.toLowerCase() === 'games');
        setGalleries(games);
      } else {
        console.error('Failed to load gallery items');
      }
    } catch (error) {
      console.error('Error fetching gallery items', error);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  useEffect(() => {
    if (isPaused || !isAutoPlaying || galleries.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIdx = Math.max(0, galleries.length - cardsPerView);
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, cardsPerView, isAutoPlaying, galleries]);

  const maxIndex = Math.max(0, galleries.length - cardsPerView);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const handlePrev = () => scrollToIndex(currentIndex - 1);
  const handleNext = () => scrollToIndex(currentIndex + 1);

  return (
    <section className="py-20 bg-[#f8f8f8] relative overflow-hidden" id="gallery">
      <div className="container mx-auto px-4 md:px-14 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="bg-white text-gray-800 border px-6 py-2 rounded-full text-sm font-semibold tracking-wider shadow-lg inline-block mb-4">
            Games & Laughs
          </span>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-4">
            Fun & <span className="text-[#D46A37]">Play Zone</span>
          </h2>

          <p className="text-gray-600 text-base md:text-lg mt-4 max-w-3xl mx-auto leading-relaxed">
            Unwind and enjoy! Our hotel offers a variety of indoor games and activities to keep every guest entertained.
          </p>
        </motion.div>

        <div className="relative">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white shadow-2xl text-[#D46A37] p-4 rounded-full hover:bg-[#D46A37] hover:text-white transition-all disabled:opacity-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white shadow-2xl text-[#D46A37] p-4 rounded-full hover:bg-[#D46A37] hover:text-white transition-all disabled:opacity-30"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            className="overflow-hidden"
            ref={carouselRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              className="flex gap-4"
              animate={{ x: `-${currentIndex * (100 / cardsPerView)}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {galleries.map((gallery) => (
                <motion.div
                  key={gallery._id}
                  className="relative overflow-hidden rounded-3xl shadow-xl flex-shrink-0 cursor-pointer group"
                  style={{
                    width: `calc(${100 / cardsPerView}% - ${(cardsPerView - 1) * 16 / cardsPerView}px)`,
                    height: '400px',
                  }}
                  whileHover={{ y: -6 }}
                >
                  <img
                    src={gallery.image}
                    alt={gallery.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    width={400}
                    height={400}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
                    <h3 className="text-white text-2xl font-semibold tracking-wide drop-shadow-lg">
                      {gallery.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center items-center gap-3 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  scrollToIndex(index);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? 'bg-[#D46A37] w-8' : 'bg-gray-300 w-2 hover:bg-[#D46A37]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EntertainmentSection;
