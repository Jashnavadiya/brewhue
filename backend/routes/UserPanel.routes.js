const express = require('express');
const router = express.Router();
const { getUserPanel, upsertUserPanel } = require('../controllers/UserPanel.controller');

// Route to get the user panel data
router.get('/userpanel', getUserPanel);

// Route to update or add user panel data
router.post('/userpanel', upsertUserPanel);

module.exports = router;
