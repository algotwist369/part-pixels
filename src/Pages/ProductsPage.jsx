import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/partpixelsData";
import { ShieldCheck, Zap, HardDrive, Check, Server, Cpu } from "lucide-react";
import MouseGlowCard from "../components/common/MouseGlowCard";
import usePageSeo from "../hooks/usePageSeo";

export default function ProductsPage() {
  usePageSeo({
    title: "PIXPRO SSD Series - PCIe Gen4, NVMe & SATA III | PartPixels",
    description:
      "Explore PartPixels PIXPRO SSD Series including PIXPRO CORE (SATA 2.5), PIXPRO EDGE (PCIe Gen4 NVMe up to 6,000+ MB/s), and PIXPRO FLEX (TLC NVMe). 5-Year Limited Warranty.",
    keywords: ["PartPixels Products", "PIXPRO CORE", "PIXPRO EDGE", "PIXPRO FLEX", "Gen4 NVMe SSD", "SATA III SSD"],
    path: "/products",
    image: "/assets/images/image (6).jpeg",
  });

  const [selectedProduct, setSelectedProduct] = useState(productsData[2]); // PIXPRO FLEX by default

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-backgroundPrimary text-textPrimary pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-highlightText font-semibold text-xs uppercase tracking-widest bg-highlightText/10 px-4 py-1.5 rounded-full border border-highlightText/20">
            Storage Products
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 mb-4">
            PIXPRO <span className="text-highlightText">SSD Family</span>
          </h1>
          <p className="text-textSecondary max-w-3xl mx-auto text-base sm:text-lg">
            High-performance PCIe Gen3 & SATA III Solid State Drives engineered for creators, gamers, professionals, and enterprise applications.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {productsData.map((prod) => (
            <MouseGlowCard key={prod.id} className="h-full">
              <div
                onClick={() => setSelectedProduct(prod)}
                className={`cursor-pointer bg-transparent rounded-2xl p-6 border transition duration-300 h-full flex flex-col justify-between ${
                  selectedProduct.id === prod.id
                    ? "border-highlightText shadow-[0_0_25px_rgba(234,179,8,0.2)]"
                    : "border-borderColor hover:border-highlightText/50"
                }`}
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold bg-highlightText text-black px-3 py-1 rounded-full uppercase">
                      {prod.category}
                    </span>
                    <span className="text-xs text-highlightText font-bold">5-Yr Warranty</span>
                  </div>

                  <h3 className="text-2xl font-black text-white mb-1">{prod.name}</h3>
                  <p className="text-highlightText text-xs font-semibold mb-4">{prod.subheading}</p>
                  <p className="text-textSecondary text-xs sm:text-sm mb-6 leading-relaxed">
                    {prod.tagline}
                  </p>

                  <div className="space-y-2 text-xs bg-backgroundPrimary p-4 rounded-xl border border-borderColor mb-4">
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Interface:</span>
                      <span className="font-semibold text-white">{prod.interface}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-textSecondary">Sequential Read:</span>
                      <span className="font-bold text-highlightText">{prod.readSpeed}</span>
                    </div>
                    {prod.writeSpeed && (
                      <div className="flex justify-between">
                        <span className="text-textSecondary">Sequential Write:</span>
                        <span className="font-bold text-white">{prod.writeSpeed}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(prod);
                    }}
                    className={`flex-1 font-bold py-2.5 rounded-xl text-xs sm:text-sm transition ${
                      selectedProduct.id === prod.id
                        ? "bg-highlightText text-black"
                        : "bg-backgroundHover text-white hover:bg-highlightText hover:text-black"
                    }`}
                  >
                    Quick Specs
                  </button>
                  <Link
                    to={`/products/${prod.id}`}
                    className="bg-highlightText text-black font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm hover:bg-buttonHover transition flex items-center justify-center"
                  >
                    Full Page →
                  </Link>
                </div>
              </div>
            </MouseGlowCard>
          ))}
        </div>

        {/* Selected Product Specifications Detailed Section */}
        {selectedProduct && (
          <div className="bg-backgroundSecondary border border-highlightText/30 rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8 border-b border-borderColor/60 pb-6">
              <div>
                <span className="text-highlightText text-xs font-bold uppercase tracking-widest">
                  Detailed Product Specifications
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                  {selectedProduct.name} <span className="text-highlightText font-normal">({selectedProduct.subheading})</span>
                </h2>
              </div>
              <div className="bg-highlightText/10 border border-highlightText/30 px-5 py-2.5 rounded-full inline-flex items-center gap-2 text-highlightText font-bold text-sm">
                <ShieldCheck className="w-5 h-5" />
                <span>100% Quality Tested</span>
              </div>
            </div>

            <p className="text-textSecondary text-base leading-relaxed mb-8">
              {selectedProduct.description}
            </p>

            {/* Capacities Table (If PIXPRO FLEX) */}
            {selectedProduct.capacities && (
              <div className="mb-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-highlightText" /> Available Capacities & Performance
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm bg-backgroundPrimary border border-borderColor rounded-xl overflow-hidden">
                    <thead className="bg-highlightText text-black font-bold uppercase text-xs">
                      <tr>
                        <th className="p-3.5">Capacity</th>
                        <th className="p-3.5">Sequential Read</th>
                        <th className="p-3.5">Sequential Write</th>
                        <th className="p-3.5">Random Read (IOPS)</th>
                        <th className="p-3.5">Random Write (IOPS)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderColor/60">
                      {selectedProduct.capacities.map((cap, i) => (
                        <tr key={i} className="hover:bg-backgroundHover/50 transition">
                          <td className="p-3.5 font-bold text-highlightText">{cap.capacity}</td>
                          <td className="p-3.5 text-white font-medium">{cap.read}</td>
                          <td className="p-3.5 text-gray-300">{cap.write}</td>
                          <td className="p-3.5 text-gray-300">{cap.randomRead}</td>
                          <td className="p-3.5 text-gray-300">{cap.randomWrite}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Specifications Grid / Table */}
            {selectedProduct.specifications && (
              <div className="mb-10">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-highlightText" /> Technical Specifications
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProduct.specifications.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-backgroundPrimary p-3.5 rounded-xl border border-borderColor/60 flex justify-between items-center text-xs sm:text-sm"
                    >
                      <span className="text-textSecondary font-medium">{item.spec}</span>
                      <span className="font-semibold text-white text-right max-w-[60%]">{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features List */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-highlightText" /> Key Features & Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProduct.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-3 bg-backgroundPrimary/60 p-3.5 rounded-xl border border-borderColor/40">
                    <Check className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                    <span className="text-sm text-textSecondary">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Image Views / Product Documentation */}
            {selectedProduct.imageViews && (
              <div className="pt-6 border-t border-borderColor/60">
                <h3 className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-3">
                  Available Product Views & Documentation
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.imageViews.map((view, i) => (
                    <span key={i} className="bg-backgroundPrimary text-highlightText border border-highlightText/30 px-3 py-1.5 rounded-lg text-xs font-semibold">
                      📷 {view}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
