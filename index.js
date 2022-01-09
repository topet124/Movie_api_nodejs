const express = require('express'),
  morgan = require('morgan');

const app = express();

app.use(morgan('common'));

let topBooks = [{
    title: 'Harry Potter and the Sorcerer\'s Stone',
    author: 'J.K. Rowling'
  },
  {
    title: 'Lord of the Rings',
    author: 'J.R.R. Tolkien'
  },
  {
    title: 'Twilight',
    author: 'Stephanie Meyer'
  }
];

//getting files using static
app.use(express.static('public'));

// GET requests
app.get('/', (req, res) => {
  res.send('Welcome to my book club!');
});

app.get('/books', (req, res) => {
  res.json(topBooks);
});

//catching error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
