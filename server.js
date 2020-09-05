const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
var port = process.env.PORT || 3000;

const app = express();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successfully connected to the database");
    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now ...',err);
    process.exit();
    
})

app.get('/',(req, res) => {
res.json({"message" : "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

app.options('*', cors());
require('./app/routes/note.routes.js')(app);

app.listen(port,() => {

    console.log("Server is listening on port 3000");
    
})

