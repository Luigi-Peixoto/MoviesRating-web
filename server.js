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

app.set('views', path.join(__dirname,'assets' , 'html'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', (req, res) => {
  const newData = req.body;

  const filePath = path.join(__dirname, 'assets', 'data', 'data.json');

  // Ler o conteúdo atual do arquivo data.json
  fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
          if (err.code === 'ENOENT') {
              // Se o arquivo não existir, cria um novo array com os novos dados
              const dataArray = [newData];
              fs.writeFile(filePath, JSON.stringify(dataArray, null, 2), (err) => {
                  if (err) {
                      console.error('Erro ao salvar os dados em arquivo:', err);
                      return res.status(500).send('Erro ao salvar os dados em arquivo');
                  } else {
                      console.log('Dados salvos em arquivo com sucesso');
                      return res.status(200).send('Dados salvos em arquivo com sucesso');
                  }
              });
          } else {
              console.error('Erro ao ler o arquivo:', err);
              return res.status(500).send('Erro ao ler o arquivo');
          }
      } else {
          let dataArray;
          try {
              // Verifica se o conteúdo do arquivo é uma string vazia
              if (data.trim() === '') {
                  dataArray = [];
              } else {
                  dataArray = JSON.parse(data);
              }
          } catch (parseError) {
              console.error('Erro ao analisar o conteúdo do arquivo:', parseError);
              return res.status(500).send('Erro ao analisar o conteúdo do arquivo');
          }

          if (dataArray.some(user => user.username === newData.username) || dataArray.some(user => user.email === newData.email)) {
              return res.status(400).send('Nome de usuário ou email já existe');
          }

          // Adicionar os novos dados ao array existente
          dataArray.push(newData);

          // Gravar o array atualizado de volta no arquivo
          fs.writeFile(filePath, JSON.stringify(dataArray, null, 2), (err) => {
              if (err) {
                  console.error('Erro ao salvar os dados em arquivo:', err);
                  return res.status(500).send('Erro ao salvar os dados em arquivo');
              } else {
                  console.log('Dados salvos em arquivo com sucesso');
                  return res.status(200).send('Dados salvos em arquivo com sucesso');
              }
          });
      }
  });
});

app.post('/login', (req, res) => {
  const newData = req.body;
  const filePath = path.join(__dirname, 'assets', 'data', 'data.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Se o arquivo não existir, o usuário não existe
        return res.status(400).send("O usuário não existe!");
      } else {
        // Outros erros de leitura de arquivo
        console.error('Erro ao ler o arquivo:', err);
        return res.status(500).send('Erro ao ler o arquivo');
      }
    } else {
      let dataArray;
      try {
        // Verifica se o conteúdo do arquivo é uma string vazia
        if (data.trim() === '') {
          dataArray = [];
          return res.status(400).send("O usuário não existe!");
        } else {
          dataArray = JSON.parse(data);
        }
      } catch (parseError) {
        console.error('Erro ao analisar o conteúdo do arquivo:', parseError);
        return res.status(500).send('Erro ao analisar o conteúdo do arquivo');
      }

      // Verifica a existência de contas com o usuário inserido
      const user = dataArray.find(user => user.username === newData.username);
      if (user) {
        if (user.password === newData.password) {
          return res.status(200).send('Login efetuado com sucesso!');
        }
        return res.status(400).send('Senha Incorreta!');
      } else {
        return res.status(400).send("O usuário não existe!");
      }
    }
  });
});

app.get('/movie/:id', (req, res) => {
  res.render('movie-page');
});

app.get('/show/:id', (req, res) => {
  res.render('show-page');
});

app.get('/movies/:page', (req, res) => {
  res.render('catalogue');
});

app.get('/shows/:page', (req, res) => {
  res.render('catalogue');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});