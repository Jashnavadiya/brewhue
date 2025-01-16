// const UserPanel = require('../models/UserPanel');

// Get user panel data
const getUserPanel = async (req, res) => {
  try {

    const UserPanel=req.db.model('UserPanel');
    const userPanel = await UserPanel.findOne(); // Static data, so fetch only the first document
    if (!userPanel) {
      return res.status(404).json({ message: 'No data found' });
    }
    res.status(200).json(userPanel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
};

// Update or add user panel data
const upsertUserPanel = async (req, res) => {
  try {
      const UserPanel=req.db.model('UserPanel');
    const userPanelData = req.body;
    // Check if a document exists, and update it or create a new one
    const updatedUserPanel = await UserPanel.findOneAndUpdate(
      {}, // Find the first document
      userPanelData, // Data to update or add
      { upsert: true, new: true } // Upsert and return the updated document
    );

    res.status(200).json({
      message: 'Data updated successfully!',
      data: updatedUserPanel
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating data' });
  }
};

module.exports = { getUserPanel, upsertUserPanel };
