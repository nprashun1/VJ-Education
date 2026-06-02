require('dotenv').config();
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGO_URI

let gfs
let galleryGfs
let noticesGfs

const conn = mongoose.createConnection(MONGO_URI)

conn.once('open', () => {
  console.log('✅ MongoDB connected:', MONGO_URI)
  gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'resumes' })
  galleryGfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'gallery' })
  noticesGfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'notices' })
})

conn.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err.message)
})

const getGfs = () => gfs
const getGalleryGfs = () => galleryGfs
const getNoticesGfs = () => noticesGfs

module.exports = { conn, getGfs, getGalleryGfs, getNoticesGfs }
