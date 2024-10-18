const mongoose = require('mongoose')
const schema = mongoose.Schema

// MY MODEL STRUCTURE OF MY API(MONGODB)

const blogSchema = new schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        requireed: true
    },
    mini_discription: {
        type: String,
        required: false
    },
    discription: {
        type: String,
        requireed: true
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: true,
    },
    code: {
        type: String
    }, 
    programeLanguage: {
        type: String,
    }
}, {timestamps: true});


module.exports = mongoose.model('BLOG_SCHEMA', blogSchema);