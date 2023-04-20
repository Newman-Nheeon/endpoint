const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../Models/users');

// Authenticate user
const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password were provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create and sign a JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    // Saving refreshToken with current user
    user.refreshToken = refreshToken;
    const result = await user.save();
    console.log(result);

    // Set the refresh token as a cookie
    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

    // Return the JWT token to the client
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
};
