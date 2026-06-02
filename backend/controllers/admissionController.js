const Admission = require('../models/Admission')

const getAdmissions = async (req, res) => {
  try {
    res.json(await Admission.find().sort({ createdAt: -1 }))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const createAdmission = async (req, res) => {
  try {
    const { studentName, fatherName, class: stuClass, phone, address } = req.body
    if (!studentName || !phone) return res.status(400).json({ error: 'Required fields missing' })
    const adm = await Admission.create({ studentName, fatherName, class: stuClass, phone, address })
    res.status(201).json(adm)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteAdmission = async (req, res) => {
  try {
    await Admission.findByIdAndDelete(req.params.id)
    res.json({ message: 'Admission deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAdmissions,
  createAdmission,
  deleteAdmission
}
