var tracks_array = [];

function init(){
  window.scrollTo(0,1);
  SC.initialize({
    client_id: '45e1f7e473518eccbcb6bc27ecac7c44'
  });
  $.scPlayer.defaults.onDomReady = null;
  $('#disconnect').click(function(){
    SC.disconnect();
    $('#loggedin').css('display','none');
    $('#loggedout').css('display','block');
  });
  $("#refresh").click(function(){
    getUserFollowings(_uid);
  });
}

function getUserFollowings(curUserId){
  SC.get("/users/"+curUserId+"/followings", function(data){
    $.each(data, function(k,user) {
      getFavTracks(user.id);
    });
    var last_count = 0;
    var checker = setInterval(function() {
      console.log("checking");
      if (last_count > 0 && tracks_array.length == last_count ) {
        clearInterval(checker);
        console.log('found them all');
        make_playlist(tracks_array);
      }
      last_count = tracks_array.length;
    }, 1000);
  });
};

function make_playlist() {
  var rando_numbers = [];
  var array_limit = tracks_array.length - 1;
  for (var i = 0; i < 30; i++) {
    rando_numbers.push (Math.floor(Math.random()*array_limit))
  }
  // console.log(rando_numbers);
  for (var i = 0; i < rando_numbers.length; i++) {
    var track_uri = tracks_array[rando_numbers[i]].uri;
    embedSingleTrack(track_uri);
  }
}

function embedSingleTrack(track_uri) {
  // console.log('I am about to embed this song: ' + track_uri);
  SC.oEmbed( track_uri, {auto_play: false, color: '00C349' }, function(oembed){
     $('#target').append(oembed.html);
   });
}

function getFavTracks(user_id){
    SC.get("/users/"+user_id+"/favorites", function(data){
      $.each(data, function(k,v) {
        tracks_array.push(v);
      });
  });
};


