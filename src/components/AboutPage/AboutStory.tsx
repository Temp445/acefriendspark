
import React from "react";
import Hotel from "@/assets/Hotel/Hotel3.jpg";
import Hotel2 from "@/assets/Hotel/Hotel2.png";
import Image from "next/image";

const AboutStory = () => {
  return (
    <section className="relative py-10 xl:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl 2xl:text-6xl leading-tight font-serif">
              Our{" "}
              <span className="relative inline-block text-[#D46A37]">
                Story
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  height="12"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M0 6C50 2, 150 2, 200 6C150 10, 50 10, 0 6Z"
                    fill="#D46A37"
                    opacity="0.3"
                  />
                </svg>
              </span>
            </h2>

            <div className="space-y-6 text-gray-700 md:text-lg leading-relaxed">
              <p className="relative pl-6 border-l-4">
                Welcome to{" "}
                <strong className="text-gray-900">ACE Friends Park</strong> –
                Yelagiri's premier resort for families and friends. When you're
                on a vacation, your place of stay should feel like home. At ACE
                Friends Park, we ensure your stay is peaceful, comfortable, and
                filled with memorable moments.
              </p>
              <p>
                Located in{" "}
                <strong className="text-gray-900">Manjankollaipudur</strong>,
                one of the most serene spots in Yelagiri, our resort blends
                modern comforts with the natural beauty of the surroundings.
                Every corner is designed to make your holiday relaxing,
                rejuvenating, and truly worth your time and investment.
              </p>
              <p className="md:text-xl font-medium text-gray-900 italic">
                A stay at ACE Friends Park promises a soothing experience. Our
                goal is to create an exciting, unforgettable vacation for you,
                your family, and your friends, making every visit a cherished
                memory.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative lg:h-[600px] group">
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

              <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={Hotel}
                  alt="Ace Friends Park Hotel"
                  className="object-cover h-full w-full transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-xl overflow-hidden shadow-xl border-4 border-[#D46A37]/20 hidden lg:block">
              <Image
                src={Hotel2}
                alt="Resort detail"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
