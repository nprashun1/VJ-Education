const mongoose = require('mongoose')
const Staff = require('../models/Staff')
const { getGfs } = require('../config/db')
const { uploadToGridFS } = require('../utils/gridfs')

const createStaff = async (req, res) => {
  try {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) return res.status(400).json({ error: 'Name, email, and phone are required' })
    if (!req.file) return res.status(400).json({ error: 'Resume PDF is required' })
    
    const gfs = getGfs()
    if (!gfs) return res.status(503).json({ error: 'Database not ready' })

    const filename = `resume_${Date.now()}_${req.file.originalname}`
    const { id: resumeId, filename: resumeName } = await uploadToGridFS(
      gfs, req.file.buffer, filename, 'application/pdf', { name, email, phone }
    )

    const staff = await Staff.create({ name, email, phone, resumeId, resumeName })
    res.status(201).json({ message: 'Staff registered successfully!', staffId: staff._id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getStaff = async (req, res) => {
  try {
    res.json(await Staff.find().sort({ createdAt: -1 }))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getResume = async (req, res) => {
  try {
    const gfs = getGfs()
    if (!gfs) return res.status(503).json({ error: 'Database not ready' })
    
    const fileId = new mongoose.Types.ObjectId(req.params.id)
    const files = await gfs.find({ _id: fileId }).toArray()
    if (!files.length) return res.status(404).json({ error: 'Resume not found' })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${files[0].filename}"`)
    gfs.openDownloadStream(fileId).pipe(res)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
    if (!staff) return res.status(404).json({ error: 'Not found' })
    
    const gfs = getGfs()
    if (staff.resumeId && gfs) {
      try { await gfs.delete(staff.resumeId) } catch(e) { console.error('GridFS delete error:', e) }
    }

    await Staff.findByIdAndDelete(req.params.id)
    res.json({ message: 'Staff deleted' })
  } catch (err) { 
    res.status(500).json({ error: err.message }) 
  }
}

module.exports = {
  createStaff,
  getStaff,
  getResume,
  deleteStaff
}
