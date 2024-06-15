const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    CreatedAt: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending', 'Reject'],
        required: true,
        //laptop getting hange very highly
    },
    slug: {
        type: String,
    }
});


BlogSchema.pre('save', async (next) => {
    this.slug = `Here is the slug For you withouth Libraries ---> 
    ${this.title} - ${this.category}`
});

module.exports = mongoose.model('blog', BlogSchema);