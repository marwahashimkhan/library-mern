const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/bookController');

router.get('/', ctrl.getBooks);
router.get('/:id', ctrl.getBook);

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('author').notEmpty().withMessage('Author is required'),
    body('isbn').notEmpty().withMessage('ISBN is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('totalCopies').isInt({ min: 1 }).withMessage('Total copies must be at least 1')
  ],
  ctrl.createBook
);

router.put('/:id', ctrl.updateBook);
router.delete('/:id', ctrl.deleteBook);

module.exports = router;
