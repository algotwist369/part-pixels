import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import SiteLayout from "./components/common/SiteLayout";

const MainHomePage = lazy(() => import("./Pages/MainHomePage"));
const WarrantyPage = lazy(() => import("./Pages/WarrantyPage"));
const AboutCompanyPage = lazy(() => import("./Pages/AboutCompanyPage"));
const ContactPage = lazy(() => import("./Pages/ContactPage"));
const ProductDetailPage = lazy(() => import("./Pages/ProductDetailPage"));
const FAQs = lazy(() => import("./Pages/FAQs"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));

const PageFallback = () => (
  <div className="flex min-h-screen items-center justify-center bg-black text-white">
    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-[#d6a000]" aria-label="Loading page" />
  </div>
);

const App = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<MainHomePage />} />
          <Route path="/warranty" element={<WarrantyPage />} />
          <Route path="/about-company" element={<AboutCompanyPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;