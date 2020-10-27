const express = require('express');
const app = require('./config/express')();


require('./config/database');

// Static para os arquivos da pasta /public
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// iniciando Servidor
app.listen(app.get('port'), () => {
	console.log('Servidor rodando na porta 3001...');
});

// Dando primeiro diretório
app.get('/complacencyclass.com.br', function(req, res) {
  res.sendFile(__dirname + '/views/LandingPage.html');
});

// Outros diretórios
app.get('/complacencyclass.com.br/Registro', function(req, res) {
  res.sendFile(__dirname + '/views/Register.html');
});


// Erro 404
app.use(function(req, res, next) {
  res.sendFile(__dirname + '/views/404-NOTFOUND.html');
});
