const Kandidat = require('../models/kandidat.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const kandidat = new Kandidat({
        nama: req.body.nama,
        foto: req.body.foto,
        keterangan: req.body.keterangan,
        visi: req.body.visi,
        misi: req.body.misi,
        jumlah_suara: req.body.jumlah_suara || 0,
    });

    // Save Note in the database
    kandidat.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};

exports.search = async (req, res) => {
    try {
        const searchParams = req.query
        console.log(searchParams)
        const kandidat = await Kandidat.find(searchParams)
        if (!kandidat) {
            throw Error('error, not found')
        } else {
            res.status(200).json(kandidat)
        }
    } catch (err) {
        res.status(400).json({ msg: err })
    }
}

exports.onLogin = (req, res) => {
    Kandidat.findOne({ username: req.body.username })
        .then(kandidat => {
            if (!kandidat) {
                return res.status(404).send({
                    message: "User not found with email "
                });
            } else {
                bcrypt.compare(req.body.password, kandidat.password, (err, result) => {
                    if (result == true) {
                        res.status(200).send({ Success: "Login Ok" })
                    } else {
                        res.status(500).send({ Failed: "Email or Password Wrong" })
                    }
                })
            }
        })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Kandidat.find()
        .then(kandidats => {
            res.send(kandidats);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Kandidat.findByIdAndUpdate(req.params.kandidatId,
        req.body
        , { new: true })
        .then(kandidat => {
            if (!kandidat) {
                return res.status(404).send({
                    message: "kandidat not found with id " + req.params.kandidatId
                });
            }
            res.send(kandidat);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "kandidat not found with id " + req.params.kandidatId
                });
            }
            return res.status(500).send({
                message: "Error updating kandidat with id " + req.params.kandidatId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Kandidat.findById(req.params.kandidatId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "kandidat not found with id " + req.params.kandidatId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "kandidat not found with id " + req.params.kandidatId
                });
            }
            return res.status(500).send({
                message: "Error retrieving kandidat with id " + req.params.kandidatId
            });
        });
};

// Find a single note with a noteId
exports.findOneEmail = (req, res) => {
    const username = req.params.username;
    Kandidat.findOne({ "email": username })
        .then(kandidat => {
            if (!kandidat) {
                return res.status(404).send({
                    message: "Email not found with id " + req.params.username
                });
            }
            res.send(kandidat);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "kandidat not found with id " + req.params.username
                });
            }
            return res.status(500).send({
                message: "Error retrieving kandidat with id " + req.params.username
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Kandidat.findByIdAndRemove(req.params.kandidatId)
        .then(kandidat => {
            if (!kandidat) {
                return res.status(404).send({
                    message: "kandidat not found with id " + req.params.kandidatId
                });
            }
            res.send({ message: "kandidat deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "kandidat not found with id " + req.params.kandidatId
                });
            }
            return res.status(500).send({
                message: "Could not delete kandidat with id " + req.params.kandidatId
            });
        });
};