

import React from "react";
import type { Metadata } from 'next';
import { Mail, PhoneCall, ArrowBigRightDash  } from 'lucide-react';


const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL;

export const metadata: Metadata = {
  title: 'Privacy Policy | ACE Friends Park ',
  description: 'Read the Privacy Policy of ACE Friends Park Resort to understand how we collect, use, and protect your personal information when you visit our website or contact us for bookings.',
  openGraph: {
    title: 'Privacy Policy | ACE Friends Park',
    description: 'Read the Privacy Policy of ACE Friends Park Resort to understand how we collect, use, and protect your personal information when you visit our website or contact us for bookings.',
    url: `${domainUrl}/privacy`,
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

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen text-gray-800 px-2">
    <div className="border max-w-4xl mx-auto rounded-xl border-[#D46A37]/30 py-16 my-10">
          <section className="relative flex items-center justify-center">
        <div className="relative z-10 text-center text-gray-800 px-6 pb-5">
          <h1 className="text-3xl md:text-5xl font-serif mb-2 drop-shadow-lg">
            Privacy Policy
          </h1>
          <p className="text-sm uppercase tracking-wide text-gray-700">
            Last Updated: 17 October 2025
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-10 border-t border-dashed border-[#D46A37]/30 ">
   

        <div className="space-y-8 leading-relaxed">
          <section>
            <p>
              At <strong>ACE Friends Park Resort</strong> (“we,” “our,” “us”),
              your privacy is important to us. This Privacy Policy explains how
              we collect, use, and protect your personal information when you
              visit our website{" "}
              <a
                href="https://www.acefriendspark.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D46A37] hover:underline"
              >
                www.acefriendspark.com
              </a>{" "}
              or contact us for bookings.
            </p>
            <p className="mt-4">
              By using our website or providing your details, you agree to the
              terms outlined in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Information <span className="text-[#D46A37]">We Collect</span></h2>
            <p>
              We may collect the following types of personal information when
              you fill out our booking or contact forms:
            </p>
            <ul className=" list-inside mt-3 space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Full name</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Contact number</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Email address</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Number of guests and preferred dates</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Any special requests or comments provided voluntarily</li>
            </ul>
            <p className="mt-3">
              We do not collect or store any financial details such as
              credit/debit card information, as our website does not process
              online payments.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use <span className="text-[#D46A37]">Your Information</span></h2>
            <p>We use the information you provide to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-1"/></span>Process and respond to your booking inquiries</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-1"/></span>Communicate booking confirmations or changes</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-1"/></span>Provide customer support and respond to your questions</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-1"/></span>Improve our services and guest experience</li>
            </ul>
            <p className="mt-3">
              Your information will be used solely for resort-related
              communication and will not be shared for marketing or advertising
              purposes without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              3. Information <span className="text-[#D46A37]">Sharing and Disclosure</span>
            </h2>
            <p>
              We value your trust and ensure your data remains secure. We do not
              sell, rent, or trade your personal information to third parties.
            </p>
            <p className="mt-3">However, we may share details:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                With our internal reservation or management team to confirm
                bookings.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                When required by law or government authorities for verification
                or compliance purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Data <span className="text-[#D46A37]">Security</span></h2>
            <p>
              We take reasonable measures to protect your personal information
              from unauthorized access, misuse, or disclosure. While we strive
              to maintain the highest security standards, no method of data
              transmission over the internet is completely secure. Hence, we
              cannot guarantee absolute protection.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Cookies</h2>
            <p>
              Our website may use cookies to enhance user experience, such as
              remembering preferences or improving website functionality. You
              can choose to disable cookies in your browser settings if you
              prefer not to allow them.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Third-Party <span className="text-[#D46A37]">Links</span></h2>
            <p>
              Our website may contain links to external sites (e.g., Google Maps
              or social media). We are not responsible for the privacy practices
              or content of these third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Your <span className="text-[#D46A37]">Rights</span></h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Request access to the personal information we hold about you.
              </li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>Ask for corrections if any of your details are inaccurate.</li>
              <li className="flex gap-3"><span><ArrowBigRightDash className="w-5 h-5 mt-0.5"/></span>
                Request deletion of your information, subject to legal or
                operational limitations.
              </li>
            </ul>
            <p className="mt-3">
              To exercise these rights, please contact us using the details
              below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">
              8. Updates to <span className="text-[#D46A37]">This Policy</span>
            </h2>
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or legal requirements. Updates will be
              posted on this page with a revised “Last Updated” date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">9. Contact <span className="text-[#D46A37]">Information</span></h2>
            <p>
              For any questions or concerns regarding this Privacy Policy,
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
    </div>
    </div>
  );
};

export default PrivacyPolicyPage;
