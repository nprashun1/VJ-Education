const mongoose = require('mongoose')
const { conn } = require('../config/db')

const noticeSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  link:       { type: String, required: true },
  pdfId:      { type: mongoose.Schema.Types.ObjectId },
  createdAt:  { type: Date, default: Date.now }
})

const Notice = conn.model('Notice', noticeSchema)

module.exports = Notice
