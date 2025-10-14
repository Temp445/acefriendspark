'use client'

import React, { useEffect, useState } from 'react';
import { MapPin, ArrowRight, Sparkles } from 'lucide-react';
import PunganoorLake from '@/assets/NearBy/PunganoorLake.png'
import NaturePark from '@/assets/NearBy/NaturePark.png'
import Swamimalai from '@/assets/NearBy/Swamimalai.png'
import HerbalFarm from '@/assets/NearBy/HerbalFarm.png'
import JalagamparaiFalls from '@/assets/NearBy/JalagamparaiFalls.png'
import Image from 'next/image';
import Link from 'next/link';

const places = [
  {
    id: 1,
    name: 'Punganoor Lake',
    distance: '2.5 km',
    image: PunganoorLake ,
    category: 'Lake',
    size: 'large'
  },
  {
    id: 2,
    name: 'Nature Park',
    distance: '5.2 km',
    image: NaturePark,
    category: 'Park',
    size: 'small'
  },
  {
    id: 3,
    name: 'Swamimalai',
    distance: '3 km',
    image: Swamimalai,
    category: 'Culture',
    size: 'small'
  },
  {
    id: 4,
    name: 'Herbal Farm',
    distance: '3.4 km',
    image: HerbalFarm,
    category: 'Nature',
    size: 'small'
  },
  {
    id: 5,
    name: 'Jalagamparai Falls',
    distance: '12 km',
    image: JalagamparaiFalls,
    category: 'Falls',
    size: 'small'
  },

];

interface Attraction {
  _id: string;
  image: string;
  placeName: string;
  description: string;
  distance: string;
  travelingTime: string;
  keyPoints: [string];
}

const NearBySection = () => {
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
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 overflow-hidden">

      <div className="container mx-auto px-4 lg:px-6 xl:px-14  relative z-10">
        <div className="text-center mb-8 lg:mb-1 animate-fade-in">
          <div className="inline-flex items-center gap-2 uppercase  border px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Discover Amazing Places
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-4 tracking-tight">
            Best Places <span className="text-transparent bg-clip-text bg-[#D46A37]">Around Us</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Explore stunning destinations and hidden gems just moments away from your stay
          </p>
        </div>
        
        <div className="lg:flex justify-end items-end mb-3 hidden">
          <Link href='/attractions' className="inline-flex items-center gap-2 hover:bg-[#D46A37] text-[#D46A37] hover:text-white border px-6 py-2 rounded font-semibold  shadow-lg hover:shadow-xl transform transition-all duration-300">
            View More 
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.slice(0,5).map((attraction, index) => (
            <div
              key={attraction._id}
              className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
              } ${index === 0 ? 'h-[300px] lg:h-full' : 'h-80'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={attraction.image}
                alt={attraction.placeName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />


              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                {attraction.keyPoints[0]}
              </div>

              <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#D46A37] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                <MapPin className="w-3 h-3" />
                {attraction.distance}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className={`text-white font-bold mb-2`}>
                  {attraction.placeName}
                </h3>   
              
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#D46A37] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[#D46A37] opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-bl-2xl"></div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default NearBySection;