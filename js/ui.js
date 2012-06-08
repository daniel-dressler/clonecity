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
	$("#farmButton").bind("click", function(event) {
		playerState['selector'] = farmAttr;
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
		var scale = 12;

		if(stats[type] >= 0) {
			topHeight = (stats[type] / mostProfit) * scale;
		} else {
			bottomHeight = (stats[type] / mostLoss) * scale;
		}
		$('#demandPanel .'+type + ' .top').css('height', topHeight+'px').css('margin-top', (scale - topHeight) + 'px');
		$('#demandPanel .'+type + ' .bottom').css('height', bottomHeight+'px').css('margin-bottom', (scale - bottomHeight) + 'px');
	}
	
	for(var type in stats) {
		stats[type] = 1;
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
