import React from 'react';
import { Dribbble } from 'lucide-react';
import Bg from '@/assets/Games/Bg.jpg'
import Image from 'next/image';
const HeroSection = () => (
  <div className="relative h-fit py-28 overflow-hidden">
    <Image 
      src={Bg}
      alt="Bg" 
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black opacity-50"></div>
    
    <div className="absolute inset-0 overflow-hidden">
 
      <div className="absolute bottom-10 right-24 opacity-20 animate-bounce text-[#93C5FD]" style={{animationDuration: '4s', animationDelay: '1s'}}>
        <Dribbble size={60} />
      </div>
  
    </div>
    
    <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
      <div className="text-center space-y-6 max-w-5xl">
        <div className="inline-block px-6 py-2 rounded-full text-sm font-bold tracking-wider mb-2 shadow-lg border ">
          FUN FOR THE WHOLE FAMILY
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif py-5 leading-tight">
          Relax, Play & Make Memories
        </h1>
        
        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
          Experience areas designed for play, laughter, and memorable stays.
        </p>
        
      </div>
    </div>
      </div>
);

export default HeroSection;