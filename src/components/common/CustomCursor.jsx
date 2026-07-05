import { useEffect, useState } from "react";

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        const handleMouseOver = (e) => {
            const target = e.target;

            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(true);
            }
        };

        const handleMouseOut = (e) => {
            const target = e.target;

            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button")
            ) {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseout", handleMouseOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseout", handleMouseOut);
        };
    }, []);

    return (
        <>
            <div
                className={`
          pointer-events-none fixed left-0 top-0 z-[9999]
          hidden h-4 w-4 rounded-full bg-white mix-blend-difference
          transition-transform duration-150 ease-out md:block
          ${isHovering ? "scale-[2.8]" : "scale-100"}
        `}
                style={{
                    transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
                }}
            />

            <div
                className="
          pointer-events-none fixed left-0 top-0 z-[9998]
          hidden h-10 w-10 rounded-full border border-white/40
          transition-all duration-300 ease-out md:block
        "
                style={{
                    transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
                }}
            />
        </>
    );
};

export default CustomCursor;