const https = require('https');
const querystring = require('querystring');
const express = require('express');
const fs = require('fs')
const path = require('path')

const APIKey = require('./assets/config/APIKey');
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

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname,'assets' , 'html', 'register.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.get('/movie/:title', async (req, res) => {
  const title = req.params.title;
  
  const queryParams = querystring.stringify({
    api_key: APIKey,
    query: title,
    language: 'pt-BR'
  });
  
  const url = `https://api.themoviedb.org/3/search/movie?${queryParams}`;
  
  try {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        const movieData = JSON.parse(data);
        let movieDetailsHtml = '<p>Filme não encontrado.</p>';

        if (movieData.results && movieData.results.length > 0) {
          const movie = movieData.results[0];
          movieDetailsHtml = `
            <h2>${movie.title}</h2>
            <p>Data de Lançamento: ${movie.release_date}</p>
            <p>${movie.overview}</p>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          `;
        }

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
            ${movieDetailsHtml}
          </body>
          </html>
        `);
      });

    }).on('error', (error) => {
      console.error('Erro ao buscar dados do filme:', error);
      res.status(500).send('Erro ao buscar dados do filme');
    });

  } catch (error) {
    console.error('Erro geral:', error);
    res.status(500).send('Erro ao buscar dados do filme');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});