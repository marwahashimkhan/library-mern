const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const Member = require('../models/Member');

exports.getTransactions = async (req, res) => {
  try {
    const txns = await Transaction.find()
      .populate('bookId', 'title author')
      .populate('memberId', 'name email')
      .sort({ borrowDate: -1 });
    res.json(txns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, memberId, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const member = await Member.findById(memberId);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    if (book.availableCopies < 1) {
      return res.status(400).json({ message: 'No copies available for this book' });
    }

    book.availableCopies -= 1;
    await book.save();

    const txn = new Transaction({ bookId, memberId, dueDate });
    await txn.save();

    res.status(201).json(txn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const txn = await Transaction.findById(req.params.id);
    if (!txn) return res.status(404).json({ message: 'Transaction not found' });
    if (txn.status === 'returned') {
      return res.status(400).json({ message: 'This book was already returned' });
    }

    txn.status = 'returned';
    txn.returnDate = new Date();
    await txn.save();

    const book = await Book.findById(txn.bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.json(txn);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const txn = await Transaction.findByIdAndDelete(req.params.id);
    if (!txn) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
