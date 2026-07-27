import React, { useRef, useState } from "react";

/**
 * A wrapper that adds a smooth mouse-following border & surface radial glow effect to card content.
 * Uses semi-transparent background & z-30 pointer-events-none overlay so glow is 100% visible.
 * @param {ReactNode} children - The card content inside.
 * @param {string} className - Extra class names for the container.
 */
const MouseGlowCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCoords({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative group rounded-2xl overflow-hidden bg-backgroundSecondary/40 backdrop-blur-sm ${className}`}
    >
      {/* Surface Radial Mouse Follow Glow Beam (Overlaid at z-30) */}
      <div
        className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(550px circle at ${coords.x}% ${coords.y}%, rgba(234, 179, 8, 0.22), transparent 60%)`,
        }}
      />

      {/* Border Radial Mouse Follow Glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl z-30 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}% ${coords.y}%, rgba(234, 179, 8, 0.8), transparent 50%)`,
          padding: "1.5px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Inner content (Transparent background so glow shines through) */}
      <div className="relative z-10 h-full bg-transparent">{children}</div>
    </div>
  );
};

export default MouseGlowCard;
