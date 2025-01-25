// userRoutes.js
const express = require('express');
const { createUser, getUsers, deleteUser } = require('../controllers/users(all).contoller');

const router = express.Router();

// Create a new user
router.post('/:shopName/userall', createUser);

// Get all users
router.get('/:shopName/userall', getUsers);

// Delete a user by ID
router.delete('/:shopName/userall/:id', deleteUser);

module.exports = router;
