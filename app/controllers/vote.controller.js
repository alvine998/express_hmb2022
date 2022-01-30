const Vote = require('../models/vote.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const vote = new Vote({
        id_user: req.body.id_user,
        id_kandidat: req.body.id_kandidat,
        keterangan: req.body.keterangan,
    });

    // Save Note in the database
    vote.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Note."
            });
        });
};


// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Vote.find()
        .then(votes => {
            res.send(votes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Vote.findByIdAndUpdate(req.params.voteId,
        req.body
        , { new: true })
        .then(vote => {
            if (!vote) {
                return res.status(404).send({
                    message: "vote not found with id " + req.params.voteId
                });
            }
            res.send(vote);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "vote not found with id " + req.params.voteId
                });
            }
            return res.status(500).send({
                message: "Error updating vote with id " + req.params.voteId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Vote.findById(req.params.voteId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "vote not found with id " + req.params.voteId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "vote not found with id " + req.params.voteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving vote with id " + req.params.voteId
            });
        });
};

// Find a single note with a noteId
exports.findOneEmail = (req, res) => {
    const username = req.params.username;
    Vote.findOne({ "email": username })
        .then(vote => {
            if (!vote) {
                return res.status(404).send({
                    message: "Email not found with id " + req.params.username
                });
            }
            res.send(vote);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "vote not found with id " + req.params.username
                });
            }
            return res.status(500).send({
                message: "Error retrieving vote with id " + req.params.username
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Vote.findByIdAndRemove(req.params.voteId)
        .then(vote => {
            if (!vote) {
                return res.status(404).send({
                    message: "vote not found with id " + req.params.voteId
                });
            }
            res.send({ message: "vote deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "vote not found with id " + req.params.voteId
                });
            }
            return res.status(500).send({
                message: "Could not delete vote with id " + req.params.voteId
            });
        });
};