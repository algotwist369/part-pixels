import { Outlet } from "react-router-dom";
import CustomCursor from "./CustomCursor";
import Footer from "./Footer";
import Navbar from "./Navbar";
import RouteScrollManager from "./RouteScrollManager";

const SiteLayout = () => {
  return (
    <div className="min-h-screen">
      <RouteScrollManager />
      <CustomCursor />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SiteLayout;