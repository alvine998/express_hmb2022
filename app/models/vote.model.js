const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const VoteSchema = mongoose.Schema({
    id_user: {type: ObjectId, ref:'user.model'},
    id_kandidat: {type: ObjectId, ref:'kandidat.model'},
    keterangan: String
    }, {
    timestamps: true
});

module.exports = mongoose.model('Vote', VoteSchema);