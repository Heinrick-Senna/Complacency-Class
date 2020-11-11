const express = require('express');
const app = require('./config/express')();
const session = require('express-session');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const videoController = require('./src/controllers/video');


require('./config/database');
// Config
	// Sessão
		app.use(session({
	        secret: 'ComplacencyClassSession',
	        resave: true,
	        saveUninitialized: true
   		 }));
		app.use(flash());
	// Middleware



	// Template
		app.engine('hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
		app.set('view engine', 'hbs');


// Static para os arquivos da pasta /public
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));


// iniciando Servidor
app.listen(app.get('port'), () => {
	console.log('Servidor rodando na porta 3001...');
});

var indexderegistro = null;
   

// Primeiro Diretório
app.use((req, res, next) => {
	res.locals.success_msg =  req.flash('success_msg');
	res.locals.err_msg =  req.flash('err_msg');
	if (res.locals.success_msg == 'Usuário Logado!') {
		app.locals.topmenuicons = 'Perfil';
		app.locals.topmenuicons2 = 'Sair';
		var stringname = req.flash('logged');
		app.locals.logged = stringname;
	} else {
		if (indexderegistro) {
			app.locals.topmenuicons = 'Perfil';
			app.locals.topmenuicons2 = 'Sair';
		} else {
			app.locals.topmenuicons = 'Registro';
			app.locals.topmenuicons2 = 'Login';
		}
	}
	next();
})




app.get('/complacencyclass.com.br/', function(req, res) {
	(indexderegistro) ? res.redirect('/complacencyclass.com.br/Home') : res.render('LandingPage');
	if (res.locals.success_msg == 'Usuário Logado!') {
		indexderegistro++;
	}
});


// Outros diretórios
app.get('/complacencyclass.com.br/Registro', function(req, res) {
	(indexderegistro) ? res.redirect('/complacencyclass.com.br/Perfil') : res.render('Register');
});

app.get('/complacencyclass.com.br/Upload', function(req, res) {
  res.render('VideoCadastro');
});

app.get('/complacencyclass.com.br/Video', function(req, res){
	res.render('VideoViews');
});

app.get('/complacencyclass.com.br/Login', function(req, res) {
  (indexderegistro) ? res.redirect('/complacencyclass.com.br/Logout') : res.render('Login');
});

app.get('/complacencyclass.com.br/Perfil', function(req, res) {
	res.render('Profile');
});

app.get('/complacencyclass.com.br/Logout', function(req, res) {
	indexderegistro = null;
	app.locals.logged = null;
	res.redirect('/complacencyclass.com.br');
});

app.get('/complacencyclass.com.br/Search', function(req,res){
    res.render('SearchPage');
});

// Erro 404
app.use((req, res, next) => {
	res.status(404).render('notfound');
})