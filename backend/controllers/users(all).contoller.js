// userController.js

// Create a new user
const createUser = async (req, res) => {
    try {
      const { email, shopname } = req.body;
  
      // Validate input
      if (!email || !shopname) {
        return res.status(400).json({ error: 'Email and Shop Name are required.' });
      }
  
      // Use the "user" database connection
      const User = req.db.model('UserAll');
  
      // Check if the email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(201).json({ message: 'Email already exists.' });
      }
  
      // Create a new user
      const newUser = new User({ email, shopname });
      await newUser.save();
  
      res.status(201).json({ message: 'Submitted! thanks ;)', data: newUser });
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  };
  
  // Get all users
  const getUsers = async (req, res) => {
    try {
      // Use the "user" database connection
      const User = req.db.model('UserAll');
  
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  };
  
  // Delete a user by ID
  const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Use the "user" database connection
      const User = req.db.model('UserAll');
  
      const deletedUser = await User.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  };
  
  module.exports = {
    createUser,
    getUsers,
    deleteUser,
  };
  