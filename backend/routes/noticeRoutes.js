const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const { getNotices, createNotice, getNoticePdf, deleteNotice } = require('../controllers/noticeController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', getNotices)
router.post('/', authMiddleware, upload.single('pdf'), createNotice)
router.get('/pdf/:id', getNoticePdf)
router.delete('/:id', authMiddleware, deleteNotice)

module.exports = router
