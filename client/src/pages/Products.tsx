import { Link } from "wouter";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sector: string;
  description: string;
  status: string;
}

const PRODUCTS: Product[] = [
  {
    id: "jyanipur",
    name: "Jyanipur",
    sector: "Media & Content Infrastructure",
    description: "Decentralized publishing and media distribution networks engineered for autonomous content creators and syndication engines.",
    status: "Active"
  },
  {
    id: "threepillars",
    name: "Three Pillars",
    sector: "Venture & Capital Architecture",
    description: "Capital deployment and strategic equity systems designed to fuel internal skunkworks and subsidiary expansion.",
    status: "Active"
  },
  {
    id: "grid",
    name: "Grid",
    sector: "Distributed Mesh Computing",
    description: "High-density network topology and distributed node infrastructure enabling fault-tolerant micro-cloud orchestration.",
    status: "Active"
  },
  {
    id: "firstfeedback",
    name: "FirstFeedback",
    sector: "Customer Intelligence & Sentiment",
    description: "Real-time user feedback ingestion and automated sentiment routing infrastructure for high-scale digital products.",
    status: "Active"
  },
  {
    id: "zx",
    name: "ZX",
    sector: "Protocol & High-Frequency Systems",
    description: "Ultra-low-latency transaction pipelines and algorithmic execution protocols built on lean memory frameworks.",
    status: "Scaling"
  },
  {
    id: "Ethan",
    name: "Black Hole Browser",
    sector: "Privacy-Centric Web Runtime",
    description: "Zero-telemetry, memory-isolated web engine built for untraceable browsing and ephemeral data lifecycle management.",
    status: "Beta"
  },
  {
    id: "empty",
    name: "Empty OS",
    sector: "Operating Systems & Web-Native Kernels",
    description: "An ultra-minimalist, distraction-free computing environment designed from the ground up to run natively within web primitives.",
    status: "In Development"
  }
];

export default function Products() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col justify-between selection:bg-black selection:text-white">
      
      {/* HEADER / NAVIGATION */}
      <header className="w-full border-b border-gray-100 py-6 px-6 md:px-12 sticky top-0 bg-white/80 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            <span>buildingit</span>
          </Link>
          <span className="text-xs font-mono uppercase tracking-widest text-gray-400">
            Portfolio / 07 Ventures
          </span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-28 w-full flex-1">
        
        {/* TITLE SECTION */}
        <section className="mb-20">
          <p className="text-xs uppercase font-mono tracking-widest text-gray-400 mb-4">
            Holding Company Portfolio
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-black max-w-4xl mb-6 leading-tight">
            buildingit Products
          </h1>
          <p className="text-base sm:text-lg text-gray-500 font-normal max-w-2xl leading-relaxed">
            Independent technology companies, platforms, and distributed systems architected and scaled under the buildingit umbrella.
          </p>
        </section>

        {/* PRODUCTS DIRECTORY */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="group border border-gray-200 hover:border-black rounded-2xl p-8 sm:p-10 transition-all duration-300 bg-white hover:bg-[#fafafa] flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-start justify-between mb-8">
                  {/* SQUIRCLE LOGO CONTAINER */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center rounded-xl bg-white border border-gray-100 shadow-sm p-3 overflow-hidden">
                    <img 
                      src={`/${product.id}_black.png`} 
                      alt={product.name} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  
                  {/* STATUS & ARROW */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                      {product.status}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:text-black group-hover:border-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* PRODUCT INFO */}
                <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2">
                  {product.sector}
                </span>
                <h2 className="text-2xl font-bold text-black mb-3">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="pt-8 mt-6 border-t border-gray-100/80 flex items-center justify-between text-xs font-mono text-gray-400">
                <span>Subsidiary Entity</span>
                <span>buildingit.in</span>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#f8f9fa] border-t border-gray-100 py-10 px-6 md:px-12 text-[#5f6368]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <img src="/logo.png" alt="buildingit" className="h-9 w-auto object-contain cursor-pointer" />
            </Link>
            <span className="text-xs text-gray-400 font-normal">
              © 2026 buildingit Inc.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[14px] font-medium">
            <Link href="/products" className="text-black transition-colors font-semibold">
              buildingit Products
            </Link>
            <Link href="/privacy" className="hover:text-black transition-colors">
              buildingit Privacy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              buildingit Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}