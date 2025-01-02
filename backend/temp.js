// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const dotenv=require('dotenv')
// dotenv.config()

// const authRotes=require('./routes/authRoutes.js')
// const menuRoutes=require('./routes/menuRoutes.js')
// const shopRoutes=require('./routes/shopRoutes.js')
// const widgetRoutes=require('./routes/widgetRoutes.js')

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());
// app.get('/',(req,res)=>{
//     res.send('Hello, World!');
// })

// // Routes
// app.use('/api/auth', authRotes);

// app.use('/api/shop', shopRoutes);
// app.use('/api/widgets', widgetRoutes);
// app.use('/api/menus', menuRoutes);

// // Start the server
// app.listen(PORT, () => {
//     connectDB()
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Shop = require('./models/Shop');
const Menu = require('./models/Menu');
const Widget = require('./models/Widget');
const cors = require('cors');
const { MongoClient } = require('mongodb');
// Initialize express app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://jashnavadiya8:Asdf1234@cluster0.zebzdmi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0enso', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes for Shop
// app.post('/api/shops', async (req, res) => {
//     try {
//         const shop = new Shop(req.body);
//         const savedShop = await shop.save();
//         res.status(201).json(savedShop);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });



// app.get('/api/shops/:id', async (req, res) => {
//   const namei = req.params.id;




//   try {
//     const shop = await Shop.findOne({ name: namei })
//       .populate({ path: 'menu', select: 'name price' }) // Select only required fields
//       .populate({ path: 'widgets', select: 'type color' });

//     if (!shop) {
//       return res.status(404).json({ error: 'Shop not found' });
//     }

//     res.status(200).json(shop);
//   } catch (err) {
//     console.error('Error fetching shop:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.put('/api/shops/:id', async (req, res) => {
//     try {
//         const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.status(200).json(updatedShop);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// app.delete('/api/shops/:id', async (req, res) => {
//     try {
//         await Shop.findByIdAndDelete(req.params.id);
//         res.status(204).send();
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });



// // Associate Menu/Widget with Shop
// app.post('/api/shops/:id/menu', async (req, res) => {
//     try {
//         const menu = new Menu(req.body);
//         const savedMenu = await menu.save();

//         const shop = await Shop.findById(req.params.id);
//         shop.menu.push(savedMenu._id);
//         await shop.save();

//         res.status(201).json(savedMenu);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });

// app.post('/api/shops/:id/widget', async (req, res) => {
//     try {
//         const widget = new Widget(req.body);
//         const savedWidget = await widget.save();

//         const shop = await Shop.findById(req.params.id);
//         shop.widgets.push(savedWidget._id);
//         await shop.save();

//         res.status(201).json(savedWidget);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// });



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
  


// MongoDB connection pool to reuse connections for multiple databases
const connections = {};

// Middleware to dynamically connect to the database
const dbMiddleware = async (req, res, next) => {
  const shopName = req.params.shopName;

  if (!shopName) {
    return res.status(400).send('Shop name is required');
  }

  // Check if a connection to this database already exists
  if (!connections[shopName]) {
    try {
      const connection = mongoose.createConnection('mongodb+srv://jashnavadiya8:Asdf1234@cluster0.zebzdmi.mongodb.net/', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Store the connection for reuse
      connections[shopName] = connection;
      console.log(`Connected to database: ${shopName}`);
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

// Routes for Widget
app.post('/api/:shopName/widgets', dbMiddleware,async (req, res) => {
    try {
        const widget = new Widget(req.body);
        const savedWidget = await widget.save();
        res.status(201).json(savedWidget);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/:shopName/widgets', dbMiddleware, async (req, res) => {
    try {
      // Dynamically define the Widget model based on the current database connection
      
  
      const widgets = await Widget.find(); // Now this uses the correct connection
      res.status(200).json(widgets);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
// // Example: Create a collection and add data
// app.post('/api/:shopName/add-data', dbMiddleware, async (req, res) => {
//   try {
//     const { collectionName, data } = req.body;
//     if (!collectionName || !data) {
//       return res.status(400).send('Collection name and data are required');
//     }

//     const collection = req.db.collection(collectionName);
//     await collection.insertOne(data);

//     res.status(201).send('Data added successfully');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error adding data');
//   }
// });

// // Example: Fetch data from a collection
// app.get('/api/:shopName/get-data/:collectionName', dbMiddleware, async (req, res) => {
//   try {
//     const { collectionName } = req.params;
//     const collection = req.db.collection(collectionName);

//     const data = await collection.find({}).toArray();
//     res.json(data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching data');
//   }
// });

// // Example: List all collections in a database
// app.get('/api/:shopName/collections', dbMiddleware, async (req, res) => {
//   try {
//     const collections = await req.db.listCollections().toArray();
//     res.json(collections.map((col) => col.name));
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching collections');
//   }
// });

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
