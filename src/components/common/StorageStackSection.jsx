import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stackCards = [
    {
        id: 1,
        eyebrow: "Extreme Performance",
        title: "Unlock the Full Potential of Your System",
        description:
            "Experience blazing-fast boot times, instant application launches, seamless multitasking, and high-speed file transfers with PartPixels PIXPRO SSDs.",
        image: "/pixpro-product.jpg",
        accent: "text-[#d6a000]",
        glow: "bg-[#d6a000]/20",
        stat: "Up to 7,400 MB/s",
    },
    {
        id: 2,
        eyebrow: "Built for Reliability",
        title: "Storage You Can Trust Every Day",
        description:
            "Every PIXPRO SSD is built with premium-quality NAND flash, advanced controller technology, and rigorous quality testing for dependable long-term use.",
        image: "/pixpro-product.jpg",
        accent: "text-[#7c3cff]",
        glow: "bg-[#7c3cff]/20",
        stat: "100% Tested",
    },
    {
        id: 3,
        eyebrow: "Designed for Every Need",
        title: "For Creators, Gamers, Professionals & Businesses",
        description:
            "From everyday computing to content creation, gaming, and enterprise workloads, PartPixels SSDs are engineered to meet modern storage demands.",
        image: "/pixpro-product.jpg",
        accent: "text-[#c68600]",
        glow: "bg-[#c68600]/20",
        stat: "Modern Workloads",
    },
    {
        id: 4,
        eyebrow: "Quality You Can Trust",
        title: "Confidence Built Into Every Drive",
        description:
            "Strict quality standards, transparent product information, and dependable performance help customers make informed decisions with confidence.",
        image: "/hero-storage.jpg",
        accent: "text-[#ffffff]",
        glow: "bg-white/15",
        stat: "5-Year Warranty",
    },
];

const StorageStackSection = () => {
    const sectionRef = useRef(null);
    const pinRef = useRef(null);
    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean);

            if (!cards.length) return;

            gsap.set(cards, {
                y: (index) => index * 28,
                scale: 1,
                transformOrigin: "center top",
            });

            const timeline = gsap.timeline({
                defaults: {
                    ease: "none",
                },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: () => `+=${window.innerHeight * 4}`,
                    scrub: 1,
                    pin: pinRef.current,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            timeline.fromTo(
                containerRef.current,
                {
                    y: window.innerHeight * 0.45,
                },
                {
                    y: 0,
                    duration: 1,
                }
            );

            timeline.fromTo(
                cards.slice(1),
                {
                    y: window.innerHeight,
                },
                {
                    y: (index) => (index + 1) * 28,
                    duration: 1,
                    stagger: 1,
                }
            );

            timeline.to(
                cards.slice(0, -1),
                {
                    rotationX: -16,
                    scale: (index) => 0.86 + index * 0.04,
                    opacity: 0.75,
                    duration: 1,
                    stagger: 1,
                },
                "<"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="storage-experience"
            className="relative bg-black text-white"
        >
            <div
                ref={pinRef}
                className="relative flex min-h-screen items-center overflow-hidden px-5 py-24"
            >
                {/* Background blend */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_36%)]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-[#080808] to-black" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d6a000]/5 blur-[130px]" />

                <div className="relative z-10 mx-auto grid w-full max-w-[110rem] grid-cols-1 items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
                    {/* Left Sticky Text */}
                    <div className="relative z-20">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#d6a000]">
                            Why PartPixels
                        </p>

                        <h2 className="max-w-2xl text-4xl font-bold leading-tight md:text-6xl">
                            Storage engineered for speed, safety, and long-term confidence.
                        </h2>

                        <p className="mt-7 max-w-xl text-base leading-8 text-white/60 md:text-lg">
                            PartPixels PIXPRO SSDs are designed for users who need dependable
                            performance, reliable data protection, and transparent product
                            quality.
                        </p>
                    </div>

                    {/* Right Stacked Cards */}
                    <div
                        ref={containerRef}
                        className="relative grid min-h-[620px] place-items-center"
                    >
                        {stackCards.map((item, index) => (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    if (el) cardRefs.current[index] = el;
                                }}
                                className="
                  absolute grid h-[520px] w-full max-w-[760px]
                  grid-cols-1 overflow-hidden rounded-[2rem]
                  border border-white/10 bg-[#101010]/95
                  shadow-[0_30px_120px_rgba(0,0,0,0.65)]
                  backdrop-blur-xl
                  md:grid-cols-[0.9fr_1.1fr]
                "
                            >
                                {/* Image */}
                                <div className="relative hidden items-center justify-center overflow-hidden bg-black/40 md:flex">
                                    <div
                                        className={`pointer-events-none absolute h-64 w-64 rounded-full ${item.glow} blur-[90px]`}
                                    />

                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        className="relative z-10 max-h-[360px] w-[80%] object-contain"
                                    />
                                </div>

                                {/* Content */}
                                <div className="relative flex flex-col justify-between p-8 md:p-10">
                                    <div>
                                        <div className="mb-8 flex items-center justify-between">
                                            <span className="text-sm font-bold text-white/30">
                                                0{item.id}
                                            </span>

                                            <span
                                                className={`rounded-full border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${item.accent}`}
                                            >
                                                {item.stat}
                                            </span>
                                        </div>

                                        <p
                                            className={`mb-5 text-xs font-bold uppercase tracking-[0.3em] ${item.accent}`}
                                        >
                                            {item.eyebrow}
                                        </p>

                                        <h3 className="max-w-xl text-3xl font-bold leading-tight md:text-5xl">
                                            {item.title}
                                        </h3>

                                        <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 md:text-base">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 h-px w-full bg-white/10">
                                        <div className="h-px w-24 bg-white/60" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom smooth blend */}
                <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[180px] w-full bg-gradient-to-b from-transparent via-black/85 to-black" />
            </div>
        </section>
    );
};

export default StorageStackSection;