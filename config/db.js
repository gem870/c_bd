require('dotenv').config();
const mongoose = require('mongoose');

class MongoConnection {
    constructor() {
        this._connect();
    }

    _connect() {
        if (!MongoConnection.instance) {
            const mongoUri = process.env.MONGO_URI;

            if (!mongoUri || typeof mongoUri !== 'string') {
                console.error('MongoDB URI is invalid or not set in the environment variables.');
                return;
            }

            mongoose.connect(mongoUri)
                .then(() => {
                    console.log('Database connected successfully');
                })
                .catch(err => {
                    console.error('Database connection error:', err);
                });

            MongoConnection.instance = this;
        }
        return MongoConnection.instance;
    }
}

module.exports = new MongoConnection();
