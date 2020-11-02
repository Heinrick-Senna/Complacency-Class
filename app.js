const express = require('express');
const app = require('./config/express')();
const passport = require('passport');

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
  res.render(__dirname + "/views/LandingPage.ejs");
});

// Outros diretórios
app.get('/complacencyclass.com.br/Registro', function(req, res) {
  res.render(__dirname + "/views/Register.ejs");
});

app.get('/complacencyclass.com.br/Login', function(req, res) {
  res.render(__dirname + "/views/Login.ejs");
});

app.get('/complacencyclass.com.br/Search', function(req,res){
    res.render(__dirname + "/views/SearchPage.ejs");
});

// Erro 404
app.use(function(req, res, next) {
	res.sendFile(__dirname + '/views/404-NOTFOUND.html');
});