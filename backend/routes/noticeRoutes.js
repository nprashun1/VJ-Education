const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const { getNotices, createNotice, getNoticePdf, deleteNotice } = require('../controllers/noticeController')

router.get('/', getNotices)
router.post('/', upload.single('pdf'), createNotice)
router.get('/pdf/:id', getNoticePdf)
router.delete('/:id', deleteNotice)

module.exports = router
