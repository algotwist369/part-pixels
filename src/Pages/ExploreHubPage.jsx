import { useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBookOpen, FiDownload } from "react-icons/fi";
import { exploreArticles } from "../data/exploreArticles";
import usePageSeo from "../hooks/usePageSeo";
import MouseGlowCard from "../components/common/MouseGlowCard";

const ExploreHubPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const seoData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "PartPixels SSD Knowledge Center",
      description: "Practical SSD guides covering performance, reliability, NAND flash, components, and PartPixels quality standards.",
      url: `${window.location.origin}/explore`,
      hasPart: exploreArticles.map((article) => ({
        "@type": "Article",
        headline: article.title,
        url: `${window.location.origin}/explore/${article.slug}`,
      })),
    }),
    []
  );

  usePageSeo({
    title: "SSD Knowledge Center | PartPixels",
    description: "Explore practical SSD guides covering NAND flash, speed, IOPS, lifespan, internal components, and PartPixels quality standards.",
    keywords: ["SSD knowledge center", "SSD guides", "NAND flash", "SSD lifespan", "random IOPS", "PartPixels"],
    image: exploreArticles[0]?.heroImage,
    path: "/explore",
    type: "website",
    structuredData: seoData,
  });

  return (
    <main className="min-h-screen overflow-hidden bg-backgroundPrimary text-white pt-28 pb-20">
      <section className="relative px-5 pb-16 pt-12 md:px-8 md:pb-24">
        {/* Background Ambient Orbs */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(234,179,8,0.12),transparent_35%),radial-gradient(circle_at_15%_65%,rgba(234,179,8,0.06),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto max-w-[110rem]">
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-highlightText">
            <span className="h-px w-10 bg-highlightText" />
            SSD Technical Guides & Hub
          </div>
          <h1 className="max-w-6xl text-[clamp(2.2rem,7vw,7rem)] font-black leading-[0.92] tracking-[-0.055em] text-white">
            Storage Knowledge,
            <span className="block text-highlightText">Made Practical.</span>
          </h1>
          <div className="mt-8 grid gap-8 border-t border-borderColor/60 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-2xl text-textSecondary text-base sm:text-lg leading-relaxed">
              Understand the engineering behind faster, more reliable storage. Every guide is compiled from PartPixels technical documentation and includes original source PDFs for offline reference.
            </p>
            <div className="flex items-center gap-6 text-textSecondary font-medium text-sm">
              <span className="flex items-center gap-2 text-highlightText font-bold">
                <FiBookOpen className="w-5 h-5" /> {exploreArticles.length} Technical Guides
              </span>
              <span className="hidden items-center gap-2 sm:flex">
                <FiDownload className="w-5 h-5 text-highlightText" /> Free PDF Resources
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8" aria-labelledby="explore-library-title">
        <div className="mx-auto max-w-[110rem]">
          <h2 id="explore-library-title" className="sr-only">Explore all SSD guides</h2>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-6">
            {exploreArticles.map((article, index) => (
              <MouseGlowCard
                key={article.slug}
                className={`h-full ${index < 2 ? "xl:col-span-3" : "xl:col-span-2"}`}
              >
                <article className="group relative overflow-hidden rounded-[2rem] border border-borderColor bg-backgroundSecondary h-full flex flex-col justify-between transition duration-300 hover:border-highlightText/50">
                  <Link to={`/explore/${article.slug}`} className="block h-full flex flex-col justify-between" aria-label={`Read ${article.title}`}>
                    <div>
                      <div className={`${index < 2 ? "aspect-[16/9]" : "aspect-[4/3]"} overflow-hidden bg-backgroundPrimary relative`}>
                        <img
                          src={article.heroImage}
                          alt={article.heroAlt}
                          loading={index < 2 ? "eager" : "lazy"}
                          decoding="async"
                          className="h-full w-full object-cover opacity-75 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-95"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-backgroundSecondary to-transparent" />
                      </div>
                      <div className="relative p-6 sm:p-8">
                        <div className="mb-4 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-highlightText font-bold">
                          <span>{article.category}</span>
                          <span className="text-textSecondary">0{index + 1}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight group-hover:text-highlightText transition">
                          {article.title}
                        </h3>
                        <p className="mt-4 text-textSecondary text-sm sm:text-base leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 pt-0">
                      <div className="flex items-center justify-between border-t border-borderColor/60 pt-5 text-textSecondary text-xs sm:text-sm font-medium">
                        <span>{article.readTime} · {article.pages} PDF pages</span>
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-borderColor bg-backgroundPrimary text-white transition group-hover:border-highlightText group-hover:bg-highlightText group-hover:text-black">
                          <FiArrowUpRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              </MouseGlowCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExploreHubPage;
