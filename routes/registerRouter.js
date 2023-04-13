const express = require('express');
const { registerUser } = require('../Controllers/registerController');
const { body } = require('express-validator');

const router = express.Router();

// Validation middleware
const validate = (method) => {
  switch (method) {
    case 'registerUser': {
      return [
        body('firstName', 'First name is required').exists().notEmpty(),
        body('lastName', 'Last name is required').exists().notEmpty(),
        body('email', 'Email is required').exists().notEmpty(),
        body('password', 'Password is required').exists().notEmpty(),
      ];
    }
  }
}

router.post('/', validate('registerUser'), registerUser);

module.exports = router;
