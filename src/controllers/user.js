const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const modelUser = mongoose.model('User');
const flash = require('connect-flash');
const express = require('express');
const app = express();

let userController = {};

userController.allUsers = (req, res) => {
	modelUser.find()
		.then(results => res.send(results))
		.catch(err => res.send(err));
}

userController.loginUser = (req, res) => {
	erros = [];

	if (!req.body.username || typeof req.body.username == undefined || req.body.username == null) {
		erros.push({ texto: 'Usuário válido'});
	}

	if (!req.body.password || typeof req.body.password == undefined || req.body.password == null) {
		erros.push({ texto: 'Senha Inválida'});
	}

	if (erros.length > 0) {
		res.render('Login', { erros: erros})
	} else {
		modelUser.find({ 'username': req.body.username })
			.then((results) => {
					let bool = bcrypt.compareSync(req.body.password, results[0].password);
					if (bool == false) {
						var erro = [];
						erros.push({ texto: 'Senha Incorreta!'});
						res.render('Login', { erros: erros});
					} else {
						req.flash('success_msg', 'Usuário Logado!')
						res.redirect('/complacencyclass.com.br')
					}
			})
			.catch((err) => {
				var erro = [];
					erros.push({ texto: err});
					res.render('Login', { erros: erros});
			});

	}
}

userController.newUser = (req, res) => {
	if (req.body.username && req.body.password && req.body.username2) {
		if (req.body.password2 && req.body.password == req.body.password2) {

			modelUser.findOne({ 'username': req.body.username })
				.then(user => {

					if (user) {
						res.json({success: false, message: 'Esse nome de usuário não está disponível'});
					
					} else {

						bcrypt.hash(req.body.password, 10)
							.then(hash => {

								let encryptedPassword = hash;

								let newUser = new modelUser({
									username: req.body.username,
									username2: req.body.username2,
									password: encryptedPassword,
									email: req.body.email,
									isAdmin: req.body.isAdmins
								});

								newUser.save()
									.then(() => res.render('RegisterComplete', {username: req.body.username + ' ' + req.body.username2}))
									.catch(() => res.json({ success: false, message: err, statusCode: 500}));
							})
							.catch(err => res.json({ success:false, message: err, statusCode: 500}));
					}
				});
		} else {
			res.json({ success:false, message: 'Senhas não corespondem', statusCode: 400});
		}
	} else {
		res.json({ success:false, message: 'Você precisa de um usuário ou senha', statusCode: 400});
	}
}

module.exports = userController;