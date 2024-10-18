const express = require('express');
const main_message_routes = express.Router();
const controllerClass = require('../service_controller/controller')



// Routes
main_message_routes.get('/', controllerClass.getAllPosts);  // Get all blog posts
main_message_routes.get('/:id', controllerClass.getSinglePost);  // Get a single blog post by ID
main_message_routes.post('/upload', controllerClass.handleUnifiedPost);  // Create a new post with an image upload
main_message_routes.delete('/:id', controllerClass.deletePost);  // Delete a blog post
main_message_routes.patch('/:id', controllerClass.patchPost);  // Update a blog post

module.exports = main_message_routes;
