// controllers/UnifiedController.js
const Message = require('../schemas/messageSchema');
const Project = require('../schemas/project_schema');
const Blog = require('../schemas/blog_schema');
const mongoose = require('mongoose');

class Controller {
  async handleUnifiedPost(req, res) {
    try {
      const { type, title, mini_discription, discription, mediaType, code, programeLanguage } = req.body;

      // Handle the 'message' type
      if (type === 'message') {
        const newMessage = new Message(req.body);
        await newMessage.save();
        return res.status(201).json({ message: 'Message created successfully', data: newMessage });
      } 
      // Handle the 'blog' type
      else if (type === 'blog') {
        // Handle file upload (image)
        const fileUrl = req.file ? req.file.path : null;

        const blogData = {
          title,
          mini_discription,
          discription,
          mediaType,
          code,
          programeLanguage,
          file: fileUrl
        };

        // Validate required fields
        if (!title) return res.status(400).json({ error: 'Title is required' });
        if (!discription) return res.status(400).json({ error: 'Description is required' });

        const newBlog = new Blog(blogData);
        await newBlog.save();
        return res.status(201).json({ message: 'Blog created successfully', data: newBlog });
      } 
      // Handle the 'project' type
      else if (type === 'project') {
        // Handle file upload (image)
        const fileUrl = req.file ? req.file.path : null;

        const projectData = {
          title,
          discription,
          url,
          file: fileUrl
        };

        // Validate required fields
        if (!title) return res.status(400).json({ error: 'Title is required' });
        if (!discription) return res.status(400).json({ error: 'Description is required' });

        const newProject = new Project(projectData);
        await newProject.save();
        return res.status(201).json({ message: 'Project created successfully', data: newProject });
      } 
      // Invalid type case
      else {
        return res.status(400).json({ error: 'Invalid type specified' });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method to get all blog posts
  getSchema(type) {
    switch (type) {
      case 'message':
        return Message;
      case 'project':
        return Project;
      case 'blog':
        return Blog;
      default:
        throw new Error('Invalid type');
    }
  }

  // Get all posts based on schema type
  async getAllPosts(req, res) {
    try {
      const { type } = req.params;  // Pass the schema type in the route
      const Schema = this.getSchema(type);
      const allPosts = await Schema.find({}).sort({ createdAt: -1 });
      return res.status(200).json(allPosts);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Get a single post by ID based on schema type
  async getSinglePost(req, res) {
    try {
      const { type, id } = req.params;
      const Schema = this.getSchema(type);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const post = await Schema.findById(id);
      if (!post) return res.status(404).json({ error: "No post found" });
      return res.status(200).json(post);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Delete a post by ID based on schema type
  async deletePost(req, res) {
    try {
      const { type, id } = req.params;
      const Schema = this.getSchema(type);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const deletedPost = await Schema.findByIdAndDelete(id);
      if (!deletedPost) return res.status(404).json({ error: "No post found to delete" });
      return res.status(200).json(deletedPost);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // Update a post by ID based on schema type
  async patchPost(req, res) {
    try {
      const { type, id } = req.params;
      const Schema = this.getSchema(type);

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const updatedPost = await Schema.findByIdAndUpdate(id, { ...req.body }, { new: true });
      if (!updatedPost) return res.status(404).json({ error: "No post found to update" });
      return res.status(200).json(updatedPost);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new Controller();
