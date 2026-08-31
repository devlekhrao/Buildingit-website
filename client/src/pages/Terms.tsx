import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col justify-between selection:bg-black selection:text-white">
      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-20 w-full">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Terms of Service</h1>
        <p className="text-xs text-gray-400 mb-10">Effective August 2026 · Building It Private Limited</p>

        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <p>
            Welcome to the holding portal of Building It Private Limited ("buildingit", "we", "us"). By accessing or utilizing this website, you unconditionally agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please refrain from using this website.
          </p>

          <div>
            <h2 className="text-black font-semibold text-sm mb-1">1. Holding Entity Protocol</h2>
            <p>This website serves as an official corporate directory for Building It Private Limited. The information provided herein is for institutional informational purposes regarding our structure and autonomous ventures.</p>
          </div>

          <div>
            <h2 className="text-black font-semibold text-sm mb-1">2. Intellectual Property Rights</h2>
            {/* UPDATED: Added Authenticator, Browser, Grapes, and empty to the list */}
            <p>All trademarks, logos, operational marks, brand assets, and visual materials displayed on this site (including Jyanipur, Three Pillars, Grid, FirstFeedback, ZX, Authenticator, Browser, Grapes, and empty) are the exclusive intellectual property of Building It Private Limited. Unauthorized replication, modification, or commercial exploitation is strictly prohibited.</p>
          </div>

          <div>
            <h2 className="text-black font-semibold text-sm mb-1">3. Unreleased Ventures & Availability</h2>
            <p>Product concepts, operational timelines, and technical previews displayed across our entity showcase are subject to evolution. Building It Private Limited makes no express warranties regarding unbroken site uptime or immediate public availability of developing infrastructure.</p>
          </div>

          <div>
            <h2 className="text-black font-semibold text-sm mb-1">4. Legal Communications</h2>
            <p>Official legal notices or inquiries regarding corporate governance should be directed to our legal desk at <a href="mailto:legal@buildingit.in" className="text-black underline font-medium">legal@buildingit.in</a>.</p>
          </div>
        </div>
      </main>

      <footer className="bg-[#f8f9fa] border-t border-gray-100 py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link href="/">
            <img 
              src="/logo.png" 
              alt="buildingit" 
              className="h-10 sm:h-12 w-auto object-contain cursor-pointer" 
            />
          </Link>
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