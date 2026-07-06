import { useEffect, useRef } from "react";
import gsap from "gsap";

const faqs = [
    {
        question: "Why should I upgrade to a PartPixels SSD?",
        answer:
            "Upgrading to an SSD is one of the easiest ways to improve your computer performance. It helps reduce boot time, speeds up application loading, improves file transfers, and makes multitasking smoother. SSDs are also more reliable than traditional hard drives because they are resistant to shock and vibration.",
    },
    {
        question: "What is the difference between SATA SSD and NVMe SSD?",
        answer:
            "SATA SSDs use the SATA interface and offer read speeds up to 560 MB/s, making them a good upgrade for older laptops and desktops. NVMe SSDs use the PCIe interface and deliver much higher speed, with PCIe Gen3 up to 3,500 MB/s and PCIe Gen4 up to 7,400 MB/s.",
    },
    {
        question: "What is TLC NAND and why is it important?",
        answer:
            "TLC NAND stores three bits of data per memory cell and offers a strong balance of speed, endurance, and reliability. It is suitable for users who need consistent performance and long-term durability.",
    },
    {
        question: "Which SSD should I choose for my usage?",
        answer:
            "For everyday users, SATA SSD or PCIe Gen3 NVMe SSD is suitable. For students and office work, SATA or Gen3 NVMe works well. Gamers can choose PCIe Gen3 or Gen4 NVMe SSDs. Content creators should prefer high-capacity TLC NVMe SSDs, while business users should choose TLC NVMe SSDs for dependable performance and endurance.",
    },
    {
        question: "What is PIXPRO CORE SATA SSD best for?",
        answer:
            "PIXPRO CORE SATA SSD is designed for reliable everyday performance. It is suitable for upgrading older laptops and desktops, improving boot time, application loading, file transfers, and overall system responsiveness.",
    },
    {
        question: "What is PIXPRO EDGE Gen3 NVMe SSD?",
        answer:
            "PIXPRO EDGE is a Gen3 NVMe SSD designed for gamers, creators, professionals, and everyday users. It uses the PCIe Gen3 x4 interface and offers read speeds up to 3,500 MB/s and write speeds up to 3,000 MB/s.",
    },
    {
        question: "What is PIXPRO FLEX Gen3 NVMe SSD?",
        answer:
            "PIXPRO FLEX is a value-focused, high-capacity Gen3 NVMe SSD. It is designed for gaming, content creation, professional workloads, and everyday computing, with read speeds up to 3,500 MB/s and write speeds up to 3,200 MB/s.",
    },
    {
        question: "Are PartPixels SSDs quality tested?",
        answer:
            "Yes. Every PIXPRO SSD undergoes performance, compatibility, reliability, and stability testing before reaching customers. PartPixels focuses on premium components, strict quality standards, and dependable long-term performance.",
    },
];

const FAQAccordion = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const groups = gsap.utils.toArray(".faq-group");

            groups.forEach((group, index) => {
                const button = group.querySelector(".faq-button");
                const content = group.querySelector(".faq-content");
                const plus = group.querySelector(".faq-plus");
                const minus = group.querySelector(".faq-minus");

                gsap.set(content, { height: 0, overflow: "hidden" });
                gsap.set(minus, { autoAlpha: 0 });

                if (index === 0) {
                    group.classList.add("active");
                    gsap.set(content, { height: "auto" });
                    gsap.set(plus, { autoAlpha: 0 });
                    gsap.set(minus, { autoAlpha: 1 });
                }

                button.addEventListener("click", () => {
                    const isActive = group.classList.contains("active");

                    groups.forEach((otherGroup) => {
                        const otherContent = otherGroup.querySelector(".faq-content");
                        const otherPlus = otherGroup.querySelector(".faq-plus");
                        const otherMinus = otherGroup.querySelector(".faq-minus");

                        otherGroup.classList.remove("active");

                        gsap.to(otherContent, {
                            height: 0,
                            duration: 0.4,
                            ease: "power2.inOut",
                        });

                        gsap.to(otherPlus, {
                            autoAlpha: 1,
                            duration: 0.2,
                            ease: "none",
                        });

                        gsap.to(otherMinus, {
                            autoAlpha: 0,
                            duration: 0.2,
                            ease: "none",
                        });
                    });

                    if (!isActive) {
                        group.classList.add("active");

                        gsap.to(content, {
                            height: "auto",
                            duration: 0.45,
                            ease: "power2.inOut",
                        });

                        gsap.to(plus, {
                            autoAlpha: 0,
                            duration: 0.2,
                            ease: "none",
                        });

                        gsap.to(minus, {
                            autoAlpha: 1,
                            duration: 0.2,
                            ease: "none",
                        });
                    }
                });
            });

            gsap.fromTo(
                ".faq-animate",
                { y: 35, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.08,
                    ease: "power2.out",
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="faq"
            className="bg-black px-5 py-24 text-white md:py-32"
        >
            <div className="mx-auto max-w-5xl">
                {/* Heading */}
                <div className="faq-animate text-center">
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#d6a000]">
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
                <div className="faq-animate mt-14 border-t border-white/10">
                    {faqs.map((faq, index) => (
                        <div key={faq.question} className="faq-group border-b border-white/10">
                            <button
                                type="button"
                                className="
                                        faq-button group flex w-full items-center justify-between gap-6
                                        py-6 text-left transition hover:bg-white/[0.02]
                                        "
                            >
                                <div className="flex items-center gap-5">
                                    <span className="text-sm font-bold text-[#d6a000]/70">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>

                                    <h3 className="text-lg font-semibold leading-7 text-white/85 transition group-hover:text-white md:text-xl">
                                        {faq.question}
                                    </h3>
                                </div>

                                <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-xl text-white/70">
                                    <span className="faq-plus absolute">+</span>
                                    <span className="faq-minus absolute">−</span>
                                </span>
                            </button>

                            <div className="faq-content">
                                <div className="pb-7 pl-12 pr-4 md:pl-[4.5rem]">
                                    <p className="max-w-3xl text-sm leading-7 text-white/55 md:text-base md:leading-8">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Help */}
                <div className="faq-animate mt-10 text-center">
                    <p className="text-sm leading-7 text-white/45">
                        Still have questions? Contact us at{" "}
                        <a
                            href="mailto:support@partpixels.com"
                            className="font-semibold text-[#d6a000] hover:text-white"
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