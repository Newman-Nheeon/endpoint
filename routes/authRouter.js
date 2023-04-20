const express = require('express');
const { login } = require('../Controllers/authController');

const router = express.Router();

// Login route
router.post('/', login);

module.exports = router;
