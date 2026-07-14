import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

const products = [
    { id: 1, name: "PIXPRO CORE", category: "TLC SATA 2.5", image: "/pixpro-product.jpg", href: "/products/pixpro-core", accent: "text-[#d6a000]", glow: "bg-[#d6a000]/20" },
    { id: 2, name: "PIXPRO EDGE", category: "TLC M.2 2280 · PCIe Gen3", image: "/pixpro-product.jpg", href: "/products/pixpro-edge", accent: "text-[#7c3cff]", glow: "bg-[#7c3cff]/20" },
    { id: 3, name: "PIXPRO FLEX", category: "M.2 2280 · Up to 2TB", image: "/pixpro-product.jpg", href: "/products/pixpro-flex", accent: "text-[#c68600]", glow: "bg-[#c68600]/20" },
];

const ProductCards = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const productRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                {
                    y: 35,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                productRefs.current,
                {
                    y: 45,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "power2.out",
                    delay: 0.2,
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="products"
            className="relative min-h-screen overflow-hidden bg-[#0d0d0d] px-5 py-20 text-white"
        >
            {/* Lightweight Background Glow */}
            <div className="pointer-events-none absolute left-1/2 top-[45%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.055] blur-[110px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/65" />
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-36 bg-gradient-to-b from-black via-black/75 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-36 bg-gradient-to-t from-black via-black/75 to-transparent" />

            <div className="relative z-10 mx-auto max-w-[110rem]">
                {/* Heading */}
                <div ref={headingRef} className="mb-14 text-center">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-white/40">
                        Our Products
                    </p>

                    <h2 className="text-4xl font-bold leading-tight md:text-6xl">
                        Storage Designed for Speed
                    </h2>
                </div>

                {/* Product Showcase */}
                <div className="grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-10">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            ref={(el) => {
                                if (el) productRefs.current[index] = el;
                            }}
                            className="group relative flex flex-col items-center text-center"
                        >
                            {/* Product Glow */}
                            <div
                                className={`
                  pointer-events-none absolute top-[105px] h-52 w-52 rounded-full
                  ${product.glow}
                  blur-[85px] opacity-55
                  transition-opacity duration-500
                  group-hover:opacity-85
                `}
                            />

                            {/* Product Image */}
                            <div className="relative flex h-[300px] w-full items-center justify-center md:h-[330px]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="
                    relative z-10 max-h-[270px] object-contain
                    transition-transform duration-500 ease-out
                    group-hover:-translate-y-3 group-hover:scale-[1.04]
                    md:max-h-[300px]
                  "
                                />
                            </div>

                            {/* Content */}
                            <div className="mt-2 flex flex-col items-center md:mt-3">
                                <h3 className="text-2xl font-bold text-white md:text-[28px]">
                                    {product.name}
                                </h3>

                                <p className={`mt-4 text-base font-bold ${product.accent}`}>
                                    {product.category}
                                </p>

                                <div className="mt-5">
                                    <Link to={product.href} className="inline-flex rounded-lg border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-white transition hover:border-[#d6a000] hover:text-[#d6a000]">View Product</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCards;
