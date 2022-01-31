const Users = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Note
    const users = new Users({
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        status_user: req.body.status_user || '1',
        keterangan: req.body.keterangan || 'belum memilih',
    });

    // Save Note in the database
    users.save()
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
        const users = await Users.find(searchParams)
        if (!users) {
            throw Error('error, not found')
        } else {
            res.status(200).json(users)
        }
    } catch (err) {
        res.status(400).json({ msg: err })
    }
}

exports.findNot = (req, res) => {
    Users.find({ status_user: 1 }).then(
        users => {
            res.send(users)
        }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
}
exports.onLogin = (req, res) => {
    Users.findOne({ username: req.body.username })
        .then(userss => {
            if (!userss) {
                return res.status(404).send({
                    message: "User not found with email "
                });
            } else {
                if (req.body.password == userss.password) {
                    return res.status(200).send({
                        message: "Login Ok"
                    });
                } else {
                    return res.status(500).send({
                        message: "Username atau Password Salah"
                    });
                }

                //  req.body.password,(err, result) => {
                //     if (result == true) {
                //         res.status(200).send({ Success: "Login Ok" })
                //     } else {
                //         res.status(500).send({ Failed: "Email or Password Wrong" })
                //     }
                // }
            }
        })
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Users.find()
        .then(userss => {
            res.send(userss);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    Users.findByIdAndUpdate(req.params.usersId,
        req.body
        , { new: true })
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send(users);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Error updating users with id " + req.params.usersId
            });
        });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Users.findById(req.params.usersId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Error retrieving users with id " + req.params.usersId
            });
        });
};

// Find a single note with a noteId
exports.findOneEmail = (req, res) => {
    const username = req.params.username;
    Users.findOne({ "username": username })
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "Email not found with id " + req.params.username
                });
            }
            res.send(users);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.username
                });
            }
            return res.status(500).send({
                message: "Error retrieving users with id " + req.params.username
            });
        });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Users.findByIdAndRemove(req.params.usersId)
        .then(users => {
            if (!users) {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            res.send({ message: "users deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "users not found with id " + req.params.usersId
                });
            }
            return res.status(500).send({
                message: "Could not delete users with id " + req.params.usersId
            });
        });
};