const mongoose = require('mongoose')
const Gallery = require('../models/Gallery')
const { getGalleryGfs } = require('../config/db')
const { uploadToGridFS } = require('../utils/gridfs')

const createPhoto = async (req, res) => {
  try {
    const { title, description } = req.body
    if (!title) return res.status(400).json({ error: 'Title is required' })
    if (!req.file) return res.status(400).json({ error: 'Photo is required' })

    const galleryGfs = getGalleryGfs()
    if (!galleryGfs) return res.status(503).json({ error: 'Database not ready' })

    const filename = `gallery_${Date.now()}_${req.file.originalname}`
    const { id: photoId } = await uploadToGridFS(
      galleryGfs, req.file.buffer, filename, req.file.mimetype, { title }
    )

    const gallery = await Gallery.create({ title, description, photoId })
    res.status(201).json(gallery)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getPhotos = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 })
    const formatted = galleries.map(g => ({
      id: g._id,
      url: g.staticUrl ? g.staticUrl : `https://vj-education.onrender.com/api/gallery/photo/${g.photoId}`,
      title: g.title,
      description: g.description
    }))
    res.json(formatted)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getPhotoFile = async (req, res) => {
  try {
    const galleryGfs = getGalleryGfs()
    if (!galleryGfs) return res.status(503).json({ error: 'Database not ready' })
    const fileId = new mongoose.Types.ObjectId(req.params.id)
    const files = await galleryGfs.find({ _id: fileId }).toArray()
    if (!files.length) return res.status(404).json({ error: 'Photo not found' })

    res.setHeader('Content-Type', files[0].contentType || 'image/jpeg')
    galleryGfs.openDownloadStream(fileId).pipe(res)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deletePhoto = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
    if (!gallery) return res.status(404).json({ error: 'Not found' })

    const galleryGfs = getGalleryGfs()
    if (gallery.photoId && galleryGfs) {
      try {
        await galleryGfs.delete(gallery.photoId)
      } catch (e) { console.error('GridFS delete error:', e) }
    }

    await Gallery.findByIdAndDelete(req.params.id)
    res.json({ message: 'Photo deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  createPhoto,
  getPhotos,
  getPhotoFile,
  deletePhoto
}
