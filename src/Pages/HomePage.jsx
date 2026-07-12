import { useEffect, useRef, useState } from "react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import gsap from "gsap";

const heroSlides = [
    {
        id: 1,
        label: "Beetle X31 SSD",
        title: "Expansive Storage at Your Fingertips",
        description:
            "High-speed portable SSD storage designed for creators, gamers, professionals, and everyday performance.",
        buttonText: "Learn More",
        image: "/heroimage (1).jpeg",
    },
    {
        id: 2,
        label: "Platinum P41 SSD",
        title: "Built for Speed, Power and Precision",
        description:
            "Experience next-generation storage performance with fast transfer speed and reliable durability.",
        buttonText: "Explore Product",
        image: "/heroimage (2).jpeg",

    },
      {
        id: 3,
        label: "Platinum P41 SSD",
        title: "Built for Speed, Power and Precision",
        description:
            "Experience next-generation storage performance with fast transfer speed and reliable durability.",
        buttonText: "Explore Product",
        image: "/heroimage (3).jpeg",

    },
      {
        id: 4,
        label: "Platinum P41 SSD",
        title: "Built for Speed, Power and Precision",
        description:
            "Experience next-generation storage performance with fast transfer speed and reliable durability.",
        buttonText: "Explore Product",
        image: "/heroimage (4).jpeg",

    },
    {
        id: 5,
        label: "Gold P31 SSD",
        title: "Performance That Moves With You",
        description:
            "Compact, powerful and efficient SSD storage for smooth workflows and premium computing experience.",
        buttonText: "View Details",
        image: "/heroimage3.jpeg",
    },
];

const HomePage = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const imageRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const buttonRef = useRef(null);

    const currentSlide = heroSlides[activeSlide];

    const nextSlide = () => {
        setActiveSlide((prev) =>
            prev === heroSlides.length - 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setActiveSlide((prev) =>
            prev === 0 ? heroSlides.length - 1 : prev - 1
        );
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            tl.fromTo(
                imageRef.current,
                {
                    scale: 1.08,
                    opacity: 0,
                    x: 50,
                },
                {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    duration: 1.1,
                }
            )
                .fromTo(
                    labelRef.current,
                    {
                        y: 24,
                        opacity: 0,
                        letterSpacing: "0.35em",
                    },
                    {
                        y: 0,
                        opacity: 1,
                        letterSpacing: "0.25em",
                        duration: 0.6,
                    },
                    "-=0.65"
                )
                .fromTo(
                    titleRef.current,
                    {
                        y: 38,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.75,
                    },
                    "-=0.4"
                )
                .fromTo(
                    descRef.current,
                    {
                        y: 22,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.65,
                    },
                    "-=0.4"
                )
                .fromTo(
                    buttonRef.current,
                    {
                        y: 18,
                        opacity: 0,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.55,
                    },
                    "-=0.35"
                );
        });

        return () => ctx.revert();
    }, [activeSlide]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 7000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main
            id="home"
            className="relative min-h-screen overflow-hidden bg-black text-white"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    ref={imageRef}
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="h-full w-full object-cover"
                />

                {/* Main Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_38%,rgba(0,0,0,0.28)_68%,rgba(0,0,0,0.75)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-transparent to-black/65" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55" />
            </div>

            {/* Content */}
            <section className="relative z-10 flex min-h-screen items-center justify-center px-5 pt-24 pb-32">
                <div className="mx-auto flex w-full max-w-[110rem] items-center justify-center">
                    <div className="max-w-5xl text-center">
                        <p
                            ref={labelRef}
                            className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white/90 md:text-sm"
                        >
                            {currentSlide.label}
                        </p>

                        <h1
                            ref={titleRef}
                            className="text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
                        >
                            {currentSlide.title}
                        </h1>

                        <p
                            ref={descRef}
                            className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/70 md:text-base"
                        >
                            {currentSlide.description}
                        </p>

                        <div ref={buttonRef} className="mt-9 flex justify-center">
                            <a
                                href="#products"
                                className="
                  group relative inline-flex items-center justify-center
                  overflow-hidden rounded-full border border-white/70
                  px-10 py-4 text-xs font-bold uppercase tracking-[0.2em]
                  text-white transition duration-300
                  hover:border-white hover:bg-white hover:text-black
                "
                            >
                                {currentSlide.buttonText}
                                <span className="absolute inset-0 -left-full bg-white/20 transition-all duration-700 group-hover:left-full" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Right arrow button */}
            <button
                type="button"
                onClick={nextSlide}
                className="
          absolute right-8 top-1/2 z-20 hidden h-16 w-16
          -translate-y-1/2 items-center justify-center rounded-full
          border border-white/30 text-white/80 transition duration-300
          hover:border-gray-800 hover:bg-black/50 hover:text-white md:flex
        "
            >
                <FiArrowRight size={24} />
            </button>

            {/* Left arrow button */}
            <button
                type="button"
                onClick={prevSlide}
                className="
          absolute left-8 top-1/2 z-20 hidden h-16 w-16
          -translate-y-1/2 items-center justify-center rounded-full
          border border-white/30 text-white/80 transition duration-300
          hover:border-gray-800 hover:bg-black/50 hover:text-white md:flex
        "
            >
                <FiArrowLeft size={24} />
            </button>

            {/* Bottom dots */}
            <div className="absolute bottom-24 left-1/2 z-30 flex -translate-x-1/2 items-center gap-4">
                {heroSlides.map((slide, index) => (
                    <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`
              h-2 rounded-full transition-all duration-300
              ${activeSlide === index
                                ? "w-10 bg-white"
                                : "w-2 bg-white/40 hover:bg-white/70"
                            }
            `}
                    />
                ))}
            </div>

            {/* Mobile arrows */}
            <div className="absolute bottom-20 right-5 z-30 flex gap-3 md:hidden">
                <button
                    type="button"
                    onClick={prevSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white"
                >
                    <FiArrowLeft size={20} />
                </button>

                <button
                    type="button"
                    onClick={nextSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white"
                >
                    <FiArrowRight size={20} />
                </button>
            </div>

            {/* Bottom Smooth Section Blend */}
            <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[260px] w-full bg-gradient-to-b from-transparent via-black/90 to-black" />

            {/* Extra soft black depth */}
            <div className="pointer-events-none absolute bottom-0 left-0 z-20 h-[120px] w-full bg-black" />
        </main>
    );
};

export default HomePage;