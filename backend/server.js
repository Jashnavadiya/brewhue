
// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Shop = require('./models/Shop');
const Menu = require('./models/Menu');
const Widget = require('./models/Widget');
const cors = require('cors');
const path= require('path');
const { MongoClient } = require('mongodb');
// Initialize express app
const app = express();

app.use(bodyParser.json());
app.use(cors());




// Function to dynamically connect to a database
const connectToDatabase = async (dbName) => {
    const uri = `mongodb+srv://jashnavadiya8:Asdf1234@cluster0.zebzdmi.mongodb.net/${dbName}`;
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
      const SampleCollection = shopDb.collection('sampleCollection');
      await SampleCollection.insertOne({ initialized: true });
  
      res.status(201).send(`Database "${shopName}" created successfully!`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating database');
    }
  });
  
  // Endpoint to list all databases
  app.get('/api/databases', async (req, res) => {
    try {
      const client = new MongoClient(`mongodb+srv://jashnavadiya8:Asdf1234@cluster0.zebzdmi.mongodb.net/`, { useUnifiedTopology: true });
      await client.connect();
        console.log("hi");
        
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
        const uri = `mongodb+srv://jashnavadiya8:Asdf1234@cluster0.zebzdmi.mongodb.net/${shopName}`;
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

// Routes for Menu
app.post('/api/menus', async (req, res) => {
    try {
        const menu = new Menu(req.body);
        const savedMenu = await menu.save();
        res.status(201).json(savedMenu);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/menus', async (req, res) => {
    try {
        const menus = await Menu.find();
        res.status(200).json(menus);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Create a new Widget
app.post('/api/:shopName/widgets', dbMiddleware, async (req, res) => {
    try {
      const WidgetModel = req.db.model('Widget'); // Use the dynamically associated Widget model
      const widget = new WidgetModel(req.body);
      const savedWidget = await widget.save();
      res.status(201).json(savedWidget);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get all Widgets
  app.get('/api/:shopName/widgets', dbMiddleware, async (req, res) => {
    try {
      const WidgetModel = req.db.model('Widget'); // Use the dynamically associated Widget model
      const widgets = await WidgetModel.find();
      res.status(200).json(widgets);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Get a single Widget by ID
  app.get('/api/:shopName/widgets/:id', dbMiddleware, async (req, res) => {
    try {
      const WidgetModel = req.db.model('Widget'); // Use the dynamically associated Widget model
      const widget = await WidgetModel.findById(req.params.id);
      if (!widget) {
        return res.status(404).json({ error: 'Widget not found' });
      }
      res.status(200).json(widget);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Update a Widget by ID
  app.put('/api/:shopName/widgets/:id', dbMiddleware, async (req, res) => {
    try {
      
      const updatedWidget = await WidgetModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedWidget) {
        return res.status(404).json({ error: 'Widget not found' });
      }
      res.status(200).json(updatedWidget);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Delete a Widget by ID
  app.delete('/api/:shopName/widgets/:id', dbMiddleware, async (req, res) => {
    try {
      const WidgetModel = req.db.model('Widget'); // Use the dynamically associated Widget model
      const deletedWidget = await WidgetModel.findByIdAndDelete(req.params.id);
      if (!deletedWidget) {
        return res.status(404).json({ error: 'Widget not found' });
      }
      res.status(200).json({ message: 'Widget deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });



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
  



  app.use(express.static(path.join(__dirname,"../frontend/build")));

  app.get('/*',(req,res)=>{
      res.sendFile(path.join(__dirname,"../frontend","build","index.html"))
  })
app.get('/',(req,res)=>{
    res.send('Helosss')
})

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
