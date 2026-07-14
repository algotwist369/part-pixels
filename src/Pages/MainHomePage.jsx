import { lazy, Suspense } from "react";
import HomePage from "./HomePage";
import AboutUs from "../Pages/AboutUs";
import ProductCards from "../components/cards/ProductCards";
import StorageStackSection from "../components/common/StorageStackSection";
import StorageImportanceSection from "../components/common/StorageImportanceSection";
import SSDGuideSection from "../components/common/SSDGuideSection";
import FAQSection from "../components/common/FAQSection";
import DeferredSection from "../components/common/DeferredSection";

const ProductDetailsShowcase = lazy(() => import("../components/product/ProductDetailsShowcase"));

const MainHomePage = () => {
  return (
    <>
      <HomePage />
      <StorageImportanceSection />
      <StorageStackSection />
      <SSDGuideSection />
      <AboutUs />
      <ProductCards />
      <DeferredSection minHeight="650vh">
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
          <ProductDetailsShowcase />
        </Suspense>
      </DeferredSection>
      <FAQSection />
    </>
  );
};

export default MainHomePage;