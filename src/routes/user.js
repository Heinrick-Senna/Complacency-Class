const userController = require('../controllers/user');

module.exports = (app) => {

	app.route('/complacencyclass.com.br/v1/users')
		.get(userController.allUsers)
		.post(userController.newUser);
}