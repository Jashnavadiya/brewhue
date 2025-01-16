
// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const fs = require('fs');
const multer = require('multer');


const userRoutes = require('./routes/userRoutes.js');
const userPanelRotes = require('./routes/UserPanel.routes.js');



const Menu = require('./models/Menu');


const cors = require('cors');
const path = require('path');
const { MongoClient } = require('mongodb');
// Initialize express app
const app = express();

app.use(bodyParser.json());
app.use(cors());

dotenv.config()


// Function to dynamically connect to a database
const connectToDatabase = async (dbName) => {
  const uri = `${process.env.MONGO_URI}${dbName}`;
  const connection = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return connection;
};




// Endpoint to create or access a shop database
// Endpoint to create a new database
app.post('/api/create-database/:shopName', async (req, res) => {
  const shopName = req.params.shopName;

  try {
    const shopDb = await connectToDatabase(shopName);
    loadModels(shopDb)
    // const SampleCollection = shopDb.collection('sampleCollection');
    // await SampleCollection.insertOne({ initialized: true });

    res.status(201).send(`Database "${shopName}" created successfully!`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating database');
  }
});

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


const loadModels = require('./models/dynamicModelLoader');  // Import the loader function

const connections = {};  // Store connections to reuse them

const dbMiddleware = async (req, res, next) => {
  const shopName = req.params.shopName;

  if (!shopName) {
    return res.status(400).send('Shop name is required');
  }

  // Check if a connection to this database already exists
  if (!connections[shopName]) {
    try {
      // Ensure the connection string is constructed correctly
      const uri = `${process.env.MONGO_URI}${shopName}?retryWrites=true&w=majority`;
      console.log(uri);

      const connection = mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Store the connection for reuse
      connections[shopName] = connection;
      console.log(`Connected to database: ${shopName}`);

      // Dynamically load all models and associate them with the current database
      loadModels(connections[shopName]); // This loads all models and associates them
    } catch (err) {
      console.error(`Error connecting to database: ${shopName}`, err);
      return res.status(500).send('Error connecting to database');
    }
  }

  // Attach the connection to the request object
  req.db = connections[shopName];
  next();
};






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


app.use('/api/:shopName/users', dbMiddleware, userRoutes);
app.use('/api/:shopName/shopinfo', dbMiddleware, userPanelRotes);
app.use('/uploads', (req, res, next) => {
  console.log('Serving file:', req.originalUrl);
  next();
}, express.static(path.join(__dirname, 'uploads')));

// app.get('/uploads/:shopName/:fileName', (req, res) => {
//   const filePath = path.join(__dirname, 'uploads', req.params.shopName, req.params.fileName);

//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error('Error serving file:', err.message);
//       res.status(404).send('File not found!');
//     }
//   });
// });


// app.get('/uploads/:shopName/:fileName', (req, res) => {
//   const filePath = path.join(__dirname, 'uploads', req.params.shopName, req.params.fileName);

//   console.log('Serving file from:', filePath);

//   res.sendFile(filePath, (err) => {
//     if (err) {
//       console.error('Error serving file:', err.message);
//       res.status(404).send('File not found!');
//     }
//   });
// });



// Ensure the 'uploads' folder exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Uploads folder created!');
}

// Multer storage configuration

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const shopName = req.params.shopName;
    const dir = path.join(__dirname, 'uploads', shopName);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});



// Multer upload setup
const upload = multer({ storage });

// File upload route
app.post('/:shopName/userpanel/home/upload', dbMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded!' });
    }
    const shopName = req.params.shopName;
    const UserPanel = req.db.model('UserPanel');
    const filePath = `/uploads/${shopName}/${req.file.filename}`;
    const { section, key } = req.body;

    // Determine the field type dynamically
    const fieldType = UserPanel.schema.path(`${section}.${key}`).instance;

    let updateObject;
    if (fieldType === 'Array') {
      updateObject = {
        $push: {
          [`${section}.${key}`]: { img: filePath },
        },
      };
    } else if (fieldType === 'String') {
      updateObject = {
        [`${section}.${key}`]: filePath,
      };
    } else {
      throw new Error('Unsupported field type');
    }

   
    const updatedUserPanel = await UserPanel.findOneAndUpdate(
      {},
      updateObject,
      { new: true }
    );

    res.status(200).send({
      message: 'File uploaded and saved successfully!',
      updatedUserPanel,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send({ error: error.message });
  }
});





app.get('/', (req, res) => {
  res.send('Helosss')
})

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
