const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    downloads: {
        type: Number,
        default: 0
    },
    emailSent: {
        type: Number,
        default: 0
    }
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
