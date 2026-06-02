const mongoose = require('mongoose')
const { conn } = require('../config/db')

const staffSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, required: true },
  resumeId:   { type: mongoose.Schema.Types.ObjectId },
  resumeName: { type: String },
  createdAt:  { type: Date, default: Date.now }
})

const Staff = conn.model('Staff', staffSchema)

module.exports = Staff
