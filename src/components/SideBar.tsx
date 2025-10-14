'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MapPinHouse,
  Image,
  UserStar,
  ShieldUser,
  BadgeCheck,
  Menu,
  X,
} from 'lucide-react';

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Gallery', href: '/admin/gallerydashboard', icon: <Image className="w-5 h-5" /> },
  { name: 'Attractions', href: '/admin/attractionsdashboard', icon: <MapPinHouse className="w-5 h-5" /> },
  { name: 'Platform', href: '/admin/platform', icon: <BadgeCheck className="w-5 h-5" /> },
  { name: 'Testimonial', href: '/admin/testimonialdashboard', icon: <UserStar className="w-5 h-5" /> },
  { name: 'Users', href: '/admin/users', icon: <ShieldUser className="w-5 h-5" /> },
];

const SideBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between bg-gray-800 text-white p-4 lg:hidden">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-300 hover:text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="hidden lg:flex flex-col w-64 bg-gray-800 text-white min-h-screen">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-lg font-bold">Admin Panel</h1>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="mt-4 space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-gray-700 text-white font-semibold'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div
          className={`fixed inset-0  bg-opacity-50 transition-opacity ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
        />

        <div className="relative z-50 w-64 bg-gray-800 text-white h-full flex flex-col shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h1 className="text-lg font-bold">Admin Panel</h1>
            <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto">
            <ul className="mt-4 space-y-1">
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      pathname === item.href
                        ? 'bg-gray-700 text-white font-semibold'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SideBar;
