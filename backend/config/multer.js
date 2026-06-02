const multer = require('multer')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB (images can be large)
  fileFilter: (req, file, cb) => {
    // Allows PDF and Images
    if (file.mimetype !== 'application/pdf' && !file.mimetype.startsWith('image/')) {
      return cb(new Error('Only PDF and Image files are allowed'), false)
    }
    cb(null, true)
  }
})

module.exports = upload
