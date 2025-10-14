'use client';

import React, { useState, useEffect } from 'react';

interface Gallery {
  _id: string;
  name: string;
  category: string;
  image: string;
}

const RoomSection = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) {
        setGalleries(data.data);
      } else {
        console.error('Failed to load gallery items');
      }
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const hallImage = galleries.filter((item) => item.category === 'hall')[0];
  const roomImages = galleries.filter((item) => item.category === 'rooms');

  const firstThreeRooms = roomImages.slice(0, 3);
  const fifthRoom = roomImages[3];

  const displayImages: Gallery[] = [];
  displayImages.push(...firstThreeRooms);
  if (hallImage) displayImages.push(hallImage);
  if (fifthRoom) displayImages.push(fifthRoom);

  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-[#D46A37] font-semibold tracking-widest mb-4">
            Premium Amenities
          </p>
          <h2 className="text-3xl md:text-5xl 2xl:text-6xl font-serif text-gray-900">
            Making You Feel at Home
          </h2>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading rooms...</p>
        ) : displayImages.length === 0 ? (
          <p className="text-center text-gray-500">No images found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayImages.map((item, index) => (
              <div
                key={item._id}
                className={`relative h-96 rounded-lg overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
                  hallImage && index === 3 ? 'lg:col-span-2' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-[#D46A37] transition-colors">
                    {item.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomSection;
