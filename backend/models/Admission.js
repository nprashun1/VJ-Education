const mongoose = require('mongoose')
const { conn } = require('../config/db')

const admissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName:  { type: String, required: true },
  class:       { type: String, required: true },
  phone:       { type: String, required: true },
  address:     { type: String, required: true },
  createdAt:   { type: Date, default: Date.now }
})

const Admission = conn.model('Admission', admissionSchema)

module.exports = Admission
