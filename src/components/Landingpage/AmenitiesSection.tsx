import { GiCampfire } from "react-icons/gi";
import { GiFamilyHouse } from "react-icons/gi";
import { GiKidSlide } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { IoTvSharp } from "react-icons/io5";
import { HiOutlineSparkles } from "react-icons/hi2";
import { GiCctvCamera } from "react-icons/gi";
import { TbFridge } from "react-icons/tb";

const amenities = [
  { icon: HiOutlineSparkles, title: 'Luxury Suites', desc: 'Experience unmatched comfort and elegant interiors designed for relaxation.' },
  { icon: GiCctvCamera, title: 'Safe & Secure', desc: 'Your safety is our priority with 24/7 CCTV monitoring and a fully secured environment.' },
  { icon: GiFamilyHouse, title: 'Event Halls', desc: 'Spacious and well-equipped halls ideal for family gatherings, meetings, or celebrations.' },
  { icon: GiCampfire, title: 'Campfire', desc: 'Spend warm and memorable evenings by the campfire under the stars.' },
  { icon: FaCar, title: 'Car Parking', desc: 'Enjoy hassle-free parking with our safe and spacious parking facilities.' },
  { icon: GiKidSlide, title: 'Kids Play Area', desc: 'A fun and safe zone where children can play, explore, and enjoy.' },
  { icon: IoTvSharp, title: 'Entertainment', desc: 'Relax and unwind with live TV and in-room entertainment options.' },
  { icon: TbFridge, title: 'Refrigerator', desc: 'A convenient in-room refrigerator to keep your food and drinks cool during your stay.' },
];


const AmenitiesSection = () => {

  return (
    <section className="relative py-10  bg-white overflow-hidden" id="amenities">

      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 xl:px-20 relative z-10">

        <div className="text-center mb-10 lg:mb-16">
          <div className="inline-block mb-4">
            <span className="px-5 py-2 bg-white text-gray-800 border text-xs font-bold uppercase tracking-wider rounded-full">
              Our Amenities
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-6 tracking-tight">
            Facilities & <span className='text-[#D46A37]'>Amenities</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Relax and unwind with comforts that blend seamlessly with nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-5 md:mb-20">
          {amenities.map((item, idx) => {
            const IconComponent = item.icon;
       
            return (
              <div
                key={idx}
                className="group relative">
                <div
                  className={`relative bg-white rounded-3xl p-8 border border-[#D46A37] hover:bg-[#D46A37]/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 h-full`}
                >
                  <div className="relative z-10">
                    <div
                      className={`w-20 h-20 mb-6 rounded-2xl flex items-center justify-center transform transition-all duration-500 group-hover:bg-white`}
                    >
                      <IconComponent
                        size={40}
                        strokeWidth={1.5}
                        color="#D46A37" 
                      />
                    </div>

                    <h3 className="text-gray-900 text-2xl mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-6">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AmenitiesSection;
