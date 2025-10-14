
import React from 'react';
import Bg from '@/assets/Rooms/DoubleBedRoom.jpg'
import Image from 'next/image';

const HeroSection = () => (
  <section className="relative  sm:h-[60vh] md:h-fit py-32 flex items-center justify-center text-white">
    <div className="absolute inset-0 bg-black/40 z-10" />
    <Image
      src={Bg}
      alt="Bg"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="relative z-20 text-center px-4 sm:px-6">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-wider mb-2 sm:mb-4">
        Nature Comfort Room
      </h1>
      <p className="hidden lg:block text-lg sm:text-xl md:text-2xl font-light">
        Experience Luxury & Comfort
      </p>
    </div>
  </section>
);

export default HeroSection;
