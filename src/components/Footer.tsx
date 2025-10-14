
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import Logo from "@/assets/AceLogo.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6  py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-white rounded-full">
                  <Image
                    src={Logo}
                    alt="Logo"
                    className="w-10 h-10 md:w-12 md:h-12 pl-0.5 rounded-full object-contain"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl text-white mt-1">
                  Ace Friends Park <br />{" "}
                  <div className="w-20 h-0.5 bg-[#D46A37] rounded-full"></div>
                </h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              Experience the perfect blend of comfort, elegance, and
              personalized hospitality at Ace Friends Park — your ideal getaway
              destination in the serene Yelagiri Hills.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-[#D46A37] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-[#D46A37] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-700 hover:bg-[#D46A37] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D46A37]"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-400 hover:text-[#D46A37] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#D46A37] transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-[#D46A37] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#D46A37] transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="text-sm text-gray-400 hover:text-[#D46A37] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#D46A37] transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-gray-400 hover:text-[#D46A37] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#D46A37] transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-[#D46A37] transition-colors duration-200 flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#D46A37] transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D46A37]"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-slate-700 group-hover:bg-[#D46A37] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed pt-2">
                  Manjankollaipudur, Athanavur, Yelagiri Hills, Tamil Nadu,
                  India – 635853
                </span>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-slate-700 group-hover:bg-[#D46A37] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-sm text-gray-400 pt-2">
                  <a
                    href="tel:+919710946813"
                    className="block hover:text-[#D46A37] transition-colors"
                  >
                    +91 9710946813
                  </a>
                  <a
                    href="tel:+919710946816"
                    className="block hover:text-[#D46A37] transition-colors"
                  >
                    +91 9710946816
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="w-10 h-10 -mt-7 rounded-lg bg-slate-700 group-hover:bg-[#D46A37] flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="flex flex-col pt-5" >
                     <a
                  href="mailto:info@acefriendspark.com"
                  className="text-sm text-gray-400 hover:text-[#D46A37] transition-colors pt-2"
                >
                  info@acefriendspark.com
                </a>
                  <a
                  href="mailto:sales@acefriendspark.com"
                  className="text-sm text-gray-400 hover:text-[#D46A37] transition-colors pt-2"
                >
                  sales@acefriendspark.com
                </a>
                   <a
                  href="mailto:marketing@acefriendspark.com"
                  className="text-sm text-gray-400 hover:text-[#D46A37] transition-colors pt-2"
                >
                  marketing@acefriendspark.com
                </a>
                </span>
             
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Find Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-[#D46A37]"></span>
            </h4>
            <div className="overflow-hidden rounded-xl shadow-2xl border-2 border-slate-700 hover:border-amber-500 transition-colors duration-300 h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3893.9879756295036!2d78.643346!3d12.583044!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3badaabd9f53e4cd%3A0x416101ed84755257!2sAce%20Friends%20Park!5e0!3m2!1sen!2sus!4v1759818480236!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Ace Friends Park Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2025 Ace Friends Park. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
