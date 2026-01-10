import React from 'react';

const Hero = () => {
  return (
    <div className="relative bg-slate-900 pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-300">Secure & Confidential</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white leading-tight">
          Speak Up <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-400">
            Without Fear
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Anonymous reporting powered by blockchain technology. 
          Zero tracking, immutable evidence, and complete protection for whistleblowers.
        </p>
        
        {/* Action Button */}
        <a 
          href="#report" 
          className="inline-flex items-center justify-center bg-teal-500 hover:bg-teal-400 text-white font-semibold text-lg py-4 px-10 rounded-xl shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-1"
        >
          Submit Anonymous Report
        </a>
      </div>
    </div>
  );
};

export default Hero;