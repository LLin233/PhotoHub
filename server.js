var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var directory = require('serve-index');
var utils = require('./htdoc/script/utils.js');
var api = require('./htdoc/script/api.js');
var app = express();


app.use(express.static('htdoc'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/albums", directory('htdoc/albums'));

app.use(multer({
	dest: './uploads'
}).single('image-file'));


app.get('/', function(request, response) {
	response.redirect('/upload.html');
});

app.post('/api/getPics', api.getPics);

app.post('/api/newAlbum', api.newAlbum);


app.post('/upload', function(request, response) {
	var src = request.file.path;
	var dst = "./htdoc/albums/album1/" + request.file.filename + ".jpg";
	console.log(src);
	utils.copyFile(src, dst, function() {
		var thumbPath = "./htdoc/albums/album1/thumb-" + request.file.filename + ".jpg";
		console.log("copying is done.");
		utils.genThumb(src, thumbPath, function(err) {
			if (err) throw err;
			response.redirect('/browse.html');
		})
	});
});


app.listen(8080, function() {
	console.log('listening on port 8080 ...');
});