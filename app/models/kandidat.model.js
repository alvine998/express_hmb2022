const mongoose = require('mongoose');

const KandidatSchema = mongoose.Schema({
    nama: String,
    foto: String,
    keterangan: String,
    visi: String,
    misi:String,
    jumlah_suara: Number,
    }, {
    timestamps: true
});

module.exports = mongoose.model('Kandidat', KandidatSchema);