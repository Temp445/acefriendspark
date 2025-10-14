
import Image from "next/image";
import { Check, ArrowRight } from "lucide-react";
import Chess from "@/assets/Games/Chess.jpg";
import Slide from "@/assets/Games/Slide.png";
import Link from "next/link";

const ActivitiesSection = () => {
  return (
    <div className="min-h-fit pt-20 pb-0">
      <section className="max-w-6xl mx-auto px-4 lg:px-8 mb-20 grid lg:grid-cols-2 gap-10 items-center">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 flex flex-col justify-center">
            <h3 className="text-2xl font-serif text-gray-900 mb-3">
              Indoor Games
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Enjoy classic board games, table tennis, carrom, and chess in our
              air-conditioned indoor gaming lounge perfect for all ages.
            </p>
          </div>

          <div>
            <Image
              src={Chess}
              alt="Indoor games"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          <div className="order-4 md:order-3">
            <Image
              src={Slide}
              alt="Kids play area"
              width={300}
              height={300}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>

          <div className="bg-[#D46A37]/20 rounded-lg p-6 flex flex-col justify-center md:order-4">
            <h3 className="text-2xl font-serif text-gray-900 mb-3">
              Kids Play Area
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              A safe and fun playground with swings, slides, and colorful
              activities designed to keep your little ones entertained for
              hours.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 mb-4">
            Play & Activity for{" "} <br />
            <span className="text-[#D46A37]">Every Guest</span>
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Whether you're looking for friendly competition or family fun, our
            resort offers a variety of indoor games and dedicated play areas
            designed to keep everyone entertained. From strategic board games to
            exciting kids activities — there's something for everyone!
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="text-yellow-600 w-5 h-5" /> Indoor Gaming Lounge
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="text-yellow-600 w-5 h-5" /> Dedicated Kids Play
              Zone
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <Check className="text-yellow-600 w-5 h-5" /> Family-Friendly
              Activities
            </li>
          </ul>

          <Link
            href="/contact"
            className="bg-[#D46A37] w-fit flex gap-3 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            BOOK NOW{" "}
            <span>
              <ArrowRight />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ActivitiesSection
