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
		var $overlay = $('<div id="overlay">' + $content + '</div>');
		var $content = $('<div id="lightboxContent"></div>');
		var $caption = $("<p class='caption'></p>");
		var $previous = $("<button id='buttonPrev'>Previous</button>");
		var $next = $("<button id='buttonNext'>Next</button>");
		var image_href;
		//array will hold all of the references for img sources
		var imgRef = [];

		//iterate over every div with class "grid-item"
		$('div.grid-item').each(function(i, element) {
			//store the value of each href into imgRef array
			imgRef[i] = $(element).children("a").attr("href");
		});

		//add image to content div
		$content.append($image);

		//add caption to content div
		$content.append($caption);

		//add buttons to content div
		$content.append($previous);
		$content.append($next);

		//add overlay to body
		$overlay.append($content);
		$("body").append($overlay);

		//capture the click event on a link to an image
		$("#img_gallery a").click(function(event) {
			event.preventDefault();
			image_href = $(this).attr("href");
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
			//find out where href exists in array
			var loc = imgRef.indexOf(image_href);
			//increase location counter
			loc++;
			//if location larger than the indices of array
			if (loc === imgRef.length) {
				//restart from first image
				loc = 0;
			}
			//change the current image src variable
			image_href = imgRef[loc];
			//change src for current image in lightbox to this variable
			$image.attr("src", image_href);
			//change the caption to current image in lightbox
			var captionText = $('.grid-item a[href="' + image_href + '"]').children("img").attr('alt');
			$caption.text(captionText);
		});

		$previous.click(function() {
			var loc = imgRef.indexOf(image_href);
			loc--;
			if (loc < 0) {
				loc = imgRef.length-1;
			}
			image_href = imgRef[loc];
			$image.attr("src", image_href);
			var captionText = $('.grid-item a[href="' + image_href + '"]').children("img").attr('alt');
			$caption.text(captionText);
		})

		//when overlay is clicked
		$overlay.click(function(event) {
			//hide the overlay
			if (event.target.id === "overlay") {
				$(this).hide();
			}
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
	