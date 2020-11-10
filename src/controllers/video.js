const mongoose = require('mongoose');
const modelVideo = mongoose.model('Video');

let videoController = [];

videoController.newVideo = (req, res) => {
	if (req.body.videoname && req.body.thumb) {
		modelVideo.findOne({ 'videoname': req.body.videoname })
			.then(video => {
				if (video) {
					res.json({success: false, message: 'Esse nome de usuário não está disponível'});
				} else {

								let newVideo = new modelVideo({
									tittle: req.body.videoname,
									date: req.body.date,
									thumb: req.body.thumb,
									desc: req.body.desc,
									author: 'teste'
								});

								newVideo.save()
									.then(() => res.json({ success: true, message: 'O Vídeo foi cadastrado'}))
									.catch((err) => res.json({ success: false, message: err, statusCode: 500}));
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
	modelVideo.find().lean()
		.then((results) => res.render('Home', {video: results}))
		.catch(err => res.send('Erro'));
}

module.exports = videoController;