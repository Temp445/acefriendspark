'use client'

import React from 'react';
import { motion } from 'framer-motion';
import SingleBed from '@/assets/Rooms/SingleBedRoom.jpg'
import DoubleBed from '@/assets/Rooms/DoubleBedRoom.jpg'
import CommonHall from '@/assets/Rooms/PartyHall.jpeg'
import Image from 'next/image';
import Link from 'next/link';
import { easeOut } from "framer-motion";

const RoomSection = () => {
  const rooms = [
    {
      id: 2,
      title: 'Luxury Suite',
      description:
        'Step into our Luxury Suite and feel right at home. Spacious and elegantly designed, it combines comfort and style with a warm, inviting atmosphere — perfect for families or guests seeking a relaxing, memorable stay.',
      image: DoubleBed, 
      darkBg: true,
    },
    {
      id: 2,
      title: 'Common Hall',
      description:
        'A perfect space for gatherings, parties, and family events. The hall offers comfort, ample seating, and a warm ambiance for memorable moments.',
      image: CommonHall,
      darkBg: false,
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: easeOut }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: easeOut }
    }
  };

  return (
    <div className="w-full bg-white py-5 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h3 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          className="text-3xl md:text-5xl 2xl:text-6xl font-serif text-center mb-5 md:mb-16 text-gray-800"
        >
          Featured <span className='text-[#D46A37]'>Rooms</span>
        </motion.h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
            className="relative h-96 lg:h-auto lg:row-span-2 overflow-hidden group hidden lg:block"
          >
            <div className="absolute inset-0 bg-black/10 z-10"></div>
            <Image
              src={SingleBed}
              alt="Single Bed"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={scaleIn}
            className="relative h-96 overflow-hidden group"
          >
            <Image
              src={rooms[0].image}
              alt={rooms[0].title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="bg-gray-50 p-8 flex flex-col justify-center items-center text-center"
          >
            <h2 className="text-3xl sm:text-5xl font-serif mb-6 text-gray-800">{rooms[0].title}</h2>
            <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
              {rooms[0].description}
            </p>
            <div className="flex items-center gap-6">
              <Link href='/contact' className="bg-black text-white px-8 py-2 hover:bg-gray-800 transition-all duration-300 font-medium">
                BOOK NOW
              </Link>
            </div>
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
              className="bg-white hover:bg-black/90 hover:text-white group transition-all duration-500 p-3 md:px-4 flex flex-col justify-center items-center text-center order-2 lg:order-1"
            >
              <h2 className="text-3xl lg:text-5xl font-serif mb-6 text-gray-800 group-hover:text-white">
                {rooms[1].title}
              </h2>
              <p className="text-gray-500 mb-8 max-w-md leading-relaxed group-hover:text-gray-100">
                {rooms[1].description}
              </p>
              <div className="flex items-center gap-6">
                <Link href='/contact' className="bg-black text-white px-8 py-2 hover:bg-gray-800 transition-all duration-300 font-medium group-hover:border">
                  BOOK NOW
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={scaleIn}
              className="relative h-96 overflow-hidden group order-1 lg:order-2"
            >
              <Image
                src={rooms[1].image}
                alt={rooms[1].title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSection;