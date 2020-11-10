const mongoose = require('mongoose');
const modelVideo = mongoose.model('User');

let videoController = [];

videoController.newVideo = (req, res) => {
	if (req.body.videoname && req.body.thumb) {
		modelUser.findOne({ 'videoname': req.body.username })
			.then(user => {
				if (user) {
					res.json({success: false, message: 'Esse nome de usuário não está disponível'});
				} else {

								let newVideo = new modelVideo({
									tittle: req.body.videoname,
									date: req.body.date,
									thumb: req.body.thumb,
									desc: req.body.desc,
									author: req.body.author
								});

								newVideo.save()
									.then(() => res.json({ success: true, message: 'O Vídeo foi cadastrado'});
									.catch(() => res.json({ success: false, message: err, statusCode: 500}));
				}
			});

	} else {
		res.json({ success:false, message: 'O Vídeo precisa de um título e uma thumb', statusCode: 400});
	}
}

videoController.enterVideo = (req, res) => {
	res.render('Home');
}

videoController.allVideos = (req, res) => {
	
	res.render('Home');
}

module.exports = videoController;