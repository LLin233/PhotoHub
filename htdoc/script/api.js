var fs = require('fs');

exports.getPics = function(req, res) {
        var album = req.body.album;
        var ret = new Object();
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
        var album = req.body.album;
        var ret = new Object();
}
