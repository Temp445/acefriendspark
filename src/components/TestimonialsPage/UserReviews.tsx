'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

interface Testimonial {
  platform: string;
  username: string;
  review: string;
  rating: number;
  date: string;
  image?: string;
  verified: boolean;
}

const UserReviews: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filtered, setFiltered] = useState<Testimonial[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonial');
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setTestimonials(data.data);
        setFiltered(data.data);
      } else {
        setError('Failed to load testimonials');
      }
    } catch {
      setError('Error fetching testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const platforms = useMemo(() => {
    const unique = Array.from(new Set(testimonials.map((t) => t.platform)));
    return ['All', ...unique];
  }, [testimonials]);

  useEffect(() => {
    if (selectedPlatform === 'All') {
      setFiltered(testimonials);
    } else {
      setFiltered(testimonials.filter((t) => t.platform === selectedPlatform));
    }
  }, [selectedPlatform, testimonials]);

  return (
    <section className="container mx-auto mb-20 px-4 lg:px-14">
      <h2 className="text-2xl md:text-4xl font-serif text-center text-gray-900 mb-8">
        Recent <span className="text-[#D46A37]">Guest Experiences</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {platforms.length > 2 &&
            platforms.map((platform) => (
          <button
            key={platform}
            onClick={() => setSelectedPlatform(platform)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 text-sm font-medium ${
              selectedPlatform === platform
                ? 'bg-[#D46A37] text-white border-[#D46A37]'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-[#D46A37]/10 hover:text-[#D46A37]'
            }`}
          >
            {platform}
          </button>
        ))}
      </div>

      {loading ? (
        <div></div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-600">No reviews for this platform.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((t, i) => (
            <div
              key={`${t.platform}-${i}`}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col relative overflow-hidden group"
              style={{
                opacity: 0,
                animation: `fadeIn 0.6s ease-out ${0.4 + i * 0.15}s forwards`,
              }}
            >
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-10 transform translate-x-8 -translate-y-8 group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: '#D46A37', borderRadius: '50%' }}
              ></div>

              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="w-5 h-5"
                      style={{
                        fill: starIndex < t.rating ? '#D46A37' : 'none',
                        color: starIndex < t.rating ? '#D46A37' : '#D1D5DB',
                      }}
                    />
                  ))}
                </div>

                  <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-medium">
                    <CheckCircle className="w-4 h-4" />
                    Verified
                  </div>
                
              </div>

              <Quote className="w-10 h-10 opacity-10 mb-4 relative z-10 text-[#D46A37]" />
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow relative z-10 text-base italic">
                "{t.review}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-100 relative z-10">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg bg-[#D46A37]">
                    {t.username.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <div className="font-semibold text-gray-900">{t.username}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {t.platform} | {t.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default UserReviews;
