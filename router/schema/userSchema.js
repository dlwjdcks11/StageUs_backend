const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    id: "string",
    pw: "string",
})

module.exports = mongoose.model('user', userSchema);