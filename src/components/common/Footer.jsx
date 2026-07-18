import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    FiShield,
    FiCpu,
    FiHardDrive,
} from "react-icons/fi";

const footerLinks = [
    {
        title: "Company",
        links: [
            { label: "Home", href: "/#home" },
            { label: "About Company", href: "/about-company" },
            { label: "Products", href: "/#products" },
            { label: "SSD Knowledge Center", href: "/explore" },
        ],
    },
    {
        title: "Products",
        links: [
            { label: "PIXPRO CORE", href: "/products/pixpro-core" },
            { label: "PIXPRO EDGE", href: "/products/pixpro-edge" },
            { label: "PIXPRO FLEX", href: "/products/pixpro-flex" },
            { label: "SSD Guide", href: "/explore" },
        ],
    },
    {
        title: "Support",
        links: [
            { label: "Technical Support", href: "/contact-us" },
            { label: "Warranty / RMA", href: "/warranty" },
            { label: "Product Information", href: "/#products" },
            { label: "Contact Us", href: "/contact-us" },
        ],
    },
];

const footerHighlights = [
    {
        icon: FiShield,
        title: "5-Year Limited Warranty",
    },
    {
        icon: FiHardDrive,
        title: "Reliable SSD Storage",
    },
    {
        icon: FiCpu,
        title: "Quality Tested Products",
    },
];

const Footer = () => {
    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const footer = footerRef.current;
        if (!footer || !("IntersectionObserver" in window)) {
            setIsVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { rootMargin: "160px" });

        observer.observe(footer);
        return () => observer.disconnect();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden bg-black px-5 pt-24 pb-8 text-white"
        >
            {/* Top blend */}
            <div className="pointer-events-none absolute left-0 top-0 h-[180px] w-full bg-gradient-to-b from-black via-black/90 to-transparent" />

            {/* Background effects */}
            <div className="pointer-events-none absolute left-1/2 top-[35%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#5bd7ff]/10 blur-[140px]" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[130px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_42%)]" />

            <div className={`relative z-10 mx-auto max-w-[110rem] transition duration-700 ease-out ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                {/* Middle Footer */}
                <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1fr_1.4fr]">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="inline-flex items-center">
                            <img
                                src="/partpixels-logo-theme.png"
                                alt="PartPixels Logo"
                                width="1200"
                                height="234"
                                className="h-16 w-[16rem] object-contain"
                                loading="lazy"
                                decoding="async"
                            />
                        </Link>

                        <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
                            PartPixels delivers reliable storage solutions built for speed,
                            durability, data confidence, and modern computing needs.
                        </p>

                        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                            {footerHighlights.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="flex items-center gap-3 text-sm text-white/60"
                                    >
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#5bd7ff]">
                                            <Icon size={16} />
                                        </span>

                                        <span>{item.title}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
                        {footerLinks.map((group) => (
                            <div key={group.title}>
                                <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-white">
                                    {group.title}
                                </h3>

                                <ul className="space-y-4">
                                    {group.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.href}
                                                className="
                          group inline-flex items-center gap-2 text-sm
                          text-white/45 transition duration-300 hover:text-[#5bd7ff]
                        "
                                            >
                                                <span className="h-px w-0 bg-[#5bd7ff] transition-all duration-300 group-hover:w-5" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col gap-5 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
                    <p>
                        ©{new Date().getFullYear()} PartPixels. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-5">
                        <Link to="/contact-us#privacy-notice" className="transition hover:text-white">
                            Privacy Policy
                        </Link>
                        <Link to="/warranty" className="transition hover:text-white">
                            Warranty Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
