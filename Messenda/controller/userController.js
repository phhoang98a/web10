const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

let authen = function (username, password, cb) {
    userModel.findOne({ username: username }, (err, data) => {
        if (err) console.error(err);
        else if (!data) {
            var err = new Error('User not found');
            err.status = 401;
            cb(err);
        } else if (data) {
            bcrypt.compare(password, data.password, (err, isMatch) => {
                if (isMatch === true) return cb(null, {
                    isMatch: isMatch,
                    user: data
                });
                var err = new Error('Wrong password');
                cb(err);
            });
        }
    });
}

let create = (data, cb) => {
    userModel.create(data, (err, res) => {
        if (err) cb(err);
        cb(null, res);
    });
}

let getAll = (cb) => {
    userModel.find({}, (err, res) => {
        if (err) cb(err);
        cb(null, res);
    });
}

let getById = (id, cb) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        userModel.findById(id, (err, res) => {
            if (err) throw err;
            if (res) {
                cb(null, res);
            } else {
                cb(null, '404 not found');
            }
        });
    } else {
        cb(null, '404 not found');
    }
}

let update = (data, cb) => {
    userModel.findById(data._id, (err, res) => {
        if (err) cb(err);
        if (!res._id) cb(null, 'Not Found');
        for (let key in res) {
            if (data[key]) {
                res[key] = data[key];
            }
        }
        res.save((err, res1) => {
            if (err) cb(err);
            cb(null, res1);
        });
    });
}

let findByUsername = (data, cb) =>{
    userModel.findOne({username : data}, (err, res) =>{
        if(err) console.error(err);
        cb(null, res);
    });
}

let isAuthen = (req, res, next) =>{
    if(req.session.user){
        return next();
    }
    res.redirect('/');
}


module.exports = {
    authen,
    create,
    getAll,
    getById,
    isAuthen,
    findByUsername
}