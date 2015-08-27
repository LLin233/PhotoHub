var gm = require('gm'),
	fs = require('fs'),
	imageMagick = gm.subClass({
		imageMagick: true
	});


exports.copyFile = function(srcFile, dstFile, callback){
    var readableStream = fs.createReadStream(srcFile);
    var writeableStream = fs.createWriteStream(dstFile);
    readableStream.pipe(writeableStream);
    readableStream.on("error", function(){
      console.log("Caught a error!");
    });
    readableStream.on('end', callback);
};


exports.genThumb = function(src, dst, cb) {
	console.log(src + '\n' + dst);
	gm(src).thumb(100, 100, dst, 100, cb);
}
