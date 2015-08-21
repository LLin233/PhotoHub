var fs = require('fs');

var copyFile = function(srcFile, dstFile, callback){
    var readableStream = fs.createReadStream(srcFile);
    var writeableStream = fs.createWriteStream(dstFile);
    readableStream.pipe(writeableStream);
    readableStream.on("error", function(){
      console.log("Caught a error!");
    });
    readableStream.on('end', callback);
};

exports.copyFile = copyFile;