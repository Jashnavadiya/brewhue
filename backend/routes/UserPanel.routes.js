const express = require('express');
const router = express.Router();
const { getUserPanel, upsertUserPanel,addOrUpdateLinks,getLinks,generateVCard } = require('../controllers/UserPanel.controller');

// Route to get the user panel data
router.get('/userpanel', getUserPanel);

// Route to update or add user panel data
router.post('/userpanel', upsertUserPanel);
router.post('/userpanel/links', addOrUpdateLinks); // Add or update links
router.get('/userpanel/links', getLinks); // Fetch links
router.post("/:shopName/userpanel/generate-vcard", generateVCard);


module.exports = router;
