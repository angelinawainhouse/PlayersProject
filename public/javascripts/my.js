
$(document).on('pagebeforeshow ', '#home', function () {   // see: https://stackoverflow.com/questions/14468659/jquery-mobile-document-ready-vs-page-events
    var info_view = "";      //string to put HTML in
    $('#Players').empty();  // since I do this everytime the page is redone, I need to remove existing before apending them all again
    $.getJSON('/playerlist/')   //Send an AJAX request
        .done(function (data) {
            $.each(data, function (index, record) {   // make up each li as an <a> to the details-page
                $('#Players').append('<li><a data-parm=' + record.PlayerName + ' href="#details-page">' + record.PlayerName + '</a></li>');
            });

            $("#Players").listview('refresh');  // need this so jquery mobile will apply the styling to the newly added li's

            $("a").on("click", function (event) {    // set up an event, if user clicks any, it writes that items data-parm into the details page's html so I can get it there
                var parm = $(this).attr("data-parm");
                //do something here with parameter on  details page
                $("#detailParmHere").html(parm);

            });

        }); // end of .done

});




$(document).on('pagebeforeshow', '#details-page', function () {

    var textString = 'fix me';
    var id = $('#detailParmHere').text();
    $.getJSON('/findPlayer/' + id)
        .done(function (data) {
            textString = "PlayerName: " + data.PlayerName + " \n  Gender: " + data.Gender + "\n Age: " + data.Age + "\n GameLiketoPlay:  "+ data.GameLiketoPlay + "\n AnimeLiketoWatch: " + data.AnimeLiketoWatch +"\n Gaminglife: "+ data.Gaminglife +"\n AnimeLife: "+ data.AnimeLife ;
            $('#showdata').text(textString);
        })
        .fail(function (jqXHR, textStatus, err) {
            textString = "could not find";
            $('#showdata').text(textString);
        });



});



$(document).on('pagebeforeshow', '#deletepage', function () {

    $('#deletePlayerName').val('');
});

function deletePlayer() {
    var PlayerName = $('#deletePlayerName').val();
    $.ajax({
        url: '/deletePlayer/' + PlayerName,
        type: 'DELETE',
        contentType: "application/json",
        success: function (response) {
            alert("Product successfully deleted in cloud");
        },
        error: function (response) {
            alert("Product NOT deleted in cloud");
        }
    });
}



// clears the fields
$(document).on('pagebeforeshow', '#addpage', function () {
    $('#newPlayerName').val('');
    $('#newGender').val('');
    $('#newAge').val('');
    $('#newGameLiketoPlay').val('');
    $('#newAnimeLiketoWatch').val('');
    $('#newGaminglife').val('');
    $('#newAnimeLife').val('');
});

function addPlayer() {
    var playerName = $('#newPlayerName').val();
    var gender = $('#newGender').val();
    var age = parseInt($('#newAge').val());
    var gameLiketoPlay = parseInt($('#newGameLiketoPlay').val());
    var animeLiketoWatch = parseInt($('#newAnimeLiketoWatch').val());
    var gaminglife = parseInt($('#newGaminglife').val());
    var animeLife = parseInt($('#newAnimeLife').val());
    var newPlayer = { PlayerName: playerName, Gender: gender, Age: age ,GameLiketoPlay: gameLiketoPlay ,AnimeLiketoWatch: animeLiketoWatch,Gaminglife: gaminglife,AnimeLife: animeLife};
   
    $.ajax({
        url: '/addPlayer/',
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(newPlayer),
    });
    
}




