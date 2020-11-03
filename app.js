const express = require('express');
const app = require('./config/express')();
const session = require('express-session');
const flash = require('connect-flash');
const handlebars = require('express-handlebars');

require('./config/database');
// Config
	// Sessão
		app.use(session({
	        secret: 'ComplacencyClassSession',
	        resave: true,
	        saveUninitialized: true
   		 }));
	// Middleware
		// app.use((req, res, next) => {
		// 	res.locals.name = '';
		// })


	// Template
		app.engine('handlebars', handlebars({defaultLayout: 'main'}));
		app.set('view engine', 'handlebars');

// Static para os arquivos da pasta /public
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

// iniciando Servidor
app.listen(app.get('port'), () => {
	console.log('Servidor rodando na porta 3001...');
});


var sessionstring = {  
	sessionstring: ['Registrar', 'Login'],
	logged: ['Adminstador']
};

// Dando primeiro diretório
app.get('/complacencyclass.com.br', function(req, res) {
  res.render('LandingPage', sessionstring);
});

// Outros diretórios
app.get('/complacencyclass.com.br/Registro', function(req, res) {
  res.render('Register', sessionstring);
});

app.get('/testapi', function(req, res){
	res.render('RegisterComplete', {username: 'Marcelo Heinrick'});
});

app.get('/complacencyclass.com.br/Login', function(req, res) {
  res.render('Login', sessionstring);
});

app.get('/complacencyclass.com.br/perfilTeste', function(req, res) {
	res.render('Perfil', sessionstring);
});

app.get('/complacencyclass.com.br/Search', function(req,res){
    res.render('SearchPage', sessionstring);
});

app.get('/complacencyclass.com.br/Upload', function(req,res){
    res.render('Upload', sessionstring);
});
// Erro 404
app.use((req, res, next) => {
	res.render('notfound', sessionstring);
})