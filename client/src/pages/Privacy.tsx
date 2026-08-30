import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col justify-between selection:bg-black selection:text-white">
      <main className="max-w-4xl mx-auto px-6 md:px-12 pt-16 pb-20 w-full">
        <Link href="/" className="inline-flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-gray-400 hover:text-black transition-colors mb-10">
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Privacy Policy</h1>
        <p className="text-xs text-gray-400 mb-10">Effective August 2026 · Building It Private Limited</p>

        <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
          <p>
            Building It Private Limited ("buildingit") operates this holding company website. This Privacy Policy outlines our data handling practices for visitors to this portal.
          </p>
          
          <div>
            <h2 className="text-black font-semibold text-sm mb-1">Data Collection</h2>
            <p>We do not track visitors across websites, collect personal telemetry, or deploy marketing cookies on this portal. Any data logged is standard server telemetry used solely for security and performance maintenance.</p>
          </div>

          <div>
            <h2 className="text-black font-semibold text-sm mb-1">Unreleased Operations</h2>
            <p>Autonomous technology ventures under buildingit operate independently. Specific privacy protocols for active services are issued upon the public launch of each respective platform.</p>
          </div>

          <div>
            <h2 className="text-black font-semibold text-sm mb-1">Contact</h2>
            <p>Direct all privacy inquiries to <a href="mailto:legal@buildingit.in" className="text-black underline font-medium">legal@buildingit.in</a>.</p>
          </div>
        </div>
      </main>

      <footer className="bg-[#f8f9fa] border-t border-gray-100 py-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-gray-600">
          <Link href="/">
            <img src="/logo.png" alt="buildingit" className="h-10 sm:h-12 w-auto object-contain cursor-pointer" />
          </Link>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-black">Privacy</Link>
            <Link href="/terms" className="hover:text-black">Terms</Link>
            <a href="mailto:legal@buildingit.in" className="hover:text-black">legal@buildingit.in</a>
          </div>
        </div>
      </footer>
    </div>
  );
}