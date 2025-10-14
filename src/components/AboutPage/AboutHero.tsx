
import React from 'react';
import Image from 'next/image';
import aboutBg from '@/assets/Hotel/Hotel4.png'; 

const AboutHero = () =>  {
  return (
    <section className="relative h-fit py-32 md:py-40 w-full flex flex-col justify-center bg-white overflow-hidden">
      
      <div className="absolute inset-0">
        <Image
          src={aboutBg}
          alt="About background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="hidden lg:block absolute bottom-0 left-0 w-80 h-80 bg-[#D46A37]/50" style={{clipPath: 'polygon(0 100%, 100% 100%, 0 0)'}}></div>
      <div className="hidden lg:block absolute top-0 right-0 w-96 h-96 bg-[#D46A37]/50" style={{clipPath: 'polygon(100% 0, 0 0, 100% 100%)'}}></div>
      
      <div className="relative z-10 max-w-4xl text-center mx-auto px-6 sm:px-24">
        <h1 className="text-4xl sm:text-6xl text-white tracking-normal font-serif">
          About Us
        </h1>
      </div>

    </section>
  );
}

export default  AboutHero