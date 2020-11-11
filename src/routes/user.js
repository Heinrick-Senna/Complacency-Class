const userController = require('../controllers/user');
const flash = require('connect-flash');
const session = require('express-session');


module.exports = (app) => {
		app.use(session({
	        secret: 'ComplacencyClassSession',
	        resave: true,
	        saveUninitialized: true
   		 }));
		app.use(flash());


	app.route('/complacencyclass.com.br/registro_completo')
		.post(userController.newUser);

	app.route('/complacencyclass.com.br/Login')
		.post(userController.loginUser);

	app.route('/complacencyclass.com.br/v1/users')
		.get(userController.allUsers)
}