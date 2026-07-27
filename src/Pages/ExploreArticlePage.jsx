import { useMemo, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiFileText } from "react-icons/fi";
import { exploreArticles, getExploreArticle } from "../data/exploreArticles";
import usePageSeo from "../hooks/usePageSeo";
import MouseGlowCard from "../components/common/MouseGlowCard";

const ExploreArticlePage = () => {
  const { slug } = useParams();
  const article = getExploreArticle(slug);
  const related = exploreArticles.filter((item) => item.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const seoData = useMemo(
    () =>
      article
        ? {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: article.title,
            description: article.description,
            image: `${window.location.origin}${article.heroImage}`,
            mainEntityOfPage: `${window.location.origin}/explore/${article.slug}`,
            author: { "@type": "Organization", name: "PartPixels" },
            publisher: { "@type": "Organization", name: "PartPixels" },
          }
        : null,
    [article]
  );

  usePageSeo({
    title: article?.seoTitle || "Article Not Found | PartPixels",
    description: article?.description || "The requested PartPixels guide could not be found.",
    keywords: article ? [article.category, article.title, ...article.highlights, "PartPixels SSD guide"] : [],
    image: article?.heroImage,
    path: article ? `/explore/${article.slug}` : "/explore",
    type: "article",
    structuredData: seoData,
  });

  if (!article) return <Navigate to="/explore" replace />;

  return (
    <main className="min-h-screen overflow-hidden bg-backgroundPrimary text-white pt-28 pb-20">
      <header className="relative overflow-hidden border-b border-borderColor/40 px-5 pb-16 pt-12 md:px-8 md:pb-24">
        {/* Yellow ambient glow */}
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[650px] w-[650px] rounded-full bg-highlightText/10 blur-[150px]" />
        
        <div className="relative mx-auto max-w-[110rem]">
          <Link
            to="/explore"
            className="mb-10 inline-flex items-center gap-2 text-textSecondary font-semibold transition hover:text-highlightText text-sm"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Knowledge Center
          </Link>

          <div className="grid gap-12 xl:grid-cols-[1.08fr_.92fr] xl:items-end">
            <div>
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-highlightText font-bold">
                {article.category}
              </div>
              <h1 className="max-w-5xl text-[clamp(2.2rem,6vw,6.5rem)] font-black leading-[0.95] tracking-tight text-white">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-textSecondary text-base sm:text-lg leading-relaxed">
                {article.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {article.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="rounded-full border border-highlightText/30 bg-highlightText/10 px-4 py-1.5 text-xs font-bold text-highlightText"
                  >
                    ✓ {highlight}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={article.download}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-highlightText px-6 py-3 font-bold text-black transition hover:bg-buttonHover shadow-lg text-sm"
                >
                  <FiDownload className="w-4 h-4" /> Download PDF Guide
                </a>
                <span className="flex items-center gap-2 text-textSecondary text-xs sm:text-sm">
                  <FiFileText className="w-4 h-4 text-highlightText" /> {article.pages} pages · {article.readTime}
                </span>
              </div>
            </div>

            <MouseGlowCard>
              <figure className="overflow-hidden rounded-[2rem] border border-borderColor bg-backgroundSecondary p-3 shadow-xl">
                <img
                  src={article.heroImage}
                  alt={article.heroAlt}
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-[1.55rem] object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop";
                  }}
                />
              </figure>
            </MouseGlowCard>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[110rem] gap-14 px-5 py-16 md:px-8 lg:grid-cols-[260px_minmax(0,850px)] lg:justify-between lg:py-24">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-textSecondary font-bold">
            On this page
          </p>
          <nav aria-label="Article table of contents">
            <ol className="space-y-1 border-l border-borderColor">
              {article.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block border-l border-transparent py-2 pl-4 text-xs sm:text-sm text-textSecondary transition hover:border-highlightText hover:text-highlightText font-medium"
                  >
                    <span className="mr-2 font-mono text-[11px] text-highlightText font-bold">
                      0{index + 1}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <a
            href={article.download}
            download
            className="mt-8 inline-flex items-center gap-2 text-highlightText font-bold text-xs uppercase tracking-wider transition hover:underline"
          >
            <FiDownload /> Keep the PDF Guide
          </a>
        </aside>

        {/* Article Content Sections */}
        <article className="min-w-0">
          {article.sections.map((section, sectionIndex) => (
            <section
              id={section.id}
              key={section.id}
              className="scroll-mt-28 border-b border-borderColor/60 pb-12 [&+section]:pt-12"
            >
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-highlightText font-bold">
                Section 0{sectionIndex + 1}
              </div>
              <h2 className="max-w-3xl text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {section.title}
              </h2>
              <div className="mt-6 space-y-4">
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-textSecondary text-base leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {section.callout && (
                <MouseGlowCard className="my-8">
                  <div className="rounded-[1.75rem] border border-highlightText/30 bg-highlightText/10 p-6 sm:p-8">
                    <div className="text-4xl sm:text-6xl font-black leading-none tracking-tight text-highlightText">
                      {section.callout.value}
                    </div>
                    <p className="mt-3 text-textSecondary font-semibold text-sm sm:text-base">
                      {section.callout.label}
                    </p>
                  </div>
                </MouseGlowCard>
              )}

              {section.images.length > 0 && (
                <div className={`mt-8 grid gap-5 ${section.images.length > 1 ? "md:grid-cols-2" : ""}`}>
                  {section.images.map((image, imageIndex) => (
                    <MouseGlowCard
                      key={image.src}
                      className={`${section.images.length === 3 && imageIndex === 0 ? "md:col-span-2" : ""}`}
                    >
                      <figure className="overflow-hidden rounded-[1.5rem] border border-borderColor bg-backgroundSecondary">
                        <img
                          src={image.src}
                          alt={image.alt}
                          loading="lazy"
                          decoding="async"
                          className="max-h-[500px] w-full object-cover"
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop";
                          }}
                        />
                        <figcaption className="border-t border-borderColor/60 px-5 py-3 font-mono text-xs leading-relaxed text-textSecondary">
                          {image.caption}
                        </figcaption>
                      </figure>
                    </MouseGlowCard>
                  ))}
                </div>
              )}
            </section>
          ))}
        </article>
      </div>

      {/* Related Reading Grid */}
      <section className="border-t border-borderColor/60 px-5 py-16 md:px-8 md:py-24" aria-labelledby="related-reading-title">
        <div className="mx-auto max-w-[110rem]">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.24em] text-highlightText font-bold">
                Continue learning
              </p>
              <h2 id="related-reading-title" className="text-3xl sm:text-5xl font-black text-white">
                Related Guides
              </h2>
            </div>
            <Link
              to="/explore"
              className="hidden items-center gap-2 text-highlightText font-bold text-sm transition hover:underline sm:flex"
            >
              View all guides <FiArrowUpRight />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {related.map((item) => (
              <MouseGlowCard key={item.slug} className="h-full">
                <Link
                  to={`/explore/${item.slug}`}
                  className="group block rounded-[1.5rem] border border-borderColor bg-backgroundSecondary p-6 transition duration-300 hover:border-highlightText/50 h-full flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-highlightText font-bold">
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-xl font-bold text-white group-hover:text-highlightText transition">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-textSecondary text-xs sm:text-sm line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="mt-6 flex items-center gap-2 text-xs font-bold text-highlightText">
                    Read guide <FiArrowUpRight />
                  </span>
                </Link>
              </MouseGlowCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExploreArticlePage;
