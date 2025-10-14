import BookingForm from '@/components/RoomPage/BookingForm'
import CTASection from '@/components/RoomPage/CTASection'
import HeroSection from '@/components/RoomPage/HeroSection'
import RoomDetails from '@/components/RoomPage/RoomDetails'
import type { Metadata } from 'next';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Rooms & Stay at Ace Friends Park | Comfortable & Affordable Resorts in Yelagiri',
  description: 'Explore our spacious and comfortable rooms at Ace Friends Park, Yelagiri’s best resort for families and friends. Enjoy modern amenities, serene views, and a homely stay experience.',
  openGraph: {
    title: 'Rooms & Stay at Ace Friends Park | Comfortable & Affordable Resorts in Yelagiri',
    description: 'Explore our spacious and comfortable rooms at Ace Friends Park, Yelagiri’s best resort for families and friends. Enjoy modern amenities, serene views, and a homely stay experience.',
    url: `${domainUrl}/roomdetails`,
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

const Rooms = () => {
  return (
    <div>
      <HeroSection/>
      <RoomDetails/>
      <CTASection/>
    </div>
  )
}

export default Rooms