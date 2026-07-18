import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiDownload, FiFileText } from "react-icons/fi";
import { exploreArticles, getExploreArticle } from "../data/exploreArticles";
import usePageSeo from "../hooks/usePageSeo";

const ExploreArticlePage = () => {
  const { slug } = useParams();
  const article = getExploreArticle(slug);
  const related = exploreArticles.filter((item) => item.slug !== slug).slice(0, 3);
  const seoData = useMemo(() => article ? ({
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    image: `${window.location.origin}${article.heroImage}`,
    mainEntityOfPage: `${window.location.origin}/explore/${article.slug}`,
    author: { "@type": "Organization", name: "PartPixels" },
    publisher: { "@type": "Organization", name: "PartPixels" },
  }) : null, [article]);

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
    <main className="min-h-screen bg-[#020506] text-white">
      <header className="relative overflow-hidden border-b border-white/10 px-5 pb-20 pt-36 md:px-8 md:pb-28 md:pt-44">
        <div className="pointer-events-none absolute right-[-10%] top-[-20%] h-[650px] w-[650px] rounded-full bg-[#5bd7ff]/10 blur-[150px]" />
        <div className="relative mx-auto max-w-[110rem]">
          <Link to="/explore" className="mb-12 inline-flex items-center gap-2 text-white/55 transition hover:text-[#5bd7ff]">
            <FiArrowLeft /> Knowledge Center
          </Link>
          <div className="grid gap-12 xl:grid-cols-[1.08fr_.92fr] xl:items-end">
            <div>
              <div className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-[#5bd7ff]">{article.category}</div>
              <h1 className="max-w-5xl text-[clamp(3.2rem,7vw,7.8rem)] font-bold leading-[0.9] tracking-[-0.06em]">{article.title}</h1>
              <p className="mt-8 max-w-2xl text-white/58">{article.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                {article.highlights.map((highlight) => (
                  <span key={highlight} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white/66">{highlight}</span>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href={article.download} download className="inline-flex items-center gap-2 rounded-full bg-[#5bd7ff] px-6 py-3 font-semibold text-black transition hover:bg-white">
                  <FiDownload /> Download PDF
                </a>
                <span className="flex items-center gap-2 text-white/42"><FiFileText /> {article.pages} pages · {article.readTime}</span>
              </div>
            </div>
            <figure className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0d0f] p-2">
              <img src={article.heroImage} alt={article.heroAlt} fetchPriority="high" decoding="async" className="aspect-[4/3] w-full rounded-[1.55rem] object-cover" />
            </figure>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[110rem] gap-14 px-5 py-20 md:px-8 lg:grid-cols-[260px_minmax(0,850px)] lg:justify-between lg:py-28">
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-white/35">On this page</p>
          <nav aria-label="Article table of contents">
            <ol className="space-y-1 border-l border-white/10">
              {article.sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="block border-l border-transparent py-2 pl-5 text-sm text-white/45 transition hover:border-[#5bd7ff] hover:text-white">
                    <span className="mr-2 font-mono text-[10px] text-[#5bd7ff]">0{index + 1}</span>{section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <a href={article.download} download className="mt-8 inline-flex items-center gap-2 text-[#5bd7ff] transition hover:text-white"><FiDownload /> Keep the PDF</a>
        </aside>

        <article className="min-w-0">
          {article.sections.map((section, sectionIndex) => (
            <section id={section.id} key={section.id} className="scroll-mt-28 border-b border-white/10 pb-16 [&+section]:pt-16">
              <div className="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-[#5bd7ff]">Section 0{sectionIndex + 1}</div>
              <h2 className="max-w-3xl text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.045em]">{section.title}</h2>
              <div className="mt-7 space-y-5">
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-white/62">{paragraph}</p>)}
              </div>

              {section.callout && (
                <div className="my-10 rounded-[1.75rem] border border-[#5bd7ff]/25 bg-[#5bd7ff]/[0.06] p-7 sm:p-9">
                  <div className="type-stat text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-none tracking-[-0.05em] text-[#5bd7ff]">{section.callout.value}</div>
                  <p className="mt-3 text-white/55">{section.callout.label}</p>
                </div>
              )}

              {section.images.length > 0 && (
                <div className={`mt-10 grid gap-5 ${section.images.length > 1 ? "md:grid-cols-2" : ""}`}>
                  {section.images.map((image, imageIndex) => (
                    <figure key={image.src} className={`${section.images.length === 3 && imageIndex === 0 ? "md:col-span-2" : ""} overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#080b0d]`}>
                      <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className="max-h-[620px] w-full object-cover" />
                      <figcaption className="border-t border-white/10 px-5 py-4 font-mono text-xs leading-relaxed text-white/42">{image.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </section>
          ))}
        </article>
      </div>

      <section className="border-t border-white/10 px-5 py-24 md:px-8 md:py-32" aria-labelledby="related-reading-title">
        <div className="mx-auto max-w-[110rem]">
          <div className="mb-10 flex items-end justify-between gap-5">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-[#5bd7ff]">Continue learning</p>
              <h2 id="related-reading-title" className="text-[clamp(2.2rem,5vw,4.8rem)] font-semibold leading-none tracking-[-0.05em]">Related guides</h2>
            </div>
            <Link to="/explore" className="hidden items-center gap-2 text-white/55 transition hover:text-[#5bd7ff] sm:flex">View all <FiArrowUpRight /></Link>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} to={`/explore/${item.slug}`} className="group rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#5bd7ff]/50 hover:bg-[#5bd7ff]/[0.04]">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[#5bd7ff]">{item.category}</span>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.035em]">{item.title}</h3>
                <p className="mt-4 text-white/45">{item.excerpt}</p>
                <span className="mt-6 flex items-center gap-2 text-white transition group-hover:text-[#5bd7ff]">Read guide <FiArrowUpRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ExploreArticlePage;
