import { useState, useEffect } from "react";
import { Link } from "wouter";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "information-we-collect", title: "Information Collected" },
  { id: "why-we-collect", title: "Why We Collect Data" },
  { id: "your-controls", title: "Privacy Controls" },
  { id: "sharing", title: "Information Sharing" },
  { id: "security", title: "Security Protocols" },
  { id: "exporting", title: "Export & Deletion" },
  { id: "retaining", title: "Data Retention" },
  { id: "compliance", title: "Regulatory Compliance" },
  { id: "about", title: "About Policy" },
];

export default function Privacy() {
  const [activeSection, setActiveSection] = useState("intro");

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      <div className="min-h-screen bg-black text-[#ededed] font-sans selection:bg-white selection:text-black flex flex-col">
        
        {/* 
          =================================================
          ROW 1: LOCKED ZERO-FLUCTUATION NAVBAR (h-20)
          =================================================
        */}
        <header className="grid grid-cols-1 md:grid-cols-12 border-b border-white/15 w-full sticky top-0 bg-black/90 backdrop-blur-md z-50 h-20">
          {/* Logo Cell */}
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/15 px-6 md:px-8 h-full flex items-center justify-between md:justify-start">
            <Link href="/">
              <img 
                src="/logo.png" 
                alt="buildingit" 
                className="h-8 md:h-10 object-contain invert cursor-pointer" 
              />
            </Link>
            <span className="md:hidden text-xs font-mono text-gray-500 uppercase">Menu</span>
          </div>
          
          {/* Links Cell - Normalized order matching Overview and Terms */}
          <div className="hidden md:flex md:col-span-6 border-r border-white/15 px-8 h-full items-center gap-8 text-[11px] font-mono tracking-[0.2em] uppercase">
            <Link href="/overview" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Overview
            </Link>
            <span className="text-white font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Privacy Policy
            </span>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </Link>
          </div>
          
          {/* Action / Tag Cell */}
          <div className="hidden md:flex md:col-span-3 px-6 md:px-8 h-full items-center justify-end text-[11px] font-mono tracking-widest text-gray-400 uppercase">
            Effective: Oct 2026
          </div>
        </header>

        {/* 
          =================================================
          ROW 2: MAIN CONTENT AREA (SIDEBAR + DOC)
          =================================================
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 w-full flex-1">
          
          {/* LEFT SIDEBAR (Architectural Index) */}
          <aside className="hidden md:block md:col-span-3 border-r border-white/15 relative">
            <div className="sticky top-[80px] p-8 h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar flex flex-col">
              <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-8 block">
                [ Document Index ]
              </span>
              <ul className="flex flex-col">
                {sections.map((sec) => (
                  <li key={sec.id} className="border-b border-white/5 last:border-0">
                    <button
                      onClick={() => scrollTo(sec.id)}
                      className={`w-full text-left py-4 text-xs font-mono tracking-widest uppercase transition-all duration-300 flex justify-between items-center ${
                        activeSection === sec.id
                          ? "text-white translate-x-2"
                          : "text-gray-500 hover:text-gray-300"
                      }`}
                    >
                      <span>{sec.title}</span>
                      {activeSection === sec.id && <span>←</span>}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="md:col-span-9 p-8 md:p-16 lg:p-24 blueprint-bg relative">
            
            {/* Header Section */}
            <div className="mb-24 max-w-4xl">
              <p className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-8">
                Legal & Compliance
              </p>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-display leading-[0.95] text-white mb-8">
                Engineered for trust. <br /> Built for security.
              </h1>
              <p className="text-xl md:text-2xl font-normal text-gray-400 leading-relaxed">
                When you interact with the buildingit ecosystem, you entrust us with critical data. We architect our infrastructure to protect that data with absolute precision.
              </p>

              {/* Structural Privacy Checkup Box */}
              <div className="mt-12 border border-white/15 bg-black p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-white/40 transition-colors cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2">System Action</span>
                  <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-gray-200 transition-colors">Privacy Checkup Protocol</h4>
                </div>
                <button className="border-b border-white text-xs font-mono tracking-widest uppercase pb-1 group-hover:text-gray-400 group-hover:border-gray-400 transition-colors whitespace-nowrap">
                  Initiate Checkup ↗
                </button>
              </div>
            </div>

            {/* Document Sections */}
            <article className="max-w-4xl space-y-24 text-gray-300 leading-relaxed text-lg font-normal">
              
              <section id="intro" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">01</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Introduction</h3>
                </div>
                <p className="mb-4">
                  We build a unified workspace operating system and a suite of applications that help individuals and enterprises manage their digital lives. Our core ecosystem includes:
                </p>
                <ul className="list-none space-y-4 border-l border-white/15 pl-6 mt-6">
                  <li><strong className="text-white font-medium">Empty:</strong> The foundational cloud-based operating system and account layer.</li>
                  <li><strong className="text-white font-medium">Black Hole Browser:</strong> Our isolated, secure workspace browser.</li>
                  <li><strong className="text-white font-medium">Three Pillars:</strong> All-in-one SaaS platform for enterprise operations.</li>
                  <li><strong className="text-white font-medium">Jyanipur:</strong> Specialized platform modernizing construction site workflows.</li>
                  <li><strong className="text-white font-medium">ZX & Grid:</strong> Next-generation networking and digital marketplace engines.</li>
                </ul>
              </section>

              <section id="information-we-collect" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">02</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Information Collected</h3>
                </div>
                <p className="mb-4">We want you to understand the types of information we collect as you navigate our workspace products.</p>
                <p>We collect information to provide better services to all our users — from basic account configurations in Empty, to secure browsing telemetry in Black Hole Browser.</p>
              </section>

              <section id="why-we-collect" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">03</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Why We Collect Data</h3>
                </div>
                <p>We use data to build better products. The information buildingit collects depends on how you use our workspace tools and manage your controls.</p>
              </section>

              <section id="your-controls" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">04</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Privacy Controls</h3>
                </div>
                <p>You have comprehensive choices regarding the information we collect and how it's used across all integrated applications.</p>
              </section>

              <section id="sharing" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">05</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Information Sharing</h3>
                </div>
                <p>We do not share your personal information with entities outside of the buildingit ecosystem except in strict adherence with governing laws.</p>
              </section>

              <section id="security" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">06</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Security Protocols</h3>
                </div>
                <p>We build robust encryption into our core OS (Empty) and browser (Black Hole) to protect your information at all times.</p>
              </section>

              <section id="exporting" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">07</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Export & Deletion</h3>
                </div>
                <p>You can export a complete copy of your workspace data or delete it entirely from your central buildingit Account at any time.</p>
              </section>

              <section id="retaining" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">08</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Data Retention</h3>
                </div>
                <p>We retain the data we collect for different periods depending on its function within the workspace ecosystem.</p>
              </section>

              <section id="compliance" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">09</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Regulatory Compliance</h3>
                </div>
                <p>We regularly review this Privacy Policy and ensure our infrastructure processing complies with global data protection standards.</p>
              </section>

              <section id="about" className="scroll-mt-32 pb-12">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">10</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">About Policy</h3>
                </div>
                <p>This Privacy Policy applies to all services offered by buildingit Private Limited.</p>
              </section>

            </article>
          </main>
        </div>

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
            <Link href="/" className="hover:text-white transition-colors cursor-pointer">Index</Link>
            <Link href="/privacy" className="text-white cursor-pointer">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors cursor-pointer">Terms</Link>
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