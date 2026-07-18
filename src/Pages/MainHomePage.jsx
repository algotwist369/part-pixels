import { lazy, Suspense } from "react";
import HomePage from "./HomePage";
import AboutUs from "../Pages/AboutUs";
import ProductCards from "../components/cards/ProductCards";
import StorageStackSection from "../components/common/StorageStackSection";
import StorageImportanceSection from "../components/common/StorageImportanceSection";
import SSDGuideSection from "../components/common/SSDGuideSection";
import FAQSection from "../components/common/FAQSection";
import DeferredSection from "../components/common/DeferredSection";
import usePageSeo from "../hooks/usePageSeo";

const ProductDetailsShowcase = lazy(() => import("../components/product/ProductDetailsShowcase"));

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "PartPixels",
      url: "https://partpixels.com/",
      logo: "https://partpixels.com/partpixels-logo-theme.png",
      email: "support@partpixels.com",
    },
    {
      "@type": "WebSite",
      name: "PartPixels",
      url: "https://partpixels.com/",
      description: "High-performance PIXPRO SATA and NVMe SSD storage.",
    },
  ],
};

const MainHomePage = () => {
  usePageSeo({
    title: "PartPixels | High-Performance PIXPRO SSD Storage",
    description: "Explore PartPixels PIXPRO SATA and NVMe SSDs engineered for fast performance, dependable endurance, modern workloads, and long-term reliability.",
    keywords: ["PartPixels", "PIXPRO SSD", "NVMe SSD", "SATA SSD", "M.2 2280 SSD", "TLC NAND SSD"],
    image: "/heroimage.jpeg",
    imageAlt: "PartPixels PIXPRO high-performance SSD",
    path: "/",
    structuredData: homeStructuredData,
  });

  return (
    <>
      <HomePage />
      <StorageImportanceSection />
      <DeferredSection minHeight="650vh">
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <ProductDetailsShowcase />
        </Suspense>
      </DeferredSection>
      <AboutUs />
      <SSDGuideSection />
      <ProductCards />
      <StorageStackSection />
      <FAQSection />
    </>
  );
};

export default MainHomePage;
