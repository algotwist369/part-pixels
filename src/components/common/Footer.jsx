import React from "react";
import { Link } from "react-router-dom";
import { FaArrowUpLong } from "react-icons/fa6";
import { Mail, Clock, ShieldCheck } from "lucide-react";
import { partpixelsInfo } from "../../data/partpixelsData";

const Footer = () => {
  return (
    <footer className="bg-backgroundSecondary text-textPrimary pt-14 pb-8 border-t border-borderColor/40">
      <div className="w-11/12 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-3xl font-black tracking-tight text-white">
                Part<span className="text-highlightText">Pixels</span>
              </span>
            </Link>
            <p className="text-textSecondary text-sm leading-relaxed mb-4">
              Next-generation high-performance PIXPRO SSD storage solutions engineered for speed, durability, and peace of mind.
            </p>
            <div className="flex items-center space-x-2 text-xs text-highlightText font-semibold bg-backgroundPrimary border border-highlightText/30 px-3 py-1.5 rounded-full inline-flex">
              <ShieldCheck className="w-4 h-4" />
              <span>{partpixelsInfo.warrantyPeriod}</span>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-white font-bold mb-4 text-base">PIXPRO SSD Series</h4>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>
                <Link to="/products" className="hover:text-highlightText transition">
                  PIXPRO CORE (TLC SATA 2.5")
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-highlightText transition">
                  PIXPRO EDGE (TLC M.2 NVMe)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-highlightText transition">
                  PIXPRO FLEX (M.2 2280 NVMe)
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-highlightText transition">
                  Capacities: 500GB / 1TB / 2TB
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-base">Quick Links</h4>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>
                <Link to="/knowledge-center" className="hover:text-highlightText transition">
                  SSD Knowledge Center
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-highlightText transition">
                  About PartPixels
                </Link>
              </li>
              <li>
                <Link to="/warranty" className="hover:text-highlightText transition">
                  5-Year Limited Warranty
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-highlightText transition">
                  Technical Support & RMA
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Support Info */}
          <div>
            <h4 className="text-white font-bold mb-4 text-base">Customer Support</h4>
            <div className="space-y-3 text-sm text-textSecondary">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-disabledText">Support Email</p>
                  <a href={`mailto:${partpixelsInfo.supportEmail}`} className="text-white hover:text-highlightText font-medium transition">
                    {partpixelsInfo.supportEmail}
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-disabledText">Business Hours</p>
                  <p className="text-textPrimary font-medium text-xs sm:text-sm">{partpixelsInfo.businessHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-borderColor/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-disabledText text-center sm:text-left">
            &copy; {new Date().getFullYear()} <span className="text-textPrimary font-semibold">PartPixels</span>. All rights reserved. PIXPRO SSD Series.
          </p>

          <a
            href="#top"
            className="flex items-center text-xs text-textSecondary hover:text-highlightText transition"
          >
            <FaArrowUpLong className="mr-1.5" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
