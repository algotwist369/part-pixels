import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import WhatsAppButton from "../common/WhatsAppButton";

const heroSlide = {
  image: "/assets/desktopbg.jpeg",
  title: "Experience Next-Generation Storage",
  description:
    "At PartPixels, our PIXPRO SSDs are engineered for creators, gamers, professionals, and businesses who demand exceptional speed, 100% reliability, and long-term durability.",
  mobileDescription:
    "Engineered for exceptional speed, 100% reliability, and long-term durability.",
  cta: { text: "Explore PIXPRO SSDs" },
};

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth 60fps spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for background and floating elements
  const bgX = useTransform(smoothX, [-0.5, 0.5], ["20px", "-20px"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["20px", "-20px"]);

  const contentX = useTransform(smoothX, [-0.5, 0.5], ["-25px", "25px"]);
  const contentY = useTransform(smoothY, [-0.5, 0.5], ["-25px", "25px"]);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x: clientX - left, y: clientY - top });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={(e) => e.preventDefault()}
      className="relative w-full min-h-[60vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
      style={{
        perspective: 1000,
        userSelect: "none",
        WebkitTouchCallout: "none",
      }}
    >
      {/* Parallax Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center scale-110 pointer-events-none"
        style={{
          backgroundImage: `url('${heroSlide.image}')`,
          x: bgX,
          y: bgY,
        }}
      />

      {/* Dark Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-backgroundPrimary pointer-events-none" />

      {/* Parallax Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          rotateX,
          rotateY,
          x: contentX,
          y: contentY,
          transformStyle: "preserve-3d",
        }}
        className="relative z-20 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center text-white pointer-events-auto"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[98px] font-extrabold mb-4 drop-shadow-2xl"
          style={{
            fontFamily: "'Poppins', sans-serif",
            transform: "translateZ(50px)",
          }}
        >
          {heroSlide.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xs sm:text-xl md:text-2xl lg:text-[22px] max-w-2xl mb-6 sm:mb-8 drop-shadow-lg text-gray-200 leading-relaxed font-medium"
          style={{
            fontFamily: "'Roboto', sans-serif",
            transform: "translateZ(30px)",
          }}
        >
          <span className="block sm:hidden px-2">{heroSlide.mobileDescription}</span>
          <span className="hidden sm:block">{heroSlide.description}</span>
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{ transform: "translateZ(40px)" }}
        >
          <WhatsAppButton text={heroSlide.cta.text} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
