import { FiDownload } from "react-icons/fi";

const warrantyParagraphs = [
    `At PartPixels, we are committed to delivering reliable, high-quality storage solutions. Every genuine 
    PartPixels PIXPRO SSD is manufactured using premium components and undergoes rigorous quality testing 
    to ensure dependable performance. To demonstrate our confidence in our products, we provide a Five (5) Year 
    Limited Warranty from the original date of purchase.`,

    `This warranty is valid only for the original purchaser and is non-transferable. Warranty service is available 
only upon presentation of a valid proof of purchase from an authorized PartPixels reseller or distributor. 
Products replaced or repaired under this warranty will continue to be covered for the remainder of the original 
warranty period and will not receive a new warranty term. `,

    `If a PartPixels SSD is found to have a manufacturing defect or fails under normal operating conditions during 
the warranty period, PartPixels, at its sole discretion, will repair the product, replace it with an equivalent or 
higher-capacity model (subject to availability), or provide an appropriate remedy in accordance with our 
warranty policy. Any replacement product may be new or refurbished and will meet the functional 
specifications of the original product. `,

    `To request warranty service, customers must provide the product serial number, proof of purchase, and any 
additional information required by PartPixels or an authorized service partner. Before returning any product for 
warranty service, customers are strongly advised to back up all important data, as PartPixels is not responsible 
for any loss, corruption, or recovery of data stored on the SSD. `,

    ` This limited warranty does not cover products that have been damaged due to misuse, improper installation, 
unauthorized repair or modification, physical damage, electrical damage, liquid exposure, accidents, fire, natural 
disasters, or operation outside the product's specified operating conditions. The warranty is also void if the 
product label, serial number, or identification markings have been removed, altered, or damaged. `,

    `This warranty gives you specific legal rights, and you may also have additional rights that vary depending on 
your country or region. To the maximum extent permitted by applicable law, PartPixels shall not be liable for 
any indirect, incidental, special, punitive, or consequential damages, including but not limited to loss of data, 
business interruption, loss of profits, or any costs exceeding the original purchase price of the product. `,
];

const coverageIncludes = [
    "Warranty Period: 5 Years from the original purchase date",
    "Coverage: Manufacturing defects under normal use",
    "Eligible Customer: Original purchaser only",
    "Proof Required: Valid purchase invoice and product serial number",
    "Warranty Resolution: Repair, replacement, or equivalent product, subject to inspection and availability",
];

const notCovered = [
    "Physical or accidental damage",
    "Improper installation or misuse",
    "Unauthorized repair or modification",
    "Damage caused by water, fire, or electrical surges",
    "Normal wear and tear",
    "Products with removed or altered serial numbers",
    "Data loss or data recovery costs",
];

const WarrantyPage = () => {
    return (
        <main className="min-h-screen bg-black px-5 pt-36 pb-24 text-white">
            <section className="mx-auto max-w-4xl">
                {/* Page Heading */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold uppercase tracking-tight md:text-4xl">
                        Warranty
                    </h1>

                    <div className="mx-auto mt-6 h-px w-16 bg-white/70" />
                </div>

                {/* Content */}
                <div className="mt-24">
                    <h2 className="text-center text-2xl font-bold md:text-3xl">
                        PartPixels 5-Year Limited Warranty
                    </h2>

                    <div className="mt-8 h-px w-full bg-white/15" />

                    <div className="mt-10 space-y-7 text-sm leading-8 text-white/60">
                        {warrantyParagraphs.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mt-10 h-px w-full bg-white/15" />

                    {/* Coverage */}
                    <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
                        <div>
                            <h3 className="text-xl font-bold text-white">
                                Warranty Coverage Includes
                            </h3>

                            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/60">
                                {coverageIncludes.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white">
                                Warranty Does Not Cover
                            </h3>

                            <ul className="mt-6 space-y-4 text-sm leading-7 text-white/60">
                                {notCovered.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Backup Policy */}
                    <div className="mt-16">
                        <h3 className="text-xl font-bold text-white">
                            Backup and Recovery Policy
                        </h3>

                        <p className="mt-6 text-sm leading-8 text-white/60">
                            At PartPixels, we are committed to delivering reliable storage solutions, but we strongly
                            recommend that customers regularly back up their important data to prevent loss caused by
                            accidental deletion, hardware failure, software corruption, or unforeseen events. Before
                            installing, formatting, updating firmware, or returning an SSD for warranty service, always
                            create a complete backup of your files. While our products undergo rigorous quality testing,
                            PartPixels is not responsible for any loss, corruption, or recovery of data stored on the
                            device. Maintaining multiple backups on separate storage devices or cloud services is the best
                            way to ensure your valuable information remains safe and accessible at all times.

                        </p>
                    </div>

                    <div className="mt-12 h-px w-full bg-white/15" />

                    {/* Download Button */}
                    <div className="mt-10 flex justify-center">
                        <a
                            href="/partpixels-warranty.pdf"
                            download
                            className="
                                    inline-flex items-center gap-3 rounded-full border border-white/30
                                    px-7 py-3 text-xs font-bold uppercase tracking-[0.2em]
                                    text-white/70 transition
                                    hover:border-white hover:text-white
                                "
                        >
                            <FiDownload />
                            Download Warranty PDF
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default WarrantyPage;