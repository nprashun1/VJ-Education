const mongoose = require('mongoose')
const Notice = require('../models/Notice')
const { getNoticesGfs } = require('../config/db')
const { uploadToGridFS } = require('../utils/gridfs')

const getNotices = async (req, res) => {
  try {
    res.json(await Notice.find().sort({ createdAt: -1 }))
  } catch (err) { 
    res.status(500).json({ error: err.message }) 
  }
}

const createNotice = async (req, res) => {
  try {
    const { title } = req.body
    let link = req.body.link

    if (!title) return res.status(400).json({ error: 'Title is required' })

    let pdfId = null;
    if (req.file) {
      const noticesGfs = getNoticesGfs()
      if (!noticesGfs) return res.status(503).json({ error: 'Database not ready' })
      const filename = `notice_${Date.now()}_${req.file.originalname}`
      const uploadRes = await uploadToGridFS(
        noticesGfs, req.file.buffer, filename, 'application/pdf', { title }
      )
      pdfId = uploadRes.id
      link = `http://localhost:5000/api/notices/pdf/${pdfId}`
    }

    if (!link) return res.status(400).json({ error: 'A Link URL or PDF file is mandatory' })

    const notice = await Notice.create({ title, link, pdfId })
    res.status(201).json(notice)
  } catch (err) { 
    res.status(500).json({ error: err.message }) 
  }
}

const getNoticePdf = async (req, res) => {
  try {
    const noticesGfs = getNoticesGfs()
    if (!noticesGfs) return res.status(503).json({ error: 'Database not ready' })
    const fileId = new mongoose.Types.ObjectId(req.params.id)
    const files = await noticesGfs.find({ _id: fileId }).toArray()
    if (!files.length) return res.status(404).json({ error: 'Notice PDF not found' })

    res.setHeader('Content-Type', 'application/pdf')
    res.setHeader('Content-Disposition', `inline; filename="${files[0].filename}"`)
    noticesGfs.openDownloadStream(fileId).pipe(res)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id)
    if (!notice) return res.status(404).json({ error: 'Not found' })
    
    const noticesGfs = getNoticesGfs()
    if (notice.pdfId && noticesGfs) {
      try { await noticesGfs.delete(notice.pdfId) } catch(e) { console.error('GridFS delete error:', e) }
    }

    await Notice.findByIdAndDelete(req.params.id)
    res.json({ message: 'Notice deleted' })
  } catch (err) { 
    res.status(500).json({ error: err.message }) 
  }
}

module.exports = {
  getNotices,
  createNotice,
  getNoticePdf,
  deleteNotice
}
