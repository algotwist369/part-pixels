import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const values = [
    { id: "01", title: "Reliable Storage", copy: "Consistent performance for everyday confidence." },
    { id: "02", title: "Clear by Design", copy: "Specifications explained without ambiguity." },
    { id: "03", title: "Quality Tested", copy: "Validated for stability and lasting durability." },
    { id: "04", title: "Built on Trust", copy: "Technology backed by transparent communication." },
];

const introTitle = "Storage built on quality, clarity, and trust.";
const manifestoTitle = "Protect what matters. Move without compromise.";

const WordLine = ({ text, className }) => (
    <h2 className={className}>
        {text.split(" ").map((word, index) => (
            <span key={`${word}-${index}`} className="about-story-word inline-block">
                {word}{index < text.split(" ").length - 1 ? "\u00a0" : ""}
            </span>
        ))}
    </h2>
);

const AboutUs = () => {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            const mobile = window.innerWidth < 768;
            const introWords = gsap.utils.toArray(".about-intro .about-story-word");
            const manifestoWords = gsap.utils.toArray(".about-manifesto .about-story-word");
            const initialWindow = mobile
                ? "inset(5% 5% 46% 5% round 1.75rem)"
                : "inset(7% 52% 7% 5% round 2.5rem)";

            if (reducedMotion) {
                gsap.set(".about-media", { clipPath: "inset(0% 0% 0% 0% round 0rem)" });
                gsap.set(introWords, { color: "#ffffff" });
                gsap.set([".about-manifesto", ".about-values", ".about-scanner"], { display: "none" });
                return;
            }

            gsap.set(".about-media", { clipPath: initialWindow });
            gsap.set(".about-media-image", { scale: 1.16 });
            gsap.set(introWords, { color: "rgba(255,255,255,0.16)" });
            gsap.set(manifestoWords, { color: "rgba(255,255,255,0.14)" });
            gsap.set([".about-manifesto", ".about-values"], { autoAlpha: 0 });
            gsap.set(".about-value-card", { y: 56, opacity: 0 });
            gsap.set(".about-scanner", { x: "-14vw", autoAlpha: 0 });
            gsap.set(".about-scanner-pulse", { y: "8vh" });

            const timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=320%",
                    pin: stageRef.current,
                    scrub: 1.25,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            timeline
                .from(".about-media", { opacity: 0, scale: 0.97, duration: 0.65, ease: "power3.out" }, 0)
                .from(".about-intro-kicker", { y: 24, opacity: 0, duration: 0.45, ease: "power3.out" }, 0.12)
                .to(introWords, { color: "#ffffff", stagger: 0.11, duration: 0.35 }, 0.32)
                .from(".about-intro-copy", { y: 28, opacity: 0, duration: 0.58, ease: "power3.out" }, 0.95)
                .to({}, { duration: 0.65 })
                .to(".about-intro", { y: -64, autoAlpha: 0, duration: 0.72, ease: "power2.in" }, 2.05)
                .to(".about-media", {
                    clipPath: "inset(0% 0% 0% 0% round 0rem)",
                    duration: 1.25,
                    ease: "power3.inOut",
                }, 2.15)
                .to(".about-media-image", { scale: 1.03, duration: 1.35, ease: "power3.inOut" }, 2.15)
                .to(".about-media-shade", { opacity: 0.78, duration: 0.8 }, 2.65)
                .to(".about-manifesto", { autoAlpha: 1, duration: 0.35 }, 3.05)
                .from(".about-manifesto-kicker", { y: 20, opacity: 0, duration: 0.45, ease: "power3.out" }, 3.08)
                .to(manifestoWords, { color: "#ffffff", stagger: 0.12, duration: 0.42 }, 3.28)
                .from(".about-manifesto-copy", { y: 26, opacity: 0, duration: 0.58, ease: "power3.out" }, 4.15)
                .to({}, { duration: 0.75 })
                .to(".about-manifesto", { y: -48, autoAlpha: 0, duration: 0.72, ease: "power2.in" }, 5.15)
                .to(".about-values", { autoAlpha: 1, duration: 0.35 }, 5.45)
                .from(".about-values-heading", { y: 24, opacity: 0, duration: 0.5, ease: "power3.out" }, 5.5)
                .to(".about-value-card", {
                    y: 0,
                    opacity: 1,
                    duration: 0.68,
                    stagger: 0.12,
                    ease: "power3.out",
                }, 5.65)
                .to(".about-scanner", { autoAlpha: 0.86, duration: 0.28 }, 0.18)
                .to(".about-scanner", { x: "125vw", duration: 6.25 }, 0.3)
                .to(".about-scanner-pulse", { y: "72vh", duration: 6.1 }, 0.3)
                .to(".about-scanner", { autoAlpha: 0, duration: 0.38 }, 6.15)
                .to(".about-progress-fill", { scaleY: 1, duration: 6.7 }, 0)
                .to({}, { duration: 1.2 });

            gsap.to(".about-media-image", {
                xPercent: 2.5,
                yPercent: 3,
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=320%",
                    scrub: 2,
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about-company" className="relative bg-[#020507] text-white">
            <div ref={stageRef} className="relative h-[100svh] overflow-hidden bg-[#020507]">
                <div className="about-media absolute inset-0 z-0 overflow-hidden bg-[#061018] will-change-[clip-path,transform]">
                    <img
                        src="/about-optimized.jpg"
                        alt="PartPixels solid-state storage technology"
                        loading="lazy"
                        decoding="async"
                        className="about-media-image h-full w-full object-cover object-[32%_center] saturate-[0.28] contrast-[1.16] will-change-transform"
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_31%_52%,rgba(91,215,255,0.22),transparent_26%)] mix-blend-screen" />
                    <div className="about-media-shade absolute inset-0 bg-[linear-gradient(105deg,rgba(1,5,8,0.2)_0%,rgba(1,7,11,0.48)_42%,rgba(1,4,7,0.94)_100%)] opacity-55" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
                    <div className="about-scanner pointer-events-none absolute -left-36 inset-y-0 z-10 w-40 opacity-0 will-change-transform sm:w-56" aria-hidden="true">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#5bd7ff]/[0.08] to-transparent blur-xl" />
                        <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#5bd7ff]/75 to-transparent shadow-[0_0_24px_rgba(91,215,255,0.8)]" />
                        <div className="about-scanner-pulse absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-[#a5ecff] bg-[#5bd7ff] shadow-[0_0_8px_#5bd7ff,0_0_28px_#5bd7ff]">
                            <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5bd7ff]/30" />
                        </div>
                        <div className="absolute left-[calc(50%+0.8rem)] top-[42%] whitespace-nowrap font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-[#a5ecff]/70">
                            Data verified
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(rgba(91,215,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(91,215,255,0.025)_1px,transparent_1px)] bg-[size:70px_70px] [mask-image:radial-gradient(circle_at_70%_50%,black,transparent_72%)]" />

                <div className="about-intro absolute inset-x-5 bottom-[6%] z-20 md:bottom-auto md:left-[54%] md:right-[5%] md:top-1/2 md:-translate-y-1/2">
                    <div className="about-intro-kicker mb-6 flex items-center gap-4">
                        <span className="h-px w-9 bg-[#5bd7ff]" />
                        <p className="font-bold uppercase tracking-[0.34em] text-[#5bd7ff]">About PartPixels</p>
                    </div>
                    <WordLine
                        text={introTitle}
                        className="max-w-4xl text-balance text-[clamp(2.8rem,5.4vw,6.4rem)] font-bold leading-[0.92] tracking-[-0.055em]"
                    />
                    <p className="about-intro-copy mt-7 max-w-xl text-white/62 md:mt-9">
                        Dependable SSD solutions with transparent specifications, consistent performance, and long-term confidence.
                    </p>
                </div>

                <div className="about-manifesto invisible absolute inset-0 z-20 flex items-center justify-center px-5 text-center">
                    <div>
                        <p className="about-manifesto-kicker mb-7 font-bold uppercase tracking-[0.36em] text-[#5bd7ff]">Our promise</p>
                        <WordLine
                            text={manifestoTitle}
                            className="mx-auto max-w-[92rem] text-balance text-[clamp(3.1rem,7vw,8.5rem)] font-bold leading-[0.9] tracking-[-0.06em]"
                        />
                        <p className="about-manifesto-copy mx-auto mt-9 max-w-2xl text-balance text-white/58">
                            Every PartPixels SSD is rigorously tested because speed only matters when reliability lasts.
                        </p>
                    </div>
                </div>

                <div className="about-values invisible absolute inset-0 z-20 flex flex-col justify-end px-5 pb-6 pt-24 md:px-8 md:pb-8 lg:px-12 lg:pb-12">
                    <div className="about-values-heading mb-6 flex items-end justify-between gap-6">
                        <div>
                            <p className="font-bold uppercase tracking-[0.34em] text-[#5bd7ff]">What defines us</p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Four principles. One standard.</h2>
                        </div>
                        <span className="hidden font-mono text-[11px] uppercase tracking-[0.24em] text-white/35 md:block">PartPixels / 2026</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <article key={value.id} className="about-value-card group min-h-[9.5rem] rounded-[1.35rem] border border-white/10 bg-black/55 p-4 backdrop-blur-xl transition-colors duration-500 hover:border-[#5bd7ff]/40 hover:bg-[#06141c]/80 md:min-h-[12rem] md:p-6">
                                <span className="font-mono text-[10px] font-bold tracking-[0.28em] text-[#5bd7ff]">{value.id}</span>
                                <h3 className="mt-7 text-base font-bold transition-colors group-hover:text-[#5bd7ff] md:text-xl">{value.title}</h3>
                                <p className="mt-2 hidden text-white/50 sm:block">{value.copy}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="absolute right-4 top-1/2 z-30 hidden h-28 w-px -translate-y-1/2 bg-white/10 md:block" aria-hidden="true">
                    <span className="about-progress-fill block h-full w-px origin-top scale-y-0 bg-[#5bd7ff] shadow-[0_0_10px_#5bd7ff]" />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
