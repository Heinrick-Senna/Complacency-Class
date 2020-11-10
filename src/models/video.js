const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
	tittle: {
		type: String,
		required: true
	},

	date: {
		type: Date,
		required: true,
		default: Date.now()
	},

	video: {
		type: String,
		required: true,
		default: 'Não temos Recursos Para Reproduzir Este Vídeo'
	},

	thumb: {
		type: String,
		required: true
	},

	desc: {
		type: String,
		required: true
	},

	author: {
		type: String,
		required: true
	}

});

mongoose.model('Video', VideoSchema);