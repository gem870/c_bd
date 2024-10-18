
const mongoose = require('mongoose')
const schema = mongoose.Schema

// MY MODEL STRUCTURE OF MY API(MONGODB)

const project_schema = new schema({
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('PROJECT_SCHEMA', project_schema)