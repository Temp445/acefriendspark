
import React from 'react';
import img from '@/assets/Rooms/DoubleBedRoom.jpg';
import Link from 'next/link';

const OfferBanner = () => {
  return (
    <div className="relative h-96 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img.src})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, transparent, transparent 10px, #D46A37 10px, #D46A37 11px)',
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 h-full px-4 flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6">
        <div className="text-center lg:text-left">
          <p className="text-[#D46A37] text-sm font-semibold tracking-widest uppercase mb-4">
            Your Serene Home Away From Home
          </p>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-serif text-white mb-2 leading-tight">
           A Perfect Blend of Comfort, Luxury, and Relaxation
          </h2>
         
        </div>

        <div className="flex-shrink-0 mt-4 md:mt-0">
          <Link href='/contact' className="bg-[#D46A37] hover:bg-[#C55A27] rounded text-white px-12 py-4 font-semibold tracking-widest uppercase text-sm transition-all duration-300 hover:shadow-xl hover:scale-105">
            Book Your Stay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
