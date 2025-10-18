
import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const AboutCTA = () => {
  return (
    <section className="py-24 bg-[#D46A37] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-white">
          Your Perfect Getaway Awaits
        </h2>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Escape to the hills of Yelagiri and create unforgettable memories with your loved ones at ACE Friends Park.
        </p>

        <Link href='/contact' className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          Reserve Your Room
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>

      </div>
    </section>
  );
};

export default AboutCTA;