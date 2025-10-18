import React from 'react'
import type { Metadata } from 'next';
import HeroSection from '@/components/TestimonialsPage/HeroSection';
import UserReviews from '@/components/TestimonialsPage/UserReviews';
import TestimonialsCTA from '@/components/TestimonialsPage/TestimonialsCTA';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Guest Reviews & Testimonials | ACE Friends Park Yelagiri',
  description: 'Read genuine guest reviews and testimonials of ACE Friends Park, Yelagiri. Discover why families and friends love our resort for comfort, hospitality, and memorable stays.',
  openGraph: {
    title: 'Guest Reviews & Testimonials | ACE Friends Park Yelagiri',
    description: 'Read genuine guest reviews and testimonials of ACE Friends Park, Yelagiri. Discover why families and friends love our resort for comfort, hospitality, and memorable stays.',
    url: `${domainUrl}/testimonials`,
    siteName: 'ACE Friends Park',
    images: [
      {
        url: `${domainUrl}/og-images/AceLogo.png`, 
        width: 1200,
        height: 630,
        alt: 'ACE Friends Park',
      },
    ],
    type: 'website',
  },
};

const Testimonials = () => {
  return (
    <div>
   <HeroSection/>
   <UserReviews/>
   <TestimonialsCTA/>
    </div>
  )
}

export default Testimonials