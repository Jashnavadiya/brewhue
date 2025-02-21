console.log("entered");

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const fs = require('fs');
const multer = require('multer');

const sharp = require('sharp');
const userRoutes = require('./routes/userRoutes.js');
const userPanelRotes = require('./routes/UserPanel.routes.js');
const userALLRoutes = require('./routes/user(All).routes.js');
const UploadRoutes = require("./routes/UploadRoutes");


const Menu = require('./models/Menu');

const storageHelper = require("./utils/storageHelper");

const storageHelperInstance = new storageHelper();

const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
// Initialize express app
const app = express();

app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const connectToDatabase = async (dbName) => {
  const uri = `${process.env.MONGO_URI}${dbName}`;
  const connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
};



// Endpoint to list all databases
app.get('/api/databases', async (req, res) => {
  try {
    const client = new MongoClient(`${process.env.MONGO_URI}`, { useUnifiedTopology: true });
    await client.connect();


    const adminDb = client.db().admin();
    const databases = await adminDb.listDatabases();
    res.json(databases.databases.map((db) => db.name));

    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching database list');
  }
});
app.get('/api/check-database/:shopName', async (req, res) => {
  const shopName = req.params.shopName;

  try {
    const client = new MongoClient(`${process.env.MONGO_URI}`, { useUnifiedTopology: true });
    await client.connect();

    const adminDb = client.db().admin();
    const databases = await adminDb.listDatabases();

    const dbExists = databases.databases.some(db => db.name === shopName);

    if (dbExists) {
      res.status(200).send(`Database "${shopName}" exists!`);
    } else {
      res.status(404).send(`Database "${shopName}" does not exist.`);
    }

    await client.close();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error checking database');
  }
});

const bcrypt = require('bcryptjs');


const loadModels = require('./models/dynamicModelLoader');  // Import the loader function
const { log } = require('console');

const connections = {};  // Store connections to reuse them
const dbMiddleware = require("./middleware/dbMiddleware");

// Middleware to check if the shop exists in the current database
const checkShopExists = async (req, res, next) => {
  const shopName = req.params.shopName;
  try {
    const Shop = req.db.model('Shop'); // Dynamically get the Shop model
    const shop = await Shop.findOne({ name: shopName });

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Attach the shop to the request object for later use
    req.shop = shop;
    next();
  } catch (err) {
    console.error('Error checking shop existence:', err);
    res.status(500).json({ error: 'Error checking shop existence' });
  }
};

app.post('/api/:shopName/shop', dbMiddleware, async (req, res) => {
  const { name, profile, bgPhoto, bgcolor } = req.body;
  const shopName = req.params.shopName;

  try {
    const Shop = req.db.model('Shop'); // Dynamically get the Shop model

    // Check if the shop already exists
    const existingShop = await Shop.findOne({ name: shopName });
    if (existingShop) {
      return res.status(400).json({ error: 'Shop already exists' });
    }

    // Create the new shop
    const newShop = new Shop({ name, profile, bgPhoto, bgcolor });
    await newShop.save();
    res.status(201).json(newShop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/:shopName/shop', dbMiddleware, checkShopExists, async (req, res) => {
  try {
    // The shop data is already attached to req.shop in the middleware
    res.status(200).json(req.shop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/:shopName/shop', dbMiddleware, checkShopExists, async (req, res) => {
  const { profile, bgPhoto, bgcolor } = req.body;

  try {
    const Shop = req.db.model('Shop'); // Dynamically get the Shop model

    // Update the shop information
    const updatedShop = await Shop.findOneAndUpdate(
      { name: req.params.shopName },
      { profile, bgPhoto, bgcolor },
      { new: true }
    );

    res.status(200).json(updatedShop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.use('/uploads', (req, res, next) => {
  console.log('Serving file:', req.originalUrl);
  next();
}, express.static(path.join(__dirname, 'uploads')));



const storage1 = multer.memoryStorage();
const upload1 = multer({ storage1 }).single("image");
app.post('/api/create-database/:shopName', upload1, async (req, res) => {
  const shopName = req.params.shopName.trim();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  try {
    // Ensure upload directory exists
    // const shopDir = path.join(__dirname, 'uploads', 'shops');
    // ensureDirectoryExists(shopDir);
    if (!req.file)
      return res.status(400).json({
          success: false,
          status: "fail",
          message: "No files found.",
          data: null,
      });
    // Convert image to WebP format
    if (req.file) {

      const webpBuffer = await sharp(req.file.buffer)
      .webp() // Convert to WebP format
      .toBuffer(); // Return the buffer
      console.log("hi");

      // Upload the processed WebP image
      file = await storageHelperInstance.uploadFile({
        buffer: webpBuffer,
        originalname: `${shopName}.webp`,// Update extension to .webp
        mimetype: 'image/webp',
      }, "shops");

      console.log("File uploaded:", file);
    }
    const imageUrl = file.url

    const shopDb = await connectToDatabase(shopName); // Replace with actual database connection logic
    loadModels(shopDb); // Ensure models are loaded

    const User = shopDb.model('User');
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists in the shop database' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role: 'admin', image: imageUrl });
    const savedUser = await user.save();

    res.status(201).json({
      message: `Database "${shopName}" created successfully!`,
      adminUser: savedUser,
      imageUrl,
    });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Error creating database or user', details: err.message });
  }
});


app.use("/api/v1/file", UploadRoutes);
app.use('/api/:shopName/users', dbMiddleware, userRoutes);
app.use('/api/:shopName/shopinfo', dbMiddleware, userPanelRotes);
app.use('/api', dbMiddleware, userALLRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
})


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
