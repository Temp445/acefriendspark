
import HeroSection from '@/components/EntertainmentPage/HeroSection';
import ActivitiesSection from '@/components/EntertainmentPage/ActivitiesSection';
import EntertainmentSection from '@/components/Landingpage/EntertainmentSection';
import type { Metadata } from 'next';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Kids & Family Fun | Entertainment Activities at ACE Friends Park Yelagiri',
  description: 'Kids will love the fun activities at ACE Friends Park, Yelagiri! From exciting indoor games to safe outdoor adventures, there’s plenty to keep your little ones happy and entertained during your stay.',
  openGraph: {
    title: 'Kids & Family Fun | Entertainment Activities at ACE Friends Park Yelagiri',
    description: 'Kids will love the fun activities at ACE Friends Park, Yelagiri! From exciting indoor games to safe outdoor adventures, there’s plenty to keep your little ones happy and entertained during your stay.',
    url: `${domainUrl}/entertainment`,
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


const Entertainment = () => {
  return (
    <div>
      <HeroSection />
      <ActivitiesSection />
      <EntertainmentSection/>
    </div>
  )
}

export default Entertainment
