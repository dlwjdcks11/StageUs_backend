const mongoose = require('mongoose');
const logSchema = mongoose.Schema({
    name: "string",
}, { timestamps: { currentTime: () => new Date(new Date().getTime() + (9 * 60 * 60 * 1000))}})

module.exports = mongoose.model('log', logSchema);