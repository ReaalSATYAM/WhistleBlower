import React from 'react';

const Hero = () => {
  return (
    <div className="bg-blue-900 text-white py-24 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
          Secure Whistleblower Portal
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-blue-100 mb-10">
          Anonymous reporting with blockchain-secured evidence.
          <br className="hidden md:block" />
          Zero tracking. 100% Confidential.
        </p>
        
        {/* Action Button (Scrolls down to form) */}
        <a 
          href="#report" 
          className="inline-block bg-white text-blue-900 font-bold text-lg py-4 px-10 rounded-full shadow-2xl hover:bg-blue-50 transition-transform transform hover:-translate-y-1"
        >
          Submit Anonymous Report ↓
        </a>
      </div>
    </div>
  );
};

export default Hero;