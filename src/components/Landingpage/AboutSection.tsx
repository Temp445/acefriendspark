"use client";

import Image from "next/image";
import Hotel from "@/assets/Hotel/Hotel.jpg";
import Hotel2 from "@/assets/Hotel/Hotel2.png";
import { Handshake } from "lucide-react";
import { GiBed } from "react-icons/gi";
import Link from "next/link";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: easeOut,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };

  return (
    <section className="py-20 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 xl:px-12">
        <div className="grid lg:grid-cols-2 gap-5 xl:gap-12 items-center">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={itemVariants}
              className="bg-white shadow-md rounded-md p-8 text-center flex flex-col items-center justify-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <GiBed className="text-[#D46A37] w-12 h-12 mb-4" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Comfortable Stays
              </h3>
              <p className="text-gray-500 text-sm">
                Experience true comfort and warmth — every room at ACE Friends
                Park is designed to make you feel right at home.
              </p>
            </motion.div>

            <motion.div
              variants={imageVariants}
              className="rounded-md overflow-hidden border-2 border-[#D46A37]"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <Image
                src={Hotel2}
                alt="Hotel View"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={imageVariants}
              className="hidden md:block rounded-md overflow-hidden border-2 border-[#D46A37]"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <Image
                src={Hotel}
                alt="Hotel view"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white shadow-md rounded-md p-8 text-center flex flex-col items-center justify-center"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Handshake className="text-[#D46A37] w-12 h-12 mb-4" />
              </motion.div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                Friendly Service
              </h3>
              <p className="text-gray-500 text-sm">
                Enjoy warm service, exclusive offers, and a stay filled with
                memorable experiences at Yelagiri's favorite getaway.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={textVariants}
          >
            <motion.p
              className="text-[#D46A37] uppercase text-sm tracking-widest font-semibold mb-2"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About Us
            </motion.p>
            <motion.h2
              className="text-2xl md:text-4xl xl:text-5xl font-serif text-gray-800 leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Welcome to ACE Friends Park, Yelagiri's Best Resort
            </motion.h2>
            <motion.p
              className="text-gray-600 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              When you're on a vacation with your family or friends, your place
              of stay should feel like home. At{" "}
              <strong>ACE Friends Park</strong>, we make that happen — blending
              peaceful surroundings with modern comfort to create the perfect
              retreat in the heart of Yelagiri.
            </motion.p>
            <motion.p
              className="text-gray-600 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Nestled in the serene village of Manjankollaipudur, our resort
              offers a tranquil atmosphere, scenic beauty, and the finest
              hospitality. Whether you're seeking relaxation or adventure, we
              ensure every moment of your stay is worth your time and memories.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-[#D46A37] text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-[#c55f2f] transition duration-300"
              >
                Book Your Stay
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;