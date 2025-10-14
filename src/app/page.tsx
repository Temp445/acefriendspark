import AboutSection from '@/components/Landingpage/AboutSection'
import AmenitiesSection from '@/components/Landingpage/AmenitiesSection'
import EntertainmentSection from '@/components/Landingpage/EntertainmentSection'
import HeroSection from '@/components/Landingpage/HeroSection'
import NearBySection from '@/components/Landingpage/NearBySection'
import LocationSection from '@/components/Landingpage/LocationSection'
import OfferBanner from '@/components/Landingpage/OfferBanner'
import RoomsSection from '@/components/Landingpage/RoomSection'
import TestimonialsSection from '@/components/Landingpage/TestimonialsSection'
import React from 'react'
import BookingForm from '@/components/Landingpage/BookingForm'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <div className='xl:hidden'>
      <BookingForm/>
      </div>
      <AboutSection/>
      <RoomsSection/>
      <AmenitiesSection/>
      <OfferBanner/>
      <NearBySection/>
      <LocationSection/>
      <EntertainmentSection/>
      <TestimonialsSection/>

    </div>
  )
}

export default Home