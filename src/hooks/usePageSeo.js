import { useEffect } from "react";

const EMPTY_KEYWORDS = [];

const upsertMeta = (name, content) => {
  let element = document.head.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertProperty = (property, content) => {
  let element = document.head.querySelector(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const usePageSeo = ({
  title,
  description,
  keywords = EMPTY_KEYWORDS,
  image = "/hero-1.jpg",
  imageAlt = "PartPixels PIXPRO SSD storage",
  path,
  type = "website",
  noIndex = false,
  structuredData,
}) => {
  useEffect(() => {
    const configuredOrigin = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    const canonicalUrl = `${configuredOrigin || window.location.origin}${path}`;
    document.title = title;
    upsertMeta("description", description);
    upsertMeta("keywords", Array.isArray(keywords) ? keywords.join(", ") : keywords);
    upsertMeta("author", "PartPixels");
    upsertMeta("robots", noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    upsertProperty("og:title", title);
    upsertProperty("og:description", description);
    upsertProperty("og:type", type);
    upsertProperty("og:url", canonicalUrl);
    upsertProperty("og:site_name", "PartPixels");
    upsertProperty("og:locale", "en_IN");
    upsertProperty("og:image", image.startsWith("http") ? image : `${configuredOrigin || window.location.origin}${image}`);
    upsertProperty("og:image:alt", imageAlt);
    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", title);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", image.startsWith("http") ? image : `${configuredOrigin || window.location.origin}${image}`);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const scriptId = "page-structured-data";
    document.getElementById(scriptId)?.remove();

    if (structuredData) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => document.getElementById(scriptId)?.remove();
  }, [description, image, imageAlt, keywords, noIndex, path, structuredData, title, type]);
};

export default usePageSeo;
