import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: "ACE Friends Park | Best Hotel & Resort in Yelagiri for Family & Friends Stay",
  description: "Experience a peaceful and memorable stay at ACE Friends Park, Yelagiri’s best resort for families and friends. Enjoy modern comfort, serene surroundings, and a homely ambience in the heart of Yelagiri’s nature.",
  keywords: "ACE Friends Park Yelagiri, Best hotel in Yelagiri, Best resort in Yelagiri, Family resort in Yelagiri, Friends stay in Yelagiri, Hotels near Yelagiri Hills, Affordable resorts in Yelagiri, Luxury resort in Yelagiri, Yelagiri accommodation, Resorts in Manjankollaipudur Yelagiri, Peaceful stay in Yelagiri, Nature resort in Yelagiri, Holiday stay in Yelagiri, Weekend getaway Yelagiri, Romantic resort Yelagiri, Yelagiri resort for groups, Best vacation spot in Yelagiri, Yelagiri hill station stay, Comfortable rooms in Yelagiri, Budget-friendly resort in Yelagiri, ACE Friends Park Hotel, Ace Friends Park Resort, Ace Friends Park Yelagiri reviews, Book Ace Friends Park Yelagiri, Stay at Ace Friends Park",
 
   openGraph: { 
    title: 'ACE Friends Park | Best Hotel & Resort in Yelagiri for Family & Friends Stay',
    description: 'Experience a peaceful and memorable stay at ACE Friends Park, Yelagiri’s best resort for families and friends. Enjoy modern comfort, serene surroundings, and a homely ambience in the heart of Yelagiri’s nature.',
    url: `${domainUrl}`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
       <link rel="icon" href="/AceLogo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <Navbar/>
        {children}
        <WhatsAppButton/>
        <BackToTop/>
         <Footer/>
         </AuthProvider>
      </body>
    </html>
  );
}
