module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/users', users.create);

    // Login
    app.post('/users/login', users.onLogin);

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve all users
    app.get('/users/:usersId', users.findOne);
    app.get('/users/mail/:emails', users.findOneEmail);


    // Delete Chat
    app.delete('/users/:usersId', users.delete)

    // Update Chat
    app.put('/users/:usersId', users.update)
}