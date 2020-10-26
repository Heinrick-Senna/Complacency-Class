const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false})); app.use(express.static(path.join(__dirname, 'public')));


app.get('/complacencyclass.com.br',function(req, res){
	 res.sendFile(path.join(__dirname, 'public', 'HTML', 'LandingPage.html'));
	// app.use(express.static(__dirname + '/public'));
  // res.sendFile(__dirname+'/src/HTML/LandingPage.html');
});

app.get('/complacencyclass.com.br/Registro', function (req, res) {
	res.sendFile(path.join(__dirname, 'public', 'HTML', 'Register.html'));
});

app.post('/complacencyclass.com.br/Registro_Completo', function (req, res) {
	res.send('Nome: ' + req.body.Nome +'\n'+req.body.Sobrenome + '<br>Nasceu dia: ' + req.body.Nascimento + '<br>Contato: ' +
		req.body.Telefone + '<br>Email: ' + req.body.Email + '<br>Senha: ' + req.body.Password + '<br>Obrigado por se cadastrar');
});

app.use(function(req, res, next) {
  	res.sendFile(path.join(__dirname, 'public', 'HTML', '404-NOTFOUND.html'));
});



app.listen(3001,function(){
	console.log("Servidor ativo na port 3001");
});

