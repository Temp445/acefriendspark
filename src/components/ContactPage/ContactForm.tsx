'use client';

import React, { useRef, useState, FormEvent } from "react";
import { Send } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import emailjs from "@emailjs/browser";
import { sendWhatsappMessage } from "@/services/whatsapp/whatsappService";
import { useRouter } from "next/navigation";

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID || "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;
const endpoint = "/api/proxy-validate-email";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const guestsInputRef = useRef<HTMLInputElement | null>(null);
  const cottagesInputRef = useRef<HTMLInputElement | null>(null);
  const countryCode = "IN";
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState("");
  const [cottageError, setCottageError] = useState("");
  const [loading, setLoading] = useState(false);

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.status !== 200) return "Invalid Email";
      const data = await response.json();
      return data.success && data.isValid ? "" : "Invalid Email Address";
    } catch {
      return "Validation unavailable";
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
      emailInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      emailInputRef.current?.focus();
      return;
    } else setEmailError("");

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number");
      return;
    } else setPhoneError("");

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

    const phoneWithoutPlus = phone.replace(/[\s+]/g, "");
    const formData = {
      Full_Name: (formCurrent["Name"] as HTMLInputElement)?.value || "",
      Email_Id: email,
      Mobile_Number: phoneWithoutPlus,
      CheckIn: (formCurrent["checkIn"] as HTMLInputElement)?.value || "",
      CheckOut: (formCurrent["checkOut"] as HTMLInputElement)?.value || "",
      Guests: (formCurrent["guests"] as HTMLInputElement)?.value || "",
      Cottages: (formCurrent["cottages"] as HTMLInputElement)?.value || "",
      Originate_From: "Ace Friends Park Contact Page",
    };

    setLoading(true);
    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);
      router.push('/thank-you');
      formCurrent.reset();
      setEmail("");
      setPhone("");
    } catch {
      alert("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }

    try {
      await sendWhatsappMessage("enquiry_form", {
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
        "customer_greetings",
        {
          fullName: formData.Full_Name,
          checkIn: formData.CheckIn,
          checkOut: formData.CheckOut,
          siteUrl: `${domainUrl}`,
          imageUrl:
            "https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg",
        },
        phoneWithoutPlus
      );
    } catch (error) {
      console.error("WhatsApp error:", error);
    }
  };

  return (
    <div className="bg-white border border-[#D46A37]/40 rounded-lg shadow-lg p-4 md:p-8 h-fit">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Book Your Stay</h2>

      <form ref={form} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name *</label>
          <input
            type="text"
            name="Name"
            required
            className="w-full px-4 py-2 border rounded-lg outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email Address *</label>
          <input
            ref={emailInputRef}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
            className="w-full px-4 py-2 border rounded-lg outline-none transition"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number *</label>
          <PhoneInput
            international
            defaultCountry={countryCode}
            value={phone}
            onChange={setPhone}
            className="!shadow-none !bg-transparent p-2 [&>input]:border-none [&>input]:outline-none [&>input]:bg-transparent mt-1 w-full border rounded-md px-3 py-2 focus:outline-none"
          />
          {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Check-In *</label>
            <input
              type="date"
              name="checkIn"
              required
              className="w-full px-4 py-2 border rounded-lg outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Check-Out *</label>
            <input
              type="date"
              name="checkOut"
              required
              className="w-full px-4 py-2 border rounded-lg outline-none transition"
            />
          </div>
        </div>

        <div className="grid  md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Number of Guests *</label>
            <input
              ref={guestsInputRef}
              type="number"
              name="guests"
              min="1"
              max="96"
              defaultValue="1"
              onChange={handleGuestsChange}
              required
              className="w-full px-4 py-2 border rounded-lg outline-none transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              Each cottage comfortably accommodates <br className="hidden xl:block"/> up to 6 guests.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of Cottages *</label>
            <input
              ref={cottagesInputRef}
              type="number"
              name="cottages"
              min="1"
              max="12"
              defaultValue="1"
              onChange={handleCottageChange}
              required
              className="w-full px-4 py-2 border rounded-lg outline-none transition"
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
          className="w-full bg-[#D46A37] text-white font-semibold py-3 px-6 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center space-x-2"
        >
          <span>{loading ? "Booking..." : "Book Now"}</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;