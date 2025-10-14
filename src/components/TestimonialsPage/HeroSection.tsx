"use client";

import React, { useEffect, useState } from "react";
import { Star, CheckCircle, Loader2, ExternalLink } from "lucide-react";

interface Platform {
  _id: string;
  name: string;
  rating: number;
  reviews: number;
  logo: string;
  link: string;
}

const HeroSection = () => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlatforms = async () => {
    try {
      const res = await fetch("/api/platform");
      const data = await res.json();
      if (data.success) {
        setPlatforms(data.data);
      } else {
        window.alert("Failed to load platforms");
      }
    } catch {
      window.alert("Error fetching platforms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-[#D46A37] mx-auto mb-4" />
          <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, idx) => {
      const fillPercent = Math.min(Math.max(rating - idx, 0), 1);
      return (
        <Star
          key={idx}
          className="w-5 h-5"
          style={{
            fill: fillPercent > 0 ? "#D46A37" : "none",
            color: "#D46A37",
            opacity: fillPercent === 0 ? 0.2 : 0.3 + fillPercent * 0.7,
          }}
        />
      );
    });
  };

  return (
    <div className="min-h-fit py-10 md:py-16 px-4 overflow-x-hidden container mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center">
          <div className=" mb-16 animate-[fadeInDown_0.8s_ease-out]">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 leading-tight">
              Real Stories from <br />
              <span className="text-transparent bg-clip-text bg-[#D46A37]">
                Happy Guests
              </span>
            </h1>

            <p className="flex text-gray-600 md:text-xl mb-8 max-w-xl mx-auto leading-relaxed items-start justify-start">
              Don't just take our word for it. See what our guests have to say
              about their unforgettable experiences at Ace Friends Park.
            </p>

            <div className="flex gap-4 md:gap-8 text-gray-600">
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">Verified Reviews</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl shadow-sm">
                <Star className="w-5 h-5 text-[#D46A37]" fill="#D46A37" />
                <span className="font-medium">Real Guests</span>
              </div>
            </div>
          </div>

          {platforms.slice(0, 1).map((item) => (
            <div
              key={item._id}
              className="mb-10 md:mb-20 animate-[fadeInUp_0.8s_ease-out_0.2s_backwards] flex justify-center sm:px-6"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full max-w-xl group"
              >
                <div className="relative bg-white rounded-lg md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl hover:shadow-3xl md:w-lg transition-all duration-500 border border-[#D46A37] overflow-hidden group-hover:scale-[1.02]">
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center">
                          <img
                            src={item.logo || "/placeholder.svg"}
                            alt={item.name}
                            className="max-h-12 max-w-12 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xl sm:text-2xl text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            Verified Platform
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 absolute right-2 sm:w-6 sm:h-6 text-[#D46A37] flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>

                    <div className="rounded-2xl p-3 sm:p-4 bg-orange-50/30">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                        <div className="text-4xl sm:text-5xl font-black text-gray-900">
                          {item.rating.toFixed(1)}
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1 mb-1">
                            {renderStars(item.rating)}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 font-medium">
                            out of 5 stars
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 sm:pt-4 border-t border-orange-200">
                        <p className="text-gray-700 text-sm sm:text-base">
                          Based on{" "}
                          <span className="font-bold text-[#D46A37]">
                            {item.reviews}
                          </span>{" "}
                          verified reviews
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>

        {platforms.length > 1 && (
          <div>
            <div className="text-center mb-12 animate-[fadeIn_0.8s_ease-out_0.4s_backwards]">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                More <span className="text-[#D46A37]">Trusted Platforms</span>
              </h2>
              <p className="text-gray-600 text-lg">
                We're rated highly across multiple review sites
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {platforms.slice(1).map((item, index) => (
                <a
                  key={item._id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group animate-[fadeInUp_0.8s_ease-out_backwards]"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full group-hover:scale-105 group-hover:border-[#D46A37]">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="max-h-8 max-w-8 object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">Verified</p>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#D46A37] transition-colors" />
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-transparent rounded-xl p-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {item.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500">/ 5</span>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {renderStars(item.rating)}
                      </div>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-[#D46A37]">
                          {item.reviews}
                        </span>{" "}
                        reviews
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
