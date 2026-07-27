import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "../../data/partpixelsData";
import { Zap, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import MouseGlowCard from "../common/MouseGlowCard";

const ProductShowcase = () => {
  return (
    <section className="py-20 bg-backgroundPrimary text-textPrimary relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-highlightText font-semibold text-sm uppercase tracking-widest bg-highlightText/10 px-4 py-1.5 rounded-full border border-highlightText/20">
            High-Performance Lineup
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-4 mb-4">
            PIXPRO SSD <span className="text-highlightText">Series</span>
          </h2>
          <p className="text-textSecondary max-w-2xl mx-auto text-base sm:text-lg">
            Engineered for every workload - from everyday desktop computing to intense gaming, video editing, and enterprise operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {productsData.map((product) => (
            <MouseGlowCard key={product.id} className="h-full">
              <div className="bg-transparent border border-borderColor/60 rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between hover:border-highlightText/40 transition duration-300">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold bg-highlightText text-black px-3 py-1 rounded-full uppercase">
                      {product.category}
                    </span>
                    <span className="text-xs text-textSecondary flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-highlightText" /> 5-Yr Warranty
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-1">
                    {product.name}
                  </h3>
                  <p className="text-highlightText text-xs font-semibold uppercase mb-4">
                    {product.subheading}
                  </p>

                  {/* Product Hardware Image */}
                  <div className="my-4 h-48 w-full bg-backgroundPrimary/60 rounded-xl border border-borderColor/40 flex items-center justify-center p-3 overflow-hidden group-hover:border-highlightText/30 transition duration-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <p className="text-textSecondary text-xs sm:text-sm font-medium mb-5 text-center line-clamp-2">
                    {product.tagline}
                  </p>

                  {/* Specs Box */}
                  <div className="bg-backgroundPrimary/80 border border-borderColor/60 rounded-xl p-4 mb-6 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary text-xs">Interface:</span>
                      <span className="font-semibold text-white text-xs">{product.interface}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary text-xs">Read Speed:</span>
                      <span className="font-bold text-highlightText text-xs">{product.readSpeed}</span>
                    </div>
                    {product.writeSpeed && (
                      <div className="flex items-center justify-between">
                        <span className="text-textSecondary text-xs">Write Speed:</span>
                        <span className="font-bold text-white text-xs">{product.writeSpeed}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-textSecondary text-xs">NAND Technology:</span>
                      <span className="font-semibold text-gray-300 text-xs">{product.nandType}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-backgroundHover hover:bg-highlightText hover:text-black border border-highlightText/30 text-white font-bold py-3 px-4 rounded-xl transition duration-300 text-sm mt-4"
                >
                  <span>View Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </MouseGlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
