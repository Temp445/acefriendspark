'use client'

import React, { useEffect, useState } from 'react';
import { Quote, Star, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Testimonial {
  _id: string;
  platform: string;
  username: string;
  review: string;
  rating: number;
  date: string;
  image?: string;
}

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonial');
      const data = await res.json();

      if (data.success && Array.isArray(data.data)) {
        setTestimonials(data.data);
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

  if (loading) return <p className="text-center py-10">Loading testimonials...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <section className="relative w-full py-10 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="text-3xl md:text-5xl font-serif text-center mb-8 text-gray-800">
          What Our <span className="text-[#D46A37]">Guests Say</span>
        </h2>

        <div className="lg:flex justify-end items-end mb-4 hidden">
          <Link
            href="/testimonials"
            className="inline-block px-6 py-2 hover:bg-[#D46A37] text-[#D46A37] hover:text-white font-semibold rounded shadow-lg border transition-all duration-300"
          >
            View More
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 xl:gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="relative bg-white rounded-xl border border-[#D46A37]/20 shadow-xl p-6 flex flex-col text-left transition-transform duration-500 hover:scale-105"
            >
              <div className="flex justify-end items-center mb-3">
                <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Verified
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < testimonial.rating
                        ? 'fill-[#D46A37] text-[#D46A37]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <Quote className="w-8 h-8 opacity-20 mb-2" style={{ color: '#D46A37' }} />

              <p className="text-gray-600 mb-6 text-base leading-relaxed">{testimonial.review}</p>

              <div className="mt-auto flex items-center gap-4 pt-6 border-t border-gray-100 relative z-10">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.username}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg bg-[#D46A37]">
                    {testimonial.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.username}</h3>
                  <div className="text-sm text-gray-500">
                    {testimonial.platform} | {testimonial.date}
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 w-20 h-1 bg-[#D46A37]/30 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
