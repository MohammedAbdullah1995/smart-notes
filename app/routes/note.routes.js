const cors = require('cors');
module.exports = (app) => {

    const notes = require('../controllers/note.controller.js');

    app.post('/notes', cors(), notes.create);

    app.get('/notes', cors(), notes.findAll);

    app.get('/notes/:noteId', cors(), notes.findOne);

    app.post('/notes/:noteId', cors(), notes.update);

    app.delete('/notes/:noteId', cors(), notes.delete);


}