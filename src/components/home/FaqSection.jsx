import React, { useState } from "react";
import { faqData } from "../../data/partpixelsData";
import { ChevronDown, HelpCircle } from "lucide-react";
import MouseGlowCard from "../common/MouseGlowCard";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState("faq-1");

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  // Schema.org FAQPage JSON-LD structured data for Google Search rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="py-20 bg-backgroundSecondary/50 border-t border-borderColor/40 relative">
      {/* Inject FAQ Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-highlightText font-semibold text-xs uppercase tracking-widest bg-highlightText/10 px-4 py-1.5 rounded-full border border-highlightText/20 inline-flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> Customer FAQ & Guidance
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4">
            Frequently Asked <span className="text-highlightText">Questions</span>
          </h2>
          <p className="text-textSecondary max-w-2xl mx-auto text-base sm:text-lg">
            Everything you need to know about PartPixels SSDs, 5-Year Warranty, performance specifications, and system compatibility.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <MouseGlowCard key={faq.id}>
                <div
                  className={`rounded-2xl border transition duration-300 overflow-hidden ${
                    isOpen
                      ? "border-highlightText/60 bg-backgroundSecondary/80"
                      : "border-borderColor/60 bg-transparent hover:border-highlightText/40"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-white pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen
                          ? "bg-highlightText text-black border-highlightText rotate-180"
                          : "border-borderColor/80 text-highlightText"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-1 border-t border-borderColor/40 text-textSecondary text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </MouseGlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
