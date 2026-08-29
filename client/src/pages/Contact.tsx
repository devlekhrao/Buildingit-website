import { Home as HomeIcon, User, Newspaper } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen bg-white text-black relative overflow-x-hidden selection:bg-black selection:text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Floating Silver Top Bar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl px-2">
        <nav className="bg-[#f3f4f6] border border-gray-200 shadow-sm flex items-center justify-between gap-2 rounded-full px-5 py-3">
          <Link href="/" className="font-extrabold text-2xl tracking-tighter text-black lowercase cursor-pointer">buildingit</Link>
          <div className="hidden md:flex items-center space-x-2 text-xs font-bold tracking-widest uppercase">
            <Link href="/" className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition-all">
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link href="/founder" className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition-all">
              <User className="w-4 h-4" />
              <span>About Us</span>
            </Link>
            <Link href="/magazine" className="flex items-center space-x-2 px-5 py-2.5 rounded-full text-gray-500 hover:bg-gray-200 hover:text-black transition-all">
              <Newspaper className="w-4 h-4" />
              <span>Magazine</span>
            </Link>
          </div>
        </nav>
      </header>

      {/* MAIN CONTACT CONTENT */}
      <main className="pt-40 pb-24 px-6 md:px-12 max-w-4xl mx-auto min-h-[70vh]">
        <span className="text-xs sm:text-sm tracking-[0.3em] text-gray-400 font-bold uppercase border-l-2 border-black pl-4 mb-8 block">
          Communication Protocol
        </span>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase mb-8 leading-[0.9]">Developer Contact</h1>
        <p className="text-sm font-medium text-gray-500 tracking-widest uppercase leading-relaxed mb-16 max-w-2xl">
          Buildingit is committed to supporting our users and partners. For application support, privacy inquiries, or corporate governance matters, please reach out directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-200 pt-16">
          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">Direct Support</h2>
            <p className="text-2xl font-black tracking-tight uppercase">Muniram Suthar</p>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-6 mt-1">Managing Director</p>
            <a href="mailto:muniram@buildingit.in" className="text-sm font-bold border-b-2 border-black hover:text-gray-500 hover:border-gray-500 transition-colors pb-1">
              muniram@buildingit.in
            </a>
            <p className="text-sm font-bold mt-6">+91 98765 43210</p>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-6">Global Headquarters</h2>
            <p className="text-sm font-bold text-black uppercase tracking-wider leading-relaxed">
              Buildingit Inc.<br />
              Hyderabad, Telangana<br />
              India
            </p>
          </div>
        </div>
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="border-t border-gray-200 bg-[#050505] text-white pt-20 pb-12 px-6 md:px-12 mt-12 rounded-t-[3rem] mx-2 mb-2">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="flex flex-col justify-between h-full md:col-span-1 min-h-[150px]">
            <div className="font-extrabold text-2xl tracking-tighter lowercase">
              buildingit
            </div>
            <div className="mt-auto pt-8">
              <p className="text-sm font-bold tracking-wide">Muniram Suthar</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Managing Director</p>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Global Operations</h4>
            <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">Hyderabad Command Center</a>
            <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">Enterprise Support</a>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Media & Governance</h4>
            <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">Investor Relations</a>
            <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">Corporate Governance</a>
          </div>

          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">Legal Protocol</h4>
            <Link href="/privacy" className="text-xs text-gray-300 hover:text-white transition-colors">Privacy Architecture</Link>
            <Link href="/contact" className="text-xs text-gray-300 hover:text-white transition-colors">Developer Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}