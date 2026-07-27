import React, { useState } from "react";
import { Link } from "react-router-dom";
import { knowledgeCenterData } from "../../data/partpixelsData";
import { BookOpen, CheckCircle, HelpCircle, ArrowRight } from "lucide-react";

import MouseGlowCard from "../common/MouseGlowCard";

const KnowledgeCenterSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-20 bg-backgroundSecondary text-textPrimary relative border-t border-borderColor/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-highlightText font-semibold text-xs uppercase tracking-widest bg-highlightText/10 px-4 py-1.5 rounded-full border border-highlightText/20 mb-3">
            <BookOpen className="w-4 h-4" />
            <span>Educational Guide</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            SSD <span className="text-highlightText">Knowledge Center</span>
          </h2>
          <p className="text-textSecondary max-w-2xl mx-auto text-base sm:text-lg mt-3">
            Learn everything about storage technologies, interfaces, NAND flash types, and choosing the perfect SSD for your rig.
          </p>
        </div>

        {/* Knowledge Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {knowledgeCenterData.sections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                activeTab === idx
                  ? "bg-highlightText text-black shadow-lg"
                  : "bg-backgroundPrimary text-textSecondary border border-borderColor hover:border-highlightText/40"
              }`}
            >
              {sec.title}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <MouseGlowCard className="max-w-4xl mx-auto">
          <div className="bg-backgroundPrimary border border-borderColor/60 rounded-2xl p-6 sm:p-10 shadow-xl">
            {activeTab === 0 && (
              <div>
                <h3 className="text-2xl font-black text-white mb-4">
                  {knowledgeCenterData.sections[0].title}
                </h3>
                <p className="text-textSecondary text-base leading-relaxed mb-6">
                  {knowledgeCenterData.sections[0].content}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <MouseGlowCard>
                    <div className="bg-backgroundSecondary p-4 rounded-xl border border-borderColor">
                      <h4 className="font-bold text-highlightText text-sm mb-1">⚡ Faster System Startup</h4>
                      <p className="text-xs text-textSecondary">Drastically reduce OS boot times from minutes to seconds.</p>
                    </div>
                  </MouseGlowCard>
                  <MouseGlowCard>
                    <div className="bg-backgroundSecondary p-4 rounded-xl border border-borderColor">
                      <h4 className="font-bold text-highlightText text-sm mb-1">🛡️ Shock & Vibration Proof</h4>
                      <p className="text-xs text-textSecondary">No moving mechanical parts means higher durability and silent operation.</p>
                    </div>
                  </MouseGlowCard>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div>
                <h3 className="text-2xl font-black text-white mb-6">
                  {knowledgeCenterData.sections[1].title}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {knowledgeCenterData.sections[1].content.map((item, i) => (
                    <MouseGlowCard key={i}>
                      <div className="bg-backgroundSecondary p-5 rounded-xl border border-highlightText/20 h-full">
                        <h4 className="text-lg font-bold text-highlightText mb-2">{item.type}</h4>
                        <p className="text-textSecondary text-sm leading-relaxed">{item.details}</p>
                      </div>
                    </MouseGlowCard>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div>
                <h3 className="text-2xl font-black text-white mb-6">
                  {knowledgeCenterData.sections[2].title}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {knowledgeCenterData.sections[2].content.map((item, i) => (
                    <MouseGlowCard key={i}>
                      <div className="bg-backgroundSecondary p-5 rounded-xl border border-borderColor h-full">
                        <h4 className="text-lg font-bold text-highlightText mb-2">{item.type}</h4>
                        <p className="text-textSecondary text-sm leading-relaxed">{item.details}</p>
                      </div>
                    </MouseGlowCard>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div>
                <h3 className="text-2xl font-black text-white mb-6">
                  {knowledgeCenterData.sections[3].title}
                </h3>
                <div className="space-y-3">
                  {knowledgeCenterData.sections[3].recommendations.map((rec, i) => (
                    <MouseGlowCard key={i}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-backgroundSecondary p-4 rounded-xl border border-borderColor/60 gap-2">
                        <span className="font-bold text-white text-sm">{rec.role}:</span>
                        <span className="text-highlightText font-semibold text-xs sm:text-sm bg-highlightText/10 px-3 py-1 rounded-md border border-highlightText/20">
                          {rec.ssd}
                        </span>
                      </div>
                    </MouseGlowCard>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-borderColor/40 flex justify-center">
              <Link
                to="/knowledge-center"
                className="inline-flex items-center gap-2 text-highlightText hover:text-white font-bold text-sm transition"
              >
                <span>Explore Complete SSD Buyer's Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </MouseGlowCard>
      </div>
    </section>
  );
};

export default KnowledgeCenterSection;
