const express = require('express');
const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('assets'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'assets' , 'html', 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname,'assets' , 'html', 'register.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/movie/:id', (req, res) => {
  res.sendFile(path.join(__dirname,'assets' , 'html', 'movie.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/show/:id', (req, res) => {
  res.sendFile(path.join(__dirname,'assets' , 'html', 'show.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});