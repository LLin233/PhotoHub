var fs = require('fs');
var mongoose = require('mongoose');
var utils = require('./utils.js');
var albumSchema = new mongoose.Schema({
        albumName: String,
        albumId: String
});
var albumModel = mongoose.model("album", albumSchema);
mongoose.connect('mongodb://localhost/photohub');

exports.getPics = function(req, res) {
        var album = req.body.album;
        ret = new Object();
        var localPath = "./htdoc/albums/" + album;
        ret.path = "/albums/" + album + "/";
        ret.pics = new Array();
        require('glob').glob(localPath + '/thumb-*.jpg', null, function(err, files) {
                if (err) {
                        ret.status = 200; //failure
                        res.send(ret);
                } else {
                        for (var f in files) {
                                var img = files[f].replace(localPath + "/thumb-", "");
                                ret.pics.push(img);
                        }
                        ret.status = 100;
                        res.send(ret);
                }
        });
}


exports.newAlbum = function(req, res) {
        var albumId = require('randomstring').generate(16);
        var localPath = "./htdoc/albums/" + albumId;
        ret = new Object();
        if (req.body.name == "") {
                ret.status = 200;
                ret.msg = "album name should not be empty."
        } else {
                ret.status = 100;
                ret.name = req.body.name;
                ret.path = "/albums/" + albumId + "/";
                //create dir
                fs.mkdirSync(localPath);
                //mapping dir
                albumModel.create({
                                albumId: albumId,
                                albumName: ret.name
                        },
                        function(err, doc) {}
                );


        }
        res.send(ret);
}

exports.getAlbums = function(req, res) {
        //Output: array of object {albumId, albumName}
        listAlbums = albumModel.find({}, function(err, albums) {
                //console.log(albums);
                res.send(albums);
        });
}

// exports.upload = function(req, res) {
//         var src = req.file.path;
//         var dst = "./htdoc/albums/album1/" + req.file.filename + ".jpg";
//         console.log(src);
//         utils.copyFile(src, dst, function() {
//                 var thumbPath = "./htdoc/albums/album1/thumb-" + req.file.filename + ".jpg";
//                 console.log("copying is done.");
//                 utils.genThumb(src, thumbPath, function(err) {
//                         if (err) throw err;
//                         res.redirect('/browse.html');
//                 })
//         });
// }

exports.upload = function(req, res) {
        var src = req.file.path;
        var albumId = req.body.albumId;
        var dst = "./htdoc/albums/" + albumId+ "/" + req.file.filename + ".jpg";
        console.log(src);
        utils.copyFile(src, dst, function() {
                var thumbPath = "./htdoc/albums/" + albumId+ "/thumb-" + req.file.filename + ".jpg";
                console.log("copying is done.");
                utils.genThumb(src, thumbPath, function(err) {
                        if (err) throw err;
                        res.redirect('/browse.html');
                })
        });
}