'use strict';


$(document).ready(function() {
	var buttons = $("#controls .btn");
	buttons.not(".disabled").on(CLICKEVENTS, function(event) {
		event.preventDefault();
		buttons.removeClass("btn-info");
		$(this).addClass("btn-info");
	});
});
