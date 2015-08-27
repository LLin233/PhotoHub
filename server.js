var express = require('express');
var multer = require('multer');
var directory = require('serve-index');
var utils = require('./htdoc/script/utils.js');
var browse = require('./htdoc/script/browse.js');
var app = express();


app.use(express.static('htdoc'));
app.use("/albums", directory('htdoc/albums'));

app.use(multer({
	dest: './uploads'
}).single('image-file'));


app.get('/', function(request, response) {
	response.redirect('/upload.html');
});

app.get('/browse', function(request, response) {
	browse.browse(request, response);
});

app.post('/upload', function(request, response) {
	var src = request.file.path;
	var dst = "./htdoc/albums/album1/" + request.file.filename + ".jpg";
	console.log(src);
	utils.copyFile(src, dst, function() {
		var thumbPath = "./htdoc/albums/album1/thumb-" + request.file.filename + ".jpg";
		console.log("copying is done.");
		utils.genThumb(src, thumbPath, function(err) {
			if (err) throw err;
			response.redirect('/browse');
		})
	});
});


app.listen(8080, function() {
	console.log('listening on port 8080 ...');
});