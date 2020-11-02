const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const modelUser = mongoose.model('User');

let userController = {};

userController.allUsers = (req, res) => {
	modelUser.find()
		.then(results => res.json(results))
		.catch(err => res.send(err));
}

userController.loginUser = (req, res) => {
	if (req.body.username && req.body.password) {
		modelUser.find({ 'username': req.body.username })
			.then(results => {
					let bool = bcrypt.compareSync(req.body.password, results[0].password);
					if (bool == false) {
						res.json({success: false, message: 'Senha incorreta' });
					} else {
						res.json({success: true, message: 'Logado!' });
					}
			})
			.catch(err => res.send('Esse nome de usuário não existe'));	

	} else {
		res.json({success: false, message: 'Você precisa de um usuário ou senha'});
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
									password: encryptedPassword,
									email: req.body.email,
									isAdmin: req.body.isAdmins
								});

								newUser.save()
									.then(() => res.json({ success: true, message: 'Usuário criado com successo', statusCode: 201 }))
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