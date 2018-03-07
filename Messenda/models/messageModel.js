const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessagesSchema = new mongoose.Schema({
    users: [
        {
            sender: { type: mongoose.Schema.Types.ObjectId },
            receiver: { type: mongoose.Schema.Types.ObjectId }
        }
    ],
    messages: [
        {
            messages: { type: String },
            seen: { type: Boolean, default: false }
        }
    ]
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

mongoose.model('Messages', MessagesSchema);

