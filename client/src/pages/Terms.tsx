import { useState, useEffect } from "react";
import { Link } from "wouter";

const sections = [
  { id: "intro", title: "Introduction" },
  { id: "relationship", title: "Your Relationship" },
  { id: "using", title: "Using Services" },
  { id: "content", title: "Content Rights" },
  { id: "software", title: "Software License" },
  { id: "problems", title: "Dispute Resolution" },
  { id: "about", title: "About Terms" },
];

export default function Terms() {
  const [activeSection, setActiveSection] = useState("intro");

  // Routes to main holding company site on production, local root during development
  const mainSiteUrl =
    typeof window !== "undefined" && window.location.hostname.includes("localhost")
      ? "/"
      : "https://www.buildingit.in";

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
          
          {/* Links Cell - Standardized order across all pages */}
          <div className="hidden md:flex md:col-span-6 border-r border-white/15 px-8 h-full items-center gap-8 text-[11px] font-mono tracking-[0.2em] uppercase">
            <Link href="/overview" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Overview
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </Link>
            <span className="text-white font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Terms of Service
            </span>
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

          {/* RIGHT CONTENT (The Manifesto-style Document) */}
          <main className="md:col-span-9 p-8 md:p-16 lg:p-24 blueprint-bg relative">
            
            {/* Header Section */}
            <div className="mb-24 max-w-4xl">
              <p className="text-gray-500 font-mono text-sm tracking-widest uppercase mb-8">
                Legal & Compliance
              </p>
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-display leading-[0.95] text-white mb-8">
                Operational Boundaries. <br /> System Protocols.
              </h1>
              <p className="text-xl md:text-2xl font-normal text-gray-400 leading-relaxed">
                We know it’s tempting to skip these Terms of Service, but it’s important to establish what you can expect from us as you use the buildingit ecosystem, and what we expect from you.
              </p>

              {/* Structural Document Action Box */}
              <div className="mt-12 border border-white/15 bg-black p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:border-white/40 transition-colors cursor-pointer">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-2">System Document</span>
                  <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-gray-200 transition-colors">Legal Master PDF</h4>
                  <p className="text-sm text-gray-500 mt-1">Country version: India</p>
                </div>
                <button className="border-b border-white text-xs font-mono tracking-widest uppercase pb-1 group-hover:text-gray-400 group-hover:border-gray-400 transition-colors whitespace-nowrap">
                  Initiate Download ↗
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
                  These Terms of Service reflect the way buildingit’s workspace operates, the laws that apply to our company, and certain principles we hold true.
                </p>
              </section>

              <section id="relationship" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">02</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Your relationship with buildingit</h3>
                </div>
                <p>
                  These terms help define the relationship between you and buildingit Private Limited. Broadly speaking, we give you permission to use our operating system and applications if you agree to follow these terms.
                </p>
              </section>

              <section id="using" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">03</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Using buildingit services</h3>
                </div>
                <p>We provide a broad range of workspace services that are subject to these terms.</p>
              </section>

              <section id="content" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">04</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Content in buildingit services</h3>
                </div>
                <p>Some of our services allow you to manage and submit content. You retain intellectual property rights to your content within your Empty account workspace.</p>
              </section>

              <section id="software" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">05</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">Software in buildingit services</h3>
                </div>
                <p>Our ecosystem includes client software like Black Hole Browser. We grant you a personal, non-exclusive license to use this software solely for accessing our services.</p>
              </section>

              <section id="problems" className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">06</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">In case of problems</h3>
                </div>
                <p>Both the law and these terms give you the right to (1) a certain quality of secure service, and (2) ways to fix problems if things go wrong.</p>
              </section>

              <section id="about" className="scroll-mt-32 pb-12">
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-xs font-mono text-gray-500 border border-white/15 px-2.5 py-1">07</span>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-display text-white">About these terms</h3>
                </div>
                <p>By law, you have certain rights that can’t be limited by a contract like these terms of service.</p>
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
            <a href={mainSiteUrl} className="hover:text-white transition-colors cursor-pointer">
              Index
            </a>
            <Link href="/overview" className="hover:text-white transition-colors cursor-pointer">
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