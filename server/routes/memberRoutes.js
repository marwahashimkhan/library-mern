const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const ctrl = require('../controllers/memberController');

router.get('/', ctrl.getMembers);
router.get('/:id', ctrl.getMember);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone is required')
  ],
  ctrl.createMember
);

router.put('/:id', ctrl.updateMember);
router.delete('/:id', ctrl.deleteMember);

module.exports = router;
