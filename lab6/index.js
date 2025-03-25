const express = require('express'); // load express module
const nedb = require("nedb-promises"); // load nedb module

const app = express(); // init app
const db = nedb.create('myfile.jsonl'); // init db

app.use(express.static('public')); // enable static routing hiop[]
app.use(express.json()); // enable json parsing

// CREATE route
app.post('/data', (req, res) => {
    const doc = req.body; // get document from request body
    db.insertOne(doc)
        .then(doc => {
            res.send({ _id: doc._id });
        })
        .catch(err => {
            res.send({ error: 'Could not insert document' + err });
        });

});

// READ route
app.get('/data/:id', (req, res) => {
        db.findOne({ _id: req.params.id })
        .then(doc => res.send(doc))
        .catch(err =>res.send({ error: 'Could not find document.' + err }));
});

app.get('/data', (req, res) => {                 // GET all data
    db.find({})
    .then(docs => res.send(doc))
    .catch(error =>res.send({ error}));
});




// UPDATE  route
app.patch('/data/:id',(req,res)=>{ // PATCH (edit) doc by :id
    db.updateOne(
    {_id: req.params.id}, // find doc with given :id
    { $set: req.body } // update it with new data
    ).then(result=>res.send({result}))
    .catch(error=>res.send({error}));
   });

//delete route
app.delete('/data/:id',(req,res)=>{ // DELETE doc for given :id
    db.deleteOne({_id: req.params.id}) // remove matching doc
    .then(result=>res.send({result}))
    .catch(error=>res.send({error}));
   });
   


// default route

app.all('*', (req, res) => { res.status(404).send('Invalid URL.') });
// start server

app.listen(3000, () => console.log(
    'Server started: http://localhost:3000'
));