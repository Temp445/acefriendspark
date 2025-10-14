import React from 'react'
import AboutHero from '@/components/AboutPage/AboutHero'
import AboutStats from '@/components/AboutPage/AboutStats'
import AboutStory from '@/components/AboutPage/AboutStory'
import WhyChoose from '@/components/AboutPage/WhyChoose'
import AboutCTA from '@/components/AboutPage/AboutCTA'
import RoomsSuites from '@/components/AboutPage/RoomSection'
import TestimonialSection from '@/components/Landingpage/TestimonialsSection'
import type { Metadata } from 'next';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'About Ace Friends Park | Discover Yelagiri’s Best Resort Experience',
  description: 'Learn more about Ace Friends Park, one of Yelagiri’s best resorts for families and friends. Discover our story, hospitality, and the peaceful ambience that makes every stay special.',
  openGraph: {
    title: 'About Ace Friends Park | Discover Yelagiri’s Best Resort Experience',
    description: 'Learn more about Ace Friends Park, one of Yelagiri’s best resorts for families and friends. Discover our story, hospitality, and the peaceful ambience that makes every stay special.',
    url: `${domainUrl}/about`,
    siteName: 'Ace Friends Park',
    images: [
      {
        url: `${domainUrl}/og-images/AceLogo.png`, 
        width: 1200,
        height: 630,
        alt: 'Ace Friends Park',
      },
    ],
    type: 'website',
  },
};

const About = () => {
  return (
    <div>
        <AboutHero/>
        <AboutStory/>
        <AboutStats/>
        <RoomsSuites/>
        <WhyChoose/>
        <AboutCTA/>
        <TestimonialSection/>
    </div>
  )
}

export default About