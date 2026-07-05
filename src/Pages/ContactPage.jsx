import { FiUploadCloud, FiMail, FiClock } from "react-icons/fi";
import SendButton from "../components/buttons/SendButton";

const inquiryCategories = [
    "Product Information",
    "Technical Support",
    "Warranty / RMA",
    "Sales Inquiry",
    "Distributor / Dealer Partnership",
    "OEM / Business Inquiry",
    "Order Status",
    "Website Feedback",
    "Careers",
    "General Inquiry",
];

const inputFields = [
    {
        id: "country",
        label: "Country *",
        type: "text",
        placeholder: "Enter your country",
    },
    {
        id: "fullName",
        label: "Full Name *",
        type: "text",
        placeholder: "Enter your full name",
    },
    {
        id: "email",
        label: "Email Address *",
        type: "email",
        placeholder: "Enter your email",
    },
    {
        id: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter your phone number",
    },
    {
        id: "subject",
        label: "Subject *",
        type: "text",
        placeholder: "Briefly describe your inquiry",
    },
];

const assistanceInfo = [
    {
        icon: FiMail,
        label: "Email",
        value: "support@partpixels.com",
        href: "mailto:support@partpixels.com",
    },
    {
        icon: FiClock,
        label: "Business Hours",
        value: "Monday – Saturday | 9:30 AM – 6:30 PM IST",
    },
];

const inputClass =
    "h-14 w-full rounded-xl border border-white/10 bg-black/50 px-5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#d6a000]/70";

const labelClass = "mb-3 block text-sm font-medium text-white/60";

const ContactPage = () => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-black px-5 pt-36 pb-24 text-white">
            {/* Background Video */}
            <video
                className="pointer-events-none fixed inset-0 h-full w-full object-cover opacity-25"
                src="/video1.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
            />

            {/* Video Overlay */}
            <div className="pointer-events-none fixed inset-0 bg-black/25" />
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.9)_100%)]" />
            <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black via-transparent to-black" />

            <section className="relative z-10 mx-auto max-w-5xl">
                {/* Heading */}
                <div className="text-center">
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#d6a000]">
                        Contact PartPixels
                    </p>

                    <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                        We're Here to Help
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/65">
                        Thank you for contacting PartPixels. Whether you have a product
                        inquiry, technical question, warranty request, partnership proposal,
                        or general feedback, our team is ready to assist you. Please
                        complete the form below, and we'll respond as soon as possible.
                    </p>
                </div>

                {/* Form */}
                <form className="mt-14 rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-xl md:p-8">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {inputFields.slice(0, 4).map((field) => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className={labelClass}>
                                    {field.label}
                                </label>

                                <input
                                    id={field.id}
                                    name={field.id}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className={inputClass}
                                />
                            </div>
                        ))}

                        {/* Category Dropdown */}
                        <div>
                            <label htmlFor="category" className={labelClass}>
                                Category *
                            </label>

                            <select
                                id="category"
                                name="category"
                                defaultValue=""
                                className={inputClass}
                            >
                                <option value="" disabled>
                                    Select inquiry category
                                </option>

                                {inquiryCategories.map((category) => (
                                    <option
                                        key={category}
                                        value={category}
                                        className="bg-black text-white"
                                    >
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subject */}
                        {inputFields.slice(4).map((field) => (
                            <div key={field.id}>
                                <label htmlFor={field.id} className={labelClass}>
                                    {field.label}
                                </label>

                                <input
                                    id={field.id}
                                    name={field.id}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className={inputClass}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Message */}
                    <div className="mt-5">
                        <label htmlFor="message" className={labelClass}>
                            Your Message *
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            rows="6"
                            placeholder="Write your message here..."
                            className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-[#d6a000]/70"
                        />
                    </div>

                    {/* Upload */}
                    <div className="mt-5">
                        <label className={labelClass}>Attach Supporting Files</label>

                        <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-white/15 bg-black/40 px-5 py-5 transition hover:border-[#d6a000]/60">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#d6a000]/10 text-[#d6a000]">
                                <FiUploadCloud size={22} />
                            </span>

                            <div>
                                <p className="text-sm font-semibold text-white">
                                    Upload supporting file
                                </p>
                                <p className="mt-1 text-xs text-white/35">
                                    Invoice, product photo, screenshot, or document
                                </p>
                            </div>

                            <input type="file" name="attachment" className="hidden" />
                        </label>
                    </div>

                    {/* Privacy */}
                    <p className="mt-6 text-sm leading-7 text-white/45">
                        By submitting this form, you agree that PartPixels may use the
                        information you provide to respond to your inquiry in accordance with
                        our Privacy Policy. Your personal information will be kept secure and
                        will not be shared with third parties without your consent, except
                        where required by law.
                    </p>

                    <div className="mt-8 flex justify-end">
                        <button type="submit">
                            <SendButton text="Send" />
                        </button>
                    </div>
                </form>

                {/* Need Immediate Assistance */}
                <div className="mt-12 border-t border-white/10 pt-8 text-center">
                    <h3 className="text-xl font-bold text-white">
                        Need Immediate Assistance?
                    </h3>

                    <div className="mt-5 space-y-2 text-sm leading-7 text-white/55">
                        <p>
                            Email:{" "}
                            <a
                                href="mailto:support@partpixels.com"
                                className="font-semibold text-[#d6a000] transition hover:text-white"
                            >
                                support@partpixels.com
                            </a>
                        </p>

                        <p>
                            Business Hours: Monday - Saturday | 9:30 AM - 6:30 PM IST
                        </p>
                    </div>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/40">
                        We appreciate your interest in PartPixels and look forward to assisting you.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default ContactPage;