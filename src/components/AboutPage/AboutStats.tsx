
import React from 'react';
import { IoStar } from "react-icons/io5";

const stats = [
  { value: '10+', label: 'Premium Rooms', showStar: false },
  { value: '24/7', label: 'Hospitality Desk', showStar: false },
  { value: '4.3', label: 'Guest Rating', showStar: true },
  { value: '98%', label: 'Satisfaction', showStar: false },
];

const AboutStats = () => {
  return (
    <section className="py-16 bg-white container mx-auto">
      <div className=" mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-8 border-y border-gray-200">
          {stats.map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-1">
                {item.value}
                {item.showStar && (
                  <IoStar className="text-[#D46A37] text-3xl md:text-4xl" />
                )}
              </div>
              <div className="text-gray-600 text-sm md:text-base font-medium">
                {item.label}
              </div>
              
              {index < stats.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 w-px h-20 bg-gray-200 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;