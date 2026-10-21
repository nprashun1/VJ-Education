import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import App from './App.jsx'
import Gallery from './components/Gallery/Gallery.jsx'
import Staff from './components/Staaff/Staff.jsx'
import AdmissionForm from './components/Admission/AdmissionForm.jsx'
import Contact from './components/Contact/Contact.jsx'
import About from './components/About/About.jsx'
import School from './components/School/School.jsx'
import Coaching from './components/Coaching/Coaching.jsx'
import Hostel from './components/Hostel/Hostel.jsx'
import NotFound from './components/NotFound/NotFound.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import ScrollToTop from './components/Common/ScrollToTop.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/admission" element={<AdmissionForm />} />
          <Route path="/admissions" element={<AdmissionForm />} />
          
          {/* Branch & Information Routes (both cases supported) */}
          <Route path="/Contact" element={<Contact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/School" element={<School />} />
          <Route path="/school" element={<School />} />
          <Route path="/Coaching" element={<Coaching />} />
          <Route path="/coaching" element={<Coaching />} />
          <Route path="/Hostel" element={<Hostel />} />
          <Route path="/hostel" element={<Hostel />} />

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
