import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import QuickProductBar from "./QuickProductBar";
import ProductShowcase from "./ProductShowcase";
import KnowledgeCenterSection from "./KnowledgeCenterSection";
import AboutUs from "./AboutUs";
import FaqSection from "./FaqSection";
import { whyStorageMatters, partpixelsInfo } from "../../data/partpixelsData";
import { ShieldCheck, HardDrive, Cpu, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

import MouseGlowCard from "../common/MouseGlowCard";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-backgroundPrimary min-h-screen text-textPrimary">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Featured Product Speed Highlights Bar */}
      <QuickProductBar />

      {/* Why Storage Devices Matter Banner */}
      <section className="py-16 bg-backgroundSecondary border-y border-borderColor/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 text-highlightText font-bold text-xs uppercase tracking-widest bg-highlightText/10 px-4 py-1.5 rounded-full mb-4 border border-highlightText/20">
            <HardDrive className="w-4 h-4" />
            <span>Essential Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">
            {whyStorageMatters.title}
          </h2>
          <p className="text-textSecondary text-base sm:text-lg leading-relaxed max-w-4xl mx-auto">
            {whyStorageMatters.text}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            <MouseGlowCard className="h-full">
              <div className="bg-backgroundPrimary p-6 rounded-2xl border border-borderColor text-left h-full">
                <div className="w-12 h-12 bg-highlightText/10 text-highlightText rounded-xl flex items-center justify-center mb-4">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Faster Boot Times</h3>
                <p className="text-xs text-textSecondary">System startup and application loading in seconds.</p>
              </div>
            </MouseGlowCard>

            <MouseGlowCard className="h-full">
              <div className="bg-backgroundPrimary p-6 rounded-2xl border border-borderColor text-left h-full">
                <div className="w-12 h-12 bg-highlightText/10 text-highlightText rounded-xl flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">100% Quality Tested</h3>
                <p className="text-xs text-textSecondary">Every drive undergoes rigorous factory reliability testing.</p>
              </div>
            </MouseGlowCard>

            <MouseGlowCard className="h-full">
              <div className="bg-backgroundPrimary p-6 rounded-2xl border border-borderColor text-left h-full">
                <div className="w-12 h-12 bg-highlightText/10 text-highlightText rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">5-Year Warranty</h3>
                <p className="text-xs text-textSecondary">Peace of mind backed by PartPixels Limited Warranty.</p>
              </div>
            </MouseGlowCard>
          </div>
        </div>
      </section>

      {/* Products Lineup */}
      <ProductShowcase />

      {/* SSD Knowledge Center Preview */}
      <KnowledgeCenterSection />

      {/* About PartPixels */}
      <AboutUs />

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Warranty & Guarantee CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-backgroundSecondary via-backgroundPrimary to-backgroundSecondary border-t border-borderColor/40">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <ShieldCheck className="w-16 h-16 text-highlightText mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            Backed by <span className="text-highlightText">{partpixelsInfo.warrantyPeriod}</span>
          </h2>
          <p className="text-textSecondary max-w-2xl mx-auto mb-8 text-base">
            Every genuine PartPixels PIXPRO SSD is manufactured using premium components and protected by our Five (5) Year Limited Warranty.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/warranty"
              className="bg-highlightText text-black font-bold px-8 py-3.5 rounded-full hover:bg-buttonHover transition shadow-lg text-sm"
            >
              Read Warranty Policy
            </Link>
            <Link
              to="/contact"
              className="bg-backgroundHover text-white font-semibold px-8 py-3.5 rounded-full hover:border-highlightText border border-borderColor transition text-sm"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
