import { useMemo } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiBookOpen, FiDownload } from "react-icons/fi";
import { exploreArticles } from "../data/exploreArticles";
import usePageSeo from "../hooks/usePageSeo";

const ExploreHubPage = () => {
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
    [],
  );

  usePageSeo({
    title: "SSD Knowledge Center | PartPixels",
    description: "Explore practical SSD guides covering NAND flash, speed, IOPS, lifespan, internal components, and PartPixels quality standards.",
    keywords: ["SSD knowledge center", "SSD guides", "NAND flash", "SSD lifespan", "random IOPS", "PartPixels"],
    image: exploreArticles[0].heroImage,
    path: "/explore",
    type: "website",
    structuredData: seoData,
  });

  return (
    <main className="min-h-screen overflow-hidden bg-[#020506] text-white">
      <section className="relative px-5 pb-20 pt-40 md:px-8 md:pb-28 md:pt-48">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(91,215,255,0.16),transparent_29%),radial-gradient(circle_at_15%_65%,rgba(91,215,255,0.08),transparent_28%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto max-w-[110rem]">
          <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-[#5bd7ff]">
            <span className="h-px w-10 bg-[#5bd7ff]" />
            SSD Knowledge Center
          </div>
          <h1 className="max-w-6xl text-[clamp(2.2rem,8vw,8rem)] font-bold leading-[0.92] tracking-[-0.055em]">
            Storage knowledge,
            <span className="block text-white/38">made practical.</span>
          </h1>
          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="max-w-2xl text-white/58">
              Understand the technology behind a faster, more reliable system. Every guide is built from our original technical PDFs and includes the source document for offline reading.
            </p>
            <div className="flex items-center gap-6 text-white/45">
              <span className="flex items-center gap-2"><FiBookOpen /> {exploreArticles.length} detailed guides</span>
              <span className="hidden items-center gap-2 sm:flex"><FiDownload /> Free PDFs</span>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 md:px-8 md:pb-40" aria-labelledby="explore-library-title">
        <div className="mx-auto max-w-[110rem]">
          <h2 id="explore-library-title" className="sr-only">Explore all SSD guides</h2>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {exploreArticles.map((article, index) => (
              <article
                key={article.slug}
                className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#080b0d] ${index < 2 ? "xl:col-span-3" : "xl:col-span-2"}`}
              >
                <Link to={`/explore/${article.slug}`} className="block h-full" aria-label={`Read ${article.title}`}>
                  <div className={`${index < 2 ? "aspect-[16/9]" : "aspect-[4/3]"} overflow-hidden bg-[#0c1114]`}>
                    <img
                      src={article.heroImage}
                      alt={article.heroAlt}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover opacity-70 transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-90"
                    />
                    <div className="absolute inset-x-0 top-0 aspect-[16/9] bg-gradient-to-b from-transparent via-transparent to-[#080b0d]" />
                  </div>
                  <div className="relative p-6 sm:p-8">
                    <div className="mb-5 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-[#5bd7ff]">
                      <span>{article.category}</span>
                      <span className="text-white/35">0{index + 1}</span>
                    </div>
                    <h3 className="max-w-xl text-[clamp(1.6rem,2.4vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em]">
                      {article.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-white/48">{article.excerpt}</p>
                    <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5 text-white/45">
                      <span>{article.readTime} · {article.pages} PDF pages</span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition group-hover:border-[#5bd7ff] group-hover:bg-[#5bd7ff] group-hover:text-black">
                        <FiArrowUpRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExploreHubPage;
