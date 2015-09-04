$(document).ready(function() {
	
	$("button").click(function() {
		//when button is clicked, change appearance
		$("button").removeClass("selected");
		$(this).addClass("selected");

		//AJAX request
		var flickrAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"; //jsonp request
		var animal = $(this).text();
		var flickrOptions = {
			tags: animal,
			format: "json"
		};
		//callback function
		function displayPhotos(data) {
			//write html to page
			var photoHTML = "<ul>";
			//go through each photo in feed and return as <li>
			$.each(data.items, function(i, photo) {
				photoHTML += '<li class="grid-25 tablet-grid-50">';
				photoHTML += '<a href="' + photo.link '" class="image">';
				photoHTML += '<img src="' + photo.media.m + '"></a></li>';
			});
			photoHTML += "</ul>";
			$('#photos').html(photoHTML);
		}
		$.getJSON(flickrAPI, flickrOptions, displayPhotos);
	});

}); // end ready