import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductsPage from "./Pages/ProductsPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import KnowledgeCenterPage from "./Pages/KnowledgeCenterPage";
import AboutPage from "./Pages/AboutPage";
import WarrantyPage from "./Pages/WarrantyPage";
import ContactPage from "./Pages/ContactPage";
import BlogPage from "./Pages/BlogPage";
import BlogReadPage from "./Pages/BlogReadPage";
import Navebar from "./components/common/Navebar";
import Footer from "./components/common/Footer";
import NotFound from "./components/common/NotFound";

const AppContent = () => {
  return (
    <div className="bg-backgroundPrimary min-h-screen">
      <Navebar />
      
      <Routes>
        {/* PartPixels Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/knowledge-center" element={<KnowledgeCenterPage />} />
        
        {/* Blog Routes */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogReadPage />} />
        <Route path="/explore" element={<BlogPage />} />
        <Route path="/explore/:slug" element={<BlogReadPage />} />

        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Fallback 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
