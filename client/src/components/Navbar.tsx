import { Link, useLocation } from "wouter";

interface NavbarProps {
  rightLabel?: string;
}

export default function Navbar({ rightLabel = "Investor Portal" }: NavbarProps) {
  const [location] = useLocation();

  const links = [
    { label: "Overview", href: "/overview" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <header className="grid grid-cols-1 md:grid-cols-12 border-b border-white/15 w-full sticky top-0 bg-black/90 backdrop-blur-md z-50 h-20">
      
      {/* 1. Logo Cell (Fixed md:col-span-3) */}
      <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-white/15 px-6 md:px-8 h-full flex items-center justify-between md:justify-start">
        <Link href="/">
          <img 
            src="/logo.png" 
            alt="buildingit" 
            className="h-7 md:h-8 object-contain invert cursor-pointer" 
          />
        </Link>
        <span className="md:hidden text-xs font-mono text-gray-500 uppercase">Menu</span>
      </div>

      {/* 2. Standardized Links Cell (Fixed md:col-span-6) */}
      <div className="hidden md:flex md:col-span-6 border-r border-white/15 px-8 h-full items-center gap-8 text-[11px] font-mono tracking-[0.2em] uppercase">
        {links.map((link) => {
          const isActive = location === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors flex items-center gap-2 cursor-pointer ${
                isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white"
              }`}
            >
              {isActive && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Action / Status Cell (Fixed md:col-span-3) */}
      <div className="hidden md:flex md:col-span-3 px-6 md:px-8 h-full items-center justify-end text-[11px] font-mono tracking-widest text-gray-400 uppercase">
        <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-2">
          {rightLabel}
        </span>
      </div>

    </header>
  );
}