import { useLayoutEffect, useRef } from "react";
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
        accent: "text-[#5bd7ff]",
        line: "bg-[#5bd7ff]",
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
        accent: "text-[#38bdf8]",
        line: "bg-[#38bdf8]",
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

    useLayoutEffect(() => {
        const cardCleanups = [];
        const ctx = gsap.context(() => {
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const finePointer = window.matchMedia("(pointer: fine) and (min-width: 768px)").matches;
            const mobile = window.innerWidth < 768;

            const orbitCards = cardRefs.current;

            if (reducedMotion || mobile) {
                gsap.set(orbitCards, { clearProps: "all" });
                return;
            }
            const orbitDots = gsap.utils.toArray(".guide-orbit-dot");
            const cardCount = orbitCards.length;
            const sideDistance = Math.min(Math.max(window.innerWidth * 0.27, 190), 410);
            const farDistance = Math.min(Math.max(window.innerWidth * 0.43, 310), 660);
            const orbitPosition = (cardIndex, activeIndex) => {
                let relative = cardIndex - activeIndex;
                if (relative > Math.floor(cardCount / 2)) relative -= cardCount;
                if (relative < -Math.floor(cardCount / 2)) relative += cardCount;

                if (relative === 0) return { x: 0, y: 72, scale: 1, opacity: 1, rotationY: 0, rotationZ: 0, zIndex: 20 };
                if (Math.abs(relative) === 1) return {
                    x: Math.sign(relative) * sideDistance,
                    y: -42,
                    scale: 0.72,
                    opacity: 0.5,
                    rotationY: relative * -13,
                    rotationZ: relative * 4,
                    zIndex: 10,
                };
                return {
                    x: Math.sign(relative) * farDistance,
                    y: -168,
                    scale: 0.48,
                    opacity: 0.18,
                    rotationY: relative * -10,
                    rotationZ: relative * 5,
                    zIndex: 5,
                };
            };

            gsap.set(orbitCards, { xPercent: -50, yPercent: -50, transformPerspective: 1200, transformOrigin: "center center" });
            orbitCards.forEach((card, index) => {
                gsap.set(card, orbitPosition(index, 0));
                gsap.set(card.querySelector(".guide-card-secondary"), { opacity: index === 0 ? 1 : 0 });
            });
            gsap.set(orbitDots, { scale: 1, opacity: 0.25 });
            gsap.set(orbitDots[0], { scale: 1.8, opacity: 1 });
            gsap.set(".guide-card-accent", { scaleY: 0, transformOrigin: "top center" });
            gsap.set(".guide-card-glow", { xPercent: -135 });

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
                .from(orbitCards, {
                    y: (index) => orbitPosition(index, 0).y + 82,
                    opacity: 0,
                    scale: (index) => orbitPosition(index, 0).scale * 0.88,
                    rotationX: 14,
                    duration: 0.9,
                    stagger: 0.12,
                    ease: "power3.out",
                }, "-=0.35")
                .to(".guide-card-accent", {
                    scaleY: 1,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: "power3.out",
                }, "-=0.8")
                .from(".guide-card-badge", {
                    scale: 0.72,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "back.out(1.8)",
                }, "-=0.75")
                .from(".guide-card-copy", {
                    y: 18,
                    opacity: 0,
                    duration: 0.55,
                    stagger: 0.06,
                    ease: "power2.out",
                }, "-=0.65")
                .to(".guide-card-glow", {
                    xPercent: 135,
                    duration: 1.35,
                    stagger: 0.1,
                    ease: "power2.inOut",
                }, "-=0.9");

            const orbitTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".guide-orbit-section",
                    start: "top top",
                    end: "+=420%",
                    pin: ".guide-orbit-stage",
                    scrub: 1.15,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            for (let activeIndex = 1; activeIndex < cardCount; activeIndex += 1) {
                const at = (activeIndex - 1) * 1.35;
                orbitCards.forEach((card, cardIndex) => {
                    orbitTimeline.to(card, {
                        ...orbitPosition(cardIndex, activeIndex),
                        duration: 0.95,
                        ease: "power3.inOut",
                    }, at);
                });
                orbitTimeline
                    .to(".guide-card-secondary", { opacity: 0, duration: 0.24 }, at)
                    .to(orbitCards[activeIndex].querySelector(".guide-card-secondary"), { opacity: 1, duration: 0.42 }, at + 0.48)
                    .to(orbitDots, { scale: 1, opacity: 0.25, duration: 0.2 }, at)
                    .to(orbitDots[activeIndex], { scale: 1.8, opacity: 1, duration: 0.38 }, at + 0.42)
                    .to({}, { duration: 0.4 });
            }

            const nandTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".nand-section",
                    start: "top 80%",
                    once: true,
                },
            });

            nandTimeline
                .from(".nand-heading", {
                    x: -46,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .from(".nand-card", {
                    y: 64,
                    opacity: 0,
                    rotationX: 12,
                    scale: 0.95,
                    transformPerspective: 900,
                    duration: 0.85,
                    stagger: 0.16,
                    ease: "power3.out",
                }, "-=0.45")
                .from(".nand-divider", {
                    scaleY: 0,
                    transformOrigin: "top center",
                    duration: 0.7,
                    ease: "power3.inOut",
                }, "-=0.65");

            if (finePointer) {
                cardRefs.current.forEach((card) => {
                    const surface = card.querySelector(".guide-card-surface");
                    gsap.set(surface, { transformPerspective: 900, transformOrigin: "center center" });
                    const rotateXTo = gsap.quickTo(surface, "rotationX", { duration: 0.45, ease: "power3.out" });
                    const rotateYTo = gsap.quickTo(surface, "rotationY", { duration: 0.45, ease: "power3.out" });
                    const yTo = gsap.quickTo(surface, "y", { duration: 0.4, ease: "power3.out" });

                    const handleMove = (event) => {
                        const bounds = card.getBoundingClientRect();
                        const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
                        const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;
                        rotateXTo(normalizedY * -7);
                        rotateYTo(normalizedX * 7);
                        yTo(-7);
                    };

                    const handleLeave = () => {
                        rotateXTo(0);
                        rotateYTo(0);
                        yTo(0);
                    };

                    card.addEventListener("pointermove", handleMove, { passive: true });
                    card.addEventListener("pointerleave", handleLeave);
                    cardCleanups.push(() => {
                        card.removeEventListener("pointermove", handleMove);
                        card.removeEventListener("pointerleave", handleLeave);
                    });
                });
            }
        }, sectionRef);

        return () => {
            cardCleanups.forEach((cleanup) => cleanup());
            ctx.revert();
        };
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
            <div className="pointer-events-none absolute right-[8%] top-[25%] h-[420px] w-[420px] rounded-full bg-[#5bd7ff]/10 blur-[120px]" />
            <div className="pointer-events-none absolute left-[5%] bottom-[10%] h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

            <div className="relative z-10 mx-auto max-w-[110rem]">
                {/* Heading */}
                <div ref={headingRef} className="mb-16 text-center">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">
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

                <div className="guide-orbit-section relative -mx-5">
                    <div className="guide-orbit-stage relative flex flex-col gap-6 py-8 px-5 overflow-visible md:block md:h-[100svh] md:min-h-[680px] md:overflow-hidden md:py-0 md:px-5 [perspective:1400px]">
                        <div ref={leftRef} className="relative inset-x-0 z-30 flex max-w-5xl items-start justify-between gap-6 md:absolute md:inset-x-5 md:top-12 md:mx-auto">
                            <div>
                                <p className="font-bold uppercase tracking-[0.32em] text-[#5bd7ff]">Find your performance fit</p>
                                <p className="mt-2 max-w-sm text-white/42">Scroll to bring each workflow into focus.</p>
                            </div>
                            <div className="hidden items-center gap-8 sm:flex">
                                <div className="text-right">
                                    <p className="type-stat text-2xl font-black">560</p>
                                    <p className="uppercase tracking-[0.18em] text-white/35">MB/s SATA</p>
                                </div>
                                <span className="h-10 w-px bg-white/10" />
                                <div>
                                    <p className="type-stat text-2xl font-black text-[#5bd7ff]">7,400</p>
                                    <p className="uppercase tracking-[0.18em] text-white/35">MB/s NVMe</p>
                                </div>
                            </div>
                        </div>

                        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[34rem] w-[min(96vw,82rem)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#5bd7ff]/15 [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_94%)] hidden md:block" />
                        <div className="pointer-events-none absolute left-1/2 top-[42%] h-[24rem] w-[min(76vw,60rem)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-white/[0.07] [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_94%)] hidden md:block" />
                        <div className="pointer-events-none absolute left-1/2 top-[54%] h-[28rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5bd7ff]/[0.055] blur-[110px] hidden md:block" />

                        {guideCards.map((item, index) => (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    if (el) cardRefs.current[index] = el;
                                }}
                                className="guide-orbit-card relative w-full md:absolute md:left-1/2 md:top-1/2 md:w-[min(86vw,29rem)] md:will-change-transform"
                            >
                                <article className="guide-card-surface group relative min-h-[23rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#070b0f]/90 p-7 shadow-[0_32px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-500 hover:border-[#5bd7ff]/30 hover:bg-[#091219]/95 hover:shadow-[0_35px_110px_rgba(0,0,0,0.68)] md:p-8">
                                    <div className="guide-card-glow pointer-events-none absolute inset-y-0 left-0 z-20 w-1/2 bg-gradient-to-r from-transparent via-[#5bd7ff]/10 to-transparent blur-xl" />
                                    <div className={`guide-card-accent absolute left-0 top-0 h-full w-[3px] ${item.line} opacity-70`} />

                                    <div className="mb-9 flex items-center justify-between">
                                        <span className="font-mono text-[11px] font-bold tracking-[0.26em] text-white/25 whitespace-nowrap">0{item.id}</span>
                                        <span className={`guide-card-badge rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${item.accent}`}>
                                            {item.speed}
                                        </span>
                                    </div>

                                    <h3 className="guide-card-copy text-3xl font-bold text-white md:text-4xl">{item.title}</h3>

                                    <div className="guide-card-secondary">
                                        <p className={`guide-card-copy mt-4 font-bold ${item.accent}`}>{item.type}</p>
                                        <p className="guide-card-copy mt-6 max-w-sm leading-7 text-white/60">{item.description}</p>
                                        <div className="mt-9 h-px w-full bg-white/10">
                                            <div className={`h-px w-0 ${item.line} transition-all duration-500 group-hover:w-full`} />
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}

                        <div className="absolute bottom-10 left-1/2 z-30 hidden items-center gap-4 -translate-x-1/2 md:flex">
                            {guideCards.map((item) => (
                                <span key={item.id} className="guide-orbit-dot h-1.5 w-1.5 rounded-full bg-[#5bd7ff]" />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="nand-section mt-20 border-t border-white/10 pt-14">
                    <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
                        <div className="nand-heading">
                            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">TLC vs QLC NAND Flash</p>
                            <h3 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">Choose the NAND technology that fits your priorities.</h3>
                            <p className="mt-6 max-w-xl text-base leading-8 text-white/55">NAND type influences endurance, sustained performance, capacity, and value. Understanding the difference helps you choose with confidence.</p>
                        </div>
                        <div className="grid gap-px overflow-hidden rounded-[1.5rem] bg-white/10 md:grid-cols-2">
                            <article className="nand-card relative bg-[#0a0a0a] p-8 transition-colors duration-500 hover:bg-[#071219]">
                                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#5bd7ff]">TLC · Three Bits per Cell</p>
                                <h4 className="mt-5 text-2xl font-bold">Performance & Endurance</h4>
                                <p className="mt-4 text-sm leading-7 text-white/58">TLC NAND provides an excellent balance of speed, endurance, and reliability. It is ideal for consistent performance, professional workloads, gaming, and long-term durability.</p>
                            </article>
                            <article className="nand-card relative bg-[#0a0a0a] p-8 transition-colors duration-500 hover:bg-[#071219]">
                                <span className="nand-divider absolute inset-y-0 left-0 w-px bg-gradient-to-b from-[#5bd7ff]/70 to-transparent md:block" />
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
