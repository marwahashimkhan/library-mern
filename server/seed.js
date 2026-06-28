require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/Book');
const Member = require('./models/Member');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Book.deleteMany();
  await Member.deleteMany();

  const books = await Book.insertMany([
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', category: 'Programming', totalCopies: 3, availableCopies: 3 },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '9780201616224', category: 'Programming', totalCopies: 2, availableCopies: 2 },
    { title: 'Database System Concepts', author: 'Silberschatz', isbn: '9780073523323', category: 'Database', totalCopies: 4, availableCopies: 4 }
  ]);

  const members = await Member.insertMany([
    { name: 'Ali Khan', email: 'ali@example.com', phone: '03001234567' },
    { name: 'Sara Ahmed', email: 'sara@example.com', phone: '03007654321' }
  ]);

  console.log(`Seeded ${books.length} books and ${members.length} members`);
  process.exit();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
