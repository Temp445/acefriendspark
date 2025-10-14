import React from 'react';
import bg from '@/assets/Hotel/Bg.png'
import Image from 'next/image';
const HeroSection = () => (
  <div className="relative h-screen max-h-[400px] overflow-hidden">
    <Image 
      src={bg} 
      alt="Bg" 
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black opacity-40"></div>
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-center tracking-tight">
        Explore Yelagiri
      </h1>
      <p className="text-xl md:text-xl text-center max-w-lg mb-6 font-light">
        Discover the natural beauty and cultural heritage of this serene hill station
      </p>
      <div className="flex flex-wrap justify-center gap-4 text-lg">
        <span>3,460 ft above sea level</span>
        <span>|</span>
        <span>14 villages</span>
        <span>|</span>
        <span>29 sq km</span>
      </div>
    </div>
  </div>
);

export default HeroSection;
