$(".gallerylink").click(function(event) {
	event.preventDefault();

	//AJAX request

	//data returned from Flickr is given to callback
	function displayPhotos(data) {
		var photoHTML = '';
		$.each(data.photoset.photo, function(i, item) {
			photoHTML += '<div class="col-xs-6 col-md-3 grid-item"><a href="#" class="thumbnail">';
			var img_src = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_n.jpg";
			photoHTML += '<img class="img-responsive" src="' + img_src + '"></a></div>';
		});
		$('#img_gallery').html(photoHTML);

		$("#img_gallery").imagesLoaded(function() {
			$('#img_gallery').masonry({
			  // options
			  itemSelector: '.grid-item'
			});
		}).masonry('reloadItems');
	};

	if ($(this).text() === "Landscapes") {
		var URL = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=90dcd6f414146f765ff74fc61ac3c862&photoset_id=72157649155468204&user_id=117939554%40N04&format=json&nojsoncallback=1";
		$.getJSON(URL, displayPhotos);
	}

	else if ($(this).text() === "Urban") {
		var URL = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=90dcd6f414146f765ff74fc61ac3c862&photoset_id=72157651610962856&user_id=117939554%40N04&format=json&nojsoncallback=1";
		$.getJSON(URL, displayPhotos);
	}

	else if ($(this).text() === "People") {
		var URL = "https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=90dcd6f414146f765ff74fc61ac3c862&photoset_id=72157651476028602&user_id=117939554%40N04&format=json&nojsoncallback=1";
		$.getJSON(URL, displayPhotos);
	}
	
});
	