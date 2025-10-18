
import React from "react";
import type { Metadata } from 'next';
import { Mail, PhoneCall,ArrowBigRightDash  } from 'lucide-react';


const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Terms and Conditions  | ACE Friends Park ',
  description: 'Read the Terms and Conditions of ACE Friends Park to understand our booking, cancellation, and stay policies. Ensure a smooth and comfortable experience during your visit to our Yelagiri resort.',
  openGraph: {
    title: 'Terms and Conditions | ACE Friends Park',
    description: 'Read the Terms and Conditions of ACE Friends Park to understand our booking, cancellation, and stay policies. Ensure a smooth and comfortable experience during your visit to our Yelagiri resort.',
    url: `${domainUrl}/terms`,
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

const TermsAndConditionsPage = () => {
  return (
    <main className="min-h-screen text-gray-800">

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-serif mb-4 text-gray-900">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-10">
          Last Updated: 17 October 2025
        </p>

        <div className="space-y-8 leading-relaxed">
          <section>
            <p>
              Welcome to <strong>ACE Friends Park Resort</strong> (“we,” “our,”
              “us”). By accessing or using our website{" "}
              <a
                href="https://www.acefriendspark.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D46A37] hover:underline"
              >
                www.acefriendspark.com
              </a>
              , you agree to comply with and be bound by the following Terms and
              Conditions. Please read them carefully before submitting your
              booking request.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              1. General Information
            </h2>
            <p>
              ACE Friends Park Resort is located in Yelagiri, Tamil Nadu. All
              bookings and stays at our resort are subject to these Terms and
              Conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">2. Booking Process</h2>
            <ul className="list-disc list-inside space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Our website does not support online payments or instant booking
                confirmations.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Guests can submit a booking inquiry through the website by
                providing their details and preferred dates.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Our team will contact you directly via phone or email to confirm
                or reject your booking request based on availability and pricing.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                A booking is considered confirmed only after communication and
                approval from our reservation team.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              3. Check-In and Check-Out
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Check-in: 12:00 PM</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Check-out: 11:00 AM</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Early check-in or late check-out may be allowed based on
                availability and prior approval from management.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              4. Cancellation and Refund Policy
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Cancellations made at least 48 hours prior to the booking date:
                100% refund.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Cancellations made within 48 hours of check-in or no-shows: No
                refund.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Refunds, if applicable, will be processed through the same mode
                of payment used during booking.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Date changes may be accommodated based on availability and
                management approval.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              5. Resort Rules and Guest Conduct
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-1"/></span>
                Guests are expected to maintain a peaceful and respectful
                environment at all times.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Unlawful activities, loud music, or disruptive behavior are
                strictly prohibited.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Damage to resort property will be charged to the responsible
                guest.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Visitors are not permitted in rooms after 9:00 PM unless
                approved by the management.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Pets are not allowed within the resort premises.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">6. Liability Disclaimer</h2>
            <ul className="list-disc list-inside space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                ACE Friends Park Resort is not responsible for loss, theft, or
                damage to personal belongings during your stay.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Use of resort facilities (such as play areas, campfires, and
                outdoor spaces) is at the guest’s own risk.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                We are not liable for cancellations, delays, or disruptions
                caused by natural calamities, power failures, or circumstances
                beyond our control.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">7. Use of Website</h2>
            <ul className="list-disc list-inside space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                You agree not to misuse or attempt to gain unauthorized access to
                this website.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                All content on this site, including text, images, and logos, is
                the property of ACE Friends Park Resort and may not be reproduced
                or distributed without written permission.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              8. Modification of Terms
            </h2>
            <p>
              We reserve the right to modify or update these Terms and
              Conditions at any time without prior notice. The latest version
              will always be available on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">9. Contact Information</h2>
            <p>
              For booking confirmations, cancellations, or general inquiries,
              please contact:
            </p>
            <div className="mt-3 space-y-3">
              <p>
                <strong>ACE Friends Park Resort</strong>, Yelagiri, Tamil Nadu
              </p>
              <p className="flex gap-3">
                <span><Mail/></span> Email:{" "}
                <a
                  href="mailto:info@acefriendspark.com"
                  className="text-[#D46A37] hover:underline"
                >
                  info@acefriendspark.com
                </a>
              </p>
              <p className="flex gap-3"><span><PhoneCall /></span> Phone: +91 97109 46816</p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default TermsAndConditionsPage;
