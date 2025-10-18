import HotelGallery from '@/components/GalleryPage/HotelGallery'
import React from 'react'
import type { Metadata } from 'next';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'ACE Friends Park Yelagiri | Hotel Photos & Room Gallery',
  description: 'Explore the hotel gallery of ACE Friends Park, Yelagiri. Browse images of our rooms, lobby, amenities, and scenic surroundings to see what makes your stay special.',
  openGraph: {
    title: 'ACE Friends Park Yelagiri | Hotel Photos & Room Gallery',
    description: 'Explore the hotel gallery of ACE Friends Park, Yelagiri. Browse images of our rooms, lobby, amenities, and scenic surroundings to see what makes your stay special.',
    url: `${domainUrl}/gallery`,
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

const Gallery = () => {
  return (
    <div>
      <HotelGallery/>
    </div>
  )
}

export default Gallery