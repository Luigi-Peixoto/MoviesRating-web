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

app.get('/movie/:title', (req, res) => {
  const title = req.params.title;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="/assets/css/style.css">
    </head>
    <body>
      <h1>${title}</h1>
      <p>Detalhes sobre ${title}...</p>
      <!-- Adicione mais informações ou funcionalidades aqui -->
    </body>
    </html>
  `);
});