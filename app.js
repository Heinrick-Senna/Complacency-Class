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

function verifyJWT (req, res, next) {
 var token = req.body.token || req.query.token || res.getHeader('x-access-token');

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Falha' });
      } else {
        req.decoded = decoded;
        next();
      }
    })
  } else {
    return res.json({ message: 'Sem Token!'});
  }
}


var indexdeacesso = 0,
    indexderegistro = null;
   

// Primeiro Diretório
app.use((req, res, next) => {
	res.locals.success_msg =  req.flash('success_msg');
	res.locals.err_msg =  req.flash('err_msg');
	if (indexderegistro) {
		res.locals.topmenuicons = 'Perfil';
		res.locals.topmenuicons2 = 'Sair';
	} else {
		res.locals.topmenuicons = 'Registro';
		res.locals.topmenuicons2 = 'Login';
	}
	next();
})


app.get('/complacencyclass.com.br/', function(req, res) {
	indexdeacesso++;
	(indexdeacesso > 1) ? res.redirect('/complacencyclass.com.br/Home') : res.render('LandingPage');
	if (res.locals.success_msg == 'Usuário Logado!') {
		indexderegistro++;
	}
});

app.route('/complacencyclass.com.br/Home')
		.get(videoController.allVideos);


// Outros diretórios
app.get('/complacencyclass.com.br/Registro', function(req, res) {
	(indexderegistro) ? res.redirect('/complacencyclass.com.br/Perfil') : res.render('Register');;
});

app.get('/complacencyclass.com.br/Upload', function(req, res) {
  res.render('VideoCadastro');
});

app.get('/complacencyclass.com.br/Video', function(req, res){
	res.render('VideoViews');
});

app.get('/complacencyclass.com.br/Login', function(req, res) {
  res.render('Login');
});

app.get('/complacencyclass.com.br/Perfil', function(req, res) {
	res.render('Profile');
});

app.get('/complacencyclass.com.br/Search', function(req,res){
    res.render('SearchPage');
});

// Erro 404
app.use((req, res, next) => {
	res.status(404).render('notfound');
})