
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    user: { type: String, required: true },
    email: { type: String, required: true } 
});

module.exports = mongoose.model("acount", QuestionSchema);