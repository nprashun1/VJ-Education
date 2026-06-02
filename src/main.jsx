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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/admission" element={<AdmissionForm />} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/About" element={<About/>} />
        <Route path="/School" element={<School/>} />
        <Route path="/Coaching" element={<Coaching/>} />
        <Route path="/Hostel" element={<Hostel/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
)
