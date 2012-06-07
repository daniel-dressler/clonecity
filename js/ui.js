'use strict';


$(document).ready(function() {
	//bind ui buttons	
	$("#resButton").bind("click", function(event) {
		playerState['selector'] = resAttr;
	});
	$("#comButton").bind("click", function(event) {
		playerState['selector'] = comAttr;
	});
	$("#indButton").bind("click", function(event) {
		playerState['selector'] = indAttr;
	});
	$("#desButton").bind("click", function(event) {
		playerState['selector'] = desAttr;
	});
});

function updateCashPanel(cash) {
	$('#cashPanel span').text(cash);
}

function updateTaxPanel(taxRate) {
	$('#taxPanel span').text(taxRate);
}

function updateDemandPanel() {
	var stats = playerState['demand'];
	var mostProfit = 0;
	var mostLoss = 0;
	for(var type in stats) {
		if(mostProfit < stats[type])
			mostProfit = stats[type];
		
		if(mostLoss > stats[type])
			mostLoss = stats[type];
	}
	
	for(var type in stats) {
		var topHeight = 0;
		var bottomHeight = 0;
		var scale = 20;

		if(stats[type] >= 0) {
			topHeight = (stats[type] / mostProfit) * 20;
		} else {
			bottomHeight = (stats[type] / mostLoss) * 20;
		}
		$('#demandPanel .'+type + ' .top').height(topHeight).css('margin-top', 20 - topHeight);
		$('#demandPanel .'+type + ' .bottom').height(bottomHeight).css('margin-bottom', 20 - bottomHeight);
	}
	
	for(var type in stats) {
		stats[type] = 0;
	}
	
}

function updateHappyPanel() {
	var tax = playerState['taxRate'] * 100;
	var smile = ")";
	if(tax > 80) { smile = "<"} else
	if(tax > 60) { smile = "{"} else
	if(tax > 40) { smile = "["} else 
	if(tax > 20) { smile = "|"} else 
	if(tax > 15) { smile = "]"} else 
	if(tax >=10) { smile = ")"} else
	if(tax >  5) { smile = "}"} else
	if(tax >= 0) { smile = ">"}
	
	$('#happyPanel span').text(smile);
}