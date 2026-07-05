import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import CustomCursor from './components/common/CustomCursor'
import Footer from './components/common/Footer'
import WarrantyPage from './Pages/WarrantyPage'
import AboutCompanyPage from './Pages/AboutCompanyPage'
import ContactPage from './Pages/ContactPage'
import MainHomePage from './Pages/MainHomePage'

const App = () => {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainHomePage />} />
        <Route path="/warranty" element={<WarrantyPage />} />
        <Route path="/about-company" element={<AboutCompanyPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
