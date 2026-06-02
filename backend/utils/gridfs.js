const { Readable } = require('stream')

function uploadToGridFS(bucket, buffer, filename, contentType, metadata) {
  return new Promise((resolve, reject) => {
    const readableStream = Readable.from(buffer)
    const uploadStream = bucket.openUploadStream(filename, {
      contentType,
      metadata
    })

    uploadStream.on('finish', () => resolve({ id: uploadStream.id, filename }))
    uploadStream.on('error', reject)

    readableStream.pipe(uploadStream)
  })
}

module.exports = { uploadToGridFS }
