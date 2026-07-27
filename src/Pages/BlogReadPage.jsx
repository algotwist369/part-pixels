import React, { useMemo, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiFileText } from "react-icons/fi";
import { exploreArticles, getExploreArticle } from "../data/exploreArticles";
import usePageSeo from "../hooks/usePageSeo";
import MouseGlowCard from "../components/common/MouseGlowCard";

export default function BlogReadPage() {
  const { slug } = useParams();
  const article = getExploreArticle(slug);
  const related = exploreArticles.filter((item) => item.slug !== slug).slice(0, 3);

  const [activeSectionId, setActiveSectionId] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Scrollspy to highlight active Table of Contents section as user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (!article?.sections) return;
      const scrollPosition = window.scrollY + 220;

      for (let i = article.sections.length - 1; i >= 0; i--) {
        const secId = article.sections[i].id;
        const sectionEl = document.getElementById(secId);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSectionId(secId);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [article]);

  const seoData = useMemo(
    () =>
      article
        ? {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.description,
            image: `${window.location.origin}${article.heroImage}`,
            mainEntityOfPage: `${window.location.origin}/blog/${article.slug}`,
            author: { "@type": "Organization", name: "PartPixels" },
            publisher: { "@type": "Organization", name: "PartPixels" },
          }
        : null,
    [article]
  );

  usePageSeo({
    title: article?.seoTitle || "Blog Post Not Found | PartPixels",
    description: article?.description || "The requested PartPixels SSD blog post could not be found.",
    keywords: article ? [article.category, article.title, ...article.highlights, "PartPixels SSD blog"] : [],
    image: article?.heroImage,
    path: article ? `/blog/${article.slug}` : "/blog",
    type: "article",
    structuredData: seoData,
  });

  if (!article) return <Navigate to="/blog" replace />;

  return (
    <main className="min-h-screen overflow-x-clip bg-backgroundPrimary text-white pt-28 pb-20">
      <header className="relative overflow-hidden border-b border-borderColor/40 px-5 pb-16 pt-12 md:px-8 md:pb-24">
        {/* Yellow ambient glow */}
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[650px] w-[650px] rounded-full bg-highlightText/10 blur-[150px]" />

        <div className="relative mx-auto max-w-[110rem]">
          <Link
            to="/blog"
            className="mb-10 inline-flex items-center gap-2 text-textSecondary font-semibold transition hover:text-highlightText text-sm"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Storage Blog
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
                  <FiDownload className="w-4 h-4" /> Download Article PDF
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

      <div className="mx-auto grid max-w-[110rem] gap-14 px-5 py-16 md:px-8 lg:grid-cols-[280px_minmax(0,850px)] lg:justify-between lg:py-24">
        {/* Table of Contents Fixed/Sticky Sidebar */}
        <aside className="sticky top-28 self-start z-30 hidden lg:block bg-backgroundSecondary/30 backdrop-blur-md p-6 rounded-2xl border border-borderColor/60 shadow-xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-highlightText font-bold flex items-center gap-2">
            Table of Contents
          </p>
          <nav aria-label="Article table of contents">
            <ol className="space-y-1.5 border-l-2 border-borderColor/60">
              {article.sections.map((section, index) => {
                const isActive = activeSectionId === section.id || (!activeSectionId && index === 0);
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`block border-l-2 py-1.5 pl-4 text-xs sm:text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "border-highlightText text-highlightText font-bold bg-highlightText/10 rounded-r-lg"
                          : "-ml-[2px] border-transparent text-textSecondary hover:text-white hover:border-highlightText/50"
                      }`}
                    >
                      <span className={`mr-2 font-mono text-[11px] ${isActive ? "text-highlightText font-black" : "text-textSecondary"}`}>
                        0{index + 1}
                      </span>
                      {section.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="mt-8 pt-4 border-t border-borderColor/60">
            <a
              href={article.download}
              download
              className="inline-flex items-center gap-2 text-highlightText font-bold text-xs uppercase tracking-wider transition hover:text-white"
            >
              <FiDownload /> Keep PDF Version
            </a>
          </div>
        </aside>

        {/* Mobile Table of Contents Dropdown Accordion */}
        <div className="block lg:hidden bg-backgroundSecondary/40 p-4 rounded-2xl border border-borderColor">
          <details className="group">
            <summary className="font-mono text-xs uppercase tracking-wider text-highlightText font-bold cursor-pointer flex justify-between items-center">
              <span>Table of Contents ({article.sections.length} Sections)</span>
              <span className="text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <ol className="mt-4 space-y-2 pt-3 border-t border-borderColor/60">
              {article.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="block py-1 text-xs text-textSecondary hover:text-highlightText"
                  >
                    <span className="mr-2 text-highlightText font-bold">0{index + 1}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </div>

        {/* Article Content Sections */}
        <article className="min-w-0">
          {article.sections.map((section, sectionIndex) => (
            <section
              id={section.id}
              key={section.id}
              className="scroll-mt-32 border-b border-borderColor/60 pb-12 [&+section]:pt-12"
            >
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-highlightText font-bold">
                Section 0{sectionIndex + 1}
              </div>
              <h2 className="max-w-3xl text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                {section.title}
              </h2>
              <div className="mt-6 space-y-4">
                {section.paragraphs.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-textSecondary text-base sm:text-lg leading-relaxed">
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
                Continue reading
              </p>
              <h2 id="related-reading-title" className="text-3xl sm:text-5xl font-black text-white">
                Related Posts
              </h2>
            </div>
            <Link
              to="/blog"
              className="hidden items-center gap-2 text-highlightText font-bold text-sm transition hover:underline sm:flex"
            >
              View all blog posts <FiArrowUpRight />
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {related.map((item) => (
              <MouseGlowCard key={item.slug} className="h-full">
                <Link
                  to={`/blog/${item.slug}`}
                  className="group block rounded-[1.5rem] border border-borderColor/60 bg-transparent p-6 transition duration-300 hover:border-highlightText/50 h-full flex flex-col justify-between"
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
                    Read article <FiArrowUpRight />
                  </span>
                </Link>
              </MouseGlowCard>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}