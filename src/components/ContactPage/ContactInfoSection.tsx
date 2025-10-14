
import React from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'

const ContactInfoSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-[#D46A37]" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Resort <span className="text-[#D46A37]">Location</span>
            </h3>
            <p className="text-slate-600">
              Manjampudukollai, Athanavur, Yelagiri Hills, Tamil Nadu,<br />
              India – 635853
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg">
            <Phone className="w-6 h-6 text-[#D46A37]" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Phone <span className="text-[#D46A37]">Number</span>
            </h3>
            <div className="text-slate-600 space-y-1 font-medium">
              <a href="tel:+919710946813" className='hover:text-[#D46A37]'>+91 9710946813</a> / {" "}
              <a href="tel:+919710946816" className='hover:text-[#D46A37]'>+91 9710946816</a>              
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg">
            <Mail className="w-6 h-6 text-[#D46A37]" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Email <span className="text-[#D46A37]">Id</span>
            </h3>
            <div className="text-slate-600 space-y-1">
              <a href="mailto:info@acefriendspark.com" className='underline underline-offset-1 hover:text-[#D46A37]'>info@acefriendspark.com</a> <br />
              <a href="mailto:sales@acefriendspark.com" className='underline underline-offset-1 hover:text-[#D46A37]'>sales@acefriendspark.com</a> <br />
              <a href="mailto:marketing@acefriendspark.com" className='underline underline-offset-1 hover:text-[#D46A37]'>marketing@acefriendspark.com</a>

            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-[#D46A37]" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">
              Marketing <span className="text-[#D46A37]">Office</span>
            </h3>
            <p className="text-slate-600">
              #306, 2nd Floor, NSIC-Software Technology Business Park, B-24, Guindy Industrial Estate, Ekkatuthangal, Chennai-600032, India
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactInfoSection
