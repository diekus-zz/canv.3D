// 3DS Content Converter 
// by Alexey Chistyakov
// Started on 01.02.2013

// Known issues:
// 1. Some js scripts might not work and need to be triggered once again
// 2. Chrome has the anti-aliasing bug issue when elements are transformed

// ==============================================================================


// Global vars

$.ajaxSetup({ cache: false }); // Prevents caching

var defaultParams = {
		customCursor: true, 						// enabling/disabling custom cursor  					boolean
		customCursorURL: "./i/cursor_icon.png",		// URL to get the custom cursor							string
		cursorExtend: true,							// always put cursor to the top zPlane					boolean
		zPlaneParams: {
			zMaxShift: 1.5,							// maximum allowed amount of shifting in %				int		
			zPlaneLevels: 5,						// the maximum number of zPlanes						int
			zPlaneScale: true,						// enabling/disabling scaling for zPlanes				boolean
			zPlaneScaleAmount: 10,					// amount of scaling in %s								int
			zPlaneAnim: true,						// enabling/disabling animation fot zPlane shifting		boolean
			zPlaneAnimDuration: 0.2,				// animation duration in seconds						int
		},
		zPlaneShiftedObjs: {
			"#box2" : 5,
			"#box3:hover" : 5,
			"#box4:drag" : 5,
			"h1" : 5,
			"img:drag" : 5
		}
}

var jsURLs = [];
var zPlaneShiftedObjs = {
    "b":3,
	".item:hover" : 3,
	".aside_navigation" : 3,
	".main_navigation" : 3,
	".footer" : 3
}

function loadCloneContent() {
	
	var cloneContentURL = "j/3dsjq/cloneContent.js";   
	
	$.getScript(cloneContentURL, function(){
		console.log("cloneContent() is loaded ...");
		cloneContent();
		loadStylesAdaptation();
	});
	
}

function loadStylesAdaptation() {
	
	var stylesAdaptationURL = "j/3dsjq/stylesAdaptation.js";   
	
	$.getScript(stylesAdaptationURL, function(){
		console.log("stylesAdaptation() is loaded ...");
		stylesAdaptation();
		loadZPlaneBuilder();
		loadMirroring();
		loadScripts(jsURLs);
		loadContentOverlayBuilder();
	});
	
}

function loadMirroring() {

	var buildMirroringURL = "j/3dsjq/buildMirroring.js";   
	
	$.getScript(buildMirroringURL, function(){
		console.log("buildMirroring() is loaded ...");
		buildMirroring();
	});
	
}

function loadZPlaneBuilder() {

	var buildZPlaneURL = "j/3dsjq/buildZPlane.js";
	$.getScript(buildZPlaneURL, function(){
		console.log("buildZPlane() is loaded ...");
		buildZPlane();
	});
	
}

function loadContentOverlayBuilder() {

	var buildContentOverlayURL = "j/3dsjq/buildContentOverlay.js";
	$.getScript(buildContentOverlayURL, function(){
		console.log("buildContentOverlay() is loaded ...");
	});
	
}

function loadScripts(jsURLs) {
	
	$.each(jsURLs, function(key, URL){
		$.getScript(URL, function(){
			console.log(URL + " is loaded ...");
		});
	});
	
}

function init() {

	loadCloneContent();
	
}

$(window).on({
	load: init,
})