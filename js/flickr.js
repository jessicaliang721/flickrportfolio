$(".gallerylink").click(function(event) {
	event.preventDefault();

	//AJAX request

	//data returned from Flickr is given to callback
	function displayPhotos(data) {
		var photoHTML = '';
		$.each(data.photoset.photo, function(i, item) {
			photoHTML += '<div class="col-xs-6 col-md-3 grid-item">';
			var img_link = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_z.jpg";
			photoHTML += '<a href="' + img_link + '" class="thumbnail">';
			var img_src = "http://farm" + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + "_n.jpg";
			photoHTML += '<img class="img-responsive" src="' + img_src + '" alt="' + item.title + '"></a></div>';
		});
		$('#img_gallery').html(photoHTML);

		// MASONRY

		$("#img_gallery").imagesLoaded(function() {
			$('#img_gallery').masonry({
			  // options
			  itemSelector: '.grid-item'
			});
		}).masonry('reloadItems');

		// LIGHTBOX

		var $image = $("<img>");
		var $overlay = $('<div id="overlay"></div>');
		var $caption = $("<p class='caption'></p>");
		var $previous = $("<span><a href='#'>PREVIOUS</a></span>");
		var $next = $("<span><a href='#'>NEXT</a></span>");

		$overlay.append($previous, $next);

		//add image to overlay
		$overlay.append($image);

		//add caption to overlay
		$overlay.append($caption);

		//add overlay to body
		$("body").append($overlay);
			//show an image
			//show a caption

		//capture the click event on a link to an image
		$("#img_gallery a").click(function(event) {
			event.preventDefault();
			var image_href = $(this).attr("href");
			//update overlay with the image linked in the link
			$image.attr("src", image_href);
			//show the overlay
			$overlay.show();
			//get child's alt attribute and set caption
			var captionText = $(this).children("img").attr("alt");
			//add text to the caption
			$caption.text(captionText);
		});

		$next.click(function() {
			event.preventDefault();
			console.log("clicked");

		});

		//when overlay is clicked
		$overlay.click(function() {
			//hide the overlay
			$overlay.hide();
		});
			
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
	