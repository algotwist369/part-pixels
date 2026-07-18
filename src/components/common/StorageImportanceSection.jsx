import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiActivity, FiDatabase, FiShield } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: FiActivity,
    title: "Faster Every Day",
    description: "Reduce boot times, launch applications quickly, and move large files without slowing down your workflow.",
  },
  {
    icon: FiShield,
    title: "Protected by Design",
    description: "Dependable solid-state storage helps keep memories, projects, and business information safe and accessible.",
  },
  {
    icon: FiDatabase,
    title: "Ready for What Is Next",
    description: "From a personal upgrade to a professional workstation, PIXPRO storage is built to keep pace with your ambitions.",
  },
];

const storyPanels = [
  {
    eyebrow: "Why Storage Devices Matter",
    title: "Every byte carries something valuable.",
    description: "Your data holds memories, ideas, and essential work. Reliable storage keeps it protected, instantly accessible, and ready whenever you need it.",
  },
  {
    eyebrow: "Experience Next-Generation Storage",
    title: "Built for the speed of your ambition.",
    description: "PIXPRO SSDs combine exceptional speed and lasting reliability, helping creators, gamers, and professionals move through demanding work without delay.",
  },
];

const seededValue = (index, salt) => {
  const value = Math.sin(index * 91.73 + salt * 47.19) * 10000;
  return value - Math.floor(value);
};

const StorageImportanceSection = () => {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  const stars = useMemo(
    () => Array.from({ length: 76 }, (_, index) => ({
      id: index,
      left: `${seededValue(index, 1) * 100}%`,
      top: `${seededValue(index, 2) * 100}%`,
      size: `${0.8 + seededValue(index, 3) * 1.8}px`,
      opacity: 0.22 + seededValue(index, 4) * 0.68,
    })),
    [],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const panels = gsap.utils.toArray(".storage-story-panel");
      const firstPanel = panels[0];
      const secondPanel = panels[1];

      if (reducedMotion) {
        gsap.set(panels, { position: "relative", yPercent: 0, autoAlpha: 1 });
        gsap.set(".storage-word", { color: "#ffffff" });
        return;
      }

      const firstWords = firstPanel.querySelectorAll(".storage-word");
      const secondWords = secondPanel.querySelectorAll(".storage-word");
      gsap.set(firstWords, { color: "rgba(255,255,255,0.16)" });
      gsap.set(secondWords, { color: "rgba(255,255,255,0.16)" });
      gsap.set(secondPanel, { yPercent: 104, autoAlpha: 1 });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=480%",
          pin: pinRef.current,
          scrub: 1.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .from(".storage-panel-one .storage-eyebrow", { y: 24, autoAlpha: 0, duration: 0.45 }, 0)
        .to(".storage-star-field", { scale: 1.14, rotation: 0.6, duration: 7 }, 0)
        .to(firstWords, {
          color: "#ffffff",
          duration: 0.38,
          stagger: 0.13,
        }, 0.35)
        .from(".storage-panel-one .storage-description", {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
        }, 1.3)
        .to(".storage-panel-one .storage-panel-content", {
          yPercent: -10,
          scale: 0.96,
          opacity: 0.12,
          duration: 1.35,
          ease: "power2.in",
        }, 2.65)
        .to(secondPanel, {
          yPercent: 0,
          duration: 1.55,
          ease: "power3.inOut",
        }, 2.55)
        .from(".storage-panel-two .storage-eyebrow", {
          y: 24,
          autoAlpha: 0,
          duration: 0.6,
        }, 3.85)
        .to(secondWords, {
          color: "#ffffff",
          duration: 0.55,
          stagger: 0.18,
        }, 4.1)
        .from(".storage-panel-two .storage-description", {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
        }, 5.5)
        .to({}, { duration: 2.2 });

      const benefitsTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".storage-benefits-shell",
          start: "top 82%",
          once: true,
        },
      });

      benefitsTimeline
        .from(".storage-benefits-shell", {
          clipPath: "inset(0 0 100% 0 round 2rem)",
          opacity: 0.35,
          duration: 1.05,
          ease: "power3.out",
        })
        .from(".storage-benefit-card", {
          y: 64,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: "power3.out",
        }, 0.12)
        .from(".storage-benefit-icon", {
          scale: 0.25,
          rotation: -55,
          opacity: 0,
          duration: 0.75,
          stagger: 0.14,
          ease: "back.out(1.8)",
        }, 0.35)
        .from(".storage-benefit-copy", {
          y: 18,
          opacity: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
        }, 0.55)
        .fromTo(".storage-benefit-beam", {
          xPercent: -115,
        }, {
          xPercent: 115,
          duration: 1.7,
          ease: "power2.inOut",
        }, 0.2);

      const speedValue = sectionRef.current.querySelector(".storage-speed-value");
      const speedCounter = { value: 0 };
      speedValue.textContent = "0";

      const performanceTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".storage-performance-row",
          start: "top 80%",
          once: true,
        },
      });

      performanceTimeline
        .from(".storage-performance-line", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
        })
        .from(".storage-performance-label", {
          y: 18,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
        }, 0.2)
        .to(speedCounter, {
          value: 3500,
          duration: 1.65,
          ease: "power2.out",
          onUpdate: () => {
            speedValue.textContent = Math.round(speedCounter.value).toLocaleString("en-US");
          },
        }, 0.28)
        .from(".storage-speed-unit", {
          x: -18,
          opacity: 0,
          duration: 0.55,
          ease: "power2.out",
        }, 1.05)
        .from(".storage-performance-description", {
          y: 28,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
        }, 0.58);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate bg-black text-white">
      <div ref={pinRef} className="relative min-h-[100svh] overflow-hidden bg-black">
        <div className="storage-star-field pointer-events-none absolute -inset-[8%] z-0 will-change-transform" aria-hidden="true">
          {stars.map((star) => (
            <span
              key={star.id}
              className="absolute rounded-full bg-white shadow-[0_0_5px_rgba(255,255,255,0.45)]"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
              }}
            />
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.035),transparent_38%),radial-gradient(circle_at_14%_70%,rgba(91,215,255,0.07),transparent_24%)]" />

        {storyPanels.map((panel, panelIndex) => (
          <article
            key={panel.eyebrow}
            className={`storage-story-panel absolute inset-0 flex min-h-[100svh] items-center justify-center overflow-hidden px-5 py-24 ${panelIndex === 0 ? "storage-panel-one z-10" : "storage-panel-two z-20 bg-[linear-gradient(180deg,rgba(5,5,5,0.9)_0%,rgba(0,0,0,0.86)_28%,rgba(3,3,3,0.9)_100%)] will-change-transform"}`}
          >
            {panelIndex === 1 && (
              <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
                {stars.map((star) => (
                  <span
                    key={`panel-two-${star.id}`}
                    className="absolute rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.55)]"
                    style={{
                      left: star.left,
                      top: star.top,
                      width: star.size,
                      height: star.size,
                      opacity: Math.min(star.opacity * 0.82, 0.72),
                    }}
                  />
                ))}
              </div>
            )}

            {panelIndex === 1 && (
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#5bd7ff]/70 to-transparent" />
            )}

            <div className="storage-panel-content relative z-10 mx-auto w-full max-w-[110rem] text-center">
              <div className="storage-eyebrow mb-8 flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.34em] text-[#5bd7ff] md:text-sm">
                <span className="h-px w-8 bg-[#5bd7ff]/60" />
                <span>{panel.eyebrow}</span>
                <span className="h-px w-8 bg-[#5bd7ff]/60" />
              </div>

              <h2 className="mx-auto max-w-[92rem] text-balance text-[clamp(3.2rem,7.2vw,7rem)] font-bold leading-[0.94] tracking-[-0.055em]">
                {panel.title.split(" ").map((word, wordIndex) => (
                  <span key={`${word}-${wordIndex}`} className="storage-word inline-block transition-colors">
                    {word}{wordIndex < panel.title.split(" ").length - 1 ? "\u00a0" : ""}
                  </span>
                ))}
              </h2>

              <p className="storage-description mx-auto mt-9 max-w-2xl text-balance text-white/58 md:mt-12">
                {panel.description}
              </p>

              <div className="mx-auto mt-10 flex w-fit items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/30" aria-hidden="true">
                <span>{String(panelIndex + 1).padStart(2, "0")}</span>
                <span className="h-px w-12 bg-white/20" />
                <span>Scroll to explore</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="storage-details relative z-30 overflow-hidden bg-[#050505] px-5 py-24 lg:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[60rem] -translate-x-1/2 rounded-full bg-[#5bd7ff]/[0.035] blur-[120px]" />
        <div className="mx-auto max-w-[110rem]">
          <div className="storage-benefits-shell relative grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.32)] md:grid-cols-3">
            <div className="storage-benefit-beam pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 bg-gradient-to-r from-transparent via-[#5bd7ff]/10 to-transparent blur-xl" />

            {benefits.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="storage-benefit-card group relative overflow-hidden bg-[#090909] p-8 transition-colors duration-500 hover:bg-[#0d0d0d] md:p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#5bd7ff]/0 blur-3xl transition-colors duration-500 group-hover:bg-[#5bd7ff]/10" />
                <span className="absolute right-7 top-7 font-mono text-[11px] tracking-[0.28em] text-white/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="storage-benefit-icon relative flex h-12 w-12 items-center justify-center rounded-full border border-[#5bd7ff]/25 bg-[#5bd7ff]/10 text-[#5bd7ff] transition duration-500 group-hover:scale-110 group-hover:border-[#5bd7ff]/60 group-hover:bg-[#5bd7ff]/15">
                  <Icon size={21} />
                </span>
                <h3 className="storage-benefit-copy mt-8 text-xl font-bold transition-colors duration-300 group-hover:text-[#e4b21c]">{title}</h3>
                <p className="storage-benefit-copy mt-4 text-white/55">{description}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#5bd7ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            ))}
          </div>

          <div className="storage-performance-row relative mt-16 grid gap-8 border-b border-white/10 py-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <span className="storage-performance-line absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#5bd7ff]/70 via-white/20 to-transparent" />
            <div>
              <p className="storage-performance-label font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">PCIe Gen3 Performance</p>
              <p className="type-stat mt-3 flex items-baseline gap-3 text-5xl font-black md:text-7xl" aria-label="Up to 3,500 megabytes per second">
                <span className="storage-speed-value tabular-nums">3,500</span>
                <span className="storage-speed-unit text-xl text-white/40 md:text-2xl">MB/s</span>
              </p>
            </div>
            <p className="storage-performance-description max-w-4xl text-white/62">
              Dependable performance should be accessible to everyone. PIXPRO PCIe Gen3 NVMe SSDs combine premium NAND flash, advanced controller technology, intelligent thermal management, and 100% quality testing for speed, stability, and lasting value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorageImportanceSection;

