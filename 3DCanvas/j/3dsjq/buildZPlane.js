// Building zSpace

var zPlaneDefaultParams = {
	zMaxShift: 1.5,							// maximum allowed amount of shifting in %				int		
	zPlaneLevels: 5,						// the maximum number of zPlanes						int
	zPlaneScale: true,						// enabling/disabling scaling for zPlanes				boolean
	zPlaneScaleAmount: 10,					// amount of scaling in %s								int
	zPlaneAnim: true,						// enabling/disabling animation fot zPlane shifting		boolean
	zPlaneAnimDuration: 0.2,				// animation duration in seconds						int
}

var zParams
var shiftLimit;
var shiftStep;
var shiftScale;
var shiftAnim;
var shiftMaxLvl;
var sAD;
var initsSA;
var objArr = [];
var procElemArr = [];

function buildZPlane() {
	
	console.log("zPlane building is started ...");
	
	var winW = $(window).width();
	zParams = zPlaneDefaultParams;

	// Specifying the maximum limit for shifting according to incoming parameter

	shiftLimit = Math.round(((winW/100)*zParams["zMaxShift"])/2);
	shiftStep = Math.round(shiftLimit/zParams["zPlaneLevels"]);

	shiftScale = zParams["zPlaneScale"];
	shiftAnim = zParams["zPlaneAnim"];
	shiftMaxLvl = zParams["zPlaneLevels"]
	sAD = zParams["zPlaneAnimDuration"];
	initsSA = zParams["zPlaneScaleAmount"];
	
	if ( zPlaneShiftedObjs !== null ) {	
		$.each(zPlaneShiftedObjs, function(obj, level){
			buildObjParamArr(obj,level);
			zPlaneDisplace(obj);
		});
	}
	
}

function buildObjParamArr(obj,level) {

	var tID = obj;
	var tSplit = tID.split(/:/);
	var objID = tSplit[0];
	var objPseudo = tSplit[1];
	var target = originalContainer.find(objID);
	var procInd = false;
	var initLvl = 0;

	if ( objPseudo ) {
		$.each(procElemArr, function(key, val){
			if ( val["objID"] == objID ) {
				procInd = true;
			} else {
				procElemArr.push(objID, level);
			}
		});
	} else {		
		procElemArr.push({ objID: objID, level: level });
	}
	
	target.each(function(){
	
		function buildArray(objID, objZID, objPseudo, initLvl, pseudoLvl, initML, initMR) {
			return {
				objID: objID,
				objZID: objZID,
				objPseudo: objPseudo,
				initLvl: initLvl,
				pseudoLvl: pseudoLvl,
				initML: initML,
				initMR: initMR,
			}
		}
		
		var tML = parseInt($(this).css("margin-left"));
		var tMR = parseInt($(this).css("margin-right"));
		var objZID = $(this).data(prefix+"elem_ID");
		var pseudoLvl = 0;
		
		if ( !objPseudo ) {
			initLvl = level;
		} else {	
			pseudoLvl = level;
		}
		
		var obj = buildArray(objID, objZID, objPseudo, initLvl,  pseudoLvl, tML, tMR)
		
		objArr.push(obj);
		
	});
	
}

function zPlaneDisplace(objID) {

	var target;
	var tPseudo;
	var initML;
	var initMR;
	var initLvl;
	var pseudoLvl;
	
	var objIDSplit = objID.split(/:/);
	objID = objIDSplit[0];
	
	$.each(objArr, function(key, obj){
		
		var tID = obj["objID"];
		
		if ( tID == objID ) {
			tPseudo = obj["objPseudo"];
			initML = obj["initML"];
			initMR = obj["initMR"];
			initLvl = obj["initLvl"];
			pseudoLvl = obj["pseudoLvl"];
		}
		
	});
	
	target = $(""+objID);
	
	if ( tPseudo == "hover" ) {
		
		var tInitZ;
		var tParentInitZ;
		
		target.on({
			mouseenter: function(){
				tInitZ = $(this).css("z-index");
				tParentInitZ = $(this).parent().css("z-index");
				$(this)
					.css({ zIndex: 1000 })
					.parent()
					.css({ zIndex: 1000 });
				zPlaneShifter($(this), pseudoLvl, initML, initMR, tPseudo);
			},
			mouseleave: function(){
				$(this)
					.css({ zIndex: tInitZ })
					.parent()
					.css({ zIndex: tParentInitZ });
				zPlaneShifter($(this), initLvl, initML, initMR, tPseudo);
			}
		});
		
	} else {
	
		// Change here! Another change blah blah blah
		target.each(function(){
			zPlaneShifter($(this), initLvl, initML, initMR, tPseudo);	
		});
		
	}

}

function windowViolation(target,level) {

	var winW = $(window).width()/2;
	var tOffset = target.offset();
	var tShiftedOffset = tOffset.left-(level*shiftStep);

	if ( zParams["zPlaneScale"] == true ) {
		var sSA = 1+((initsSA)*(level/shiftMaxLvl))/100;
		var tW = target.width();
		var sDelta = ((tW*sSA)-tW)/2;
		tShiftedOffset = tShiftedOffset-sDelta;
	}

	if ( tShiftedOffset < 0 ) {
		console.log("WARNING: "+target.attr("class")+" violated the window by " + tShiftedOffset + "px");
		return true;
	} else {
		return false;
	}
	
}

function zPlaneShifter(target, level, initML, initMR, tPseudo) {
	
	sSA = 1+((initsSA)*(level/shiftMaxLvl))/100;
	var targetClone = getClone(target);
	
	var wViolation = windowViolation(target, level);
	
	if ( shiftAnim == true ) {
	
		var initAnim = target.css("-webkit-transition-property");
		var initAnimDur = target.css("-webkit-transition-duration");
	
		target.css({
			"-webkit-transition-property" : initAnim+", margin, -webkit-transform",
			"-webkit-transition-duration" : initAnimDur+", " +sAD+"s, " +sAD+"s",
			"-moz-transition-property" : initAnim+", margin, -webkit-transform",
			"-moz-transition-duration" : initAnimDur+", " +sAD+"s, " +sAD+"s",
			"transition-property" : initAnim+", margin, -webkit-transform",
			"transition-duration" : initAnimDur+", " +sAD+"s, " +sAD+"s",
		});
		targetClone.css({
			"-webkit-transition-property" : initAnim+", margin, -webkit-transform",
			"-webkit-transition-duration" : initAnimDur+", " +sAD+"s, " +sAD+"s",
			"-moz-transition-property" : initAnim+", margin, -webkit-transform",
			"-moz-transition-duration" : initAnimDur+", " +sAD+"s, " +sAD+"s",
			"transition-property" : initAnim+", margin, -webkit-transform",
			"transition-duration" : initAnimDur+", " +sAD+"s, " +sAD+"s",
		});
	
	}
		
	var deltaLeft;
	var deltaRight;
	var deltaCloneLeft;
	var deltaCloneRight;
	var deltaHS;
	var deltaVS;
	
	var tW = target.width();
	var tH = target.height();
	deltaHS = (tW*sSA)-tW;
	deltaVS = (tH*sSA)-tH;
	
	if ( level >= 0 ) {
	
		deltaLeft = initML+(level*shiftStep);
		deltaRight = initMR-(level*shiftStep);
		deltaCloneLeft = deltaRight;
		deltaCloneRight = deltaLeft;
	
	} else if ( level < 0 ) {
		
		deltaLeft = initML+(level*shiftStep);
		deltaRight = initMR-(level*shiftStep);
		deltaCloneLeft = deltaLeft/4;
		deltaCloneRight = deltaRight/4;	
		
	}
	
	target.css({
		marginLeft: deltaLeft,
		marginRight: deltaRight,
	});

	targetClone.css({
		marginLeft: deltaCloneLeft,
		marginRight: deltaCloneRight,
	});

	// Rescaling if enabled
	if ( shiftScale == true && sSA != 0 && tPseudo ) {			
		target.css({
			"-webkit-transform" : "scale("+sSA+")",
			"-moz-transform" : "scale("+sSA+")",
			"transform" : "scale("+sSA+")"
		});
		targetClone.css({
			"-webkit-transform" : "scale("+sSA+")",
			"-moz-transform" : "scale("+sSA+")",
			"transform" : "scale("+sSA+")"
		});
	}
	
}
