import { useEffect, useRef } from "react";
import gsap from "gsap";

const aboutPoints = [
    {
        id: 1,
        title: "Reliable Storage",
        description:
            "Dependable SSD solutions built for consistent performance and everyday confidence.",
    },
    {
        id: 2,
        title: "Transparent Details",
        description:
            "Clear product specifications and honest performance information for better decisions.",
    },
    {
        id: 3,
        title: "Quality Tested",
        description:
            "Every PartPixels SSD is tested for stability, durability, and long-term reliability.",
    },
    {
        id: 4,
        title: "Built on Trust",
        description:
            "We focus on dependable products and transparent communication with every customer.",
    },
];

const AboutUs = () => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const paragraphRef = useRef(null);
    const pointRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                },
            });

            tl.fromTo(
                bgRef.current,
                {
                    scale: 1.08,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                }
            )
                .fromTo(
                    labelRef.current,
                    {
                        y: 20,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                    },
                    "-=0.7"
                )
                .fromTo(
                    titleRef.current,
                    {
                        y: 35,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                    },
                    "-=0.35"
                )
                .fromTo(
                    paragraphRef.current,
                    {
                        y: 28,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                    },
                    "-=0.45"
                )
                .fromTo(
                    pointRefs.current,
                    {
                        y: 30,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.65,
                        stagger: 0.12,
                    },
                    "-=0.35"
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="about-company"
            className="relative min-h-screen overflow-hidden px-5 py-24 text-white"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    ref={bgRef}
                    src="/about-optimized.jpg"
                    alt="PartPixels storage technology background"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain object-center opacity-10"
                />

                {/* Edge dark overlay, center readable */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.35)_38%,rgba(0,0,0,0.75)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/85" />
            </div>

            {/* Soft Glow */}
            <div className="pointer-events-none absolute left-[8%] top-[35%] h-[420px] w-[420px] rounded-full bg-[#d6a000]/10 blur-[110px]" />
            <div className="pointer-events-none absolute right-[5%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-white/[0.045] blur-[120px]" />

            <div className="relative z-10 mx-auto grid max-w-[110rem] grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
                {/* Left Side */}
                <div className="relative hidden min-h-[520px] lg:block">
                    <div className="absolute left-0 top-1/2 h-[360px] w-[360px] -translate-y-1/2 rounded-full border border-white/10" />
                    <div className="absolute left-16 top-1/2 h-[230px] w-[230px] -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-sm" />

                    <div className="absolute left-28 top-1/2 -translate-y-1/2">
                        <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/45">
                            Quality SSD
                        </p>
                        {/* <h3 className="mt-4 text-7xl font-black leading-none text-white">
                            SSD
                        </h3> */}
                        <p className="mt-4 max-w-[150px] text-sm leading-6 text-white/55">
                            Storage products designed for performance, stability, and data
                            confidence.
                        </p>
                    </div>
                </div>

                {/* Content Side */}
                <div>
                    <p
                        ref={labelRef}
                        className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#d6a000]"
                    >
                        About PartPixels
                    </p>

                    <h2
                        ref={titleRef}
                        className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl"
                    >
                        Reliable storage solutions built on quality, clarity, and trust.
                    </h2>

                    <p
                        ref={paragraphRef}
                        className="mt-7 max-w-4xl text-base leading-8 text-white/70 md:text-lg"
                    >
                        At PartPixels, our core mission is to provide reliable storage
                        solutions that deliver consistent performance, long-term durability,
                        and complete peace of mind. We believe great technology starts with
                        quality, and every product is designed to meet the needs of modern
                        users. From technical specifications to performance details, every
                        feature is explained honestly and accurately. Every PartPixels SSD
                        undergoes rigorous quality testing before it reaches our customers
                        because protecting valuable data should never be a compromise.
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {aboutPoints.map((point, index) => (
                            <div
                                key={point.id}
                                ref={(el) => {
                                    if (el) pointRefs.current[index] = el;
                                }}
                                className="group"
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-sm font-bold text-[#d6a000] backdrop-blur-sm transition duration-300 group-hover:border-[#d6a000]/50">
                                        0{point.id}
                                    </span>

                                    <h3 className="text-xl font-bold text-white">
                                        {point.title}
                                    </h3>
                                </div>

                                <p className="text-sm leading-7 text-white/60">
                                    {point.description}
                                </p>

                                <div className="mt-5 h-px w-full bg-white/10">
                                    <div className="h-px w-0 bg-[#d6a000] transition-all duration-500 group-hover:w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;