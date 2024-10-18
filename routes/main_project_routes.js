const express = require('express');
const multer = require('multer');
const fs = require('fs');
const projectRouts = express.Router();
const controllerClass = require('../service_controller/controller')

// CONNECTED MY CONTROLLER'S FUNCTION TO ROUTER CALLS FOR API

// Configure multer storage (optional, you can customize this)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // Specify the folder where files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);  // Customize file naming
    }
  });
  
  // Initialize multer with storage configuration
const upload = multer({ storage: storage });
  
projectRouts.get('/', controllerClass.getAllPosts)

projectRouts.get('/:id', controllerClass.getSinglePost)

projectRouts.post('/p_upload', upload.single('file'), controllerClass.handleUnifiedPost);

projectRouts.delete('/:id', controllerClass.deletePost)

projectRouts.patch('/:id', controllerClass.patchPost)

module.exports = projectRouts