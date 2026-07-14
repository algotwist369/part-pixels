import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import products from "../data/products.json";

gsap.registerPlugin(ScrollTrigger);

const ProductDetailPage = () => {
  const { slug } = useParams();
  const pageRef = useRef(null);
  const product = products.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!product) return undefined;
    document.title = product.name + " | PartPixels";

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(pageRef);

      gsap.fromTo(
        q(".pd-hero-reveal"),
        { y: 58, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" }
      );

      gsap.fromTo(
        q(".pd-hero-product"),
        { x: 80, y: 40, rotate: 6, scale: 0.9, opacity: 0, filter: "blur(12px)" },
        { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.15, ease: "power3.out", delay: 0.2 }
      );

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

      const storyCards = gsap.utils.toArray(".pd-story-card");
      const storyDots = gsap.utils.toArray(".pd-story-dot");
      const storyProgress = q(".pd-story-progress")[0];
      const storyProduct = q(".pd-story-product")[0];
      const storyOrb = q(".pd-story-orb")[0];

      if (storyCards.length && storyProduct) {
        gsap.set(storyCards, {
          yPercent: (index) => (index === 0 ? 0 : 34),
          autoAlpha: (index) => (index === 0 ? 1 : 0),
          scale: (index) => (index === 0 ? 1 : 0.92),
          filter: (index) => (index === 0 ? "blur(0px)" : "blur(14px)"),
        });

        gsap.set(storyDots, {
          backgroundColor: (index) => (index === 0 ? "#d6a000" : "rgba(255,255,255,0.2)"),
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
            .to(storyDots, { backgroundColor: "rgba(255,255,255,0.2)", scale: 1, duration: 0.12 }, at)
            .to(storyDots[index], { backgroundColor: "#d6a000", scale: 1.35, duration: 0.18 }, at)
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
    }, pageRef);

    return () => ctx.revert();
  }, [product]);

  if (!product) return <Navigate to="/" replace />;

  const primaryMetric = product.metrics[0];
  const secondaryMetric = product.metrics[1];
  const storySections = product.sections;
  const specs = product.specifications || product.metrics;

  return (
    <main ref={pageRef} className="overflow-hidden bg-black text-white">
      <section className="pd-hero relative min-h-screen overflow-hidden px-5 pt-28 md:px-8 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_73%_45%,rgba(214,160,0,0.38),transparent_28%),linear-gradient(115deg,#030303_0%,#0b0b0b_45%,#000_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black to-transparent" />
        <div className="pointer-events-none absolute right-[10%] top-[14%] hidden h-[70vh] w-[70vh] rounded-full border border-[#d6a000]/15 lg:block" />
        <div className="pointer-events-none absolute right-[16%] top-[22%] hidden h-[50vh] w-[50vh] rounded-full border border-white/[0.06] lg:block" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-[118rem] items-center gap-12 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="pb-12">
            <div className="pd-hero-reveal mb-10 h-px w-40 bg-white/70" />
            <p className="pd-hero-reveal text-xs font-bold uppercase tracking-[0.46em] text-[#d6a000]">
              {product.badge}
            </p>
            <h1 className="pd-hero-reveal mt-6 max-w-5xl text-[clamp(3.5rem,8.7vw,10rem)] font-black leading-[0.84]">
              {product.name}
            </h1>
            <p className="pd-hero-reveal mt-7 max-w-2xl text-lg leading-8 text-white/66">
              {product.summary}
            </p>
            <div className="pd-hero-reveal mt-10 flex flex-wrap gap-3">
              <Link to="/contact-us" className="border border-white/35 px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-white/82 transition hover:border-[#d6a000] hover:text-[#d6a000]">
                Inquiry
              </Link>
              <Link to="/warranty" className="bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-black transition hover:bg-[#d6a000]">
                Warranty
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[500px] items-center justify-center lg:min-h-[700px]">
            <div className="absolute h-[460px] w-[460px] rounded-full bg-[#d6a000]/18 blur-[120px]" />
            <img src={product.image} alt={product.fullName} decoding="async" fetchPriority="high" className="pd-hero-product relative z-10 max-h-[700px] w-full scale-110 object-contain brightness-110 contrast-110 drop-shadow-[0_48px_95px_rgba(0,0,0,0.96)]" />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[118rem] grid-cols-1 gap-px bg-white/10 md:grid-cols-4">
          {product.metrics.map((metric) => (
            <div key={metric.label} className="pd-hero-reveal bg-black/78 px-6 py-5 backdrop-blur-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/40">{metric.label}</p>
              <p className="mt-3 text-2xl font-black md:text-3xl">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="pd-fade-up mx-auto max-w-[118rem]">
          <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#d6a000]">Product story</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="text-5xl font-black leading-[0.95] md:text-7xl">Performance details, revealed one precision moment at a time.</h2>
            <p className="max-w-3xl text-lg leading-8 text-white/62">{product.headline}. {product.summary}</p>
          </div>
        </div>
      </section>

      <section className="pd-story-pin relative h-screen overflow-hidden px-5 md:px-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_32%_46%,rgba(214,160,0,0.2),transparent_34%),linear-gradient(90deg,#020202_0%,#080704_50%,#020202_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <div className="pd-story-orb pointer-events-none absolute left-[15%] top-[22%] h-[44rem] w-[44rem] rounded-full bg-[#d6a000]/12 blur-[120px]" />

        <div className="relative z-10 mx-auto grid h-full max-w-[118rem] items-center gap-10 lg:grid-cols-[0.12fr_0.9fr_0.98fr]">
          <div className="hidden h-[58vh] items-center justify-center lg:flex">
            <div className="relative h-full w-px bg-white/12">
              <div className="pd-story-progress absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[#d6a000]" />
              <div className="absolute left-1/2 top-0 flex h-full -translate-x-1/2 flex-col justify-between py-1">
                {storySections.map((section, index) => (
                  <span key={section.title} className="pd-story-dot h-3 w-3 rounded-full ring-8 ring-black/70" aria-label={`Story step ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>

          <div className="relative hidden h-[76vh] items-center justify-center lg:flex">
            <div className="absolute h-[560px] w-[560px] rounded-full border border-[#d6a000]/15" />
            <div className="absolute h-[390px] w-[390px] rounded-full border border-white/[0.06]" />
            <div className="absolute h-[220px] w-[72%] translate-y-40 bg-black/70 blur-[65px]" />
            <img src={product.image} alt={product.fullName} loading="lazy" decoding="async" className="pd-story-product relative z-10 max-h-[620px] w-full object-contain brightness-110 contrast-110 drop-shadow-[0_46px_94px_rgba(0,0,0,0.96)] [transform-style:preserve-3d]" />
          </div>

          <div className="relative flex min-h-[72vh] items-center">
            <div className="relative h-[430px] w-full max-w-4xl lg:h-[500px]">
              {storySections.map((section, index) => (
                <article key={section.title} className="pd-story-card absolute inset-0 flex flex-col justify-center border-t border-white/12 bg-black/10 py-10 backdrop-blur-[2px]">
                  <div className="mb-7 flex items-center gap-5">
                    <span className="text-sm font-black text-[#d6a000]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-px flex-1 bg-white/14" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.36em] text-[#d6a000]">{product.badge}</p>
                  <h2 className="mt-5 max-w-3xl text-[clamp(2.65rem,5.2vw,6.4rem)] font-black leading-[0.9]">{section.title}</h2>
                  <p className="mt-7 max-w-2xl text-base leading-8 text-white/68 md:text-lg">{section.body}</p>
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(214,160,0,0.22),transparent_34%)]" />
        <div className="pd-fade-up relative mx-auto grid max-w-[118rem] gap-6 lg:grid-cols-2">
          {[primaryMetric, secondaryMetric].map((metric) => (
            <div key={metric.label} className="bg-white/[0.04] p-8 ring-1 ring-white/10 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#d6a000]">{metric.label}</p>
              <p className="mt-8 text-[clamp(3.2rem,7.5vw,7.6rem)] font-black leading-none">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto grid max-w-[118rem] gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="pd-fade-up">
            <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#d6a000]">Key features</p>
            <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Engineered details that matter.</h2>
          </div>
          <div className="pd-fade-up grid gap-px bg-white/10 md:grid-cols-2">
            {product.features.map((feature) => (
              <div key={feature} className="bg-[#080808] p-6 text-base font-semibold leading-7 text-white/68">{feature}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8 lg:py-32">
        <div className="mx-auto max-w-[118rem]">
          <div className="pd-fade-up mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#d6a000]">Specifications</p>
              <h2 className="mt-5 text-4xl font-black md:text-6xl">Product details</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-white/48">Clean technical information for customers who need exact compatibility, performance, and reliability details.</p>
          </div>
          <div className="overflow-hidden border-t border-white/10">
            {specs.map((spec) => (
              <div key={spec.label} className="pd-spec-row grid gap-3 border-b border-white/10 py-6 md:grid-cols-[0.34fr_0.66fr]">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/45">{spec.label}</p>
                <p className="text-base font-semibold leading-7 text-white/76">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {product.whyChoose && (
        <section className="px-5 py-24 md:px-8 lg:py-32">
          <div className="mx-auto grid max-w-[118rem] gap-10 lg:grid-cols-[0.68fr_1.32fr]">
            <div className="pd-fade-up">
              <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#d6a000]">Why Choose PIXPRO?</p>
              <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">Confidence in every detail.</h2>
            </div>
            <div className="pd-fade-up grid gap-px bg-white/10 sm:grid-cols-2">
              {product.whyChoose.map((item, index) => (
                <div key={item} className="flex min-h-32 items-start gap-5 bg-[#080808] p-6">
                  <span className="text-sm font-black text-[#d6a000]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="font-semibold leading-7 text-white/72">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {product.imageChecklist && (
        <section className="relative overflow-hidden px-5 py-24 md:px-8 lg:py-32">
          <div className="pointer-events-none absolute right-[8%] top-[15%] h-[30rem] w-[30rem] rounded-full bg-[#d6a000]/10 blur-[130px]" />
          <div className="relative mx-auto max-w-[118rem]">
            <div className="pd-fade-up grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#d6a000]">Product Images</p>
                <h2 className="mt-5 text-4xl font-black md:text-6xl">See the product from every essential angle.</h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-white/55">A complete photography set for installation, compatibility, packaging, and component reference.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {product.imageChecklist.map((view, index) => (
                <article key={view} className="pd-fade-up group relative min-h-72 overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-6">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,160,0,0.16),transparent_52%)]" />
                  <img src={product.image} alt={`${product.fullName} ${view}`} loading="lazy" decoding="async" className={`relative mx-auto h-44 w-full object-contain transition duration-500 group-hover:scale-105 ${index % 2 ? "-rotate-3" : "rotate-3"}`} />
                  <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-5">
                    <p className="font-bold text-white/78">{view}</p>
                    <span className="text-xs font-black text-[#d6a000]">{String(index + 1).padStart(2, "0")}</span>
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
            <p className="text-xs font-bold uppercase tracking-[0.46em] text-[#d6a000]">Available capacities</p>
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
    </main>
  );
};

export default ProductDetailPage;
