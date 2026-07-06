import HomePage from './HomePage'
import AboutUs from '../Pages/AboutUs'
import ProductCards from '../components/cards/ProductCards'
import ProductDetailsShowcase from '../components/product/ProductDetailsShowcase'
import StorageStackSection from '../components/common/StorageStackSection'
import FAQSection from '../components/common/FAQSection'

const MainHomePage = () => {
    return (
        <>
            <HomePage />
            <AboutUs />
            <ProductCards />
            <ProductDetailsShowcase />
            <StorageStackSection />
            <FAQSection />
        </>
    )
}

export default MainHomePage
