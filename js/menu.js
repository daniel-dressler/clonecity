'use strict';

$(document).ready(function() {
	//bind menu buttons	
	$("#menu a.btn").on(CLICKEVENTS, function(event) {
		event.preventDefault();
		switchMenuCard(this);
	});
});

function switchMenuCard( btn ) {
	var card = $(btn).attr('data-card');
	
	if (card == "hidemenu") {
		$("#menu_wrapper").hide();
		$("#controls").show();
		return;
	}
	
	$(".menucard").hide();
	$("#menucard-"+card).show();
}

