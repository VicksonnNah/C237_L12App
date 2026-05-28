// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Declare any necessary variables or in-memory data structures here
let notes = [];
let nextNoteId = 1;

// TASK: Define appropriate routes below
// ---------------------------------------------------

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index');
});

// ---------------------------------------------------
//Define route to render the view notes page
app.get('/viewNotes', (req, res) => {
    // Pass the notes data to the viewNotes template for rendering
    res.render('viewNotes', { notes });
});

// ---------------------------------------------------

//Define route to render the add notes page
app.get('/add-notes', (req, res) => {
    res.render('addNotes');
});

// ---------------------------------------------------

//Define route to render the update notes page
app.get('/update-notes/:id', (req, res) => {
    const note = notes.find(note => note._id === Number(req.params.id));

    if (!note) {
        return res.status(404).send('Note not found');
    }

    res.render('updateNotes', { note });
});

// ---------------------------------------------------

//Define route to handle the form submission for adding notes
app.post('/add-notes', (req, res) => {
    // Handle form submission and add the note to your data structure
    // You can access form data using req.body
    const note = {
        _id: nextNoteId++,
        title: req.body.title,
        content: req.body.content
    };

    notes.push(note);
    res.redirect('/viewNotes'); // Redirect to view notes page after adding
});

// ---------------------------------------------------

//Define route to handle the form submission for updating notes
app.post('/update-notes/:id', (req, res) => {
    // Handle form submission and update the note in your data structure
    // You can access form data using req.body and the note ID using req.params.id
    const note = notes.find(note => note._id === Number(req.params.id));

    if (!note) {
        return res.status(404).send('Note not found');
    }

    note.title = req.body.title;
    note.content = req.body.content;
    res.redirect('/viewNotes'); // Redirect to view notes page after updating
});

// ---------------------------------------------------
// Define route to handle the deletion of a note
app.post('/delete-notes/:id', (req, res) => {
    // Handle the deletion of the note from your data structure using req.params.id
    notes = notes.filter(note => note._id !== Number(req.params.id));
    res.redirect('/viewNotes'); // Redirect to view notes page after deletion
});




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
