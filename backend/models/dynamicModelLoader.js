const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Dynamically load all models from the 'models' directory
const loadModels = (dbConnection) => {
  const modelsDir = path.join(__dirname, './'); // Adjust the path as needed
  const files = fs.readdirSync(modelsDir);
  
  // Loop through all model files and load them dynamically
  files.forEach(file => {
    const filePath = path.join(modelsDir, file);
    
    // Only load JavaScript files that are models (you can refine this if needed)
    if (file.endsWith('.js') && file !== 'dynamicModelLoader.js') {
      const model = require(filePath);
      // Associate the model with the dbConnection
      dbConnection.model(model.modelName, model.schema);
    }
  });
};

module.exports = loadModels;
