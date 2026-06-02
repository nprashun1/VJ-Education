const mongoose = require('mongoose');

const staticPhotos = [
  { id: 's1',  url: 'http://localhost:5173/school.jpg',    title: 'Our School',     description: 'Welcome to VJ Education' },
  { id: 's2',  url: 'http://localhost:5173/school1.png',   title: 'School Life 1',  description: 'Memories that last forever' },
  { id: 's3',  url: 'http://localhost:5173/school2.png',   title: 'School Life 2',  description: 'Learning and growing together' },
  { id: 's4',  url: 'http://localhost:5173/school3.png',   title: 'School Life 3',  description: 'Every day is a new adventure' },
  { id: 's5',  url: 'http://localhost:5173/school4.png',   title: 'School Life 4',  description: 'Building the future, one student at a time' },
  { id: 's6',  url: 'http://localhost:5173/school5.png',   title: 'School Life 5',  description: 'Excellence in education' },
  { id: 's7',  url: 'http://localhost:5173/school6.png',   title: 'School Life 6',  description: 'Together we achieve more' },
  { id: 's8',  url: 'http://localhost:5173/school7.png',   title: 'School Life 7',  description: 'Inspiring young minds' },
  { id: 's9',  url: 'http://localhost:5173/school8.png',   title: 'School Life 8',  description: 'A place of learning and friendship' },
  { id: 's10', url: 'http://localhost:5173/school9.png',   title: 'School Life 9',  description: 'Creating lasting memories' },
  { id: 's11', url: 'http://localhost:5173/school10.png',  title: 'School Life 10', description: 'Knowledge is power' },
  { id: 's12', url: 'http://localhost:5173/school11.png',  title: 'School Life 11', description: 'Nurturing talent and creativity' },
  { id: 's13', url: 'http://localhost:5173/school12.png',  title: 'School Life 12', description: 'Growing stronger every day' },
  { id: 's14', url: 'http://localhost:5173/school13.png',  title: 'School Life 13', description: 'Discover, learn, grow' },
  { id: 's15', url: 'http://localhost:5173/school14.png',  title: 'School Life 14', description: 'Our proud moments' },
  { id: 's16', url: 'http://localhost:5173/school15.png',  title: 'School Life 15', description: 'Celebrating achievements' },
  { id: 's17', url: 'http://localhost:5173/school16.png',  title: 'School Life 16', description: 'The spirit of teamwork' },
  { id: 's18', url: 'http://localhost:5173/school17.png',  title: 'School Life 17', description: 'Fun and learning hand in hand' },
  { id: 's19', url: 'http://localhost:5173/school18.png',  title: 'School Life 18', description: 'Every student matters' },
  { id: 's20', url: 'http://localhost:5173/school19.png',  title: 'School Life 19', description: 'A vibrant school community' },
  { id: 's21', url: 'http://localhost:5173/school20.png',  title: 'School Life 20', description: 'Shaping tomorrow\'s leaders' },
  { id: 's22', url: 'http://localhost:5173/school21.png',  title: 'School Life 21', description: 'Bright minds, bright futures' },
  { id: 's23', url: 'http://localhost:5173/school22.png',  title: 'School Life 22', description: 'Pride and passion' },
  { id: 's24', url: 'http://localhost:5173/school23.png',  title: 'School Life 23', description: 'United in excellence' },
  { id: 's25', url: 'http://localhost:5173/school24.png',  title: 'School Life 24', description: 'Where dreams take flight' },
  { id: 's26', url: 'http://localhost:5173/school25.png',  title: 'School Life 25', description: 'Dedicated to your success' },
  { id: 's27', url: 'http://localhost:5173/school26.png',  title: 'School Life 26', description: 'Step by step, day by day' },
  { id: 's28', url: 'http://localhost:5173/school27.png',  title: 'School Life 27', description: 'The journey of a lifetime' }
];

const gallerySchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, default: '' },
  photoId:     { type: mongoose.Schema.Types.ObjectId },
  staticUrl:   { type: String }, // For pre-existing hardcoded images
  createdAt:   { type: Date, default: Date.now }
});

async function run() {
  await mongoose.connect('mongodb://localhost:27017/vjEducation');
  const Gallery = mongoose.model('Gallery', gallerySchema);

  // Clear existing static images to avoid duplicates if run multiple times
  await Gallery.deleteMany({ staticUrl: { $exists: true, $ne: null } });

  // Insert them into DB
  const docs = staticPhotos.map(p => ({
    title: p.title,
    description: p.description,
    staticUrl: p.url, // Ensure frontend can load from vite dev server for now
    createdAt: new Date()
  }));

  await Gallery.insertMany(docs);
  console.log('✅ 28 static photos inserted into MongoDB');
  process.exit(0);
}

run().catch(console.error);
