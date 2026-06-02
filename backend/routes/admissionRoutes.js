const express = require('express')
const router = express.Router()
const { getAdmissions, createAdmission, deleteAdmission } = require('../controllers/admissionController')

router.get('/', getAdmissions)
router.post('/', createAdmission)
router.delete('/:id', deleteAdmission)

module.exports = router
