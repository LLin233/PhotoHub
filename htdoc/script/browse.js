$(document).ready(function() {
        var selectedAlbum = localStorage.albumId;  //TODO : err handling
        var jqxhr = $.ajax({
                        url: 'api/getPics',
                        type: 'POST',
                        data: {
                                album: selectedAlbum
                        },
                })
                .done(function(a) {
                        if (a.status != 100) {
                                alert("Error " + a.status + " : " + a.msg);
                        } else {
                                console.log('called' + selectedAlbum);
                                appendPics(a.path, a.pics);
                        }
                })
                .fail(function(jqxhr, status, msg) {
                        alert("Failed to connect to server: " + status + ", " + msg);
                });
});


$('#button-new-album').click(createNewAlbum);

// set click functions for buttons
$('#button-all-albums').click(function() {
        window.location.href = "/albums.html";
});

$('#button-upload').click(function() {
        window.location.href = "/upload.html";
});

function appendPics(path, pics) {
        for (var p in pics) {
                //$('#pics').append("\t<a href='" + path + "/" + pics[p] + "'><img src='" + path + "/thumb-" + pics[p] + "'></a>\n");
                $('#pics').append($("<div></div>").addClass("box_img"));
                $('.box_img').last().prepend("\t<a href='" + path + "/" + pics[p] + "'><img src='" + path + "/thumb-" + pics[p] + "'></a>\n");
        }
}



function createNewAlbum() {
        var inputDirName = prompt("Create New Album: ");
        var jqxhr = $.ajax({
                        url: 'api/newAlbum',
                        type: 'POST',
                        data: {
                                name: inputDirName
                        }
                })
                .done(function(a) {
                        if (a.status != 100 || a.name == "") {
                                alert("Error " + a.status + " : " + a.msg);
                        } else {
                                alert(JSON.stringify(a.path) + "    " + a.name);
                        }
                })
                .fail(function(jqxhr, status, msg) {
                        alert("Failed to create a new album: " + status + ", " + msg);
                });
}