module.exports = (app) => {
    const kandidats = require('../controllers/kandidat.controller.js');
    const cors = require('cors');

    // Create a new Note
    app.post('/kandidats', kandidats.create);

    // Login
    app.post('/kandidats/login', kandidats.onLogin);

    // Retrieve all kandidats
    app.get('/kandidats', kandidats.findAll);

    // Searching by name
    app.get('/search', cors(), kandidats.search)

    // Retrieve all kandidats
    app.get('/kandidats/:kandidatId', kandidats.findOne);
    app.get('/kandidats/mail/:emails', kandidats.findOneEmail);


    // Delete Chat
    app.delete('/kandidats/:kandidatId', kandidats.delete)

    // Update Chat
    app.put('/kandidats/:kandidatId', kandidats.update)
}