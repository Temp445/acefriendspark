import { CheckCircle, Mail, Phone } from 'lucide-react';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto border border-[#D46A37]/20 pt-10 rounded bg-white">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6 shadow-lg animate-bounce">
              <CheckCircle className=" w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            <h1 className="text-2xl md:test-4xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600">
              Your reservation request has been received successfully
            </p>
          </div>

      <div className="bg-white  p-5 md:p-10 mb-8 border-t border-dashed border-[#D46A37]/30">
            <div className="text-center space-y-6">
          
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  We've Got Your <span className='text-[#D46A37]'>Booking!</span>
                </h2>
                <p className="text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
                  Thank you for choosing us. We're excited to host you and make your stay memorable. Our team will contact you shortly to confirm your booking availability and provide detailed pricing information.
                </p>
              </div>

              <div className="pt-6 pb-4 space-y-4">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 rounded-full text-green-700 border border-green-200">
                  <Mail className="w-5 h-5" />
                  <span className="font-medium">Confirmation sent to your email</span>
                </div>
                
                <p className="text-sm text-[#D46A37] max-w-md mx-auto">
                  Our team will reach out within 24 hours to confirm availability and share the final pricing details with you.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 p-5 md:p-8 text-black">
            <h3 className="text-2xl font-bold mb-6 text-white">Need Immediate Assistance?</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white  rounded-xl p-4 backdrop-blur-sm">
                <div className="flex-shrink-0 w-10 h-10 border rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-black mb-1">Call us</p>
                  <p className="font-semibold">+91 9710946813 <br/> +91 9710946816</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white rounded-xl p-4 backdrop-blur-sm">
                <div className="flex-shrink-0 w-10 h-10 border rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-black mb-1">Email us</p>
                  <p className="font-semibold">info@acefriendspark.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage