import React, { useEffect } from "react";
import { warrantyData } from "../data/partpixelsData";
import { ShieldCheck, CheckCircle, XCircle, AlertTriangle, HardDrive } from "lucide-react";

import MouseGlowCard from "../components/common/MouseGlowCard";

export default function WarrantyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-backgroundPrimary text-textPrimary pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-highlightText font-semibold text-xs uppercase tracking-widest bg-highlightText/10 px-4 py-1.5 rounded-full border border-highlightText/20">
            Official Warranty Policy
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 mb-4">
            {warrantyData.subtitle}
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto text-base sm:text-lg">
            5 Years of dependable protection from the original date of purchase.
          </p>
        </div>

        {/* Overview Box */}
        <MouseGlowCard className="mb-10">
          <div className="bg-backgroundSecondary border border-highlightText/30 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="w-8 h-8 text-highlightText" />
              <h2 className="text-2xl font-black text-white">Warranty Commitment</h2>
            </div>
            <p className="text-textSecondary text-base leading-relaxed mb-6">
              {warrantyData.description}
            </p>

            <div className="space-y-3 pt-4 border-t border-borderColor/60">
              {warrantyData.policyDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm text-textSecondary">
                  <CheckCircle className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </MouseGlowCard>

        {/* Included vs Excluded Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Coverage Includes */}
          <MouseGlowCard className="h-full">
            <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 shadow-xl h-full">
              <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="w-6 h-6 text-highlightText" /> Warranty Coverage Includes
              </h3>
              <div className="space-y-4">
                {warrantyData.coverageIncludes.map((item, idx) => (
                  <div key={idx} className="bg-backgroundPrimary p-4 rounded-xl border border-borderColor/60">
                    <p className="text-xs text-highlightText font-bold uppercase">{item.label}</p>
                    <p className="text-sm font-semibold text-white mt-1">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </MouseGlowCard>

          {/* Warranty Does Not Cover */}
          <MouseGlowCard className="h-full">
            <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 shadow-xl h-full">
              <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2">
                <XCircle className="w-6 h-6 text-red-500" /> Warranty Does Not Cover
              </h3>
              <div className="space-y-3">
                {warrantyData.coverageExcludes.map((exc, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-backgroundPrimary p-3.5 rounded-xl border border-borderColor/60 text-sm text-textSecondary">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{exc}</span>
                  </div>
                ))}
              </div>
            </div>
          </MouseGlowCard>
        </div>

        {/* Backup and Recovery Policy */}
        <MouseGlowCard>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
              <h2 className="text-2xl font-black text-white">
                {warrantyData.backupPolicy.title}
              </h2>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {warrantyData.backupPolicy.text}
            </p>
          </div>
        </MouseGlowCard>
      </div>
    </div>
  );
}
