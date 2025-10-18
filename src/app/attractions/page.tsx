import AttractionSection from '@/components/AttractionsPage/AttractionSection'
import HeroSection from '@/components/AttractionsPage/HeroSection'
import Introduction from '@/components/AttractionsPage/Introduction'
import React from 'react'
import type { Metadata } from 'next';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Nearby Attractions | Top Places to Visit in Yelagiri near ACE Friends Park',
  description: 'Discover the best attractions near ACE Friends Park, Yelagiri. Explore scenic hills, nature parks, boating spots, temples, and adventure activities just minutes away from our resort.',
  openGraph: {
    title: 'Nearby Attractions | Top Places to Visit in Yelagiri near ACE Friends Park',
    description: 'Discover the best attractions near ACE Friends Park, Yelagiri. Explore scenic hills, nature parks, boating spots, temples, and adventure activities just minutes away from our resort.',
    url: `${domainUrl}/attractions`,
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

const Attractions = () => {
  return (
    <div>
        <HeroSection/>
        <Introduction/>
        <AttractionSection/>
    </div>
  )
}

export default Attractions