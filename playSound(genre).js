function playSomeSound(genre) {
	SC.get('/tracks', {
	genres: genre,
	bpm: {
	  from: 100
	}
  }, function(tracks) {
    var random = Math.floor(Math.random() * 49);
    SC.oEmbed(tracks[random].uri, { auto_play: true }, document.getElementById('target'));
  }); 
}

window.onload = function() {
	SC.initialize({
		client_id: '45e1f7e473518eccbcb6bc27ecac7c44'
	});

	var menuLinks = document.getByClassName('genre');
	for (var i -0, i < menuLinks.length; i++) {
		var = menuLinks[i];
		menuLink.onclick = function(e) {
			e.preventDefault();
			playSomeSound(menuLink.innerHTML);
		};
	}
};