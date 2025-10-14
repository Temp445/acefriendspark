'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail,MoveRight} from 'lucide-react';
import Link from 'next/link';

const LocationSection = () => {
  return (
    <section className="py-10 bg-gradient-to-b from-white via-orange-50 to-white overflow-hidden" id="location">
  

      <div className="container mx-auto px-4 md:px-6 xl:px-16 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
    
          <h2 className="text-3xl md:text-5xl lg:text-6xl  font-serif text-gray-900 mb-4">
            Our <span className='bg-[#D46A37] bg-clip-text text-transparent'>Location</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg mt-4 max-w-3xl mx-auto">
            Nestled in the scenic Yelagiri Hills, discover the perfect retreat for your next getaway.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-5 items-stretch max-w-7xl mx-auto">
          <motion.div
            className="w-full lg:w-2/3 h-[300px] md:h-[500px] rounded-2xl overflow-hidden relative group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3893.9879756295036!2d78.643346!3d12.583044!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3badaabd9f53e4cd%3A0x416101ed84755257!2sAce%20Friends%20Park!5e0!3m2!1sen!2sus!4v1759818480236!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            
          </motion.div>

          <motion.div
            className="w-full lg:w-1/3 bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl p-8 xl:p-10 border border-orange-100 hover:shadow-2xl transition-all duration-300 flex flex-col"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-3xl font-serif text-gray-900 mb-2">Ace Friends Park</h3>
              <div className="w-16 h-1 bg-[#D46A37] rounded-full" />
            </div>

            <div className="space-y-6 mb-8 flex-grow">
              <motion.div 
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#D46A37] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                  <MapPin className="text-white w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#D46A37] mb-1 uppercase tracking-wider">Address</p>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    Manjampudukollai, Athanavur, Yelagiri Hills, Tamil Nadu, India – 635853
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#D46A37] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                  <Phone className="text-white w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#D46A37] mb-1 uppercase tracking-wider">Phone</p>
                  <p className="text-gray-700 font-semibold text-sm">
                    +91 9710946813 / +91 9710946816
                  </p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#D46A37] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                  <Mail className="text-white w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-[#D46A37] mb-1 uppercase tracking-wider">Email</p>
                  <a href="mailto:info@acefriendspark.com" className="text-gray-700 hover:text-[#D46A37] transition-colors font-semibold break-all text-sm">
                    info@acefriendspark.com
                  </a> <br />
                  <a href="mailto:marketing@acefriendspark.com" className="text-gray-700 hover:text-[#D46A37] transition-colors font-semibold break-all text-sm">
                    marketing@acefriendspark.com
                  </a> <br />
                  <a href="mailto:sales@acefriendspark.com" className="text-gray-700 hover:text-[#D46A37] transition-colors font-semibold break-all text-sm">
                    sales@acefriendspark.com
                  </a>
                </div>
              </motion.div>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6" />

            <div className="space-y-3">
                <Link
                href="/contact"
                className="relative w-full text-center  inline-flex items-center gap-2 bg-[#D46A37] text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all overflow-hidden"
              >
                <span className="flex items-center mx-auto gap-2 z-10">
                  Book Your Stay
                  <MoveRight />
                </span>
            </Link>

            </div>

            <div className="absolute top-4 right-4 w-20 h-20 bg-[#D46A37] rounded-full opacity-5 blur-2xl pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;