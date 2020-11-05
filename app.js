const express = require('express');
const app = require('./config/express')();
const session = require('express-session');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

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
		app.use((req, res, next) => {
			res.locals.success_msg =  req.flash('success_msg');
			res.locals.err_msg =  req.flash('err_msg');
			res.locals.token =  req.flash('token');
			next();
		})


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

function verifyJWT(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Falha' });
      } else {
        req.decoded = decoded;
        next()
      }
    })
  } else {
    return res.json({ message: 'Sem Token!'});
  }
}

// Dando primeiro diretório
app.get('/complacencyclass.com.br', function(req, res) {
  res.render('LandingPage');
});

// Outros diretórios
app.get('/complacencyclass.com.br/Registro', function(req, res) {
  res.render('Register');
});

app.get('/complacencyclass.com.br/Videotest', function(req, res){
	res.render('VideoViews');
});

app.get('/complacencyclass.com.br/not', function(req, res) {
  res.render('notfound');
});

app.get('/complacencyclass.com.br/Login', function(req, res) {
  res.render('Login');
});

app.get('/complacencyclass.com.br/perfilTeste', function(req, res) {
	res.render('Perfil');
});

app.get('/complacencyclass.com.br/Search', function(req,res){
    res.render('SearchPage');
});

app.get('/complacencyclass.com.br/Upload', function(req,res){
    res.render('Upload', sessionstring);
});
// Erro 404
app.use((req, res, next) => {
	res.status(404).render('notfound');
})