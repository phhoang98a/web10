const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true } 
});

module.exports = mongoose.model("user", userSchema);