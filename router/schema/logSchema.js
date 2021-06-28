const mongoose = require('mongoose');
const logSchema = mongoose.Schema({
    apiName: "string",
    description: "string",
    id: "string",
    pw: "string",
    name: "string",
    email: "string",
    phone: "string",
    address: "string",
    stuNum: "string",
    school: "string",
    loginSuccess: "boolean",
}, { timestamps: { currentTime: () => new Date(new Date().getTime() + (9 * 60 * 60 * 1000))}})

module.exports = mongoose.model('UserLog', logSchema);