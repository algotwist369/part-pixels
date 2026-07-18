import FAQSection from '../components/common/FAQSection'
import faqs from '../data/faqs'
import usePageSeo from '../hooks/usePageSeo'

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
}

const FAQs = () => {
  usePageSeo({
    title: "SSD FAQs | PartPixels PIXPRO Support",
    description: "Find answers about SATA and NVMe SSDs, TLC and QLC NAND, PIXPRO products, performance, compatibility, testing, and warranty.",
    keywords: ["SSD FAQ", "NVMe SSD questions", "SATA SSD support", "TLC vs QLC", "PIXPRO support"],
    image: "/pixpro-product.jpg",
    path: "/faqs",
    structuredData: faqStructuredData,
  })
  return (
      <div>
        <h1 className="sr-only">PartPixels SSD Frequently Asked Questions</h1>
        <FAQSection />
      </div>
  )
}

export default FAQs
