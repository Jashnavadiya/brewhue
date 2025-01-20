// const UserPanel = require('../models/UserPanel');
const mongoose = require('mongoose');

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
    const UserPanel = req.db.model('UserPanel'); // Dynamically loaded model
    const userPanelData = req.body;

    // Validate section5Comments
    if (Array.isArray(userPanelData?.home?.section5Comments)) {
      userPanelData.home.section5Comments = userPanelData.home.section5Comments.map(comment => {
        if (!comment._id) {
          comment._id = new mongoose.Types.ObjectId(); // Generate a valid ObjectId
        }
        return comment;
      });
    }
     // Validate section3Img
     if (Array.isArray(userPanelData?.home?.section3Img)) {
      userPanelData.home.section3Img = userPanelData.home.section3Img.map(image => {
        if (!image._id) {
          image._id = new mongoose.Types.ObjectId(); // Generate a valid ObjectId
        }
        return image;
      });
    }

    // Upsert the document
    const updatedUserPanel = await UserPanel.findOneAndUpdate(
      {}, // Add a filter here if needed
      userPanelData,
      { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json({
      message: 'Data updated successfully!',
      data: updatedUserPanel,
    });
  } catch (error) {
    console.error('Error during upsert:', error.message);
    res.status(500).json({
      message: 'Error updating data',
      error: error.message,
    });
  }
};

const addOrUpdateLinks = async (req, res) => {
  try {
      const UserPanel = req.db.model('UserPanel');
      const { links } = req.body;

      if (!Array.isArray(links)) {
          return res.status(400).json({ message: 'Invalid links format. Must be an array.' });
      }

      // Find the existing UserPanel document (you can add a filter if needed)
      const userPanel = await UserPanel.findOne();
      if (!userPanel) {
          return res.status(404).json({ message: 'User panel not found.' });
      }

      // Update the links
      userPanel.social.links = links;
      await userPanel.save();

      res.status(200).json({
          message: 'Links updated successfully!',
          data: userPanel.social.links,
      });
  } catch (error) {
      console.error('Error updating links:', error.message);
      res.status(500).json({
          message: 'Error updating links.',
          error: error.message,
      });
  }
};

const getLinks = async (req, res) => {
  try {
      const UserPanel = req.db.model('UserPanel');
      const userPanel = await UserPanel.findOne();

      if (!userPanel) {
          return res.status(404).json({ message: 'User panel not found.' });
      }

      res.status(200).json({
          message: 'Links fetched successfully!',
          data: userPanel.social.links,
      });
  } catch (error) {
      console.error('Error fetching links:', error.message);
      res.status(500).json({
          message: 'Error fetching links.',
          error: error.message,
      });
  }
};


module.exports = { getUserPanel, upsertUserPanel ,getLinks,addOrUpdateLinks};
