const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT = 10;

const UserSchema = new Schema({
    username: { type: String, lowercase: true, trim: true, required: true, index: { unique: true } },
    usernameLowerCase:{ type: String, lowercase: true, trim: true, required: true, index: { unique: true } },
    email:{ type: String, required: true },
    googleid:{ type: String, required: true },
    socketid: { type: String },
    urlPicture: { type: String },
    Conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversations' }]
}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

UserSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});


var User = mongoose.model('tblUser', UserSchema);

module.exports = User;