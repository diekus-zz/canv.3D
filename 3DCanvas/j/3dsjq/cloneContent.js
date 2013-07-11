// Cloning procedures

prefix = "_3dsjq_";
originalContainer = 0;
cloneContainer = 0;
processedIDs = [];

function cloneContent() {

	console.log("cloning is started");

	// 1.0. Splitting content into original and clone parts and applying styles
	
	$("html")
		.css({ height: "100%" })
		.find("body")
		.css({ height: "100%" })
		.wrapInner("<div id='"+prefix+"original' class='"+prefix+"split_part' /></div>");
	
	originalContainer = $("#"+prefix+"original");
	
	originalContainer
		.wrapInner("<div class='"+prefix+"container'>")
	
	// 1.1. Marking all the content inside the Original and attaching specific #ids
	
	var elemCount = 0;
	originalContainer.find("."+prefix+"container *").each(function(){
		$(this).data(prefix+"elem_ID",elemCount);
		elemCount++;
	});
	
	// 1.2. Cloning
	
	originalContainer
		.clone()
		.attr("id",prefix+"clone")
		.appendTo("body");
	
	cloneContainer = $("#"+prefix+"clone");
	
	var elemCount = 0;
	cloneContainer.find("."+prefix+"container *").each(function(){
		$(this).data(prefix+"elem_ID",elemCount);
		elemCount++;
	});
	
	$("."+prefix+"split_part").css({
		width: "50%",
		height: "100%",
		float: "left",
		"background-size": "100% 100%",
		"background-position": "center center",
		"background-repeat": "no-repeat",
		"overflow": "hidden",
		position: "relative",
	});
	$("."+prefix+"container").css({
		width: "50%",
		minHeight: "100%",
		marginLeft: "-50%",
		"-webkit-transform": "scaleX(0.5)",
		"-moz-transform": "scaleX(0.5)",
		"transform": "scaleX(0.5)",
	});
	
	// 1.2. Adjusting clone containers width
	
	var winW = $(window).width();
	var winH = $(window).height();

	var scrollW = 30; // Number to fix overflowY in case of the scroll appeared
	$("."+prefix+"container").width(winW); // Fixing the window width in case of scroll
	
	// 1.4. Enabling container scroll mirroring for main containers
		
	originalContainer.bind({
		scroll: function(){
			var scrollTop = $(this).scrollTop();
			cloneContainer.scrollTop(scrollTop);
		}
	});
	
	console.log("cloning is complete");
	
}

// Function to filter the target by [prefix]_elem_ID

function getTargetByID(targetID) {

	return originalContainer.find("*").filter(function(){ return $(this).data(prefix+"elem_ID") == targetID; });

}

// Function to filter the clone of the object

function getClone(target) {
	
	targetID = target.data(prefix+"elem_ID");
	return cloneContainer.find("*").filter(function(){ return $(this).data(prefix+"elem_ID") == targetID; });
	
}