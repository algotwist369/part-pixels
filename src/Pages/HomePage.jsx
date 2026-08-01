import React from 'react'
import Home from '../components/home/Home'
import usePageSeo from '../hooks/usePageSeo'

const HomePage = () => {
  usePageSeo({
    title: "PartPixels - High-Performance PIXPRO NVMe & SATA SSD Storage",
    description:
      "Engineered for creators, gamers, professionals, and enterprise systems. Discover PartPixels PIXPRO PCIe Gen4 NVMe speeds up to 6,000+ MB/s and 5-Year Limited Warranty.",
    keywords: ["PartPixels", "PIXPRO SSD", "PCIe Gen4 NVMe", "SATA III SSD", "5 Year Warranty SSD"],
    path: "/",
    image: "/assets/images/image (6).jpeg",
  });

  return (
    <div>
      <Home />
    </div>
  )
}

export default HomePage
