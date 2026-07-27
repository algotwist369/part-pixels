import React from "react";
import { motion } from "framer-motion";
import MouseGlowCard from "../common/MouseGlowCard";
import { aboutUsData } from "../../data/partpixelsData";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

const AboutUs = () => {
  const noCopyStyle = {
    userSelect: "none",
    WebkitUserSelect: "none",
    MozUserSelect: "none",
    msUserSelect: "none",
  };

  return (
    <section
      className="relative bg-backgroundPrimary text-textPrimary py-20 px-4 sm:px-6 lg:px-12 overflow-hidden border-t border-borderColor/40"
      style={noCopyStyle}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Blurred Background Yellow Glow Circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-highlightText/15 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-highlightText/15 rounded-full blur-3xl opacity-60 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-[90rem] w-full mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16"
        style={noCopyStyle}
      >
        {/* Text Content */}
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-6 text-textPrimary"
          >
            Who <span className="text-highlightText">We Are</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-textSecondary text-base sm:text-lg mb-6 leading-relaxed"
          >
            At <span className="text-highlightText font-bold">PartPixels</span>, our core mission is to provide reliable storage solutions that deliver consistent performance, long-term durability, and complete peace of mind. We believe that great technology starts with quality, and every product is designed to meet the needs of modern users.
          </motion.p>

          <MouseGlowCard>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="p-6 bg-backgroundSecondary/80 border border-highlightText/30 rounded-2xl shadow-xl"
            >
              <h3 className="text-xl sm:text-2xl font-bold mb-4 text-highlightText flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-highlightText" /> Why Choose PartPixels?
              </h3>
              <ul className="space-y-3 text-textSecondary text-sm sm:text-base">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">100% Quality Tested:</strong> Every SSD undergoes comprehensive functional and stress testing before leaving our factory.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Transparent Information:</strong> Honest, validated performance benchmarks and clear technical specifications.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">Premium 3D NAND Flash:</strong> Engineered with advanced memory cells and capable controllers for lasting endurance.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-highlightText shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white font-semibold">5-Year Limited Warranty:</strong> Demonstrating our total confidence in performance and durability.
                  </span>
                </li>
              </ul>
            </motion.div>
          </MouseGlowCard>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-textSecondary text-sm sm:text-base mt-6 leading-relaxed"
          >
            Trust is the foundation of everything we do. By combining dependable products, transparent communication, and strict quality standards, we strive to build lasting relationships with our customers.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-white text-sm sm:text-base font-bold mt-3"
          >
            Choose PartPixels - Experience the confidence of storage you can rely on every single day.
          </motion.p>
        </div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden border border-highlightText/40 shadow-2xl max-w-full w-full"
        >
          <img
            src="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop"
            alt="PartPixels SSD Quality Testing"
            className="w-full h-[450px] object-cover"
            draggable={false}
          />
          <div className="absolute bottom-4 left-4 bg-black/80 text-highlightText border border-highlightText/50 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md">
            🛡️ 100% Quality & Factory Tested
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
