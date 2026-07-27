import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBookOpen, FiDownload, FiArrowUpRight, FiSearch, FiTag, FiX } from "react-icons/fi";
import { exploreArticles } from "../data/exploreArticles";
import MouseGlowCard from "../components/common/MouseGlowCard";
import usePageSeo from "../hooks/usePageSeo";

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", ...new Set(exploreArticles.map((art) => art.category))];

  const filteredArticles = useMemo(() => {
    return exploreArticles.filter((art) => {
      const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.highlights.some((h) => h.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const seoData = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "PartPixels SSD Storage Blog",
      description: "Official PartPixels SSD technical blog, articles, performance guides, and NAND flash storage breakdowns.",
      url: `${window.location.origin}/blog`,
    }),
    []
  );

  usePageSeo({
    title: "SSD Technical Blog | PartPixels Storage Knowledge",
    description: "Explore PartPixels SSD technical articles covering NAND flash memory, PCIe speeds, IOPS, lifespan, and quality standards.",
    keywords: ["SSD blog", "PartPixels SSD articles", "NAND flash guide", "SSD performance", "NVMe vs SATA"],
    path: "/blog",
    type: "website",
    structuredData: seoData,
  });

  return (
    <main className="min-h-screen overflow-hidden bg-backgroundPrimary text-white pt-28 pb-20">
      {/* Hero Header */}
      <section className="relative px-5 pb-16 pt-12 md:px-8 md:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(234,179,8,0.12),transparent_35%),radial-gradient(circle_at_15%_65%,rgba(234,179,8,0.06),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="relative mx-auto max-w-[110rem]">
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-highlightText">
            <span className="h-px w-10 bg-highlightText" />
            Official PartPixels Storage Blog
          </div>
          <h1 className="max-w-5xl text-[clamp(2.2rem,7vw,6.5rem)] font-black leading-[0.95] tracking-tight text-white">
            Storage Technical <span className="text-highlightText">Blog & Insights</span>
          </h1>
          <p className="mt-6 max-w-2xl text-textSecondary text-base sm:text-lg leading-relaxed">
            Technical guides, performance analyses, NAND flash breakdowns, and SSD buying advice straight from PartPixels engineers.
          </p>

          {/* Search & Category Filter Bar */}
          <div className="mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-t border-borderColor/60 pt-8">
            {/* Search Input Box */}
            <div className="relative flex items-center flex-1 max-w-xl w-full">
              <FiSearch className="absolute left-4 text-highlightText w-5 h-5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search SSD articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-backgroundSecondary/80 border border-borderColor/80 rounded-2xl pl-12 pr-10 py-3.5 text-white text-sm placeholder:text-textSecondary/60 focus:outline-none focus:border-highlightText focus:ring-1 focus:ring-highlightText shadow-xl transition-all duration-300"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 p-1 rounded-full text-textSecondary hover:text-white transition"
                  aria-label="Clear search"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-textSecondary font-mono uppercase tracking-wider font-bold mr-1">
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-highlightText text-black shadow-md"
                      : "bg-backgroundSecondary/80 text-textSecondary border border-borderColor/60 hover:border-highlightText/50 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-[110rem]">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-backgroundSecondary border border-borderColor rounded-3xl p-8 max-w-xl mx-auto">
              <FiSearch className="w-12 h-12 text-highlightText mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-white mb-2">No Articles Found</h3>
              <p className="text-textSecondary text-sm mb-6">
                No blog posts matched your search criteria. Try clearing search filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-highlightText text-black font-bold px-6 py-2.5 rounded-full text-xs hover:bg-buttonHover transition"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-6">
              {filteredArticles.map((article, index) => (
                <MouseGlowCard
                  key={article.slug}
                  className={`h-full ${index < 2 ? "xl:col-span-3" : "xl:col-span-2"}`}
                >
                  <article className="group relative overflow-hidden rounded-[2rem] border border-borderColor/60 bg-transparent h-full flex flex-col justify-between transition duration-300 hover:border-highlightText/50">
                    <Link
                      to={`/blog/${article.slug}`}
                      className="block h-full flex flex-col justify-between"
                      aria-label={`Read ${article.title}`}
                    >
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
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight tracking-tight group-hover:text-highlightText transition">
                            {article.title}
                          </h2>
                          <p className="mt-4 text-textSecondary text-sm sm:text-base leading-relaxed line-clamp-3">
                            {article.excerpt}
                          </p>

                          <div className="mt-6 flex flex-wrap gap-2">
                            {article.highlights.map((h) => (
                              <span key={h} className="text-xs bg-backgroundPrimary border border-borderColor text-textSecondary px-2.5 py-1 rounded-md flex items-center gap-1">
                                <FiTag className="w-3 h-3 text-highlightText" /> {h}
                              </span>
                            ))}
                          </div>
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
          )}
        </div>
      </section>
    </main>
  );
}
