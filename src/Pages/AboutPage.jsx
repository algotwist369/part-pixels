import React, { useEffect } from "react";
import { aboutUsData, partpixelsInfo } from "../data/partpixelsData";
import { ShieldCheck, Award, CheckCircle2, HeartHandshake } from "lucide-react";
import MouseGlowCard from "../components/common/MouseGlowCard";
import usePageSeo from "../hooks/usePageSeo";

export default function AboutPage() {
  usePageSeo({
    title: "About Us - PartPixels Storage Technologies",
    description:
      "Learn about PartPixels core mission, 100% factory quality testing, transparent specifications, and 5-Year Limited Warranty.",
    keywords: ["About PartPixels", "PartPixels SSD Warranty", "SSD Quality Testing", "Solid State Drive Brand"],
    path: "/about-us",
    image: "/assets/images/image (4).jpeg",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-backgroundPrimary text-textPrimary pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-highlightText font-semibold text-xs uppercase tracking-widest bg-highlightText/10 px-4 py-1.5 rounded-full border border-highlightText/20">
            Company Overview
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 mb-4">
            About <span className="text-highlightText">PartPixels</span>
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto text-base sm:text-lg">
            Reliable storage solutions built with quality, transparency, and 100% factory testing.
          </p>
        </div>

        {/* Content Paragraphs */}
        <MouseGlowCard className="mb-12">
          <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 sm:p-12 shadow-xl space-y-6 text-textSecondary text-base sm:text-lg leading-relaxed">
            {aboutUsData.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </MouseGlowCard>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <MouseGlowCard className="h-full">
            <div className="bg-backgroundSecondary p-6 rounded-2xl border border-borderColor text-center h-full">
              <ShieldCheck className="w-12 h-12 text-highlightText mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">100% Quality Tested</h3>
              <p className="text-xs text-textSecondary">
                Every drive undergoes comprehensive functional and stress testing before leaving our factory.
              </p>
            </div>
          </MouseGlowCard>

          <MouseGlowCard className="h-full">
            <div className="bg-backgroundSecondary p-6 rounded-2xl border border-borderColor text-center h-full">
              <Award className="w-12 h-12 text-highlightText mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">5-Year Limited Warranty</h3>
              <p className="text-xs text-textSecondary">
                Demonstrating our total confidence in performance, durability, and customer satisfaction.
              </p>
            </div>
          </MouseGlowCard>

          <MouseGlowCard className="h-full">
            <div className="bg-backgroundSecondary p-6 rounded-2xl border border-borderColor text-center h-full">
              <HeartHandshake className="w-12 h-12 text-highlightText mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Transparent Information</h3>
              <p className="text-xs text-textSecondary">
                Detailed technical specifications, read/write speeds, and honest product information.
              </p>
            </div>
          </MouseGlowCard>
        </div>
      </div>
    </div>
  );
}
