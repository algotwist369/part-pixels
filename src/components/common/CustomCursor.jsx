import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const frameRef = useRef(0);
  const pointerRef = useRef({ x: -40, y: -40 });
  const ringPositionRef = useRef({ x: -40, y: -40 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (min-width: 768px)").matches) return undefined;

    const render = () => {
      const { x, y } = pointerRef.current;
      const ring = ringPositionRef.current;
      ring.x += (x - ring.x) * 0.18;
      ring.y += (y - ring.y) * 0.18;

      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x - 8}px, ${y - 8}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.x - 20}px, ${ring.y - 20}px, 0)`;
      frameRef.current = window.requestAnimationFrame(render);
    };

    const handleMouseMove = (event) => {
      pointerRef.current.x = event.clientX;
      pointerRef.current.y = event.clientY;
    };

    const handlePointerState = (event) => {
      setIsHovering(Boolean(event.target.closest("a, button, [role='button']")));
    };

    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    document.addEventListener("pointerover", handlePointerState, { passive: true });
    document.addEventListener("pointerout", handlePointerState, { passive: true });
    frameRef.current = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerState);
      document.removeEventListener("pointerout", handlePointerState);
      window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden h-4 w-4 rounded-full bg-white mix-blend-difference transition-transform duration-150 ease-out will-change-transform md:block ${isHovering ? "scale-[2.8]" : "scale-100"}`} />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 z-[9998] hidden h-10 w-10 rounded-full border border-white/40 will-change-transform md:block" />
    </>
  );
};

export default CustomCursor;