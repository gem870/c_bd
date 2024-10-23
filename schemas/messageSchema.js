const mongoose = require('mongoose')
const schema = mongoose.Schema

// MY MODEL STRUCTURE OF MY API(MONGODB)

const mssgSchema = new schema({
    name: {
        type: String,
        requireed: true
    },
    email: {
        type: String,
        required: false
    },
    message: {
        type: String,
        requireed: true
    },
}, {timestamps: true});


module.exports = mongoose.model('MESSAGE_SCHEMA', mssgSchema);