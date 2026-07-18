import { useState } from "react";
import faqs from "../../data/faqs";

const FAQAccordion = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section
            id="faq"
            className="bg-black px-5 py-24 text-white md:py-32"
        >
            <div className="mx-auto max-w-5xl">
                {/* Heading */}
                <div className="text-center">
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">
                        FAQs
                    </p>

                    <h2 className="text-4xl font-bold leading-tight md:text-6xl">
                        Frequently Asked Questions
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/55">
                        Simple answers about PartPixels SSDs, performance, reliability,
                        warranty, and choosing the right storage solution.
                    </p>
                </div>

                {/* Accordion */}
                <div className="mt-14 border-t border-white/10">
                    {faqs.map((faq, index) => (
                        <div key={faq.question} className="border-b border-white/10">
                            <button
                                id={`faq-question-${index}`}
                                type="button"
                                onClick={() => setOpenIndex((current) => current === index ? -1 : index)}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                                className="
                                        group flex w-full items-center justify-between gap-6
                                        py-6 text-left transition hover:bg-white/[0.02]
                                        "
                            >
                                <div className="flex items-center gap-5">
                                    <span className="text-sm font-bold text-[#5bd7ff]/70">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <span className="text-lg font-semibold leading-7 text-white/85 transition group-hover:text-white md:text-xl">
                                        {faq.question}
                                    </span>
                                </div>

                                <span aria-hidden="true" className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-white/70">
                                    <span className={`absolute transition duration-300 ${openIndex === index ? "rotate-90 opacity-0" : "opacity-100"}`}>+</span>
                                    <span className={`absolute transition duration-300 ${openIndex === index ? "opacity-100" : "-rotate-90 opacity-0"}`}>&minus;</span>
                                </span>
                            </button>

                            <div
                              id={`faq-answer-${index}`}
                              role="region"
                              aria-labelledby={`faq-question-${index}`}
                              aria-hidden={openIndex !== index}
                              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                            >
                                <div className="overflow-hidden">
                                  <div className="pb-7 pl-12 pr-4 md:pl-[4.5rem]">
                                    <p className="max-w-3xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
                                        {faq.answer}
                                    </p>
                                  </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Help */}
                <div className="mt-10 text-center">
                    <p className="text-sm leading-7 text-white/45">
                        Still have questions? Contact us at{" "}
                        <a
                            href="mailto:support@partpixels.com"
                            className="font-semibold text-[#5bd7ff] hover:text-white"
                        >
                            support@partpixels.com
                        </a>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQAccordion;
