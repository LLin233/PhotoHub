var gm = require('gm'),
	fs = require('fs'),
	imageMagick = gm.subClass({
		imageMagick: true
	});

var genThumb = function(src, dst, cb) {
	console.log(src + '\n' + dst);
	gm(src).thumb(100, 100, dst, 100, cb);
}

exports.genThumb = genThumb;