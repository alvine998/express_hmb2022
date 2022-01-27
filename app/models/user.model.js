const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nama: String,
    username: String,
    password: String,
    status_user: String,
    keterangan: String
    }, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);