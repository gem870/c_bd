require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

class MongoConnection {
    constructor() {
        this._connect();
    }

    _connect() {
        return new Promise((resolve, reject) => {
            const mongoUri = process.env.MONGO_URI;

            if (!mongoUri || typeof mongoUri !== 'string') {
                console.error('MongoDB URI is invalid or not set in the environment variables.');
                reject('Invalid Mongo URI');
                return;
            }

            mongoose.connect(mongoUri)
                .then(() => {
                    console.log('Database connected successfully');
                    resolve();  // Resolve the promise once the connection is successful
                })
                .catch(err => {
                    console.error('Database connection error:', err);
                    reject(err);  // Reject the promise if the connection fails
                });
        });
    }
}

const app = express();
app.use(express.json());

// Define your routes here
app.post('/api/example', (req, res) => {
    res.send({ message: 'API is working' });
});

// Start the MongoDB connection and server
const mongoConnection = new MongoConnection();

mongoConnection._connect()
    .then(() => {
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to connect to the database. Server not started.', err);
    });
