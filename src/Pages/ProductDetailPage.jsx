import React, { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { productsData } from "../data/partpixelsData";
import { ShieldCheck, Zap, HardDrive, Cpu, CheckCircle2, ArrowRight, ArrowLeft, Mail } from "lucide-react";
import MouseGlowCard from "../components/common/MouseGlowCard";
import usePageSeo from "../hooks/usePageSeo";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  usePageSeo({
    title: product ? `${product.name} - ${product.interface} ${product.category} | PartPixels` : "Product Details | PartPixels",
    description: product ? `${product.description} Read speeds ${product.readSpeed}, write speeds ${product.writeSpeed || 'high-speed'}. Backed by PartPixels 5-Year Warranty.` : "Explore PartPixels SSD specs.",
    keywords: product ? [product.name, product.category, product.interface, "PartPixels SSD", "3D NAND Flash"] : [],
    path: `/products/${id}`,
    image: product?.image || "/assets/pixpro-product-1.png",
    type: "product",
    structuredData: product ? {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.image,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": "PartPixels"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "PartPixels"
        }
      }
    } : null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
  }, [id]);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  // Related products (excluding current)
  const otherProducts = productsData.filter((p) => p.id !== id);

  // Real official PartPixels product images for interactive gallery
  const galleryImages = (product.galleryImages || [product.image]).map((imgUrl, idx) => ({
    label: product.imageViews?.[idx] || `Product View ${idx + 1}`,
    url: imgUrl,
    caption: `${product.name} - ${product.imageViews?.[idx] || 'High Performance SSD'}`,
  }));

  return (
    <div className="min-h-screen bg-backgroundPrimary text-textPrimary pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-textSecondary mb-8">
          <Link to="/" className="hover:text-highlightText transition">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-highlightText transition">Products</Link>
          <span>/</span>
          <span className="text-highlightText font-bold">{product.name}</span>
        </div>

        {/* Top Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
          {/* Left Column: Interactive Product Images Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <MouseGlowCard>
              <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-backgroundPrimary relative flex items-center justify-center">
                  <img
                    src={galleryImages[activeImageIndex].url}
                    alt={galleryImages[activeImageIndex].caption}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)]"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-highlightText font-bold border border-highlightText/30">
                    📷 {galleryImages[activeImageIndex].label}
                  </div>
                </div>
              </div>
            </MouseGlowCard>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border-2 bg-backgroundPrimary/60 p-1 transition ${
                    activeImageIndex === idx
                      ? "border-highlightText shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                      : "border-borderColor/60 hover:border-highlightText/50 opacity-70"
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-full object-contain drop-shadow" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Title & Key Specs Overview */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-highlightText text-black font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="text-highlightText border border-highlightText/30 bg-highlightText/10 px-3.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 5-Year Warranty
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {product.name}
              </h1>
              <p className="text-highlightText text-sm sm:text-base font-semibold mt-1">
                {product.subheading}
              </p>
              <p className="text-textSecondary text-sm sm:text-base mt-4 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Performance Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <MouseGlowCard>
                <div className="bg-backgroundSecondary p-4 rounded-2xl border border-borderColor">
                  <span className="text-xs text-textSecondary uppercase font-bold block mb-1">
                    Sequential Read
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-highlightText">
                    {product.readSpeed}
                  </span>
                </div>
              </MouseGlowCard>

              {product.writeSpeed ? (
                <MouseGlowCard>
                  <div className="bg-backgroundSecondary p-4 rounded-2xl border border-borderColor">
                    <span className="text-xs text-textSecondary uppercase font-bold block mb-1">
                      Sequential Write
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {product.writeSpeed}
                    </span>
                  </div>
                </MouseGlowCard>
              ) : (
                <MouseGlowCard>
                  <div className="bg-backgroundSecondary p-4 rounded-2xl border border-borderColor">
                    <span className="text-xs text-textSecondary uppercase font-bold block mb-1">
                      Form Factor
                    </span>
                    <span className="text-lg font-bold text-white">
                      {product.interface}
                    </span>
                  </div>
                </MouseGlowCard>
              )}
            </div>

            {/* Interface & NAND Flash Info */}
            <MouseGlowCard>
              <div className="bg-backgroundSecondary p-5 rounded-2xl border border-borderColor/60 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-textSecondary">Interface:</span>
                  <span className="font-bold text-white">{product.interface}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">NAND Flash Memory:</span>
                  <span className="font-bold text-highlightText">{product.nandType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-textSecondary">Quality Testing:</span>
                  <span className="font-semibold text-emerald-400">100% Factory Functional Tested</span>
                </div>
              </div>
            </MouseGlowCard>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              {(() => {
                const phoneNum = "919819555225";
                const textMsg =
                  `*PartPixels Product Inquiry*%0A%0A` +
                  `📦 *Product:* ${encodeURIComponent(product.name)} (${encodeURIComponent(product.subheading || product.category)})%0A` +
                  `⚡ *Interface:* ${encodeURIComponent(product.interface)}%0A` +
                  `🚀 *Speed:* Read ${encodeURIComponent(product.readSpeed)} | Write ${encodeURIComponent(product.writeSpeed || "High Speed")}%0A` +
                  `🛡️ *NAND:* ${encodeURIComponent(product.nandType)}%0A%0A` +
                  `💬 *Inquiry:* Hello PartPixels Team, I am interested in receiving a price quote, stock availability, and purchase options for *${encodeURIComponent(product.name)}*. Please assist me!`;

                const whatsappProductUrl = `https://wa.me/${phoneNum}?text=${textMsg}`;

                return (
                  <a
                    href={whatsappProductUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-highlightText text-black font-bold py-3.5 px-6 rounded-xl hover:bg-buttonHover transition shadow-lg text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Inquire / Request Quote</span>
                  </a>
                );
              })()}
              <Link
                to="/warranty"
                className="inline-flex items-center justify-center gap-2 bg-backgroundHover text-white font-semibold py-3.5 px-6 rounded-xl border border-borderColor hover:border-highlightText transition text-sm"
              >
                <span>Warranty Policy</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Capacities & Performance Table (if PIXPRO FLEX) */}
        {product.capacities && (
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-2">
              <HardDrive className="w-6 h-6 text-highlightText" /> Available Capacities & Performance
            </h2>
            <MouseGlowCard>
              <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-6 overflow-x-auto shadow-xl">
                <table className="w-full text-left text-sm bg-backgroundPrimary border border-borderColor rounded-xl overflow-hidden">
                  <thead className="bg-highlightText text-black font-bold uppercase text-xs">
                    <tr>
                      <th className="p-4">Capacity</th>
                      <th className="p-4">Sequential Read</th>
                      <th className="p-4">Sequential Write</th>
                      <th className="p-4">Random Read (IOPS)</th>
                      <th className="p-4">Random Write (IOPS)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderColor/60">
                    {product.capacities.map((cap, i) => (
                      <tr key={i} className="hover:bg-backgroundHover/50 transition">
                        <td className="p-4 font-black text-highlightText text-base">{cap.capacity}</td>
                        <td className="p-4 text-white font-bold">{cap.read}</td>
                        <td className="p-4 text-gray-300">{cap.write}</td>
                        <td className="p-4 text-gray-300">{cap.randomRead}</td>
                        <td className="p-4 text-gray-300">{cap.randomWrite}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </MouseGlowCard>
          </div>
        )}

        {/* Detailed Technical Specifications Table */}
        {product.specifications && (
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-highlightText" /> Technical Specifications
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.specifications.map((item, idx) => (
                <MouseGlowCard key={idx}>
                  <div className="bg-backgroundSecondary p-4 rounded-xl border border-borderColor flex justify-between items-center text-xs sm:text-sm h-full">
                    <span className="text-textSecondary font-medium">{item.spec}</span>
                    <span className="font-semibold text-white text-right max-w-[60%]">{item.detail}</span>
                  </div>
                </MouseGlowCard>
              ))}
            </div>
          </div>
        )}

        {/* Key Features Section */}
        <div className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-highlightText" /> Key Features & Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.features.map((feat, i) => (
              <MouseGlowCard key={i}>
                <div className="flex items-start gap-3 bg-backgroundSecondary p-5 rounded-xl border border-borderColor h-full">
                  <CheckCircle2 className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                  <span className="text-sm text-textSecondary font-medium leading-relaxed">{feat}</span>
                </div>
              </MouseGlowCard>
            ))}
          </div>
        </div>

        {/* Other Products Section */}
        <div className="border-t border-borderColor/60 pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Other <span className="text-highlightText">PIXPRO SSDs</span>
            </h2>
            <Link to="/products" className="text-highlightText font-bold text-sm hover:underline flex items-center gap-1">
              View All Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherProducts.map((other) => (
              <MouseGlowCard key={other.id}>
                <div className="bg-backgroundSecondary border border-borderColor rounded-2xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold bg-highlightText text-black px-3 py-0.5 rounded-full uppercase">
                        {other.category}
                      </span>
                      <span className="text-xs text-highlightText font-bold">{other.readSpeed}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2">{other.name}</h3>
                    <p className="text-xs text-highlightText font-semibold mb-3">{other.subheading}</p>
                    <p className="text-textSecondary text-xs leading-relaxed line-clamp-2 mb-4">
                      {other.description}
                    </p>
                  </div>
                  <Link
                    to={`/products/${other.id}`}
                    className="inline-flex items-center justify-center gap-2 bg-backgroundPrimary hover:bg-highlightText hover:text-black border border-borderColor text-white font-bold py-2.5 px-4 rounded-xl transition text-xs"
                  >
                    <span>View Product Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </MouseGlowCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
