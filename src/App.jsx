import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import KnowledgeCenterPage from "./pages/KnowledgeCenterPage";
import AboutPage from "./pages/AboutPage";
import WarrantyPage from "./pages/WarrantyPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogReadPage from "./pages/BlogReadPage";
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
