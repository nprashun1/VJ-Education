const mongoose = require('mongoose');
const { conn } = require('../config/db');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  link: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Event = conn.model('Event', eventSchema);

module.exports = Event;
