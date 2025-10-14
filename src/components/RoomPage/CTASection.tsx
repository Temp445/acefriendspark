
import Link from 'next/link';
import React from 'react';
import ctaImage from '@/assets/Hotel/Hotel7.png';
import Image from 'next/image';

const CTASection = () => {
  return (
    <div className="relative py-24 bg-gradient-to-r from-[#FDEBD0] to-[#FAD7A0]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Celebrate Life, Make It Fun!
          </h2>
          <p className="md:text-lg lg:text-xl text-gray-800 mb-8">
            Gather your friends and family for laughter and unforgettable moments. We help you plan parties, fun activities, and musical events to make every celebration special.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-[#D46A37] text-white rounded-2xl font-bold text-lg hover:bg-[#B04C2B] transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            Book Your Stay
          </Link>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end relative">
          <div className="w-full  relative">
            <Image
              src={ctaImage}
              alt="Celebration Fun"
              className="rounded shadow-2xl object-cover"
            />
            <div className="absolute -top-6 -left-6 w-20 h-2 bg-black rounded "></div>
            <div className="absolute -bottom-6 -right-6 w-24 h-2 bg-black rounded "></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CTASection;
