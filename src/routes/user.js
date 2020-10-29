const userController = require('../controllers/user');

module.exports = (app) => {

	app.route('/complacencyclass.com.br/registro_completo')
		.post(userController.newUser);

	app.route('/complacencyclass.com.br/login_completo')
		.post(userController.loginUser);

	app.route('/complacencyclass.com.br/v1/users')
		.get(userController.allUsers);
}