// Interaction mirroring procedures

var hoverElemXY = [];
var visibleElem = [];

function buildMirroring() {
	
	buildHoverBindings(hoverElemIDs);
	buildCursor();
	
}

function buildHoverBindings(objs) {

	$.each(objs, function(key,obj){
		obj = obj.replace(/:hover/, "");
		var target = $(""+obj);
		target.each(function(){
			var clone = getClone($(this));
			$(this).on({
				mouseenter: function(){
					clone.addClass("hover"+prefix);
				},
					mouseleave: function(){
					clone.removeClass("hover"+prefix);
				}
			});
		});
	});
	
}

function destroyHoverBindings() {
	
	$(document).off({
		mousemove: hoverHandler
	});
	
}

function filterVisibleElements(objs) {
		
	var winH = $(window).height();
	var objArr = []; 
	
	$.each(objs, function(key, obj){
		if ( obj.trYStart <= winH ) objArr.push(obj);
	});
	
	return objArr;
	
}

function buildScrollBindings() {

	if (document.addEventListener) {
		document.addEventListener("mousewheel", scrollHandler, false);
		document.addEventListener("DOMMouseScroll", scrollHandler, false);
	} else {
		document.attachEvent("onmousewheel", scrollHandler);
	}
	
	function scrollHandler(e) {
		var e = window.event || e;
		var delta = e.wheelDelta || -e.detail;
		var curPos = parseInt($("."+prefix+"container").css("margin-top"));
		var winH = $(document).height();
		var docH = $("."+prefix+"container").height();
		var newPos = curPos+delta;
		var limit = docH - winH;
		
		if ( newPos <= 0 && newPos >= limit ) {
			$("."+prefix+"container").css({ marginTop: newPos });
		}
	
	}
	
}

function buildCursor() {
	
	originalContainer.prepend("<div id='"+prefix+"cursor_original' class='"+prefix+"cursor'></div>");
	cloneContainer.prepend("<div id='"+prefix+"cursor_clone' class='"+prefix+"cursor'></div>");
	
	$("."+prefix+"cursor").css({
		position: "absolute",
		width: "5px",
		height: "5px",
		"border-radius":"256px",
		background: "red",
		top:0,
		left: 0,
		zIndex: 1000,
		marginLeft: "5px",
		marginTop: "5px"
	});
	
	originalContainer.find("*").css({ cursor: "none" });
	cloneContainer.find("*").css({ cursor: "none" });
	
	originalContainer.on({
		mousemove: function(e){
		
			var winW = $(window).width();
					
			$("#"+prefix+"cursor_original").css({
				top: e.pageY,
				left: e.pageX
			});
			$("#"+prefix+"cursor_clone").css({
				top: e.pageY,
				left: e.pageX
			});
		}
	});
	
	$("."+prefix+"cursor").on({
		mouseenter: function() {
			$(this).css({
				zIndex: 0
			})
		},
		mouseleave: function(){
			$(this).css({
				zIndex: 10
			})
		}
	});
	
}


function buildObjCoordArray(objIDs, objPseudo) {
	
	var tIDs = [];
	var objSplitPatt = new RegExp(objPseudo,"gm");
	var targetData = [];
	var processedElemIDs = [];
	
	if ( objIDs !== null ) {
		$.each(objIDs, function(key,objID) {
			var objArr = objID.split(objSplitPatt);
			$.each(objArr, function(key,obj){
				obj = obj.replace(/,[\s]?/gm,"");
				if ( obj != " " ) tIDs.push(obj);
			});
		});
	}

	if ( tIDs !== null ) {
		
		$.each(tIDs, function(key,tID) {
			
			
			var target = originalContainer.find(""+tID);
			
			if ( target.length != 0 ) {
			
				target.each(function(){
		
					var tW = $(this).width() + parseInt($(this).css("padding-left")) + parseInt($(this).css("padding-right"));
					var tData = $(this).data(prefix+"elem_ID");
					var tPos = $(this).offset(); 
					var tH = $(this).height() + parseInt($(this).css("padding-top")) + parseInt($(this).css("padding-bottom"));
					var tML = parseInt($(this).css("margin-left"));
					var tMR = parseInt($(this).css("margin-right"));
					tW = tW/2 // Squizing the width by half
					
					if ( tPos.left !== 0 && tPos.right !== 0 && $.inArray(tData, processedElemIDs) == -1 ) {
						//console.log( tID + " :: " + $(this).html() + " :: " + tPos.left + " xx " + tPos.top + " yy " + tW + " ww " + tH + " hh ");
						targetData.push(buildArray( tID, tData, objPseudo, 0, 0, tML, tMR, tPos.left, tPos.left+tW, tPos.top, tPos.top+tH ));
						processedElemIDs.push(tData);
					}
					
				});
			
			}
			
		});
		
	}
	
	function buildArray(objID, objCloneID, objPseudo, initLvl, pseudoLvl, initML, initMR, trXStart, trXEnd, trYStart, trYEnd) {
		return {
			objID: objID,
			objCloneID: objCloneID,
			objPseudo: objPseudo,
			initLvl: initLvl,
			pseudoLvl: pseudoLvl,
			initML: initML,
			initMR: initMR,
			trXStart: trXStart,
			trXEnd: trXEnd,
			trYStart: trYStart,
			trYEnd: trYEnd,
		}
	}
	
	if ( targetData !== null ) {
		return targetData;
	} else {
		console.log("targetData is empty");
	}
		
}