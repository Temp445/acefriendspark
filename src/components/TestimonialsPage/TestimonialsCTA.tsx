import React from 'react';

const TestimonialsCTA = () => {
  return (
    <div className="px-2">
         <div className="relative container mx-auto mb-20 max-w-7xl rounded-3xl overflow-hidden">
      <div 
        className="relative z-10 text-center p-10 md:p-16 text-white bg-gradient-to-bl from-[#d45c37] to-[#D46A36] "
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Ready to Create Your Own Story?
          </h3>
          <p className="text-base md:text-xl mb-8 text-white/90">
            Join our community of satisfied guests and experience the hospitality that keeps them coming back
          </p>
          <a 
            href='/contact'
            className="inline-block bg-white text-[#D46A37] px-10 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
          >
            Book Your Stay Now
          </a>
        </div>
      </div>
    </div>
    </div>
 
  );
};

export default TestimonialsCTA;