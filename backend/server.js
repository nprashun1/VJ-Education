require('dotenv').config();
const express = require('express')
const cors = require('cors')

require('./config/db')

const staffRoutes = require('./routes/staffRoutes')
const noticeRoutes = require('./routes/noticeRoutes')
const admissionRoutes = require('./routes/admissionRoutes')
const galleryRoutes = require('./routes/galleryRoutes')
const { getResume } = require('./controllers/staffController')

const app = express()
const PORT = process.env.PORT || 5000

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/staff', staffRoutes)
app.get('/api/resume/:id', getResume) // Preserving the old path for backward compatibility
app.use('/api/notices', noticeRoutes)
app.use('/api/admissions', admissionRoutes)
app.use('/api/gallery', galleryRoutes)

// ── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`🚀 Backend running at http://localhost:${PORT}`))


