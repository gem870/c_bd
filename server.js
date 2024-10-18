require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const main_blog_routes = require('./routes/main_blog_routes')
const main_project_routes = require('./routes/main_project_routes')
const message_rout = require('./routes/main_message_routes')
const Connection = require('../backend/config/db')



const app = express();

// meddleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req,path, req.body)
    next()
})

// USING MY ROUTES
app.use('/blog', main_blog_routes)
app.use('/project', main_project_routes)
app.use('/message', message_rout)



const connection = new Connection()
