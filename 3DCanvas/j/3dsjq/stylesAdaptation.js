// Parsing stylesheets
// NB: Works only online

hoverElemIDs = [];

function stylesAdaptation() {
	
	var stylesheets = [];
	var curURL = window.location.href;

	console.log("adaptation is started");

	$("html")
		.find("link[rel='stylesheet']")
		.each(function(){
			var styleURL = $(this).attr("href");
			stylesheets.push(styleURL);
		});

	if ( stylesheets !== "" ) {
	
		$.each(stylesheets, function(key, stylesheet){
		
			$.ajaxSetup({ cache: false }); // Prevents caching
			
			$.when($.get(stylesheet, "text")).done( function(response) {
				
				var inputCSS = response.toString();
				buildCloneStylesheet(inputCSS);				
			
			}).fail( function(){
			
				console.log( "   error occured: " + stylesheet + " cannot be opened" );
			
			});
		
		});
		
		console.log("adaptation is complete");
		
	}

}

function buildCloneStylesheet(inputCSS) {
	
	inputCSS = inputCSS.replace(/[\r]/gm," "); // Removing line breaks
	
	var ruleTypes = [ "id", "hover" ];
	var outputCSS = [];
	//console.log(inputCSS);
	
	$.each(ruleTypes, function(key, ruleType) {
		
		var rulePatt;
		var fetchRule;
		var fetchID;
	
		if (ruleType == "id") {
			rulePatt = new RegExp("(#(.*?),[\r\n])?#(.*?){(\n|.)*?}","gm");
			fetchID = new RegExp("#.[A-z|0-9|-]*", "g");
		} else if ( ruleType == "hover" ) {
			rulePatt = new RegExp("((.*:hover.*,[\\s])*)?.*hover.*{[\\s]*?.*[\\s]?}","gm");
			fetchID = new RegExp("(((.*hover,[\\s])*)?.*{)|(.*hover)", "g");
		}
		
		inputCSS = inputCSS.toString();
		var inputCSSRules = inputCSS.match(rulePatt);

		if ( inputCSSRules !== null ) {
				
			$.each(inputCSSRules, function(key, cssRule) {
				
				var cssID = cssRule.replace(/\{.*\}/g, "");
				var ruleIDs = cssID.match(fetchID);
				if ( ruleIDs !== null ) {
				
					$.each(ruleIDs, function(key, ruleID) {
					
						if ( ruleType == "id" ) {
								
							var ruleReplacePatt = new RegExp(ruleID,"g");
							var cloneID = ruleID+prefix+"clone";
							cssRule = cssRule.replace(ruleID, cloneID);		
						
						}
						
						if ( ruleType == "hover" ) {
							ruleID = ruleID.replace(/\{|\s\{/gm, "").replace(/[\r\n]/gm,"").replace(/:hover/gm,"");
							var idArr = ruleID.split(/,/);
							$.each(idArr, function(key, id){
								hoverElemIDs.push(id);
							});
						}
						
						cssRule = cssRule.replace(/:hover/gm, ".hover"+prefix);
						
					});
				
				}
				
				outputCSS.push(cssRule);
				
			});
			
		}
		
	});

	if ( outputCSS !== null ) {

		$("<style type='text/css' />")
			.html(outputCSS)
			.prependTo($("body"));
	
	}

}