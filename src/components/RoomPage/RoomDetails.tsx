"use client";
import React, { useState, useEffect } from "react";
import {
  Bed,
  Wifi,
  UtensilsCrossed,
  Sparkles,
  Mountain,
  Users,
  Music,
  Utensils,
  ShowerHead,
  TvMinimal,
  ChevronLeft,
  ChevronRight,
  Refrigerator,
  Warehouse
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Gallery {
  _id: string;
  name: string;
  category: string;
  image: string; 
}

const RoomDetails = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [currentRoom, setCurrentRoom] = useState(0);
  const [currentHall, setCurrentHall] = useState(0);

  const fetchGalleries = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {
        setGalleries(data.data);
      } else {
        console.error("Failed to load gallery items");
      }
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const roomImages = galleries.filter((item) => item.category === "rooms");
  const hallImages = galleries.filter((item) => item.category === "hall");

  useEffect(() => {
    if (roomImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentRoom((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [roomImages.length]);

  useEffect(() => {
    if (hallImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentHall((prev) => (prev === hallImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [hallImages.length]);

  const nextSlide = () =>
    setCurrentRoom((prev) => (prev === roomImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentRoom((prev) => (prev === 0 ? roomImages.length - 1 : prev - 1));

  const nextHallSlide = () =>
    setCurrentHall((prev) => (prev === hallImages.length - 1 ? 0 : prev + 1));
  const prevHallSlide = () =>
    setCurrentHall((prev) => (prev === 0 ? hallImages.length - 1 : prev - 1));

  const roomFeatures = [
    { icon: Users, text: "Capacity: 6 guests per cottage. Up to 2 extra guests can be added on request for an additional cost." },
    { icon: Mountain, text: "Scenic Valley View" },
    { icon: Bed, text: "Bedroom 1 - Comfortable King-size Bed" },
    { icon: Bed, text: "Bedroom 2 – Two Cozy Medium-size Beds" },
    { icon: ShowerHead, text: "Private Attached Bathroom" },
    { icon: ShowerHead, text: "Additional Common Bathroom" },
    { icon: Refrigerator, text: "Refrigerator" },
    { icon: TvMinimal, text: "LED TV" },
    { icon: Wifi, text: "High-speed Wi-Fi" },
    { icon: UtensilsCrossed, text: "In-room Dining Available" },
    { icon: Sparkles, text: "Daily Cleaning & Housekeeping" },
  ];

  const highlights = [
    { Icon: Bed, title: "Comfortable Bed", desc: "King-size Bed", color: "bg-blue-50 text-blue-600" },
    { Icon: Mountain, title: "Scenic View", desc: "Valley Views", color: "bg-emerald-50 text-emerald-600" },
    { Icon: Wifi, title: "High-Speed Wi-Fi", desc: "Complimentary", color: "bg-purple-50 text-purple-600" },
    { Icon: UtensilsCrossed, title: "In-Room Dining", desc: "24/7 Service", color: "bg-amber-50 text-amber-600" },
  ];

  const partyHallFeatures = [
    { icon: Users, text: "Capacity: 250–300 Guests (Up to 500 Flowable)" },
    { icon: Music, text: "Premium Sound System" },
    { icon: Wifi, text: "Conference & Event Facilities" },
    { icon: UtensilsCrossed, text: "Food & Catering Provided Based on Guest Request" },
  ];

  const partyHighlights = [
    { Icon: Warehouse, title: "Spacious Hall", desc: "Floor Space: 2,500 sq. ft.", color: "bg-rose-50 text-rose-600" },
    { Icon: Utensils, title: "Catering", desc: "Based on Guest Request", color: "bg-orange-50 text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Room Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="lg:sticky lg:top-8 h-fit hidden lg:block">
            <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-xl group">
              <AnimatePresence mode="wait">
                {roomImages[currentRoom] && (
                  <motion.div
                    key={roomImages[currentRoom]._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={roomImages[currentRoom].image}
                      alt={roomImages[currentRoom].name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow">
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {roomImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentRoom(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentRoom === i ? "bg-[#D46A37]" : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-800 mb-3 leading-snug">
                Spacious Cottages for <span className="text-[#D46A37]">Friends & Family</span>
              </h2>
              <div className="flex items-center gap-2 text-slate-600">
                <p className="text-lg sm:text-xl">1201 sq.ft (112 sq.mt)</p>
              </div>
            </div>

            <div className="bg-white rounded p-6 sm:p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#D46A37]" />
                Room Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roomFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className={`flex items-center gap-3 p-3 rounded hover:bg-slate-50 transition-colors group ${index === 0 ? 'sm:col-span-2' : ''}`}>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D46A37]/10 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-[#D46A37]" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <div key={i} className="bg-white rounded p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-slate-800 text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            <Link href="/gallery" className="w-full bg-[#D46A37] text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group">
              View Gallery
            </Link>
          </div>
        </div>

        {/* Party Hall Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-slate-800 mb-3">
                Celebrate in Style at Our <span className="text-[#D46A37]">Party Hall</span>
              </h2>
              <div className="flex items-center w-32 h-1 bg-gray-800"></div>
            </div>

            <div className="bg-white rounded p-6 sm:p-8 shadow-lg">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Warehouse className="w-6 h-6 text-[#D46A37]" />
                Hall Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {partyHallFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D46A37]/10 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-[#D46A37]" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {partyHighlights.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <div key={i} className="bg-white rounded p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-slate-800 text-sm sm:text-base mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-600">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:sticky lg:top-8 h-fit hidden lg:block order-1 lg:order-2">
            <div className="relative h-[350px] sm:h-[450px] lg:h-[550px] rounded-2xl overflow-hidden shadow-xl group">
              <AnimatePresence mode="wait">
                {hallImages[currentHall] && (
                  <motion.div
                    key={hallImages[currentHall]._id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={hallImages[currentHall].image}
                      alt={hallImages[currentHall].name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={prevHallSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextHallSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow">
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {hallImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentHall(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentHall === i ? "bg-[#D46A37]" : "bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
