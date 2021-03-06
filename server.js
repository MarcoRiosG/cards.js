const express = require('express');
const app = express();

app.use(express.static('public'));

const { Deck, Hand } = require('./app/deck');

const deck = new Deck();

let table = deck.dispatchCards(5);

app.get('/table', (req, res) => {
  res.send(table)
});

app.get(`/deck/:size`, (req, res) => {
  const { size } = req.params;
  res.send(deck.dispatchCards(parseInt(size)));
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});

