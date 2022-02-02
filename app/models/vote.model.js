const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const VoteSchema = mongoose.Schema({
    id_user: String,
    id_kandidat: String,
    keterangan: String
    }, {
    timestamps: true
});

module.exports = mongoose.model('Vote', VoteSchema);