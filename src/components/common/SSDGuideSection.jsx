import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const guideCards = [
    {
        id: 1,
        title: "Everyday Users",
        type: "SATA SSD / Gen3 NVMe",
        description:
            "Perfect for faster boot times, quick app loading, smooth browsing, office work, and daily productivity.",
        speed: "Up to 560 MB/s - 3,500 MB/s",
        accent: "text-[#d6a000]",
        line: "bg-[#d6a000]",
    },
    {
        id: 2,
        title: "Students & Office",
        type: "SATA SSD / Gen3 NVMe",
        description:
            "A responsive, dependable choice for study, office applications, virtual meetings, and everyday multitasking.",
        speed: "Smooth Productivity",
        accent: "text-white",
        line: "bg-white",
    },
    {
        id: 3,
        title: "Gamers",
        type: "PCIe Gen3 / Gen4 NVMe",
        description:
            "Designed for faster game loading, smoother multitasking, and improved system responsiveness.",
        speed: "Up to 7,400 MB/s",
        accent: "text-[#7c3cff]",
        line: "bg-[#7c3cff]",
    },
    {
        id: 4,
        title: "Creators",
        type: "High-Capacity TLC NVMe",
        description:
            "Ideal for video editing, large project files, creative workflows, and professional content production.",
        speed: "High Endurance",
        accent: "text-[#c68600]",
        line: "bg-[#c68600]",
    },
    {
        id: 5,
        title: "Business Users",
        type: "TLC NVMe SSD",
        description:
            "Built for dependable performance, stable workloads, long-term reliability, and secure data handling.",
        speed: "Reliable Performance",
        accent: "text-white",
        line: "bg-white",
    },
];

const SSDGuideSection = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const leftRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 72%",
                    once: true,
                },
                defaults: {
                    ease: "power2.out",
                },
            });

            tl.fromTo(
                headingRef.current,
                { y: 35, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7 }
            )
                .fromTo(
                    leftRef.current,
                    { x: -35, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.75 },
                    "-=0.35"
                )
                .fromTo(
                    cardRefs.current,
                    { y: 35, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.65,
                        stagger: 0.1,
                    },
                    "-=0.35"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="ssd-guide"
            className="relative overflow-hidden bg-black px-5 py-24 text-white"
        >
            {/* Smooth top blend from previous section */}
            <div className="pointer-events-none absolute left-0 top-0 h-[180px] w-full bg-gradient-to-b from-black via-black/90 to-transparent" />

            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.055),transparent_40%)]" />
            <div className="pointer-events-none absolute right-[8%] top-[25%] h-[420px] w-[420px] rounded-full bg-[#d6a000]/10 blur-[120px]" />
            <div className="pointer-events-none absolute left-[5%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

            <div className="relative z-10 mx-auto max-w-[110rem]">
                {/* Heading */}
                <div ref={headingRef} className="mb-16 text-center">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#d6a000]">
                        SSD Knowledge Center
                    </p>

                    <h2 className="mx-auto max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
                        Choose the right SSD for your performance needs.
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/60 md:text-lg">
                        Upgrading to an SSD is one of the most effective ways to improve
                        your computer&apos;s speed, boot time, application loading, and overall
                        workflow.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* Left Info */}
                    <div ref={leftRef} className="relative">
                        <div className="sticky top-28">
                            <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/35">
                                SATA vs NVMe
                            </p>

                            <h3 className="mt-5 max-w-xl text-3xl font-bold leading-tight md:text-5xl">
                                Not every SSD is the same. Pick what fits your workflow.
                            </h3>

                            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
                                SATA SSDs are a strong upgrade for older laptops and desktops,
                                while NVMe SSDs use the PCIe interface to deliver much higher
                                speeds for gaming, content creation, software development, and
                                professional workloads.
                            </p>

                            <div className="mt-10 grid grid-cols-2 gap-4">
                                <div className="border-l border-white/10 pl-5">
                                    <p className="text-3xl font-black text-white">560</p>
                                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                                        MB/s SATA
                                    </p>
                                </div>

                                <div className="border-l border-[#d6a000]/40 pl-5">
                                    <p className="text-3xl font-black text-[#d6a000]">7,400</p>
                                    <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                                        MB/s NVMe
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Guide List */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {guideCards.map((item, index) => (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    if (el) cardRefs.current[index] = el;
                                }}
                                className="
                  group relative overflow-hidden rounded-[1.5rem]
                  border border-white/10 bg-white/[0.035]
                  p-7 backdrop-blur-sm
                  transition duration-300
                  hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.055]
                "
                            >
                                <div
                                    className={`absolute left-0 top-0 h-full w-[3px] ${item.line} opacity-60`}
                                />

                                <div className="mb-8 flex items-center justify-between">
                                    <span className="text-sm font-bold text-white/25">
                                        0{item.id}
                                    </span>

                                    <span
                                        className={`rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${item.accent}`}
                                    >
                                        {item.speed}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white">{item.title}</h3>

                                <p className={`mt-3 text-sm font-bold ${item.accent}`}>
                                    {item.type}
                                </p>

                                <p className="mt-5 text-sm leading-7 text-white/60">
                                    {item.description}
                                </p>

                                <div className="mt-8 h-px w-full bg-white/10">
                                    <div
                                        className={`h-px w-0 ${item.line} transition-all duration-500 group-hover:w-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 border-t border-white/10 pt-14">
                    <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d6a000]">TLC vs QLC NAND Flash</p>
                            <h3 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">Choose the NAND technology that fits your priorities.</h3>
                            <p className="mt-6 max-w-xl text-base leading-8 text-white/55">NAND type influences endurance, sustained performance, capacity, and value. Understanding the difference helps you choose with confidence.</p>
                        </div>
                        <div className="grid gap-px overflow-hidden rounded-[1.5rem] bg-white/10 md:grid-cols-2">
                            <article className="bg-[#0a0a0a] p-8">
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d6a000]">TLC · Three Bits per Cell</p>
                                <h4 className="mt-5 text-2xl font-bold">Performance & Endurance</h4>
                                <p className="mt-4 text-sm leading-7 text-white/58">TLC NAND provides an excellent balance of speed, endurance, and reliability. It is ideal for consistent performance, professional workloads, gaming, and long-term durability.</p>
                            </article>
                            <article className="bg-[#0a0a0a] p-8">
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/45">QLC · Four Bits per Cell</p>
                                <h4 className="mt-5 text-2xl font-bold">Capacity & Value</h4>
                                <p className="mt-4 text-sm leading-7 text-white/58">QLC NAND enables higher storage capacities at a more affordable price. It is well suited to everyday computing, media storage, and general use where capacity is the priority.</p>
                            </article>
                        </div>
                    </div>
                </div>            </div>

            {/* Bottom blend */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-b from-transparent via-black/90 to-black" />
        </section>
    );
};

export default SSDGuideSection;
