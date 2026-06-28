const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/transactionController');

router.get('/', ctrl.getTransactions);
router.post('/borrow', ctrl.borrowBook);
router.put('/return/:id', ctrl.returnBook);
router.delete('/:id', ctrl.deleteTransaction);

module.exports = router;
