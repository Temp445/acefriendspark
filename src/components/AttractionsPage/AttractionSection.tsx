'use client'

import React, { useEffect, useState } from 'react';
import { MapPin, Clock } from 'lucide-react';

interface Attraction {
  _id: string;
  image: string;
  placeName: string;
  description: string;
  distance: string;
  travelingTime: string;
  keyPoints: [string];
}

const AttractionSection = () => {
    const [attractions, setAttractions] = useState<Attraction[]>([]);

      const fetchAttractions = async () => {
        try {
          const res = await fetch('/api/attractions');
          const data = await res.json();
          if (data.success) {
            setAttractions(data.data);
          } else {
            window.alert('Failed to load attractions');
          }
        } catch {
          window.alert('Error fetching attractions');
        } 
      };
    
      useEffect(() => {
        fetchAttractions();
      }, []);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto px-5 mb-10 lg:mb-20">
      {attractions.map((attraction) => (
        <div key={attraction._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="h-64 overflow-hidden">
            <img 
              src={attraction.image} 
              alt={attraction.placeName}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-serif text-gray-800 mb-3 leading-tight">{attraction.placeName}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1 text-[#D46A37]">
                <MapPin size={16} />
                <span className="font-medium">{attraction.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span className="font-medium">{attraction.travelingTime}</span>
              </div>
            </div>
            <p className="text-gray-600 mb-5 leading-relaxed">{attraction.description}</p>
            <div className="flex flex-wrap gap-2">
              {attraction.keyPoints.map((keyPoint, idx) => (
                <span key={idx} className="bg-[#D46A37]/10 text-[#D46A37] px-3 py-1.5 rounded-lg text-xs font-medium">
                  {keyPoint}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttractionSection;
