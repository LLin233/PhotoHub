var fs = require('fs');
var mongoose = require('mongoose');
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
                function(err, doc) {
                }
        );


        }
        res.send(ret);
}

exports.getAlbums = function(req, res) {
        //TODO Output: array of object {albumId, albumName}
        listAlbums = albumModel.find({}, function(err, albums) {
                console.log(albums);
        });
}
