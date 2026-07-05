import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";

const navLinks = [
    {
        label: "Home",
        to: "/",
        hasDropdown: false,
    },
    {
        label: "About Company",
        to: "/about-company",
        hasDropdown: false,
    },
    {
        label: "Products",
        to: "#products",
        hasDropdown: true,
        dropdownItems: [
            { label: "PIXPRO FLEX - M.2 2280", to: "/pixpro-flex" },
            { label: "PIXPRO EDGE - TLC M.2 2280", to: "/pixpro-edge" },
        ],
    },
    {
        label: "Explore",
        to: "#explore",
        hasDropdown: false,
    },
];

const actionButtons = [
    {
        label: "Support",
        to: "#support",
        hasDropdown: true,
        dropdownItems: [
            { label: "Contact Us", to: "/contact-us" },
            { label: "Warranty / RMA", to: "/warranty" },
            { label: "Download", to: "/download" },
            { label: "FAQs", to: "/faqs" },
        ],
    },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMobileMenu = () => {
        setMenuOpen(false);
        setOpenMobileDropdown(null);
    };

    const toggleMobileDropdown = (label) => {
        setOpenMobileDropdown((prev) => (prev === label ? null : label));
    };

    return (
        <header
            className={`
        fixed left-0 top-0 z-50 w-full pt-[0.5rem]
        transition-all duration-300
        ${scrolled
                    ? "bg-[#000]/95 shadow-lg backdrop-blur-xl"
                    : "bg-transparent"
                }
      `}
        >
            <nav className="mx-auto flex h-[64px] max-w-[110rem] items-center justify-between px-5 md:px-8">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="PartPixels Logo"
                        className="h-24 w-[14rem] rounded-full object-contain"
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden items-center gap-2 md:flex">
                    {navLinks.map((link) => (
                        <div key={link.label} className="group relative">
                            {link.to.startsWith('#') ? (
                                <a
                                    href={link.to}
                                    className={`
                  flex items-center gap-1 rounded-full px-4 py-2
                  text-sm text-white/80 transition
                  hover:bg-white/10 hover:text-white border border-gray-800 hover:border-none
                  ${link.hasDropdown
                                        ? "bg-white/10 text-white hover:bg-white/20"
                                        : ""
                                    }
                `}
                                >
                                    {link.label}
                                    {link.hasDropdown && <FiChevronDown className="text-md" />}
                                </a>
                            ) : (
                                <Link
                                    to={link.to}
                                    className={`
                  flex items-center gap-1 rounded-full px-4 py-2
                  text-sm text-white/80 transition
                  hover:bg-white/10 hover:text-white border border-gray-800 hover:border-none
                  ${link.hasDropdown
                                        ? "bg-white/10 text-white hover:bg-white/20"
                                        : ""
                                    }
                `}
                                >
                                    {link.label}
                                    {link.hasDropdown && <FiChevronDown className="text-md" />}
                                </Link>
                            )}

                            {link.hasDropdown && (
                                <div
                                    className="
                    invisible absolute left-0 top-[120%] w-[230px]
                    translate-y-2 rounded-lg bg-[#242424]
                    px-3 py-3 opacity-0 shadow-2xl
                    transition-all duration-300
                    group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                  "
                                >
                                    <span className="absolute -top-2 left-10 h-4 w-4 rotate-45 bg-[#242424]" />

                                    <div className="relative z-10 flex flex-col">
                                        {link.dropdownItems?.map((item, index) => (
                                            item.to.startsWith('#') ? (
                                                <a
                                                    key={item.label}
                                                    href={item.to}
                                                    className={`
                          px-3 py-4 text-sm font-semibold text-white/60
                          transition hover:text-white
                          ${index !== link.dropdownItems.length - 1
                                                        ? "border-b border-white/10"
                                                        : ""
                                                    }
                        `}
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={item.label}
                                                    to={item.to}
                                                    className={`
                          px-3 py-4 text-sm font-semibold text-white/60
                          transition hover:text-white
                          ${index !== link.dropdownItems.length - 1
                                                        ? "border-b border-white/10"
                                                        : ""
                                                    }
                        `}
                                                >
                                                    {item.label}
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Desktop Support Dropdown */}
                <div className="hidden items-center gap-3 md:flex">
                    {actionButtons.map((button) => (
                        <div key={button.label} className="group relative">
                            {button.to.startsWith('#') ? (
                                <a
                                    href={button.to}
                                    className="
                  flex items-center gap-1 rounded-full bg-white/10
                  px-4 py-2 text-sm font-medium text-white transition
                  hover:bg-white/20
                "
                                >
                                    {button.label}
                                    {button.hasDropdown && <FiChevronDown className="text-md" />}
                                </a>
                            ) : (
                                <Link
                                    to={button.to}
                                    className="
                  flex items-center gap-1 rounded-full bg-white/10
                  px-4 py-2 text-sm font-medium text-white transition
                  hover:bg-white/20
                "
                                >
                                    {button.label}
                                    {button.hasDropdown && <FiChevronDown className="text-md" />}
                                </Link>
                            )}

                            {button.hasDropdown && (
                                <div
                                    className="
                    invisible absolute right-0 top-[120%] w-[250px]
                    translate-y-2 rounded-lg bg-[#242424]
                    px-3 py-3 opacity-0 shadow-2xl
                    transition-all duration-300
                    group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                  "
                                >
                                    <span className="absolute -top-2 right-10 h-4 w-4 rotate-45 bg-[#242424]" />

                                    <div className="relative z-10 flex flex-col">
                                        {button.dropdownItems?.map((item, index) => (
                                            item.to.startsWith('#') ? (
                                                <a
                                                    key={item.label}
                                                    href={item.to}
                                                    className={`
                          px-3 py-4 text-sm font-semibold text-white/60
                          transition hover:text-white
                          ${index !== button.dropdownItems.length - 1
                                                        ? "border-b border-white/10"
                                                        : ""
                                                    }
                        `}
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={item.label}
                                                    to={item.to}
                                                    className={`
                          px-3 py-4 text-sm font-semibold text-white/60
                          transition hover:text-white
                          ${index !== button.dropdownItems.length - 1
                                                        ? "border-b border-white/10"
                                                        : ""
                                                    }
                        `}
                                                >
                                                    {item.label}
                                                </Link>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white md:hidden"
                >
                    {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`
          overflow-hidden transition-all duration-300 md:hidden
          ${menuOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"}
        `}
            >
                <div className="mx-5 mb-5 rounded-2xl border border-white/10 bg-[#111827]/95 p-4 backdrop-blur-xl">
                    <div className="flex flex-col gap-2">
                        {[...navLinks, ...actionButtons].map((link) => (
                            <div key={link.label}>
                                {link.hasDropdown ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => toggleMobileDropdown(link.label)}
                                            className="
                        flex w-full items-center justify-between rounded-xl px-4 py-3
                        text-sm text-white/80 transition
                        hover:bg-white/10 hover:text-white bg-white/10
                      "
                                        >
                                            {link.label}

                                            <FiChevronDown
                                                className={`
                          transition duration-300
                          ${openMobileDropdown === link.label ? "rotate-180" : ""}
                        `}
                                            />
                                        </button>

                                        <div
                                            className={`
                        overflow-hidden transition-all duration-300
                        ${openMobileDropdown === link.label
                                                    ? "mt-2 max-h-[400px] opacity-100"
                                                    : "max-h-0 opacity-0"
                                                }
                      `}
                                        >
                                            <div className="rounded-xl bg-[#242424] p-2">
                                                {link.dropdownItems?.map((item, index) => (
                                                    item.to.startsWith('#') ? (
                                                        <a
                                                            key={item.label}
                                                            href={item.to}
                                                            onClick={closeMobileMenu}
                                                            className={`
                              block rounded-lg px-4 py-3 text-sm text-white/70
                              transition hover:bg-white/10 hover:text-white
                              ${index !== link.dropdownItems.length - 1
                                                                ? "border-b border-white/10"
                                                                : ""
                                                            }
                            `}
                                                        >
                                                            {item.label}
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            key={item.label}
                                                            to={item.to}
                                                            onClick={closeMobileMenu}
                                                            className={`
                              block rounded-lg px-4 py-3 text-sm text-white/70
                              transition hover:bg-white/10 hover:text-white
                              ${index !== link.dropdownItems.length - 1
                                                                ? "border-b border-white/10"
                                                                : ""
                                                            }
                            `}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    link.to.startsWith('#') ? (
                                        <a
                                            href={link.to}
                                            onClick={closeMobileMenu}
                                            className="
                      flex items-center justify-between rounded-xl px-4 py-3
                      text-sm text-white/80 transition
                      hover:bg-white/10 hover:text-white
                    "
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.to}
                                            onClick={closeMobileMenu}
                                            className="
                      flex items-center justify-between rounded-xl px-4 py-3
                      text-sm text-white/80 transition
                      hover:bg-white/10 hover:text-white
                    "
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;