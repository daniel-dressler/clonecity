'use strict';

$(document).ready(function() {
	//bind menu buttons	
	$("#menu .btn").on("click tap touchstart", function(event) {
		event.preventDefault();
		switchMenuCard(this);
	});
});

function switchMenuCard( btn ) {
	var card = $(btn).attr('href');
	
	if (card == "hidemenu") {
		$("#menu_wrapper").hide();
		$("#controls").show();
		return;
	}
	
	$(".menucard").hide();
	$("#menucard-"+card).show();
}

