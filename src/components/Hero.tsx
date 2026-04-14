import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden font-sans bg-black text-white px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 pointer-events-none bg-transparent" />

      <div className="relative z-10 w-full max-w-6xl mx-auto py-20 sm:py-24 md:py-28 grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-center">
        {/* ── LEFT ── */}
        <div className="flex flex-col gap-5 sm:gap-6 items-start md:items-start text-left">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10 text-xs sm:text-sm font-mono tracking-widest text-white/60 w-fit max-w-full">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Open to work
          </span>

          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-wide text-gray-300 break-words">
              BANDIKATLA<br />SAI SATYA<br />KARTHIKEYA
            </h1>
          </div>

          <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-gray-300">
            Full Stack <span className="text-white/30">/</span> AI Developer
          </div>

          <div className="font-mono text-xs sm:text-sm tracking-wider text-white/40 flex items-center gap-2 flex-wrap">
            <i className="fas fa-map-marker-alt text-lg" />
            Final-year B.Tech · AU
          </div>

          <div className="font-mono text-sm sm:text-base md:text-lg min-h-8 flex items-center gap-1 flex-wrap">
            <span className="text-white/30">›_</span>
            <span className="transition-colors duration-300">
              I build things for the web.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
            <a href="#projects" className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-yellow-500 text-black font-bold text-sm sm:text-base tracking-wider rounded-lg shadow-lg hover:bg-yellow-400 transition-transform transform hover:-translate-y-1 w-full sm:w-auto">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/20">
                <i className="fas fa-rocket" />
              </span>
              View Projects
            </a>
            <a
              href="https://drive.google.com/file/d/1Wiw9VPLHhbg_UEFy4xFPcrsXcBjcrtDa/view?usp=drive_link"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-6 py-3 bg-white/10 text-white/80 font-bold text-sm sm:text-base tracking-wider rounded-lg border border-white/20 shadow-md hover:bg-white/20 transition-transform transform hover:-translate-y-1 w-full sm:w-auto"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30">
                <i className="fas fa-download" />
              </span>
              Resume
            </a>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="relative flex items-center justify-center h-full min-h-[280px] sm:min-h-[360px] md:min-h-[400px] order-first md:order-last">
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 max-w-full">
            <img
              src="/2026.png"
              alt="Karthikeya"
              className="w-full h-full rounded-full object-cover border-4 border-white/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;