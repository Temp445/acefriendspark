'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/AceLogo.png';
import { useAuth } from '@/context/AuthContext';

type NavigationItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAdmin, loading, login } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    router.replace('/login');

  };

  const handleAdminClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (isAdmin) router.push('/admin/gallerydashboard');
    else router.push('/login');
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation: NavigationItem[] = useMemo(() => {
    const baseItems: NavigationItem[] = [
      { href: '/about', label: 'About' },
      { href: '/roomdetails', label: 'Rooms' },
      { href: '/attractions', label: 'Attractions' },
      { href: '/entertainment', label: 'Entertainment' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/testimonials', label: 'Testimonials' },
      { href: '/contact', label: 'Contact' },
    ];

    if (isAdmin) {
      baseItems.push({ href: '/admin/gallerydashboard', label: 'Dashboard' });
    }

    baseItems.push(
      user
        ? { label: 'Logout', onClick: handleLogout }
        : { label: 'Site Admin', onClick: handleAdminClick }
    );

    return baseItems;
  }, [user, isAdmin]);

  return (
    <>
      <div className="hidden lg:block bg-[#D46A37]/80 text-white">
        <div className="container mx-auto px-6 2xl:px-20 py-2.5 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white" />
              <a href='https://www.google.com/maps?ll=12.582353,78.644735&z=17&t=m&hl=en&gl=US&mapclient=embed&cid=4711048804847407703' target="_blank" rel="noopener noreferrer">Manjampudukollai, Athanavur, Yelagiri Hills, Tamil Nadu, India – 635853</a>
            </span>
            <span className="text-white">|</span>
            <span>Open Daily: 9:00 AM - 10:00 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">+91 9710946813</span> /
            <span className="font-semibold">+91 9710946816</span>
          </div>
        </div>
      </div>

      <nav
        className={`w-full transition-all duration-300 z-[60] ${
          isScrolled ? 'fixed top-0 bg-white shadow-lg' : 'lg:relative bg-white'
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6 lg:px-5 xl:px-10 2xl:px-16 py-2">
          <Link href="/" className={`flex items-center gap-2 font-bold tracking-wide`}>
            <Image src={Logo} alt="Logo" className="w-8 h-auto" />
            <div className="leading-none">
              <span className="block text-xl xl:text-2xl">Ace Friends Park</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navigation.map((link) => (
              <button
                key={link.label}
                onClick={() => (link.onClick ? link.onClick() : router.push(link.href!))}
                className={`text-sm font-medium transition-colors duration-300 hover:text-[#D46A37] ${
                  isScrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                {link.label}
              </button>
            ))}

            <Link href="/contact">
              <button
                className={`px-4 py-2.5 rounded hidden xl:flex text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? 'bg-[#D46A37] text-white shadow-md hover:shadow-lg'
                    : 'bg-gray-900 text-white hover:bg-[#D46A37] shadow-md hover:shadow-lg'
                }`}
              >
                Book Stay
              </button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl text-gray-900 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden bg-white shadow-lg overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {navigation.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setIsMenuOpen(false);
                  link.onClick ? link.onClick() : router.push(link.href!);
                }}
                className="text-gray-900 font-medium hover:text-amber-600 transition-colors duration-300 py-2 text-left"
              >
                {link.label}
              </button>
            ))}
            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full bg-[#D46A37] text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-300 mt-2">
                Book Stay
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
