var express = require('express');
var multer = require('multer');
var directory = require('serve-index');
var cf = require('./htdoc/script/copyFile.js');

var app = express();


app.use(express.static('htdoc'));
app.use("/albums", directory('htdoc/albums'));

app.use(multer({
	dest: './uploads'
}).single('image-file'));

app.post('/upload', function(request, response) {
	var src = request.file.path;
	var dst = "./htdoc/albums/album1/"+ request.file.filename + ".jpg";
	console.log(src);
	cf.copyFile(src, dst, function() {
    	console.log("copying is done!");
    	response.redirect("/upload.html");
	});
});

app.listen(8080, function() {
	console.log('listening on port 8080 ...');
});

