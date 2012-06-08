'use strict';

function sayMessage(building, message, lifespan) {
	var loc = getBldLoc(building);
	var cord = cordFromLoc(loc);
	
	var html = '<div class="message lifespan'+lifespan+'" \
	style="z-index: '+getBldZ(building) + 1 +'; \
	top: '+cord.y+'px; left: '+cord.x+'px;" >\
	'+message+'\
	</div>';
	placePlot(html);
}

function gcMessages() {
	return;
}
