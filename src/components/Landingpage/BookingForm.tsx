'use client';

import React, { useRef, useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import emailjs from '@emailjs/browser';
import { sendWhatsappMessage } from '@/services/whatsapp/whatsappService';
import { useRouter } from "next/navigation";

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID || '';
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;
const endpoint = '/api/proxy-validate-email';

const BookingForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const guestsInputRef = useRef<HTMLInputElement | null>(null);
  const cottagesInputRef = useRef<HTMLInputElement | null>(null);
  const countryCode = 'IN';
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState('');
  const [cottageError, setCottageError] = useState('');
  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];
  const [checkIn, setCheckIn] = useState("");

  const validateCottageCapacity = (guests: number, cottages: number) => {
    const maxGuestsPerCottage = 8;
    const maxCapacity = cottages * maxGuestsPerCottage;
    
    if (guests > maxCapacity) {
      const requiredCottages = Math.ceil(guests / maxGuestsPerCottage);
      setCottageError(`For ${guests} guests, you need at least ${requiredCottages} cottage${requiredCottages > 1 ? 's' : ''}`);
    } else {
      setCottageError('');
    }
  };

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const guestCount = parseInt(e.target.value) || 1;
    const maxGuestsPerCottage = 6;
    const requiredCottages = Math.ceil(guestCount / maxGuestsPerCottage);
    const maxCottages = 12;
    
    if (cottagesInputRef.current) {
      cottagesInputRef.current.value = Math.min(requiredCottages, maxCottages).toString();
    }
    
    validateCottageCapacity(guestCount, parseInt(cottagesInputRef.current?.value || '1'));
  };

  const handleCottageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cottageCount = parseInt(e.target.value) || 1;
    const maxCottages = 12;
    const limitedCottages = Math.min(cottageCount, maxCottages);
    
    e.target.value = limitedCottages.toString();
    
    const guestCount = parseInt(guestsInputRef.current?.value || '1');
    validateCottageCapacity(guestCount, limitedCottages);
  };

  const validateEmail = async (email: string): Promise<string> => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.status !== 200) return 'Invalid Email';
      const data = await response.json();
      return data.success && data.isValid ? '' : 'Invalid Email Address';
    } catch {
      return 'Validation unavailable';
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const formCurrent = form.current;
    if (!formCurrent) return;

    const emailValidationMessage = await validateEmail(email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      emailInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      emailInputRef.current?.focus();
      return;
    } else setEmailError('');

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError('Please enter a valid phone number');
      return;
    } else setPhoneError('');

    const guestCount = parseInt((formCurrent['guests'] as HTMLInputElement)?.value || '1');
    const cottageCount = parseInt((formCurrent['cottages'] as HTMLInputElement)?.value || '1');
    const maxGuestsPerCottage = 8;
    const maxCapacity = cottageCount * maxGuestsPerCottage;
    
    if (guestCount > maxCapacity) {
      const requiredCottages = Math.ceil(guestCount / maxGuestsPerCottage);
      setCottageError(`For ${guestCount} guests, you need at least ${requiredCottages} cottage${requiredCottages > 1 ? 's' : ''}`);
      cottagesInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cottagesInputRef.current?.focus();
      return;
    } else setCottageError('');

    const phoneWithoutPlus = phone.replace(/[\s+]/g, '');
    const formData = {
      Full_Name: (formCurrent['Name'] as HTMLInputElement)?.value || '',
      Email_Id: email,
      Mobile_Number: phoneWithoutPlus,
      CheckIn: (formCurrent['checkIn'] as HTMLInputElement)?.value || '',
      CheckOut: (formCurrent['checkOut'] as HTMLInputElement)?.value || '',
      Guests: (formCurrent['guests'] as HTMLInputElement)?.value || '',
      Cottages: (formCurrent['cottages'] as HTMLInputElement)?.value || '',
      Originate_From: 'Ace Friends Park Booking Form',
    };

    setLoading(true);
    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);
      router.push('/thank-you');
      formCurrent.reset();
      setEmail('');
      setPhone('');
    } catch {
      alert('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }

    try {
      await sendWhatsappMessage('enquiry_form', {
        originateFrom: formData.Originate_From,
        fullName: formData.Full_Name,
        emailId: formData.Email_Id,
        mobileNumber: formData.Mobile_Number,
        checkIn: formData.CheckIn,
        checkOut: formData.CheckOut,
        guests: formData.Guests,
        cottages: formData.Cottages
      });

      await sendWhatsappMessage(
        'customer_greetings',
        {
          fullName: formData.Full_Name,
          checkIn: formData.CheckIn,
          checkOut: formData.CheckOut,
          siteUrl: `${domainUrl}`,
          imageUrl:
            'https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg',
        },
        phoneWithoutPlus
      );
    } catch (error) {
      console.error('WhatsApp error:', error);
    }
  };

  return (
    <div className='px-2'>
      <div className="md:max-w-lg mx-auto bg-white p-4 lg:py-6 lg:px-5 border lg:border-0 rounded shadow-md mt-10">
        <div className="text-3xl font-serif mb-8 text-center">
          Book Your <span className="text-[#D46A37]"> Stay</span>
        </div>
        <form ref={form} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                name="Name"
                required
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <PhoneInput
                international
                defaultCountry={countryCode}
                value={phone}
                onChange={setPhone}
                className="!shadow-none !bg-transparent p-2 [&>input]:border-none [&>input]:outline-none [&>input]:bg-transparent mt-1 w-full border rounded-md px-3 py-2 focus:outline-none"
              />
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email ID</label>
            <input
              ref={emailInputRef}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
              className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Check-In</label>
              <input
                type="date"
                name="checkIn"
                min={today} 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Check-Out</label>
              <input
                type="date"
                name="checkOut"
                min={checkIn || today}
                required
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className="block text-sm font-medium">Number of Guests</label>
              <input
                ref={guestsInputRef}
                type="number"
                name="guests"
                min="1"
                max="96"
                defaultValue="1"
                onChange={handleGuestsChange}
                required
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
               Each cottage comfortably accommodates up to 6 guests.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium">Number of Cottages</label>
              <input
                ref={cottagesInputRef}
                type="number"
                name="cottages"
                min="1"
                max="12"
                defaultValue="1"
                onChange={handleCottageChange}
                required
                className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none"
              />
              {cottageError && <p className="text-red-500 text-sm mt-1">{cottageError}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Max 12 cottages
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D46A37] text-white font-semibold py-3 rounded-md hover:bg-emerald-600 transition flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Booking...' : 'Book Now'}</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;