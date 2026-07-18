import SendButton from "../components/buttons/SendButton";
import usePageSeo from "../hooks/usePageSeo";

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


const inputClass =
    "h-14 w-full rounded-xl border border-white/10 bg-black/50 px-5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#5bd7ff]/70";

const labelClass = "mb-3 block text-sm font-medium text-white/60";

const ContactPage = () => {
    usePageSeo({
        title: "Contact PartPixels | SSD Support, Sales & Warranty",
        description: "Contact PartPixels for PIXPRO SSD product information, technical support, warranty and RMA help, sales, distribution, and business inquiries.",
        keywords: ["contact PartPixels", "PIXPRO support", "SSD technical support", "SSD sales inquiry", "PartPixels RMA"],
        image: "/pixpro-product.jpg",
        path: "/contact-us",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const subject = formData.get("subject") || "PartPixels website inquiry";
        const body = [
            `Name: ${formData.get("fullName")}`,
            `Country: ${formData.get("country")}`,
            `Email: ${formData.get("email")}`,
            `Phone: ${formData.get("phone") || "Not provided"}`,
            `Category: ${formData.get("category")}`,
            "",
            formData.get("message"),
        ].join("\n");

        window.location.href = `mailto:support@partpixels.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

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
                    <p className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#5bd7ff]">
                        Contact PartPixels
                    </p>

                    <h1 className="type-page-title font-bold">
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
                <form onSubmit={handleSubmit} className="mt-14 rounded-3xl border border-white/10 bg-black/55 p-6 backdrop-blur-xl md:p-8">
                    <div className="mb-6">
                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#5bd7ff]">Contact Information</p>
                        <p className="mt-2 text-sm text-white/40">Tell us how we can reach you.</p>
                    </div>

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
                                    required={["country", "fullName", "email"].includes(field.id)}
                                    autoComplete={field.id === "fullName" ? "name" : field.id === "phone" ? "tel" : field.id}
                                    className={inputClass}
                                />
                            </div>
                        ))}

                        <div className="mt-5 border-t border-white/10 pt-8 md:col-span-2">
                            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#5bd7ff]">Inquiry Details</p>
                            <p className="mt-2 text-sm text-white/40">Choose a category and describe what you need.</p>
                        </div>

                        {/* Category Dropdown */}
                        <div>
                            <label htmlFor="category" className={labelClass}>
                                Category *
                            </label>

                            <select
                                id="category"
                                name="category"
                                defaultValue=""
                                required
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
                                    required
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
                            required
                            className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-5 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-white/30 focus:border-[#5bd7ff]/70"
                        />
                    </div>

                    {/* Privacy */}
                    <div id="privacy-notice" className="mt-6 border-t border-white/10 pt-6">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/70">Privacy Notice</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-white/45">
                        By submitting this form, you agree that PartPixels may use the
                        information you provide to respond to your inquiry in accordance with
                        our Privacy Policy. Your personal information will be kept secure and
                        will not be shared with third parties without your consent, except
                        where required by law.
                    </p>

                    <p className="mt-5 text-xs text-white/35">Submitting opens your default email application with the inquiry pre-filled.</p>

                    <div className="mt-8 flex justify-end">
                        <SendButton type="submit" text="Send inquiry" />
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
                                className="font-semibold text-[#5bd7ff] transition hover:text-white"
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

