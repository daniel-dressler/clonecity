'use strict';
var messageHistory = {};

function sayMessage(building, message, lifespan, timeout) {
	var loc = getBldLoc(building);
	var cord = cordFromLoc(loc);
	var messageId = message+ loc.x + loc.y;
	
	if(isMessagePresent(cord))
		return;//a message is already being shown
	
	if(messageHistory[messageId] > Date.now() )
		return;//timeout not expired
	
	var html = '<div class="message lifespan'+lifespan+'" \
	style="z-index: '+getBldZ(building) + 1 +'; \
	top: '+cord.y+'px; left: '+cord.x+'px;" \
	data-y="'+cord.y+'" data-x="'+cord.x+'" >\
	'+message+'\
	</div>';
	placePlot(html);
	messageHistory[messageId] = Date.now() + timeout*1000;
}



function isMessagePresent(cord) {
	return $('.message[data-x="'+cord.x+'"][data-y="'+cord.y+'"]')
						.not(function() {
							return parseInt($(this).css('opacity')) == 0;
						}).length > 0;
}

function gcMessages() {
	//remove hidden messages
	$(".message").not(function(index) {
		return (parseInt($(this).css("opacity")) > 0);
	}).remove();
	
	//remove old message timeout data
	for(var messageId in messageHistory) {
		if(messageHistory[messageId] + 6000 < Date.now() ) {
			delete messageHistory[messageId];
		}
	}
}
