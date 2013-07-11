// Function to handle overlay contents

var contentOverlay;
var overlayVideo;

function buildContentOverlay(contentType, fileURL) {
	
	buildOverlay(contentType, fileURL);
	
}

function buildOverlay(contentType, fileURL) {
	
	if ( $("#"+prefix+"content_overlay").length == 0 ) {
		$("body").prepend("<div id='"+prefix+"content_overlay'></div>");
		
		contentOverlay = $("#"+prefix+"content_overlay");
		
		contentOverlay
			.css({
				position: "absolute",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				backgroundImage: "url('i/preloader.gif'), -webkit-radial-gradient(rgba(0,0,0,.8) 0%, rgba(0,0,0,.95) 100%)",
				backgroundPosition: "center center",
				backgroundRepeat: "no-repeat",
				zIndex: 10000,
				cursor: "none",
				opacity: 0
			}).animate({
				opacity: 1
			},500, function(){
				getContent(contentType, fileURL);
			});
	
		$(window).on({
			keydown: destroyOverlay
		});
		
	}
	
}
	
function destroyOverlay(e) {
	if ( e.keyCode == 27 ) {
		contentOverlay
			.stop()
			.animate({
				opacity:0
			},500, function(){
				contentOverlay.remove();
				$(window).off({ keydown: destroyOverlay });
			})
	}
}

function getContent(contentType, fileURL) {
	
	if ( contentType == "video" ) {
		
		contentOverlay.append("<video id='"+prefix+"overlay_video'src='"+fileURL+"' autoplay ></video>");
		overlayVideo = $("#"+prefix+"_overlay_video");
		
		overlayVideo.css({
			height: "100%",
			width: "100%"
		});
		
		buildVideoControls();
		
	}
	
}

function buildVideoControls() {
	
	contentOverlay.prepend("<div class='"+prefix+"controls_container' id='"+prefix+"controls_container_left'");
	$("."+prefix+"controls_container").css({
		
	});
	
	var controlsContLeft = $("#"+prefix+"controls_container_left");
	
}