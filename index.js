const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const genres = [
    {id:1, name: 'Action'},
    {id:2, name: 'Horror'},
    {id:3, name: 'Comedy'},
];

//To get the list of all the genres available
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

//To get a particular genre with its id
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the provided ID was not found');
    res.send(genre);
});

//TO update a genre in the list
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(400).send('The genre with the provided ID was not found');
    
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

//To add a new genre to the list
app.post('/api/genres', (req, res) => {
    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the provided ID was not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genres) {
    const schema ={
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genres, schema);
}

const port = process.env.PORT || 3100;
app.listen(port, () => console.log(`Listening at port ${port}...`));