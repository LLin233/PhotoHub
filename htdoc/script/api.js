var fs = require('fs');

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
                ret.msg="album name should not be empty."
        } else {
                ret.status = 100;
                ret.name = req.body.name;
                ret.path = "/albums/" + albumId + "/";
                fs.mkdirSync(localPath);
        }
        res.send(ret);
}