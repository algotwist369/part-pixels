import React from 'react'
import HomePage from './HomePage'
import AboutUs from '../Pages/AboutUs'
import ProductCards from '../components/cards/ProductCards'
import ProductDetailsShowcase from '../components/product/ProductDetailsShowcase'
import StorageStackSection from '../components/common/StorageStackSection'

const MainHomePage = () => {
    return (
        <>
            <HomePage />
            <AboutUs />
            <ProductCards />
            <ProductDetailsShowcase />
            <StorageStackSection />
        </>
    )
}

export default MainHomePage