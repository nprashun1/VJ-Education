const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const { createStaff, getStaff, getResume, deleteStaff } = require('../controllers/staffController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', upload.single('resume'), createStaff)
router.get('/', authMiddleware, getStaff)
router.delete('/:id', authMiddleware, deleteStaff)

module.exports = router
