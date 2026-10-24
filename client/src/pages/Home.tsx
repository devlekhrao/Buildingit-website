import { useEffect, useState } from "react";
import { Link } from "wouter";

const VENTURES = [
  { 
    id: "01", 
    name: "Cloud Systems", 
    appName: "Empty",
    desc: "Cloud-based operating system and unified account layer.", 
    metric: "OS CORE" 
  },
  { 
    id: "02", 
    name: "Web Infrastructure", 
    appName: "Black Hole",
    desc: "Isolated, high-performance workspace browser.", 
    metric: "BROWSER" 
  },
  { 
    id: "03", 
    name: "Enterprise SaaS", 
    appName: "Three Pillars",
    desc: "All-in-one software ecosystem for business operations.", 
    metric: "B2B SUITE" 
  },
  { 
    id: "04", 
    name: "Construction Tech", 
    appName: "Jyanipur",
    desc: "Specialized platform modernizing physical site management.", 
    metric: "AEC SAAS" 
  },
  { 
    id: "05", 
    name: "Digital Networks", 
    appName: "ZX",
    desc: "Next-generation social media and interaction platform.", 
    metric: "SOCIAL" 
  },
  { 
    id: "06", 
    name: "Digital Commerce", 
    appName: "Grid",
    desc: "High-frequency digital marketplace and exchange ecosystem.", 
    metric: "MARKETPLACE" 
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredVenture, setHoveredVenture] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Use local route during development, live subdomain on production
  const policiesUrl =
    typeof window !== "undefined" && window.location.hostname.includes("localhost")
      ? "/overview"
      : "https://policies.buildingit.in";

  return (
    <>
      <style>{`
        /* 
          BUILDINGIT BESPOKE TYPOGRAPHY SYSTEM 
          No external fonts. 100% native rendering for maximum precision.
        */
        :root {
          --font-sans: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          --font-mono: "SFMono-Regular", ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }

        html {
          scrollbar-gutter: stable;
        }

        body {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        .font-sans {
          font-family: var(--font-sans) !important;
        }
        .font-mono {
          font-family: var(--font-mono) !important;
        }

        /* Custom tight kerning for large display text */
        .tracking-display {
          letter-spacing: -0.04em;
        }

        /* Architectural Grid Background */
        .blueprint-bg {
          background-image: 
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; border-left: 1px solid rgba(255,255,255,0.1); }
        ::-webkit-scrollbar-thumb { background: #333; }
        ::-webkit-scrollbar-thumb:hover { background: #666; }
      `}</style>

      <div 
        className={`min-h-screen bg-black text-[#ededed] font-sans selection:bg-white selection:text-black transition-opacity duration-1000 ease-in-out flex flex-col ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        
        {/* 
          =================================================
          ROW 1: LOCKED ZERO-FLUCTUATION NAVBAR (h-20)
          =================================================
        */}
        <header className="grid grid-cols-1 md:grid-cols-12 border-b border-white/15 w-full sticky top-0 bg-black/90 backdrop-blur-md z-50 h-20">
          {/* Logo Cell */}
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/15 px-6 md:px-8 h-full flex items-center justify-between md:justify-start">
            <Link href="/">
              <img src="/logo.png" alt="buildingit" className="h-8 md:h-10 object-contain invert cursor-pointer" />
            </Link>
            <span className="md:hidden text-xs font-mono text-gray-500 uppercase">Menu</span>
          </div>
          
          {/* Links Cell */}
          <div className="hidden md:flex md:col-span-6 border-r border-white/15 px-8 h-full items-center gap-8 text-[11px] font-mono tracking-[0.2em] uppercase text-gray-400">
            <a href="#ecosystem" className="hover:text-white transition-colors">Ecosystem</a>
            <a href="#manifesto" className="hover:text-white transition-colors">Manifesto</a>
          </div>
          
          {/* Action Cell */}
          <div className="hidden md:flex md:col-span-3 px-6 md:px-8 h-full items-center justify-end">
            <button className="text-[11px] font-mono tracking-[0.2em] uppercase text-white hover:text-gray-400 transition-colors flex items-center gap-2">
              Investor Portal
            </button>
          </div>
        </header>

        {/* 
          =================================================
          ROW 2: HERO SECTION
          =================================================
        */}
        <section className="border-b border-white/15 w-full relative blueprint-bg">
          <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center min-h-[60vh] md:min-h-[80vh] relative overflow-hidden group">
            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-8 md:mb-12">
              Overview
            </p>
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] font-bold tracking-display leading-[0.9] text-white max-w-5xl">
              Engineered for <br className="hidden md:block" /> global scale.
            </h1>
          </div>
        </section>

        {/* 
          =================================================
          ROW 3: THE ECOSYSTEM
          =================================================
        */}
        <section id="ecosystem" className="flex flex-col w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/15">
            <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/15 p-6 md:p-8 flex items-center">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">The Ecosystem</h2>
            </div>
            <div className="md:col-span-9 p-6 md:p-8 flex items-center">
              <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                06 Operating Subsidiaries
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {VENTURES.map((venture, index) => {
              const isHovered = hoveredVenture === venture.id;
              const isRightCol = (index + 1) % 3 === 0;
              
              return (
                <div 
                  key={venture.id}
                  onMouseEnter={() => setHoveredVenture(venture.id)}
                  onMouseLeave={() => setHoveredVenture(null)}
                  className={`relative p-8 md:p-12 border-b border-white/15 ${!isRightCol ? 'lg:border-r' : ''} ${index % 2 === 0 ? 'md:border-r lg:border-r-0' : ''} cursor-pointer transition-colors duration-500 flex flex-col justify-between min-h-[320px] group`}
                >
                  <div className={`absolute inset-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom ${isHovered ? "scale-y-100" : "scale-y-0"}`}></div>

                  <div className="relative z-10 flex justify-between items-start mb-12">
                    <span className={`font-mono text-sm transition-colors duration-300 ${isHovered ? "text-gray-400" : "text-gray-600"}`}>
                      {venture.id}
                    </span>
                    <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${isHovered ? "text-black" : "text-gray-500"}`}>
                      {venture.metric}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className={`block text-[10px] font-mono tracking-widest uppercase mb-3 transition-all duration-300 ${isHovered ? "text-gray-500 opacity-100 translate-y-0" : "opacity-0 translate-y-2 absolute"}`}>
                      Live Subsidiary
                    </span>
                    
                    <h3 className={`text-4xl font-bold tracking-display mb-4 transition-colors duration-300 ${isHovered ? "text-black" : "text-white"}`}>
                      {isHovered ? venture.appName : venture.name}
                    </h3>
                    
                    <p className={`text-base font-normal transition-colors duration-300 ${isHovered ? "text-gray-800" : "text-gray-400"}`}>
                      {venture.desc}
                    </p>
                  </div>

                  <div className={`absolute bottom-12 right-12 transition-all duration-300 ${isHovered ? "opacity-100 translate-x-0 text-black" : "opacity-0 -translate-x-4 text-white"}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 
          =================================================
          ROW 4: THE FULL MANIFESTO
          =================================================
        */}
        <section id="manifesto" className="grid grid-cols-1 md:grid-cols-12 border-b border-white/15 w-full bg-white text-black">
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-black/10 p-8 md:p-16 lg:p-24 flex flex-col justify-start">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-display leading-[1.05] sticky top-32">
              The world operates in disconnected fragments.
            </h2>
          </div>
          
          <div className="md:col-span-7 p-8 md:p-16 lg:p-24 flex flex-col justify-center text-lg md:text-xl font-normal text-gray-800 space-y-8 leading-relaxed">
            <p>
              A massive holding company isn't built by launching scattered applications. It is built by securing the foundational layers of human progress. From the data centers that power artificial intelligence, to the financial ledgers that move global capital.
            </p>
            <p>
              We established buildingit Private Limited to solve systemic fragmentation. We look at software, infrastructure, commerce, and digital networks not as separate industries, but as interconnected nodes in a single global operating system. The future requires a unified approach.
            </p>
            <p>
              We are not a traditional technology firm. We do not seek short-term exits or trend-chasing consumer products. We take long-term bets on complex problems. We build the unglamorous, highly necessary systems that run quietly in the background of global progress.
            </p>
            <p>
              We operate silently in the background. We acquire, scale, and engineer the infrastructure of tomorrow. We are the bridge between what is built today and what will sustain humanity tomorrow.
            </p>
            <div className="pt-8 mt-8 border-t border-black/10">
              <p className="font-semibold tracking-tight text-black">
                If the world needs it, we are building it.
              </p>
              <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mt-2">
                — The Board of Directors
              </p>
            </div>
          </div>
        </section>

        {/* 
          =================================================
          FOOTER GRID
          =================================================
        */}
        <footer className="grid grid-cols-1 md:grid-cols-12 w-full text-[11px] font-mono tracking-widest uppercase text-gray-500 bg-black border-t border-white/15">
          <div className="md:col-span-6 border-b md:border-b-0 md:border-r border-white/15 p-6 md:p-8 flex items-center">
            © {new Date().getFullYear()} buildingit Private Limited. All rights reserved.
          </div>
          <div className="md:col-span-6 p-6 md:p-8 flex items-center gap-8">
            <a 
              href={policiesUrl}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Buildingit Policies
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}