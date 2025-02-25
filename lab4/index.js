// Load express, initiate app
const express = require('express');
const app = express();

const PORT = 3000;

// Static files
app.use(express.static('public'));

// Dynamic content routes
let hits = {};  // Initialize hits as an empty object

app.get('/hits/:pageId', (req, res) => {
    const pageHits = (hits[req.params.pageId]||0)+1;
    hits[req.params.pageId] = pageHits;
    res.send((pageHits).toString());  // Send the correct incremented value
});

// Default route
app.all('*', (req, res) => {
    res.status(404).send('Invalid URL.');
});

// Start server
app.listen(PORT, () => console.log("Server is running on http://localhost:"+PORT));
