const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new mongoose.Schema({
    users: {
        sender: { type: mongoose.Schema.Types.ObjectId },
        receiver: { type: mongoose.Schema.Types.ObjectId }
    },
    conversation: [
        {
            messages: { type: String },
            seen: { type: Boolean, default: false },
            time : { type : Date, default: Date.now }
        }
    ]
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

module.exports=mongoose.model('Messages', MessagesSchema);

