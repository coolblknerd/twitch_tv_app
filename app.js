var gamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin"];

$(document).ready(function() {

  // Loop through the array of gamers
  for (var i = 0; i < gamers.length; i++) {

    // attach the gamer at the given index to api call
    var url = 'https://api.twitch.tv/kraken/streams/' + gamers[i] + '?callback=?';

    $.getJSON(url).done(function(data) {

      // if the user is offline
      if (data.stream === null) {

        $.getJSON(data._links.channel, function(dataOff) {

          var link = 'https://www.twitch.tv/' + dataOff.name;

          $('#userInfo').append("<div class='row bg-info' id='offline'>" + "<div class='col-sm-4'>" + "<img src='" + dataOff.logo + "' width='50' height='50'></img>" + '</div>' + "<div class='col-sm-4'>" + "<a href='" + link + "' target='_blank'>" + dataOff.name + "</a>" + "</div>" + "<div class='col-sm-4'>" + "Offline" + "</div>" + "</div>").addClass("offline");
        })

        // if the user's account doesn't exist
      } else if (data.error) {

        var name = data.message.split(' ')[1],
        link = "https://s.codepen.io/FreeCodeCamp/fullpage/undefined",
        logo = "https://upload.wikimedia.org/wikipedia/commons/3/33/White_square_with_question_mark.png"

        $('#userInfo').append("<div class='row bg-danger' id='deleted'>" + "<div class='col-sm-4'>" + "<img src='" + logo + "' width='50' height'50'>" + '</div>' + "<div class='col-sm-4'>" + "<a href='" + link + "' target='_blank'>" + name + "</a>" + "</div>" + "<div class='col-sm-4'>" + data.error + "</div>" + "</div>").addClass("deleted");

        // if the user is online
      } else {

        var link = 'https://www.twitch.tv/' + data.stream.channel.name;

        $('#userInfo').append("<div class='row bg-success' id='online'>" + "<div class='col-sm-4'>" + "<img src='" + data.stream.channel.logo + "' width='50' height'50'>" + "</div>" + "<div class='col-sm-4'>" + "<a href='" + link + "' target='_blank'>" + data.stream.channel.name + "</a>" + "</div>" + "<div class='col-sm-4'>" + data.stream.channel.status + "</div>");

      }

    }) // end of getJSON

  } // end of for loop

  // These will make the tab buttons work
  $("#onlineBtn").on('click', function() {
    $('div#offline, div#deleted').hide();
    $('div#online').show();
  });

  $("#offlineBtn").on('click', function() {
    $('div#online, div#deleted').hide();
    $('div#offline').show();
  });

  $('#allBtn').on('click', function() {
    $('div#online, div#offline, div#deleted').show().reverse();
  });
});
