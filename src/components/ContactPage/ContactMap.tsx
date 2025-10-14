import React from "react";

const ContactMap = () => {
  return (
   <div className="px-4 lg:px-10">
     <div className="mt-12 max-h-[60vh] bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-7xl mb-20">
      <div className="aspect-video bg-slate-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3893.9879756295036!2d78.643346!3d12.583044!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3badaabd9f53e4cd%3A0x416101ed84755257!2sAce%20Friends%20Park!5e0!3m2!1sen!2sus!4v1759818480236!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
   </div>
  );
};
export default ContactMap;
