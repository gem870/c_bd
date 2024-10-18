const express = require('express');
const multer = require('multer');
const fs = require('fs');
const main_blog_routes = express.Router();
const controllerClass = require('../service_controller/controller')

// Set up multer storage for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');  // Store files in the 'uploads/' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);  // Rename files with a timestamp
    }
});

// Ensure uploads directory exists
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Initialize multer
const upload = multer({ storage: storage });

// Routes
main_blog_routes.get('/', controllerClass.getAllPosts);  // Get all blog posts
main_blog_routes.get('/:id', controllerClass.getSinglePost);  // Get a single blog post by ID
main_blog_routes.post('/upload', upload.single('file'), controllerClass.handleUnifiedPost);  // Create a new post with an image upload
main_blog_routes.delete('/:id', controllerClass.deletePost);  // Delete a blog post
main_blog_routes.patch('/:id', controllerClass.patchPost);  // Update a blog post

module.exports = main_blog_routes;
