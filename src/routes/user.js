const userController = require('../controllers/user');
const flash = require('connect-flash');


module.exports = (app) => {
	app.use(flash());


	app.route('/complacencyclass.com.br/registro_completo')
		.post(userController.newUser);

	app.route('/complacencyclass.com.br/Login')
		.post(userController.loginUser);

	app.route('/complacencyclass.com.br/v1/users')
		.get(userController.allUsers)
}