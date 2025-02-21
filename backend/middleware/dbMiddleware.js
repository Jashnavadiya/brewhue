const loadModels = require('../models/dynamicModelLoader');  // Import the loader function

const connections = {};  // Store connections to reuse them
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');

const dbMiddleware = async (req, res, next) => {
    // const shopName = req.params.shopName;
    const useUserDB = req.path.endsWith('/userall'); // Check if the route is user-related
    const hi = req.params.shopName
  
    const shopName = useUserDB ? 'user' : hi; // Use 'user' database for user-related operations
  
    if (!shopName) {
      return res.status(400).send('Shop name is required');
    }
    console.log(`${process.env.MONGO_URI}`);
    
    try {
      // Check if a connection to this database already exists
      if (!connections[shopName]) {
        // Connect to the MongoDB server (without specifying a database)
        const client = new MongoClient(`${process.env.MONGO_URI}`, { useUnifiedTopology: true });
        await client.connect();
  
        const adminDb = client.db().admin();
        const databases = await adminDb.listDatabases();
  
        const dbExists = databases.databases.some(db => db.name === shopName);
  
        if (!dbExists) {
          await client.close();
          return res.status(404).send(`Database "${shopName}" does not exist.`);
        }
  
        // If the database exists, create the connection
        const uri = `${process.env.MONGO_URI}${shopName}?retryWrites=true&w=majority`;
        const connection = mongoose.createConnection(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
  
        // Store the connection for reuse
        connections[shopName] = connection;
        console.log(`Connected to database: ${shopName}`);
  
        // Dynamically load all models and associate them with the current database
        loadModels(connections[shopName]); // This loads all models and associates them
  
        await client.close();
      }
  
      // Attach the connection to the request object
      req.db = connections[shopName];
      next();
    } catch (err) {
      console.error(`Error connecting to database: ${shopName}`, err);
      res.status(500).send('Error connecting to database');
    }
  };
  module.exports =dbMiddleware