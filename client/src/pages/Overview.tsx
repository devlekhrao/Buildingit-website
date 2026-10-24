import { Link } from "wouter";

const DIRECTORY_ITEMS = [
  {
    id: "01",
    tag: "Legal Protocol",
    title: "Privacy Policy",
    desc: "Explains data governance across the buildingit ecosystem, telemetry collection parameters, and user data rights.",
    linkText: "Review Policy",
    href: "/privacy",
    internal: true,
  },
  {
    id: "02",
    tag: "Governance",
    title: "Terms of Service",
    desc: "Establishes the operational framework, licensing parameters, and contractual standards for our operating systems and apps.",
    linkText: "Review Terms",
    href: "/terms",
    internal: true,
  },
  {
    id: "03",
    tag: "Infrastructure",
    title: "Security Center",
    desc: "Architectural overview of built-in zero-knowledge encryption, isolated runtimes, and enterprise-grade threat defense.",
    linkText: "Security Overview",
    href: "#",
    internal: false,
  },
  {
    id: "04",
    tag: "Identity Core",
    title: "Empty Account System",
    desc: "The root cryptographic authentication layer governing user identities and permissions across every integrated environment.",
    linkText: "Manage Identity",
    href: "#",
    internal: false,
  },
  {
    id: "05",
    tag: "Foundations",
    title: "Operating Principles",
    desc: "The architectural axioms guiding how buildingit scales software, secures user trust, and engineers resilient digital systems.",
    linkText: "Read Principles",
    href: "#",
    internal: false,
  },
  {
    id: "06",
    tag: "Telemetry Matrix",
    title: "Product Privacy Guide",
    desc: "Granular controls for Black Hole Browser, Empty OS, Three Pillars, Jyanipur, Grid, and the ZX network.",
    linkText: "Access Matrix",
    href: "#",
    internal: false,
  },
];

export default function Overview() {
  // Routes to main holding company site on production, local root during development
  const mainSiteUrl =
    typeof window !== "undefined" && window.location.hostname.includes("localhost")
      ? "/"
      : "https://www.buildingit.in";

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

      <div className="min-h-screen bg-black text-[#ededed] font-sans selection:bg-white selection:text-black flex flex-col">
        
        {/* 
          =================================================
          ROW 1: LOCKED ZERO-FLUCTUATION NAVBAR (h-20)
          =================================================
        */}
        <header className="grid grid-cols-1 md:grid-cols-12 border-b border-white/15 w-full sticky top-0 bg-black/90 backdrop-blur-md z-50 h-20">
          {/* Logo Cell -> Routes back to parent holding company domain */}
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/15 px-6 md:px-8 h-full flex items-center justify-between md:justify-start">
            <a href={mainSiteUrl}>
              <img 
                src="/logo.png" 
                alt="buildingit" 
                className="h-8 md:h-10 object-contain invert cursor-pointer" 
              />
            </a>
            <span className="md:hidden text-xs font-mono text-gray-500 uppercase">Menu</span>
          </div>
          
          {/* Links Cell */}
          <div className="hidden md:flex md:col-span-6 border-r border-white/15 px-8 h-full items-center gap-8 text-[11px] font-mono tracking-[0.2em] uppercase">
            <span className="text-white font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Overview
            </span>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </Link>
          </div>
          
          {/* Action / Tag Cell */}
          <div className="hidden md:flex md:col-span-3 px-6 md:px-8 h-full items-center justify-end text-[11px] font-mono tracking-widest text-gray-400 uppercase">
            Directory Index
          </div>
        </header>

        {/* 
          =================================================
          ROW 2: HERO BANNER
          =================================================
        */}
        <section className="border-b border-white/15 w-full relative blueprint-bg">
          <div className="p-8 md:p-16 lg:p-24 max-w-5xl">
            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-8">
              Governance & Architecture
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-display leading-[0.95] text-white mb-8">
              System Directory.
            </h1>
            <p className="text-xl md:text-2xl font-normal text-gray-400 leading-relaxed max-w-3xl">
              Centralized operational standards, privacy frameworks, and legal protocols governing the buildingit Private Limited holding ecosystem.
            </p>
          </div>
        </section>

        {/* 
          =================================================
          ROW 3: DIRECTORY BENTO GRID
          =================================================
        */}
        <main className="w-full flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {DIRECTORY_ITEMS.map((item, index) => {
              const isRightCol = (index + 1) % 3 === 0;
              const content = (
                <div 
                  className={`p-8 md:p-12 border-b border-white/15 ${!isRightCol ? 'lg:border-r' : ''} ${index % 2 === 0 ? 'md:border-r lg:border-r-0' : ''} flex flex-col justify-between min-h-[340px] group hover:bg-white transition-colors duration-500 relative cursor-pointer`}
                >
                  <div>
                    {/* Header: ID + Tag */}
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1 group-hover:border-black/20 group-hover:text-gray-700 transition-colors">
                        {item.id}
                      </span>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-gray-400 group-hover:text-black transition-colors">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h2 className="text-2xl md:text-3xl font-bold tracking-display text-white group-hover:text-black transition-colors mb-4">
                      {item.title}
                    </h2>
                    <p className="text-sm md:text-base font-normal text-gray-400 group-hover:text-gray-800 transition-colors leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Footer Link / Action */}
                  <div className="pt-8 mt-8 border-t border-white/10 group-hover:border-black/10 flex items-center justify-between transition-colors">
                    <span className="text-xs font-mono tracking-widest uppercase text-gray-300 group-hover:text-black transition-colors font-medium">
                      {item.linkText}
                    </span>
                    <span className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-300">
                      ↗
                    </span>
                  </div>
                </div>
              );

              return item.internal ? (
                <Link key={item.id} href={item.href}>
                  {content}
                </Link>
              ) : (
                <a key={item.id} href={item.href}>
                  {content}
                </a>
              );
            })}
          </div>
        </main>

        {/* 
          =================================================
          FOOTER GRID
          =================================================
        */}
        <footer className="grid grid-cols-1 md:grid-cols-12 w-full text-[11px] font-mono tracking-widest uppercase text-gray-500 bg-black border-t border-white/15">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/15 p-6 md:p-8 flex items-center">
            © {new Date().getFullYear()} buildingit Private Limited.
          </div>
          <div className="md:col-span-6 border-b md:border-b-0 md:border-r border-white/15 p-6 md:p-8 flex items-center gap-8">
            <a href={mainSiteUrl} className="hover:text-white transition-colors cursor-pointer">
              Index
            </a>
            <Link href="/overview" className="text-white cursor-pointer font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Buildingit Policies
            </Link>
          </div>
          <div className="md:col-span-3 p-6 md:p-8 flex items-center justify-end relative">
            <select className="bg-transparent text-gray-400 font-mono tracking-widest uppercase border-b border-white/15 pb-1 appearance-none pr-6 focus:outline-none focus:text-white cursor-pointer transition-colors">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
            <div className="absolute right-8 md:right-10 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1L5 5L9 1" />
              </svg>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}