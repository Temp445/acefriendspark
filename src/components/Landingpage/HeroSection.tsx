'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, School, MapPin } from 'lucide-react';
import BookingForm from './BookingForm';
import Image from 'next/image';
import img1 from '@/assets/Rooms/DoubleBedRoom.jpg'
import img2 from '@/assets/Rooms/PartyHall.jpeg'
import img3 from '@/assets/Hotel/Hotel6.png'
import img4 from '@/assets/Hotel/Hotel3.jpg'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { easeInOut } from "framer-motion";

const HeroSection = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [img1,img4, img2, img3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: easeInOut
      }
    }
  };

  return (
    <div className="relative h-fit w-full bg-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20 z-10" />
        
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={img}
              alt={`Hotel view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.2 }}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className='container mx-auto relative mt-20'>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='absolute z-50 right-2 xl:right-24 bottom-16 hidden xl:block'
        >
          <BookingForm/>
        </motion.div>

        <div className="relative z-30 h-full flex flex-col">

          <div className="flex-1 flex items-center px-4 lg:px-8 xl:px-16">
            <motion.div 
              className="max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <Link href='https://www.google.com/maps?ll=12.582353,78.644735&z=17&t=m&hl=en&gl=US&mapclient=embed&cid=4711048804847407703' target="_blank" rel="noopener noreferrer" >
              <motion.div 
                className="inline-block mb-6 mt-5"
                variants={itemVariants}
              >
                <motion.div 
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/30 px-5 py-2 rounded-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                  <span className="text-white text-sm font-medium tracking-wide">Yelagiri Hills</span>
                </motion.div>
              </motion.div>
              </Link>
                
              <motion.h1 
                className="text-5xl md:text-7xl 2xl:text-8xl font-serif text-white leading-[1.1] mb-6"
                variants={itemVariants}
              >
                Stay in Comfort 
              </motion.h1>

              <motion.h2 
                className="text-3xl md:text-5xl font-serif italic text-white/95 leading-[1.1] mb-10"
                variants={itemVariants}
              >
                at Ace Friends Park
              </motion.h2>

              <motion.div 
                className="w-32 h-[2px] bg-gradient-to-r from-white via-white/80 to-transparent mb-10"
                variants={itemVariants}
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 1, delay: 1 }}
              />

              <motion.p 
                className="hidden lg:flex text-xl md:text-2xl text-white font-light max-w-xl 2xl:max-w-2xl mb-12 leading-relaxed"
                variants={itemVariants}
              >
                Stay close to nature and enjoy the natural beauty of Yelagiri hills with your friends and family.
              </motion.p>

              <motion.div 
                className="flex flex-wrap gap-6 mb-16"
                variants={itemVariants}
              >
                <Link href='/contact'>
                  <motion.div
                    className="group relative px-5 md:px-10 py-2 bg-white text-black hover:text-white font-semibold overflow-hidden transition-all rounded-lg"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 flex items-center justify-center py-2 md:py-3 gap-3">
                      BOOK NOW
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className={`absolute inset-0 bg-[#D46A37] transition-transform duration-500 ${isHovered ? 'translate-x-0' : '-translate-x-full'}`} />
                  </motion.div>
                </Link>
                
                <Link href='/gallery' className="hidden md:block">
                  <motion.div
                    className="group flex items-center text-xl gap-4 px-10 py-2 border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <School className="w-8 h-8 ml-1" />
                    </div>
                    Hotel Gallery
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;