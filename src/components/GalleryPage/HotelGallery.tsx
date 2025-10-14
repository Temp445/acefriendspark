"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Bg from "@/assets/Rooms/Dining.png"

interface Gallery {
  _id: string;
  name: string;
  category: string;
  image: string;
}

const HotelGallery = () => {
  const [displayImages, setDisplayImages] = useState<Gallery[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const fetchGalleries = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success) {

        const hotelImages = data.data.filter((item: Gallery) => item.category === "hotel");
        const roomImages = data.data.filter((item: Gallery) => item.category === "rooms");
        const hallImages = data.data.filter((item: Gallery) => item.category === "hall");

        setDisplayImages([...hotelImages,...roomImages, ...hallImages] );
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

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setZoomLevel(1);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setZoomLevel(1);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedIndex === null) return;
    if (direction === "prev") {
      setSelectedIndex((prev) =>
        prev! > 0 ? prev! - 1 : displayImages.length - 1
      );
    } else {
      setSelectedIndex((prev) =>
        prev! < displayImages.length - 1 ? prev! + 1 : 0
      );
    }
    setZoomLevel(1);
  };

  const selectedImageData =
    selectedIndex !== null ? displayImages[selectedIndex] : null;

  return (
    <div className="min-h-screen">
      <div className="relative h-fit py-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={Bg}
            alt="Bg"
            className="w-full h-full object-cover"
            width={1200}
            height={600}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 z-10">
          <div className="mb-6 inline-block px-6 py-2 border border-white/30 rounded-full backdrop-blur-sm">
            <span className="text-white/90 text-sm font-light tracking-widest uppercase">
              Experience Luxury
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
            Gallery
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl">
            Unwind in the beauty and grace of our property.
          </p>
        </div>
      </div>

      <div className="px-4 xl:px-10 pt-8 container mx-auto">
        <h2 className="text-3xl md:text-5xl font-serif text-gray-900 mb-4">
          Our <span className="text-[#D46A37]">Spaces</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent rounded"></div>
      </div>

      {displayImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px] px-4 xl:px-10 mt-10 container mx-auto">
          {displayImages.map((gallery, index) => (
            <div
              key={gallery._id}
              className={`relative cursor-pointer group overflow-hidden rounded-lg ${
                index === 0 ? "sm:col-span-2 sm:row-span-2" : ""
              } ${index === 4 ? "lg:row-span-2" : ""}`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={gallery.image}
                alt={gallery.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-end p-4"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 py-20">Loading gallery...</p>
      )}

      {selectedImageData && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/50 to-transparent z-20">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="text-white text-sm font-light">
                {selectedIndex! + 1} / {displayImages.length}
              </div>
              <button
                onClick={closeLightbox}
                className="text-white hover:text-white/70 transition-colors ml-10 mt-12 p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            className="absolute left-8 text-white hover:text-white/70 transition-all z-20 p-4 hover:bg-white/10 rounded-full backdrop-blur-sm"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            className="absolute right-8 text-white hover:text-white/70 transition-all z-20 p-4 hover:bg-white/10 rounded-full backdrop-blur-sm"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div
            className="max-w-6xl max-h-[80vh] mx-4 mt-5 overflow-hidden flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImageData.image}
              alt={selectedImageData.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300 rounded-lg"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center center",
              }}
            />
          </div>
        </div>
      )}

      <div className="px-4 md:px-20 mb-20">
        <div className="container mx-auto max-w-7xl mt-20 relative bg-[#D46A37] rounded-3xl p-12 md:p-20 text-white overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h3 className="text-3xl md:text-5xl font-bold mb-6">
              Your Dream Stay Awaits
            </h3>
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Escape to luxury and comfort with our exclusive resort experience.
              Every moment here is crafted to create memories you'll cherish
              forever.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="px-10 py-4 font-bold rounded-full bg-white text-[#D46A37] shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
              >
                Reserve Your Room
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelGallery;
