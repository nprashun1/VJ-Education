const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const { createStaff, getStaff, getResume, deleteStaff } = require('../controllers/staffController')

router.post('/', upload.single('resume'), createStaff)
router.get('/', getStaff)
router.delete('/:id', deleteStaff)

module.exports = router
