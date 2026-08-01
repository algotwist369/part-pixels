import React, { useEffect } from "react";
import { knowledgeCenterData } from "../data/partpixelsData";
import { BookOpen, Zap, HardDrive, ShieldCheck, CheckCircle2, HelpCircle } from "lucide-react";
import usePageSeo from "../hooks/usePageSeo";

export default function KnowledgeCenterPage() {
  usePageSeo({
    title: "SSD Knowledge Center - SATA vs NVMe & TLC NAND Guide",
    description:
      "Learn about SSD performance, SATA vs NVMe bandwidth, 3D TLC NAND endurance, and choosing the right SSD for gaming, laptops, and workstations.",
    keywords: ["SSD Knowledge Center", "SATA vs NVMe", "TLC vs QLC NAND", "SSD Upgrade Guide", "PartPixels SSD"],
    path: "/knowledge-center",
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
            Learn About SSDs
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 mb-4">
            SSD <span className="text-highlightText">Knowledge Center</span>
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto text-base sm:text-lg">
            {knowledgeCenterData.subtitle}
          </p>
        </div>

        {/* Article 1: Why Upgrade */}
        <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 mb-10 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-highlightText/10 text-highlightText rounded-xl flex items-center justify-center font-bold">
              1
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {knowledgeCenterData.sections[0].title}
            </h2>
          </div>
          <p className="text-textSecondary text-base leading-relaxed">
            {knowledgeCenterData.sections[0].content}
          </p>
        </div>

        {/* Article 2: SATA vs NVMe */}
        <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 mb-10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-highlightText/10 text-highlightText rounded-xl flex items-center justify-center font-bold">
              2
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {knowledgeCenterData.sections[1].title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-backgroundPrimary p-6 rounded-2xl border border-borderColor">
              <span className="bg-blue-500/20 text-blue-400 font-bold text-xs px-3 py-1 rounded-full uppercase">
                Legacy Interface
              </span>
              <h3 className="text-xl font-extrabold text-white mt-3 mb-3">SATA SSD</h3>
              <p className="text-textSecondary text-sm leading-relaxed">
                SATA SSDs use the SATA interface and deliver read speeds of up to{" "}
                <span className="text-highlightText font-bold">550 MB/s</span>, making them an excellent upgrade for older laptops and desktops.
              </p>
            </div>

            <div className="bg-backgroundPrimary p-6 rounded-2xl border border-highlightText/40 shadow-lg">
              <span className="bg-highlightText text-black font-bold text-xs px-3 py-1 rounded-full uppercase">
                Next-Gen PCIe
              </span>
              <h3 className="text-xl font-extrabold text-white mt-3 mb-3">NVMe SSD</h3>
              <p className="text-textSecondary text-sm leading-relaxed">
                NVMe SSDs use the PCIe interface, offering speeds of up to{" "}
                <span className="text-highlightText font-bold">3,500 MB/s</span> on PCIe Gen3 and up to{" "}
                <span className="text-highlightText font-bold">6,000+ MB/s</span> on PCIe Gen4. Ideal for gaming, 4K video editing, content creation, and professional workloads.
              </p>
            </div>
          </div>
        </div>

        {/* Article 3: TLC vs QLC */}
        <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 mb-10 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-highlightText/10 text-highlightText rounded-xl flex items-center justify-center font-bold">
              3
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {knowledgeCenterData.sections[2].title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {knowledgeCenterData.sections[2].content.map((item, idx) => (
              <div key={idx} className="bg-backgroundPrimary p-6 rounded-2xl border border-borderColor">
                <h3 className="text-lg font-bold text-highlightText mb-3">{item.type}</h3>
                <p className="text-textSecondary text-sm leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Article 4: Choosing the Right SSD */}
        <div className="bg-backgroundSecondary border border-highlightText/30 rounded-3xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-highlightText text-black rounded-xl flex items-center justify-center font-bold">
              4
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {knowledgeCenterData.sections[3].title}
            </h2>
          </div>

          <div className="space-y-4">
            {knowledgeCenterData.sections[3].recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-backgroundPrimary p-5 rounded-2xl border border-borderColor/60 gap-3"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-highlightText shrink-0" />
                  <span className="font-bold text-white text-base">{rec.role}</span>
                </div>
                <span className="text-highlightText font-bold text-sm bg-highlightText/10 px-4 py-2 rounded-xl border border-highlightText/30 text-right">
                  {rec.ssd}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
