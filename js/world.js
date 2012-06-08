'use strict';


$(document).ready(function() {
	//bind building
	$("#world").bind("click", function(event) {
		plotClick(event, this);
	});
	
	//todo: add scrolling on click&drag + thumb&drag
});

function placePlot(plot) {
	$('#world').append(plot);
}

function destroyPlot(plot) {
	$(plot).remove();
	calcEcon();
}

function plotEmpty(x, y) {
	return $('.plot[data-x="'+x+'"][data-y="'+y+'"]').length == 0;
}

function cordFromLoc(loc) {
	return {
		x: loc.x * PLOTWIDTH,
		y: loc.y * PLOTHEIGHT,
	}
}
