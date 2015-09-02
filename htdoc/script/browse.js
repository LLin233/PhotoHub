$(document).ready(function() {
        var jqxhr=$.ajax({
                url: 'api/getPics',
                type: 'POST',
                data : {album : 'album1'},
        })
        .done(function(a) {
                if (a.status != 100) {
                        alert("Error " + a.status + " : " + a.msg);
                } else {
                        console.log('called');
                        appendPics(a.path, a.pics);
                }
        })
        .fail(function(jqxhr, status, msg) {
                alert("Failed to connect to server: " + status + ", " + msg);
        });
});


$('#button-new-album').click(createNewAlbum);

function appendPics(path, pics) {
        for (var p in pics) {
                $('#pics').append("\t<a href='" + path + "/" + pics[p] + "'><img src='" + path + "/thumb-" + pics[p] + "'></a>\n");
        }

        // set click functions for buttons
        $('#button-upload').click(function() {
                window.location.href="/upload.html";
        });
}



function createNewAlbum() {
        var inputDirName=prompt("Create New Album: ");
        var jqxhr=$.ajax({
                url: 'api/newAlbum',
                type: 'POST',
                data: {name : inputDirName}
        })
        .done(function(a) {
                if (a.status != 100 || a.name=="") {
                        alert("Error " + a.status + " : " + a.msg);
                } else {
                        alert(JSON.stringify(a.path) + "    "  + a.name);
                }
        })
        .fail(function(jqxhr, status, msg) {
                alert("Failed to create a new album: " + status + ", " + msg);
        });
}