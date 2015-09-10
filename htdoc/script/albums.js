$(document).ready(function() {
        var jqxhr = $.ajax({
                        url: "api/getAlbums",
                        type: 'POST',
                })
                .done(function(a) {
                        for (var i in a) {
                                $('#albums').append('<button class="button-album" id="' + a[i].albumId + '">' + a[i].albumName + '</button>');
                        }
                        $('.button-album').click(function() {
                                //$.cookie('selectedAlbum', this.id);
                                localStorage.albumId = $(this).attr('id');
                                window.location.href = "browse.html";
                        });
                })
                .fail(function(jqxhr, status, msg) {
                        alert("Failed to connect to server: " + status + ", " + msg);
                });
});