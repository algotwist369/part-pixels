import React, { useState, useEffect } from "react";
import { contactData } from "../data/partpixelsData";
import { Mail, Clock, Send, CheckCircle, ShieldCheck, MessageSquare } from "lucide-react";
import MouseGlowCard from "../components/common/MouseGlowCard";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    country: "",
    fullName: "",
    email: "",
    phone: "",
    category: contactData.categories[0],
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneNum = "918591659477";
    const textMessage =
      `*PartPixels Support & Inquiry*%0A%0A` +
      `👤 *Full Name:* ${encodeURIComponent(formData.fullName)}%0A` +
      `🌍 *Country:* ${encodeURIComponent(formData.country)}%0A` +
      `📧 *Email:* ${encodeURIComponent(formData.email)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(formData.phone || "N/A")}%0A` +
      `🏷️ *Category:* ${encodeURIComponent(formData.category)}%0A` +
      `📌 *Subject:* ${encodeURIComponent(formData.subject)}%0A%0A` +
      `💬 *Message Details:*%0A${encodeURIComponent(formData.message)}`;

    const whatsappUrl = `https://wa.me/${phoneNum}?text=${textMessage}`;
    setLastWhatsappUrl(whatsappUrl);

    // Automatically open WhatsApp in new window/app
    window.open(whatsappUrl, "_blank");

    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-backgroundPrimary text-textPrimary pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-highlightText font-semibold text-xs uppercase tracking-widest bg-highlightText/10 px-4 py-1.5 rounded-full border border-highlightText/20">
            Support & Inquiries
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white mt-4 mb-4">
            {contactData.title}
          </h1>
          <p className="text-textSecondary max-w-2xl mx-auto text-base sm:text-lg">
            {contactData.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Direct Contact Info */}
          <div className="space-y-6">
            <MouseGlowCard>
              <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-white mb-6">Need Immediate Assistance?</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-highlightText/10 text-highlightText rounded-xl flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs text-textSecondary uppercase font-bold">Official Support Email</h4>
                      <a
                        href={`mailto:${contactData.directContact.email}`}
                        className="text-white hover:text-highlightText font-bold text-base transition break-all"
                      >
                        {contactData.directContact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-highlightText/10 text-highlightText rounded-xl flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs text-textSecondary uppercase font-bold">Business Hours</h4>
                      <p className="text-white font-bold text-sm mt-1">{contactData.directContact.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </MouseGlowCard>

            <MouseGlowCard>
              <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 shadow-xl">
                <ShieldCheck className="w-10 h-10 text-highlightText mb-3" />
                <h4 className="text-lg font-bold text-white mb-2">PartPixels Warranty & RMA</h4>
                <p className="text-textSecondary text-xs leading-relaxed">
                  For warranty claims or RMA requests, please select <span className="text-highlightText font-semibold">"Warranty / RMA"</span> in the category list and provide your product serial number.
                </p>
              </div>
            </MouseGlowCard>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-2">
            <MouseGlowCard>
              <div className="bg-backgroundSecondary border border-borderColor rounded-3xl p-8 sm:p-10 shadow-xl">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-highlightText mx-auto mb-4" />
                    <h3 className="text-2xl font-black text-white mb-2">Inquiry Ready for WhatsApp</h3>
                    <p className="text-textSecondary text-base max-w-md mx-auto mb-6">
                      Your inquiry details have been generated and sent to WhatsApp. Click below if WhatsApp did not open automatically.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a
                        href={lastWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-highlightText hover:bg-buttonHover text-black font-bold px-6 py-3 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-lg"
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span>Open WhatsApp Chat</span>
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="bg-backgroundHover text-white font-semibold px-6 py-3 rounded-xl border border-borderColor hover:border-highlightText transition text-sm"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-2xl font-black text-white mb-6">Inquiry Form (Sends via WhatsApp)</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-textSecondary uppercase font-bold mb-1.5">
                          Country *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. India, United States"
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full bg-backgroundPrimary border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-highlightText"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-textSecondary uppercase font-bold mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-backgroundPrimary border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-highlightText"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs text-textSecondary uppercase font-bold mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-backgroundPrimary border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-highlightText"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-textSecondary uppercase font-bold mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="Optional WhatsApp phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-backgroundPrimary border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-highlightText"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-textSecondary uppercase font-bold mb-1.5">
                        Inquiry Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full bg-backgroundPrimary border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-highlightText"
                      >
                        {contactData.categories.map((cat, idx) => (
                          <option key={idx} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-textSecondary uppercase font-bold mb-1.5">
                        Subject *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Briefly describe your inquiry"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-backgroundPrimary border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-highlightText"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-textSecondary uppercase font-bold mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        placeholder="Provide full details about your inquiry or product serial number for RMA"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-backgroundPrimary border border-borderColor rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-highlightText"
                      ></textarea>
                    </div>

                    <p className="text-xs text-disabledText leading-relaxed pt-2">
                      {contactData.privacyNotice}
                    </p>

                    <button
                      type="submit"
                      className="w-full bg-highlightText hover:bg-buttonHover text-black font-bold py-3.5 rounded-xl transition duration-300 flex items-center justify-center gap-2 text-sm shadow-lg"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Send Inquiry via WhatsApp</span>
                    </button>
                  </form>
                )}
              </div>
            </MouseGlowCard>
          </div>
        </div>
      </div>
    </div>
  );
}
