const express = require('express')
const router = express.Router()
const { getAdmissions, createAdmission, deleteAdmission } = require('../controllers/admissionController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, getAdmissions)
router.post('/', createAdmission)
router.delete('/:id', authMiddleware, deleteAdmission)

module.exports = router
