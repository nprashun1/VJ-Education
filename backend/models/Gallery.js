const mongoose = require('mongoose')
const { conn } = require('../config/db')

const gallerySchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  photoId:     { type: mongoose.Schema.Types.ObjectId }, // optional now
  staticUrl:   { type: String },
  createdAt:   { type: Date, default: Date.now }
})

const Gallery = conn.model('Gallery', gallerySchema)

module.exports = Gallery
