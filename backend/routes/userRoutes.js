const express = require('express');
const router = express();
const userController = require('../controllers/userController.js');
const authenticate = require('../middleware/authMiddleware');

// Route for signing up a new user
router.post('/signup', userController.signup);

// Route for logging in a user
router.post('/login', userController.login);

// Route for getting user info (protected route)
router.get('/me', authenticate, userController.me);
router.get('/:userId', authenticate, userController.getUser);

// Route for updating user info (protected route)
router.put('/:userId', authenticate, userController.updateUser);

// Route for deleting a user (protected route)
router.delete('/:userId', authenticate, userController.deleteUser);

module.exports = router;
