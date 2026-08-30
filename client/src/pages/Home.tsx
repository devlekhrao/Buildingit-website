import { useState, useEffect } from "react";
import { Link } from "wouter";
import IntroSequence from "@/components/IntroSequence";
import { ArrowUpRight } from "lucide-react";

// --- INTRO SEQUENCE LOGIC ---
const wasFreshDocumentLoad: boolean = (() => {
  if (typeof window === "undefined") return false;
  try {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
    const isFresh = !nav || nav.type === "reload" || nav.type === "navigate";
    const landedOnHome = window.location.pathname === "/";
    return isFresh && landedOnHome;
  } catch {
    return true;
  }
})();

let introHasPlayed = false;

export default function Home() {
  const [showIntro, setShowIntro] = useState<boolean>(() => wasFreshDocumentLoad && !introHasPlayed);

  useEffect(() => {
    introHasPlayed = true;
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden selection:bg-black selection:text-white scroll-smooth font-sans flex flex-col justify-between">

      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 w-full">
        
        {/* ULTRA-PURE HERO STATEMENT */}
        <section className="mb-24">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-black max-w-4xl mb-6 leading-tight">
            Architecting Next-Generation Technology.
          </h1>

          <p className="text-base sm:text-lg text-gray-500 font-normal max-w-xl leading-relaxed">
            Independent ventures scaling under one unified infrastructure.
          </p>
        </section>

        {/* PURE LOGO MATRIX */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* 1. JYANIPUR */}
            <div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative">
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src="/jyanipur.png" 
                    alt="Jyanipur" 
                    className="h-28 sm:h-40 w-auto object-contain" 
                    style={{ transform: "scale(1.25)" }} 
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>

            {/* 2. THREE PILLARS */}
            <div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative">
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src="/threepillars.png" 
                    alt="Three Pillars" 
                    className="h-28 sm:h-40 w-auto object-contain" 
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>

            {/* 3. GRID */}
            <div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative">
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src="/grid.png" 
                    alt="Grid" 
                    className="h-28 sm:h-40 w-auto object-contain" 
                    style={{ 
                      transform: "scale(1.6)", 
                      filter: "invert(1) grayscale(1) contrast(300%)", 
                      mixBlendMode: "multiply",
                      clipPath: "inset(12% 12% 12% 12%)"
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>

            {/* 4. FIRSTFEEDBACK */}
            <div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative">
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src="/firstfeedback.png" 
                    alt="FirstFeedback" 
                    className="h-28 sm:h-40 w-auto object-contain" 
                    style={{ 
                      transform: "scale(1.4)", 
                      filter: "invert(1) grayscale(1) contrast(300%)", 
                      mixBlendMode: "multiply",
                      clipPath: "inset(12% 12% 12% 12%)"
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>

            {/* 5. ZX */}
            <div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative">
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src="/zx.png" 
                    alt="ZX" 
                    className="h-28 sm:h-40 w-auto object-contain" 
                    style={{ 
                      transform: "scale(1.4)", 
                      filter: "invert(1) grayscale(1) contrast(300%)", 
                      mixBlendMode: "multiply",
                      clipPath: "inset(12% 12% 12% 12%)"
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>

            {/* 6. AUTHENTICATOR */}
            <div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative">
              <div className="flex-1 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src="/Authenticator.png" 
                    alt="Authenticator" 
                    className="h-28 sm:h-40 w-auto object-contain" 
                    style={{ transform: "scale(1.3)" }}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>

            {/* 7. BROWSER / DEVD */}
            <div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative overflow-hidden">
              <div className="flex-1 flex items-center justify-center overflow-visible">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src="/browser.png" 
                    alt="Browser" 
                    className="h-28 sm:h-40 w-auto object-contain" 
                    style={{ transform: "scale(1.4)" }}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4 relative z-10">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>

            {/* 8. GRAPES */}
            <div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative overflow-hidden">
              <div className="flex-1 flex items-center justify-center overflow-visible">
                <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src="/grapes.png" 
                    alt="Grapes" 
                    className="h-28 sm:h-40 w-auto object-contain" 
                    style={{ transform: "scale(2.1) translateY(28px)" }}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4 relative z-10">
                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
            </div>
{/* 9. EMPTY */}
<div className="group cursor-pointer bg-white border border-gray-200 shadow-sm rounded-2xl p-10 flex flex-col justify-between aspect-[4/3] hover:border-black hover:shadow-md transition-all duration-500 relative overflow-hidden">
  <div className="flex-1 flex items-center justify-center overflow-visible">
    <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
      <img 
        src="/empty.png" 
        alt="EMPTY" 
        className="h-28 sm:h-40 w-auto object-contain" 
        style={{ transform: "scale(2.2)" }}
      />
    </div>
  </div>
  <div className="flex justify-end pt-4 relative z-10">
    <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-black transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
  </div>
</div>

          </div>
        </section>
      </main>

      {/* ALPHABET-STYLE MINIMAL FOOTER */}
      <footer className="bg-[#f8f9fa] border-t border-gray-100 py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          {/* Prominent Logo */}
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="buildingit" 
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer" 
            />
          </Link>

          {/* Simple horizontal links */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-xs text-gray-600 font-medium">
            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms
            </Link>
            <a href="mailto:legal@buildingit.in" className="hover:text-black transition-colors">
              legal@buildingit.in
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}