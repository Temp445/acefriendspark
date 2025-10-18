
import React from 'react';
import { CheckCircle } from 'lucide-react';

const reasons = [
  {
    title: 'Prime Location',
    desc: 'Nestled in serene Manjankollaipudur, Yelagiri, offering scenic views and tranquility.',
  },
  {
    title: 'Luxury & Comfort',
    desc: 'Modern amenities, cozy rooms, and premium facilities designed for ultimate comfort.',
  },
  {
    title: 'Family Friendly',
    desc: 'Perfect for families and friends with entertainment options, games, and relaxing spaces.',
  },
  {
    title: 'Exceptional Hospitality',
    desc: 'Our dedicated staff ensures personalized care and memorable experiences for every guest.',
  },
  {
    title: 'Affordable Luxury',
    desc: 'Experience premium hospitality at competitive pricing, giving value for your time and money.',
  },
  {
    title: 'Memorable Experiences',
    desc: 'Activities, events, and excursions curated to make your stay unforgettable.',
  },
];

const WhyChoose = () => {
  return (
    <section className="py-16 bg-gradient-to-t from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
         <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif mb-2">
            Why Choose
            <span className="block mt-2 text-[#D46A37]">ACE Friends Park</span>
          </h2>
          <p className="text-gray-700 md:text-lg mt-4 max-w-2xl mx-auto">
            Discover the reasons why guests love staying with us – comfort, luxury, and unforgettable memories await.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-lg border border-gray-200 p-8 hover:border-[#D46A37] hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D46A37]/10 flex items-center justify-center group-hover:bg-[#D46A37] transition-colors duration-300">
                  <CheckCircle className="w-5 h-5 text-[#D46A37] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold ml-4 text-gray-900 group-hover:text-[#D46A37] transition-colors duration-300">
                  {reason.title}
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed ml-14">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;