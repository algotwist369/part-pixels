import React from "react";
import { Link } from "react-router-dom";
import MouseGlowCard from "../common/MouseGlowCard";
import { Zap, ArrowRight } from "lucide-react";

const quickProducts = [
  {
    id: "pixpro-edge",
    img: "/assets/pixpro-product-1.png",
    name: "PIXPRO EDGE",
    subtitle: "PCIe Gen3 x4 NVMe",
    speed: "UP TO 3,500 MB/S",
    path: "/products/pixpro-edge",
  },
  {
    id: "pixpro-flex",
    img: "/assets/pixpro-product-2.png",
    name: "PIXPRO FLEX",
    subtitle: "128-Layer 3D TLC NVMe",
    speed: "UP TO 3,500 MB/S",
    path: "/products/pixpro-flex",
  },
  {
    id: "pixpro-core",
    img: "/assets/pixpro-product-3.png",
    name: "PIXPRO CORE",
    subtitle: "TLC SATA III 2.5\"",
    speed: "UP TO 560 MB/S",
    path: "/products/pixpro-core",
  },
];

export default function QuickProductBar() {
  return (
    <section className="relative py-12 bg-backgroundPrimary border-b border-borderColor/40 -mt-8 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-highlightText font-bold text-xs uppercase tracking-widest bg-highlightText/10 px-4 py-1 rounded-full border border-highlightText/20 inline-flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Featured Performance Lineup
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickProducts.map((prod) => (
            <MouseGlowCard key={prod.id} className="h-full">
              <Link
                to={prod.path}
                className="group block bg-backgroundSecondary/60 border border-borderColor/60 rounded-2xl p-6 h-full flex flex-col items-center justify-between text-center transition duration-300 hover:border-highlightText/60 shadow-xl"
              >
                <div className="w-full">
                  <div className="h-36 w-full flex items-center justify-center overflow-hidden mb-4 bg-backgroundPrimary/40 rounded-xl p-2">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="h-full w-auto object-contain transition duration-500 group-hover:scale-110 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
                    />
                  </div>

                  <h3 className="text-xl font-extrabold text-white group-hover:text-highlightText transition">
                    {prod.name}
                  </h3>
                  <p className="text-textSecondary text-xs mt-1 font-medium">{prod.subtitle}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-borderColor/50 w-full flex items-center justify-between">
                  <span className="text-highlightText font-black text-xs uppercase tracking-wider">
                    {prod.speed}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white font-bold group-hover:text-highlightText transition">
                    Specs <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </MouseGlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
