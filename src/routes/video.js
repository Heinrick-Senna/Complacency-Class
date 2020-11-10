const videoController = require('../controllers/video');
const flash = require('connect-flash');


module.exports = (app) => {
	app.use(flash());

	app.route('/complacencyclass.com.br/video_cadastro')
		.post(videoController.newVideo);

	app.route('/complacencyclass.com.br/Video')
		.post(videoController.enterVideo);

	app.route('/complacencyclass.com.br/Home')
		.get(videoController.allVideos);

}