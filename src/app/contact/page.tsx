import ContactForm from "@/components/ContactPage/ContactForm";
import ContactInfoSection from "@/components/ContactPage/ContactInfoSection";
import ContactMap from "@/components/ContactPage/ContactMap";
import Image from "next/image";
import Bg from '@/assets/Hotel/Bg.png'
import type { Metadata } from 'next';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Contact ACE Friends Park | Book Your Stay at Yelagiri’s Best Room',
  description: 'Reach out to ACE Friends Park for bookings, inquiries, and stay details. Experience Yelagiri’s best rooms with comfort, scenic views, and warm hospitality for families and friends.',
  openGraph: {
    title: 'Contact ACE Friends Park | Book Your Stay at Yelagiri’s Best Room',
    description: 'Reach out to ACE Friends Park for bookings, inquiries, and stay details. Experience Yelagiri’s best rooms with comfort, scenic views, and warm hospitality for families and friends.',
    url: `${domainUrl}/contact`,
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

const ContactPage = () => {
  return (
    <div>
    <div className="relative bg-slate-900 text-white py-16 px-4 overflow-hidden">
      <div className="absolute inset-0  bg-cover bg-center">
        <Image src={Bg} alt="Bg" className="w-full" />
      </div>
      <div className="absolute inset-0 bg-slate-900/80"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/20"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-4xl md:text-5xl font-serif mb-4">Get In Touch</h1>
        <p className="text-slate-300 text-lg max-w-2xl">
          Whether it's a weekend retreat or a special celebration, contact us
          to reserve your perfect stay.
        </p>
      </div>
    </div>

      <div className="grid lg:grid-cols-2 gap-8 px-4 container mx-auto max-w-7xl mt-10">
        <div className="order-2">
          {" "}
          <ContactInfoSection />{" "}
        </div>
        <div className="order-1 lg:order-2">
          {" "}
          <ContactForm />{" "}
        </div>
      </div>
      <ContactMap />
    </div>
  );
};

export default ContactPage;
