const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Controller for signing up a new user
exports.signup = async (req, res) => {
  try {
    const { email, password, role  } = req.body;
    const User=req.db.model('User');

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });

    const savedUser = await user.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller for logging in a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User=req.db.model('User');

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id, role: user.role }, `${process.env.JWT_SECRET}`, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.me = async (req, res) => {
  try {
     res.json(req.user); // Send user data from the token
  } catch (error) {
     console.error('Error in /me:', error);
     res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Controller for getting user info
exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const User=req.db.model('User');

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller for updating user info
exports.updateUser = async (req, res) => {
  try {
    const User=req.db.model('User');
    const { userId } = req.params;
    const updates = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    Object.assign(user, updates);
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Controller for deleting a user
exports.deleteUser = async (req, res) => {
  try {
    const User=req.db.model('User');
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.remove();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
