import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FiShield,
    FiCpu,
    FiHardDrive,
    FiCheckCircle,
    FiClock,
    FiMail,
} from "react-icons/fi";
import usePageSeo from "../hooks/usePageSeo";

gsap.registerPlugin(ScrollTrigger);

const coreValues = [
    {
        id: 1,
        icon: FiHardDrive,
        title: "Reliable Storage",
        description:
            "We provide storage solutions designed for consistent performance, long-term durability, and everyday peace of mind.",
    },
    {
        id: 2,
        icon: FiCheckCircle,
        title: "Transparent Information",
        description:
            "From technical specifications to performance details, every feature is explained clearly and honestly.",
    },
    {
        id: 3,
        icon: FiCpu,
        title: "Quality Tested",
        description:
            "Every PartPixels SSD undergoes rigorous testing for reliability, stability, and performance.",
    },
    {
        id: 4,
        icon: FiShield,
        title: "Built on Trust",
        description:
            "We combine dependable products, strict quality standards, and clear communication to build lasting customer confidence.",
    },
];

const timelineItems = [
    {
        id: "01",
        title: "Quality First",
        description:
            "Great technology starts with quality. Every PartPixels product is designed to meet the needs of modern users.",
    },
    {
        id: "02",
        title: "Performance Focused",
        description:
            "PIXPRO SSDs are engineered to improve boot times, application loading, multitasking, and file transfers.",
    },
    {
        id: "03",
        title: "Tested Before Delivery",
        description:
            "Each SSD is checked for speed, stability, compatibility, and reliability before reaching customers.",
    },
    {
        id: "04",
        title: "Confidence Every Day",
        description:
            "PartPixels does not just deliver storage solutions. We deliver confidence customers can rely on every day.",
    },
];

const stats = [
    {
        value: "5-Year",
        label: "Limited Warranty",
    },
    {
        value: "100%",
        label: "Quality Tested",
    },
    {
        value: "3,500+",
        label: "MB/s Gen3 Speed",
    },
    {
        value: "7,400",
        label: "MB/s Gen4 Potential",
    },
];

const AboutCompanyPage = () => {
    usePageSeo({
        title: "About PartPixels | SSD Quality, Reliability & Trust",
        description: "Learn how PartPixels builds dependable PIXPRO SSD storage through premium components, transparent specifications, rigorous testing, and responsive support.",
        keywords: ["about PartPixels", "SSD manufacturer", "SSD quality testing", "PIXPRO storage", "reliable SSD"],
        image: "/hero-3.jpg",
        imageAlt: "PartPixels reliable SSD storage",
        path: "/about-company",
    });
    const pageRef = useRef(null);
    const heroRef = useRef(null);
    const missionRef = useRef(null);
    const valueRefs = useRef([]);
    const imageRef = useRef(null);
    const timelineRefs = useRef([]);
    const statsRefs = useRef([]);
    const supportRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                heroRef.current,
                {
                    y: 60,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                missionRef.current,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: missionRef.current,
                        start: "top 78%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                valueRefs.current,
                {
                    y: 45,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: valueRefs.current[0],
                        start: "top 82%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                imageRef.current,
                {
                    scale: 1.08,
                    opacity: 0.25,
                },
                {
                    scale: 1,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: imageRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                }
            );

            gsap.fromTo(
                timelineRefs.current,
                {
                    x: -40,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.75,
                    stagger: 0.14,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: timelineRefs.current[0],
                        start: "top 80%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                statsRefs.current,
                {
                    y: 35,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: statsRefs.current[0],
                        start: "top 82%",
                        once: true,
                    },
                }
            );

            gsap.fromTo(
                supportRef.current,
                {
                    y: 45,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.75,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: supportRef.current,
                        start: "top 82%",
                        once: true,
                    },
                }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={pageRef}
            className="relative overflow-hidden bg-black text-white"
        >
            {/* Background Glow */}
            <div className="pointer-events-none fixed left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5bd7ff]/5 blur-[150px]" />

            {/* Hero */}
            <section className="relative min-h-screen overflow-hidden px-5 pt-36 pb-24">
                <div className="absolute inset-0">
                    <img
                        ref={imageRef}
                        src="/hero-3.jpg"
                        alt="PartPixels company background"
                        decoding="async"
                        fetchPriority="high"
                        className="h-full w-full object-cover opacity-30"
                    />

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.55)_45%,rgba(0,0,0,0.95)_100%)]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-black" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/35 to-black/40" />
                </div>

                <div
                    ref={heroRef}
                    className="relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] max-w-[110rem] flex-col justify-center"
                >
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">
                        About PartPixels
                    </p>

                    <h1 className="type-page-title max-w-7xl font-bold">
                        Reliable storage solutions built on quality, clarity, and trust.
                    </h1>

                    <p className="mt-8 max-w-3xl text-base leading-8 text-white/65 md:text-lg">
                        At PartPixels, our mission is to provide reliable storage solutions
                        that deliver consistent performance, long-term durability, and
                        complete peace of mind for modern users.
                    </p>
                </div>

                <div className="pointer-events-none absolute bottom-0 left-0 h-[220px] w-full bg-gradient-to-b from-transparent via-black/90 to-black" />
            </section>

            {/* Mission */}
            <section className="relative px-5 py-24">
                <div
                    ref={missionRef}
                    className="mx-auto grid max-w-[110rem] grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]"
                >
                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-white/35">
                            Our Mission
                        </p>

                        <h2 className="text-4xl font-bold leading-tight md:text-6xl">
                            Protecting your valuable data starts with dependable technology.
                        </h2>
                    </div>

                    <div>
                        <p className="text-base leading-8 text-white/65 md:text-lg">
                            We believe great technology starts with quality. Every PartPixels
                            product is designed to meet the needs of modern users, whether
                            they are upgrading a personal computer, building a gaming system,
                            managing business workloads, or handling professional creative
                            projects.
                        </p>

                        <p className="mt-6 text-base leading-8 text-white/65 md:text-lg">
                            We are committed to providing clear, detailed, and transparent
                            product information so customers can make informed decisions with
                            confidence. Every feature is explained honestly, every product is
                            tested carefully, and every drive is built with long-term trust in
                            mind.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="relative px-5 py-24">
                <div className="mx-auto max-w-[110rem]">
                    <div className="mb-14">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">
                            What We Stand For
                        </p>

                        <h2 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                            Dependable products with transparent communication.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {coreValues.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.id}
                                    ref={(el) => {
                                        if (el) valueRefs.current[index] = el;
                                    }}
                                    className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-7 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#5bd7ff]/40 hover:bg-white/[0.055]"
                                >
                                    <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#5bd7ff]/10 text-[#5bd7ff]">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="text-xl font-bold text-white">
                                        {item.title}
                                    </h3>

                                    <p className="mt-5 text-sm leading-7 text-white/55">
                                        {item.description}
                                    </p>

                                    <div className="mt-8 h-px w-full bg-white/10">
                                        <div className="h-px w-0 bg-[#5bd7ff] transition-all duration-500 group-hover:w-full" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Quality Timeline */}
            <section className="relative overflow-hidden px-5 py-24">
                <div className="pointer-events-none absolute left-[10%] top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#5bd7ff]/10 blur-[130px]" />

                <div className="relative z-10 mx-auto grid max-w-[110rem] grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">
                            Quality Process
                        </p>

                        <h2 className="text-4xl font-bold leading-tight md:text-6xl">
                            Every SSD is built to perform with confidence.
                        </h2>

                        <p className="mt-7 max-w-xl text-base leading-8 text-white/60">
                            PartPixels combines premium components, advanced controller
                            technology, strict quality standards, and performance validation
                            to deliver storage products customers can trust.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-6 top-0 h-full w-px bg-white/10" />

                        <div className="space-y-10">
                            {timelineItems.map((item, index) => (
                                <div
                                    key={item.id}
                                    ref={(el) => {
                                        if (el) timelineRefs.current[index] = el;
                                    }}
                                    className="relative pl-20"
                                >
                                    <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-[#5bd7ff]/40 bg-black text-sm font-bold text-[#5bd7ff]">
                                        {item.id}
                                    </span>

                                    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
                                        <h3 className="text-2xl font-bold">{item.title}</h3>

                                        <p className="mt-4 text-sm leading-7 text-white/60">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="relative px-5 py-24">
                <div className="mx-auto grid max-w-[110rem] grid-cols-2 gap-6 lg:grid-cols-4">
                    {stats.map((item, index) => (
                        <div
                            key={item.label}
                            ref={(el) => {
                                if (el) statsRefs.current[index] = el;
                            }}
                            className="border-l border-white/10 pl-6"
                        >
                            <h3 className="text-4xl font-black text-white md:text-6xl">
                                {item.value}
                            </h3>

                            <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-white/40">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Support CTA */}
            <section className="relative px-5 py-24">
                <div
                    ref={supportRef}
                    className="mx-auto grid max-w-[110rem] grid-cols-1 gap-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 backdrop-blur-sm md:p-12 lg:grid-cols-[1fr_0.9fr]"
                >
                    <div>
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">
                            We Are Here To Help
                        </p>

                        <h2 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
                            Need product, technical, or warranty support?
                        </h2>

                        <p className="mt-6 max-w-2xl text-base leading-8 text-white/60">
                            Whether you have a product inquiry, technical question, warranty
                            request, partnership proposal, or general feedback, the PartPixels
                            team is ready to assist you.
                        </p>
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                        <a
                            href="mailto:support@partpixels.com"
                            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-6 py-5 transition hover:border-[#5bd7ff]/50"
                        >
                            <div className="flex items-center gap-4">
                                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#5bd7ff]/10 text-[#5bd7ff]">
                                    <FiMail />
                                </span>

                                <div>
                                    <p className="text-sm text-white/40">Email Support</p>
                                    <p className="font-semibold">support@partpixels.com</p>
                                </div>
                            </div>
                        </a>

                        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/40 px-6 py-5">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white">
                                <FiClock />
                            </span>

                            <div>
                                <p className="text-sm text-white/40">Business Hours</p>
                                <p className="font-semibold">
                                    Monday – Saturday | 9:30 AM – 6:30 PM IST
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Blend */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-[180px] w-full bg-gradient-to-b from-transparent via-black/90 to-black" />
        </main>
    );
};

export default AboutCompanyPage;

