const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { username, password } = req.body;

  const validUsername = process.env.ADMIN_USERNAME || 'admin';
  const validPassword = process.env.ADMIN_PASSWORD || 'admin@vj';

  if (username === validUsername && password === validPassword) {
    // Generate JWT token
    const token = jwt.sign(
      { username: validUsername },
      process.env.JWT_SECRET,
      { expiresIn: '12h' } // Token expires in 12 hours
    );

    res.json({ message: 'Login successful', token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = { login };
