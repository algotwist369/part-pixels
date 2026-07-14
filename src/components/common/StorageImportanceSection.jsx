import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiActivity, FiDatabase, FiShield } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: FiActivity, title: "Faster Every Day", description: "Reduce boot times, launch applications quickly, and move large files without slowing down your workflow." },
  { icon: FiShield, title: "Protected by Design", description: "Dependable solid-state storage helps keep memories, projects, and business information safe and accessible." },
  { icon: FiDatabase, title: "Ready for What Is Next", description: "From a personal upgrade to a professional workstation, PIXPRO storage is built to keep pace with your ambitions." },
];

const StorageImportanceSection = () => {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".storage-intro-reveal", { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-black px-5 py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute left-[8%] top-[15%] h-[30rem] w-[30rem] rounded-full bg-[#d6a000]/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.055),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-[110rem]">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <article className="storage-intro-reveal border-t border-white/15 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-[#d6a000]">Why Storage Devices Matter</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] md:text-6xl">Every byte carries something valuable.</h2>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/62 md:text-lg">In today&apos;s digital world, your data is one of your most valuable assets. A reliable storage device keeps files, memories, projects, and business information safe, accessible, and protected. Fast storage also improves system performance for a smoother experience.</p>
          </article>
          <article className="storage-intro-reveal border-t border-[#d6a000]/45 pt-8">
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-[#d6a000]">Experience Next-Generation Storage</p>
            <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[1.02] md:text-6xl">Built for the speed of your ambition.</h2>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/62 md:text-lg">PIXPRO SSDs are engineered for creators, gamers, professionals, and businesses that demand exceptional speed and reliability. Boot faster, transfer files in seconds, and handle demanding workloads with storage designed to move as quickly as you do.</p>
          </article>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article key={title} className="storage-intro-reveal bg-[#090909] p-8 md:p-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6a000]/25 bg-[#d6a000]/10 text-[#d6a000]"><Icon size={21} /></span>
              <h3 className="mt-8 text-2xl font-bold">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/55">{description}</p>
            </article>
          ))}
        </div>
        <div className="storage-intro-reveal mt-16 grid gap-8 border-y border-white/10 py-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#d6a000]">PCIe Gen3 Performance</p>
            <p className="mt-3 text-5xl font-black md:text-7xl">3,500 <span className="text-xl text-white/40 md:text-2xl">MB/s</span></p>
          </div>
          <p className="text-base leading-8 text-white/62 md:text-lg">Dependable performance should be accessible to everyone. PIXPRO PCIe Gen3 NVMe SSDs combine premium NAND flash, advanced controller technology, intelligent thermal management, and 100% quality testing for speed, stability, and lasting value.</p>
        </div>
      </div>
    </section>
  );
};

export default StorageImportanceSection;

