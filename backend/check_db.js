const mongoose = require('mongoose');

async function checkDb() {
  await mongoose.connect('mongodb://localhost:27017/vjEducation');
  console.log('Connected to DB');
  
  const conn = mongoose.connection;
  
  const collections = await conn.db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));
  
  const Staff = conn.collection('staffs');
  const staffs = await Staff.find().toArray();
  console.log('Staffs count:', staffs.length);
  console.log('Staffs:', staffs);
  
  const ResumesFiles = conn.collection('resumes.files');
  const files = await ResumesFiles.find().toArray();
  console.log('Resumes (files) count:', files.length);
  
  const ResumesChunks = conn.collection('resumes.chunks');
  const chunks = await ResumesChunks.countDocuments();
  console.log('Resumes (chunks) count:', chunks);
  
  mongoose.disconnect();
}

checkDb().catch(console.error);
