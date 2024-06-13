const express = require('express');
const fs = require('fs')
const path = require('path')

const app = express();
const PORT = 8080;

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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});