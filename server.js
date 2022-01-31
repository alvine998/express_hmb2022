const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Server Work"});
});

// Configuring the database
const dbConfig = require('./configs/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

global.__basedir = __dirname;

// Require Notes routes
require('./app/routes/user.routes.js')(app);
require('./app/routes/kandidat.routes.js')(app);
require('./app/routes/vote.routes.js')(app);
require('./app/routes/image.routes.js')(app);


const dirname = path.resolve();
app.use("/resources/uploads/", express.static(path.join(dirname, "/resources/uploads/")));

// listen for requests
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});