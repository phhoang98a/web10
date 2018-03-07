const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Online = new mongoose.Schema({
    user_id: String,
    connection_id: String
});

mongoose.model('Online', Online);