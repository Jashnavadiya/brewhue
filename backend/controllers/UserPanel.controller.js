// const UserPanel = require('../models/UserPanel');
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");
// Get user panel data
const getUserPanel = async (req, res) => {
  try {
   
    
    
    const UserPanel = req.db.model('UserPanel');
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




const generateVCard = (req, res) => {
  const shopName = req.params.shopName;  // Access shopName from the route parameter
  console.log("Shop Name from Params:", shopName);  // Ensure it's logged correctly

  const { name, phone, email, address, website } = req.body;

  if (!name || !phone || !email || !address || !website) {
    return res.status(400).send({ message: 'All fields are required.' });
  }

  // Create vCard content
  const vCardContent = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
ADR;TYPE=HOME:${address}
URL:${website}
END:VCARD
`;

  // Ensure shopName is provided
  if (!shopName) {
    return res.status(400).send({ message: 'Shop name is missing.' });
  }

  const fileName = `${shopName}.vcf`;
  const uploadsDir = path.join(__dirname, '../uploads', shopName);  // Path to shop's directory
  const filePath = path.join(uploadsDir, fileName);  // Full file path

  console.log("Uploads Directory Path:", uploadsDir);  // Log the uploads directory path
  console.log("File Path to be created:", filePath);  // Log the full path where the file should be saved

  // Check if directory exists
  if (!fs.existsSync(uploadsDir)) {
    console.log(`Directory does not exist, creating: ${uploadsDir}`);
    try {
      fs.mkdirSync(uploadsDir, { recursive: true });  // Create the directory recursively
    } catch (err) {
      console.error('Error creating directory:', err);
      return res.status(500).send('Failed to create directory.');
    }
  }

  // Test if the directory was created properly
  if (fs.existsSync(uploadsDir)) {
    console.log('Directory created successfully');
  } else {
    console.error('Failed to create directory');
    return res.status(500).send('Directory creation failed.');
  }

  // Write the vCard to a file
  fs.writeFile(filePath, vCardContent, (err) => {
    if (err) {
      console.error('Error writing vCard file:', err);
      return res.status(500).send('Failed to generate vCard');
    }

    // Log success and send the file path
    console.log(`vCard created at ${filePath}`);
    res.status(200).send({
      message: 'vCard generated successfully!',
      filePath: `../uploads/${shopName}/${fileName}`,  // Send the relative path to frontend
    });
  });
};



module.exports = { getUserPanel, upsertUserPanel, getLinks, addOrUpdateLinks, generateVCard };
