module.exports = (app) => {
    const votes = require('../controllers/vote.controller.js');

    // Create a new Note
    app.post('/votes', votes.create);

    // Retrieve all votes
    app.get('/votes', votes.findAll);

    // Retrieve all votes
    app.get('/votes/:voteId', votes.findOne);
    app.get('/votes/mail/:emails', votes.findOneEmail);


    // Delete Chat
    app.delete('/votes/:voteId', votes.delete)

    // Update Chat
    app.put('/votes/:voteId', votes.update)
}