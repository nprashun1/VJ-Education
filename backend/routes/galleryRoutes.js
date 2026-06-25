const express = require('express')
const router = express.Router()
const upload = require('../config/multer')
const { createPhoto, getPhotos, getPhotoFile, deletePhoto } = require('../controllers/galleryController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, upload.single('photo'), createPhoto)
router.get('/', getPhotos)
router.get('/photo/:id', getPhotoFile)
router.delete('/:id', authMiddleware, deletePhoto)

module.exports = router
