import { useLayoutEffect, useMemo, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowDown, FiArrowUpRight, FiCheck, FiCpu } from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import products from "../data/products.json";
import usePageSeo from "../hooks/usePageSeo";

gsap.registerPlugin(ScrollTrigger);

const ProductDetailPage = () => {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const heroVisualRef = useRef(null);
  const heroProductRef = useRef(null);
  const product = products.find((item) => item.slug === slug);
  const productStructuredData = useMemo(() => product ? ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.fullName,
    image: `${window.location.origin}${product.image}`,
    description: product.summary,
    brand: { "@type": "Brand", name: "PartPixels" },
    category: "Solid State Drive",
    additionalProperty: product.metrics.map((metric) => ({
      "@type": "PropertyValue",
      name: metric.label,
      value: metric.value,
    })),
  }) : null, [product]);

  usePageSeo({
    title: product ? `${product.name} SSD | PartPixels` : "Product Not Found | PartPixels",
    description: product?.summary || "The requested PartPixels SSD could not be found.",
    keywords: product ? [product.name, product.fullName, product.badge, "PartPixels SSD", "PIXPRO SSD"] : [],
    image: product?.image,
    imageAlt: product?.fullName,
    path: product ? `/products/${product.slug}` : window.location.pathname,
    type: "product",
    noIndex: !product,
    structuredData: productStructuredData,
  });

  useLayoutEffect(() => {
    if (!product) return undefined;
    const cleanupTasks = [];
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(pageRef);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.set(q(".pd-page-progress"), { scaleX: 0, transformOrigin: "left center" });
      gsap.to(q(".pd-page-progress"), {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      if (reducedMotion) {
        gsap.set(q(".pd-title-word-inner, .pd-hero-reveal, .pd-hero-product, .pd-fade-up, .pd-spec-row, .pd-feature-card"), {
          clearProps: "all",
          opacity: 1,
        });
        gsap.set(q(".pd-story-pin"), { height: "auto", overflow: "visible" });
        gsap.set(q(".pd-story-card-container"), { height: "auto" });
        gsap.set(q(".pd-story-card"), { position: "relative", autoAlpha: 1, clearProps: "transform,filter" });
        return;
      }

      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTimeline
        .fromTo(q(".pd-hero-kicker"), { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 })
        .fromTo(q(".pd-title-word-inner"), { yPercent: 115, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 0.9, stagger: 0.08 }, "-=0.2")
        .fromTo(q(".pd-hero-summary"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.55")
        .fromTo(q(".pd-hero-actions"), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.42")
        .fromTo(q(".pd-hero-metric"), { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, stagger: 0.09 }, "-=0.35");

      heroTimeline.fromTo(
        q(".pd-hero-product"),
        { x: 90, y: 44, rotate: 7, scale: 0.86, opacity: 0, filter: "blur(14px)" },
        { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2 },
        0.18,
      );

      gsap.to(q(".pd-orbit-a"), { rotate: 360, duration: 24, repeat: -1, ease: "none" });
      gsap.to(q(".pd-orbit-b"), { rotate: -360, duration: 32, repeat: -1, ease: "none" });
      gsap.fromTo(q(".pd-product-scan"), { yPercent: -160, opacity: 0 }, { yPercent: 260, opacity: 0.75, duration: 3.2, repeat: -1, repeatDelay: 1.2, ease: "power1.inOut" });

      gsap.to(q(".pd-hero-product"), {
        yPercent: -10,
        rotate: -2,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: q(".pd-hero")[0],
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      const visual = heroVisualRef.current;
      const visualSurface = visual?.querySelector(".pd-product-float");
      if (visual && visualSurface && window.matchMedia("(pointer: fine)").matches) {
        const rotateXTo = gsap.quickTo(visualSurface, "rotationX", { duration: 0.55, ease: "power3.out" });
        const rotateYTo = gsap.quickTo(visualSurface, "rotationY", { duration: 0.55, ease: "power3.out" });
        const moveXTo = gsap.quickTo(visualSurface, "x", { duration: 0.65, ease: "power3.out" });
        const moveYTo = gsap.quickTo(visualSurface, "y", { duration: 0.65, ease: "power3.out" });

        const handlePointerMove = (event) => {
          const bounds = visual.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          rotateXTo(y * -9);
          rotateYTo(x * 12);
          moveXTo(x * 16);
          moveYTo(y * 12);
        };
        const resetPointer = () => {
          rotateXTo(0);
          rotateYTo(0);
          moveXTo(0);
          moveYTo(0);
        };

        visual.addEventListener("pointermove", handlePointerMove, { passive: true });
        visual.addEventListener("pointerleave", resetPointer);
        cleanupTasks.push(() => {
          visual.removeEventListener("pointermove", handlePointerMove);
          visual.removeEventListener("pointerleave", resetPointer);
        });
      }

      const storyCards = gsap.utils.toArray(".pd-story-card");
      const storyDots = gsap.utils.toArray(".pd-story-dot");
      const storyProgress = q(".pd-story-progress")[0];
      const storyProduct = q(".pd-story-product")[0];
      const storyOrb = q(".pd-story-orb")[0];
      const storyCounter = q(".pd-story-counter")[0];

      if (storyCards.length && storyProduct) {
        gsap.set(storyCards, {
          yPercent: (index) => (index === 0 ? 0 : 34),
          autoAlpha: (index) => (index === 0 ? 1 : 0),
          scale: (index) => (index === 0 ? 1 : 0.92),
          filter: (index) => (index === 0 ? "blur(0px)" : "blur(14px)"),
        });

        gsap.set(storyDots, {
          backgroundColor: (index) => (index === 0 ? "#5bd7ff" : "rgba(255,255,255,0.2)"),
          scale: (index) => (index === 0 ? 1.35 : 1),
        });

        const storyTimeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(".pd-story-pin")[0],
            start: "top top",
            end: () => "+=" + storyCards.length * window.innerHeight * 0.9,
            scrub: 0.9,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        storyTimeline.to(storyProgress, { scaleY: 1, transformOrigin: "top center", duration: storyCards.length }, 0);
        storyTimeline.to(storyProduct, { rotate: -9, xPercent: -8, yPercent: -4, scale: 1.08, duration: storyCards.length / 2 }, 0);
        storyTimeline.to(storyProduct, { rotate: 7, xPercent: 7, yPercent: 5, scale: 0.96, duration: storyCards.length / 2 }, storyCards.length / 2);
        storyTimeline.to(storyOrb, { xPercent: 34, yPercent: -18, scale: 1.28, duration: storyCards.length }, 0);

        storyCards.forEach((card, index) => {
          const at = index;

          if (index > 0) {
            storyTimeline
              .to(storyCards[index - 1], { yPercent: -28, autoAlpha: 0, scale: 0.92, filter: "blur(12px)", duration: 0.46 }, at - 0.2)
              .to(card, { yPercent: 0, autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.54 }, at - 0.08);
          }

          storyTimeline
            .set(storyCounter, { textContent: String(index + 1).padStart(2, "0") }, at)
            .to(storyDots, { backgroundColor: "rgba(255,255,255,0.2)", scale: 1, duration: 0.12 }, at)
            .to(storyDots[index], { backgroundColor: "#5bd7ff", scale: 1.35, duration: 0.18 }, at)
            .to(storyProduct, { rotateY: index % 2 === 0 ? -10 : 10, rotateZ: index % 2 === 0 ? -2 : 2, duration: 0.45 }, at);
        });
      }

      gsap.utils.toArray(".pd-fade-up").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 82%" },
          }
        );
      });

      gsap.utils.toArray(".pd-spec-row").forEach((row) => {
        gsap.fromTo(
          row,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: row, start: "top 92%" },
          }
        );
      });

      ScrollTrigger.batch(q(".pd-feature-card"), {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.fromTo(batch, { y: 44, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.75, stagger: 0.08, ease: "power3.out" }),
      });
    }, pageRef);

    return () => {
      cleanupTasks.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [product]);

  if (!product) return <Navigate to="/" replace />;

  const primaryMetric = product.metrics[0];
  const secondaryMetric = product.metrics[1];
  const storySections = product.sections;
  const specs = product.specifications || product.metrics;

  return (
    <main ref={pageRef} className="overflow-hidden bg-black text-white">
      <div className="pd-page-progress fixed left-0 top-0 z-[70] h-[2px] w-full bg-[#5bd7ff] shadow-[0_0_18px_rgba(91,215,255,0.9)]" aria-hidden="true" />

      <section className="pd-hero relative min-h-screen overflow-hidden px-5 pt-28 md:px-8 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_73%_45%,rgba(91,215,255,0.38),transparent_28%),linear-gradient(115deg,#030303_0%,#0b0b0b_45%,#000_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(91,215,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(91,215,255,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />
        <div className="pointer-events-none absolute left-1/2 top-[47%] whitespace-nowrap text-[clamp(7rem,20vw,24rem)] font-black leading-none tracking-[-0.08em] text-white/[0.025] [transform:translate(-50%,-50%)]" aria-hidden="true">
          {product.name.replace("PIXPRO ", "")}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent" />
        <div className="pointer-events-none absolute right-[10%] top-[14%] hidden h-[70vh] w-[70vh] rounded-full border border-[#5bd7ff]/15 lg:block" />
        <div className="pointer-events-none absolute right-[16%] top-[22%] hidden h-[50vh] w-[50vh] rounded-full border border-white/[0.06] lg:block" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-[118rem] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="pb-12">
            <div className="pd-hero-kicker mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-[#5bd7ff]" />
              <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#5bd7ff]">{product.badge}</p>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">Quality tested</span>
            </div>
            <h1 className="type-page-title mt-6 max-w-6xl font-black" aria-label={product.name}>
              {product.name.split(" ").map((word) => (
                <span key={word} className="pd-title-word mr-[0.16em] inline-block overflow-hidden align-bottom">
                  <span className="pd-title-word-inner inline-block">{word}</span>
                </span>
              ))}
            </h1>
            <p className="pd-hero-summary mt-7 max-w-2xl text-lg leading-8 text-white/66">
              {product.summary}
            </p>
            <div className="pd-hero-actions mt-10 flex flex-wrap gap-3">
              <Link to="/contact-us" className="group inline-flex items-center gap-3 rounded-full bg-[#5bd7ff] px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black transition hover:bg-white">
                Product inquiry <FiArrowUpRight className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link to="/warranty" className="inline-flex items-center rounded-full border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white hover:text-black">
                5-year warranty
              </Link>
            </div>
          </div>

          <div ref={heroVisualRef} className="relative flex min-h-[500px] items-center justify-center [perspective:1200px] lg:min-h-[700px]">
            <div className="absolute h-[460px] w-[460px] rounded-full bg-[#5bd7ff]/20 blur-[120px]" />
            <div className="pd-orbit-a absolute h-[min(68vw,620px)] w-[min(68vw,620px)] rounded-full border border-[#5bd7ff]/20 before:absolute before:left-1/2 before:top-[-5px] before:h-2.5 before:w-2.5 before:rounded-full before:bg-[#5bd7ff] before:shadow-[0_0_22px_#5bd7ff]" />
            <div className="pd-orbit-b absolute h-[min(50vw,455px)] w-[min(50vw,455px)] rounded-full border border-dashed border-white/15 after:absolute after:bottom-[-4px] after:right-[28%] after:h-2 after:w-2 after:rounded-full after:bg-white/70" />
            <div className="pd-product-float relative z-10 w-full [transform-style:preserve-3d] will-change-transform">
              <div className="pd-product-scan pointer-events-none absolute left-[12%] top-1/2 z-20 h-px w-[76%] bg-gradient-to-r from-transparent via-[#5bd7ff] to-transparent shadow-[0_0_24px_rgba(91,215,255,0.9)]" />
              <img ref={heroProductRef} src={product.image} alt={product.fullName} decoding="async" fetchPriority="high" className="pd-hero-product relative z-10 max-h-[700px] w-full scale-110 object-contain brightness-110 contrast-110 drop-shadow-[0_48px_95px_rgba(0,0,0,0.96)]" />
            </div>
            <div className="absolute bottom-[12%] right-[4%] hidden rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-xl lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#5bd7ff]">Storage status</p>
              <p className="mt-2 text-sm font-semibold text-white/80">Performance ready</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[118rem] grid-cols-1 gap-px overflow-hidden rounded-t-[1.5rem] border border-b-0 border-white/10 bg-white/10 md:grid-cols-4">
          {product.metrics.map((metric, index) => (
            <div key={metric.label} className="pd-hero-metric group relative overflow-hidden bg-black/80 px-6 py-6 backdrop-blur-md">
              <span className="absolute right-5 top-4 font-mono text-[10px] text-white/20">0{index + 1}</span>
              <div className="absolute inset-y-0 left-0 w-px origin-bottom scale-y-0 bg-[#5bd7ff] transition duration-500 group-hover:scale-y-100" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">{metric.label}</p>
              <p className="type-stat mt-3 text-2xl font-black md:text-3xl">{metric.value}</p>
            </div>
          ))}
        </div>

        <a href="#product-story" className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35 transition hover:text-[#5bd7ff] xl:flex">
          Scroll to discover <FiArrowDown />
        </a>
      </section>

      <section id="product-story" className="relative px-5 py-24 md:px-8 lg:py-36">
        <div className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="pd-fade-up mx-auto max-w-[118rem]">
          <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#5bd7ff]">Product story</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="text-5xl font-black leading-[0.95] md:text-7xl">Performance details, revealed one precision moment at a time.</h2>
            <p className="max-w-3xl text-lg leading-8 text-white/62">{product.headline}. {product.summary}</p>
          </div>
        </div>
      </section>

      <section className="pd-story-pin relative h-screen overflow-hidden px-5 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_32%_46%,rgba(91,215,255,0.2),transparent_34%),linear-gradient(90deg,#020202_0%,#080704_50%,#020202_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="pd-story-orb pointer-events-none absolute left-[15%] top-[22%] h-[44rem] w-[44rem] rounded-full bg-[#5bd7ff]/12 blur-[120px]" />
        <div className="pointer-events-none absolute right-[4%] top-[15%] hidden items-end gap-2 font-mono lg:flex" aria-hidden="true">
          <span className="pd-story-counter text-7xl font-semibold leading-none tracking-[-0.08em] text-white/[0.08]">01</span>
          <span className="pb-1 text-sm text-white/20">/ {String(storySections.length).padStart(2, "0")}</span>
        </div>

        <div className="relative z-10 mx-auto grid h-full max-w-[118rem] items-center gap-10 lg:grid-cols-[0.12fr_0.9fr_0.98fr]">
          <div className="hidden h-[58vh] items-center justify-center lg:flex">
            <div className="relative h-full w-px bg-white/12">
              <div className="pd-story-progress absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[#5bd7ff]" />
              <div className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 flex-col justify-between py-1">
                {storySections.map((section, index) => (
                  <span key={section.title} className="pd-story-dot h-3 w-3 rounded-full ring-8 ring-black/70" aria-label={`Story step ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden h-[76vh] items-center justify-center lg:flex">
            <div className="absolute h-[560px] w-[560px] rounded-full border border-[#5bd7ff]/15" />
            <div className="absolute h-[390px] w-[390px] rounded-full border border-white/[0.06]" />
            <div className="absolute h-[220px] w-[72%] translate-y-40 bg-black/70 blur-[65px]" />
            <img src={product.image} alt={product.fullName} loading="lazy" decoding="async" className="pd-story-product relative z-10 max-h-[620px] w-full object-contain brightness-110 contrast-110 drop-shadow-[0_46px_94px_rgba(0,0,0,0.96)] [transform-style:preserve-3d]" />
          </div>

          <div className="relative flex min-h-[72vh] items-center">
            <div className="pd-story-card-container relative h-[480px] w-full max-w-4xl lg:h-[540px]">
              {storySections.map((section, index) => (
                <article key={section.title} className="pd-story-card absolute inset-0 flex flex-col justify-center rounded-[2rem] border border-white/10 bg-black/35 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10">
                  <div className="mb-7 flex items-center gap-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5bd7ff]/30 bg-[#5bd7ff]/10 text-sm font-black text-[#5bd7ff]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-white/14" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">Performance layer</span>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.36em] text-[#5bd7ff]">{product.badge}</p>
                  <h2 className="mt-5 max-w-3xl text-[clamp(2.65rem,5.2vw,6.4rem)] font-black leading-[0.9]">{section.title}</h2>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 md:text-lg">{section.body}</p>
                  <div className="mt-7 flex items-center gap-3 text-sm text-white/38">
                    <FiCheck className="text-[#5bd7ff]" /> Engineered and validated by PartPixels
                  </div>
                  <div className="mt-8 flex lg:hidden">
                    <img src={product.image} alt={section.title} loading="lazy" decoding="async" className="max-h-[260px] w-full object-contain" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 md:px-8 lg:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,215,255,0.22),transparent_34%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#5bd7ff]/10" />
        <div className="pd-fade-up relative mx-auto grid max-w-[118rem] gap-6 lg:grid-cols-2">
          {[primaryMetric, secondaryMetric].map((metric, index) => (
            <div key={metric.label} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-8 md:p-10">
              <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5bd7ff]/10 blur-[80px] transition duration-700 group-hover:bg-[#5bd7ff]/20" />
              <span className="absolute right-8 top-7 font-mono text-xs text-white/20">METRIC 0{index + 1}</span>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#5bd7ff]">{metric.label}</p>
              <p className="type-stat relative mt-8 text-[clamp(3.2rem,7.5vw,7.6rem)] font-black leading-none tracking-[-0.06em]">{metric.value}</p>
              <div className="mt-8 h-px w-full overflow-hidden bg-white/10"><div className="h-full w-1/2 bg-gradient-to-r from-[#5bd7ff] to-transparent transition-all duration-700 group-hover:w-full" /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[118rem] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="pd-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#5bd7ff]">Key features</p>
            <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Engineered details that matter.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {product.features.map((feature, index) => (
              <div key={feature} className="pd-feature-card group relative min-h-40 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#080b0d] p-6">
                <div className="absolute right-[-25%] top-[-50%] h-48 w-48 rounded-full bg-[#5bd7ff]/0 blur-[55px] transition duration-500 group-hover:bg-[#5bd7ff]/15" />
                <div className="relative flex items-start justify-between gap-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#5bd7ff]/25 bg-[#5bd7ff]/10 text-[#5bd7ff]"><FiCpu /></span>
                  <span className="font-mono text-[10px] text-white/22">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <p className="relative mt-7 text-base font-semibold leading-7 text-white/72 transition group-hover:text-white">{feature}</p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#5bd7ff] transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-[118rem]">
          <div className="pd-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#5bd7ff]">Specifications</p>
              <h2 className="mt-5 text-4xl font-black md:text-6xl">Product details</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/48">Clean technical information for customers who need exact compatibility, performance, and reliability details.</p>
          </div>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.018]">
            {specs.map((spec) => (
              <div key={spec.label} className="pd-spec-row group relative grid gap-3 border-b border-white/10 px-6 py-6 transition hover:bg-[#5bd7ff]/[0.035] last:border-b-0 md:grid-cols-[0.34fr_0.66fr] md:px-8">
                <span className="absolute bottom-0 left-0 top-0 w-px origin-center scale-y-0 bg-[#5bd7ff] transition duration-300 group-hover:scale-y-100" />
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/42 transition group-hover:text-[#5bd7ff]">{spec.label}</p>
                <p className="text-base font-semibold leading-7 text-white/76 transition group-hover:translate-x-1 group-hover:text-white">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {product.whyChoose && (
        <section className="px-5 py-24 md:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[118rem] gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <div className="pd-fade-up">
              <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#5bd7ff]">Why Choose PIXPRO?</p>
              <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Confidence in every detail.</h2>
            </div>
            <div className="pd-fade-up grid gap-3 sm:grid-cols-2">
              {product.whyChoose.map((item, index) => (
                <div key={item} className="group flex min-h-32 items-start gap-5 rounded-[1.4rem] border border-white/10 bg-[#080808] p-6 transition duration-500 hover:-translate-y-1 hover:border-[#5bd7ff]/35 hover:bg-[#5bd7ff]/[0.035]">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5bd7ff]/10 text-xs font-black text-[#5bd7ff]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="font-semibold leading-7 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.imageChecklist && (
        <section className="relative overflow-hidden px-5 py-24 md:px-8 lg:py-32">
          <div className="pointer-events-none absolute right-[8%] top-[15%] h-[30rem] w-[30rem] rounded-full bg-[#5bd7ff]/10 blur-[130px]" />
          <div className="relative mx-auto max-w-[118rem]">
            <div className="pd-fade-up grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#5bd7ff]">Product Images</p>
                <h2 className="mt-5 text-4xl font-black md:text-6xl">See the product from every essential angle.</h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-white/55">A complete photography set for installation, compatibility, packaging, and component reference.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {product.imageChecklist.map((view, index) => (
                <article key={view} className="pd-fade-up group relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6 transition duration-500 hover:-translate-y-2 hover:border-[#5bd7ff]/35">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,215,255,0.16),transparent_52%)]" />
                  <img src={product.image} alt={`${product.fullName} ${view}`} loading="lazy" decoding="async" className={`relative mx-auto h-44 w-full object-contain transition duration-500 group-hover:scale-105 ${index % 2 ? "-rotate-3" : "rotate-3"}`} />
                  <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                    <p className="font-bold text-white/78">{view}</p>
                    <span className="text-xs font-black text-[#5bd7ff]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      {product.capacities && (
        <section className="pd-fade-up px-5 pb-28 md:px-8">
          <div className="mx-auto max-w-[118rem]">
            <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#5bd7ff]">Available capacities</p>
            <h2 className="mt-5 text-4xl font-black md:text-6xl">Capacity performance matrix</h2>
            <div className="mt-10 overflow-x-auto ring-1 ring-white/10">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-white/10 text-xs uppercase tracking-[0.24em] text-white/48">
                  <tr>
                    <th className="px-5 py-4">Capacity</th>
                    <th className="px-5 py-4">Sequential Read</th>
                    <th className="px-5 py-4">Sequential Write</th>
                    <th className="px-5 py-4">Random Read</th>
                    <th className="px-5 py-4">Random Write</th>
                  </tr>
                </thead>
                <tbody>
                  {product.capacities.map((capacity) => (
                    <tr key={capacity.capacity} className="border-t border-white/10 bg-white/[0.025]">
                      <td className="px-5 py-4 font-black text-white">{capacity.capacity}</td>
                      <td className="px-5 py-4 text-white/70">{capacity.read}</td>
                      <td className="px-5 py-4 text-white/70">{capacity.write}</td>
                      <td className="px-5 py-4 text-white/70">{capacity.randomRead}</td>
                      <td className="px-5 py-4 text-white/70">{capacity.randomWrite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="px-5 pb-28 pt-12 md:px-8 lg:pb-36">
        <div className="pd-fade-up relative mx-auto max-w-[118rem] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(120deg,rgba(91,215,255,0.16),rgba(255,255,255,0.025)_45%,rgba(91,215,255,0.08))] p-8 md:p-14 lg:p-20">
          <div className="pointer-events-none absolute right-[-8%] top-[-70%] h-[34rem] w-[34rem] rounded-full border border-[#5bd7ff]/20" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#5bd7ff]">Ready to upgrade?</p>
              <h2 className="mt-5 max-w-4xl text-[clamp(2.6rem,6vw,6.5rem)] font-black leading-[0.92] tracking-[-0.055em]">Put {product.name} inside your next system.</h2>
              <p className="mt-7 max-w-2xl text-white/55">Talk to PartPixels about compatibility, capacity, availability, or the right SSD for your workload.</p>
            </div>
            <Link to="/contact-us" className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 font-bold text-black transition hover:bg-[#5bd7ff]">
              Contact PartPixels <FiArrowUpRight className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProductDetailPage;
