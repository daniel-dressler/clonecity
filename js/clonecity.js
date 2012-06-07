'use strict';
var PLOTWIDTH = 128;
var PLOTHEIGHT = 96;
var _playerselection = "res";
var money = 10000;
var population = 0;
var MSPERTICK = 100;
var ECONSCALE = 5;


var resAttr = {
	'cost': 100,
	'wealth': 0,
	'education': 0,
	'labour': 1,
	'name': 'res',
	'sign': 'R',
	};

var comAttr = {
	'cost': 300,
	'wealth': 10,
	'education': 0,
	'labour': 1,
	'name': 'com',
	'sign': 'C',
	};

var indAttr = {
	'cost': 500,
	'wealth': 50,
	'education': 0,
	'labour': 1,
	'name': 'ind',
	'sign': 'I',
	};

var desAttr = {
	'cost': 75,
	'name': 'des',
	};

var buildingTypes = {
	'res': resAttr,
	'com': comAttr,
	'ind': indAttr,
	};

var playerState = {
	'money': 10000,
	'population': 0,
	'selector': resAttr,
	'taxRate': 10,
	'demand': {
		'res':  1,
		'com':  1,
		'ind':  1,
		},
	};


$(document).ready(function() {
	//bind controls
	$("#world").bind("click", function(event) {
		plotClick(event, this);
	});
	
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
	
	var runGame = window.setInterval( function(){ 
		tick(); 
	}, MSPERTICK );


});

function plotClick(event, map) {
	var pl = playerState['selector'];
	var x = event.pageX - map.offsetLeft;
	var y = event.pageY - map.offsetTop;
	
	x = Math.floor(x / PLOTWIDTH) * PLOTWIDTH;
	y = Math.floor(y / PLOTHEIGHT) * PLOTHEIGHT;
	
	if(!plotEmpty(x/PLOTWIDTH,y/PLOTHEIGHT)) {
		if(playerState['selector']['name'] == 'des') {
			destroyPlot(x/PLOTWIDTH,y/PLOTHEIGHT);
			spend(pl.cost);
		}
		return false;
	}
	
	
	if(!canSpend(pl.cost) || pl.name == 'des')
		return false;
	
	var plot = $("\
	<div style='top:"+y+"px; left:"+x+"px;'\
	data-x='"+x/PLOTWIDTH+"' data-y='"+y/PLOTHEIGHT+"'\
	data-type='"+pl.name+"' data-density='low'\
	data-edu='"+pl.education+"' data-wealth='"+pl.wealth+"'\
	data-cost='"+pl.labour+"' data-gross='0' data-profit='0'\
	class='plot "+pl.name+" low'></div>");

	spend(pl.cost);
	placePlot(x, y, plot);
	calcEcon();
	return true;
}

function placePlot(x, y, plot) {
	$('#world').append(plot);
}

function destroyPlot(x, y) {
	$('.plot[data-x="'+x+'"][data-y="'+y+'"]').remove();
	calcEcon();
}

function plotEmpty(x, y) {
	return $('.plot[data-x="'+x+'"][data-y="'+y+'"]').length == 0;
}

function canSpend(ammount) {
	return ammount <= playerState['money'];
}

function spend(ammount) {
	return 0 <= (playerState['money'] -= ammount);
}

/* util math functions */
function distance(element, element2) {
	var deltaX = Math.abs(parseInt($(element).attr('data-x')) - 
				parseInt($(element2).attr('data-x')));
	
	
	var deltaY = Math.abs(parseInt($(element).attr('data-y')) - 
				parseInt($(element2).attr('data-y')));
	
	return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

function calcEcon() {
	//blank slate
	$('#world .plot').each(function() {
		$(this).attr('data-gross', 0).
			attr('data-cost', 0);
	});
	/*TODO:
	ind < com
	com < res
	farm < res
	
	*/
	$('#world .res').each(function() {
		var house = this;
		var gross = 0;
		$('#world .ind, #world .com, #world .farm').each(function() {
			var labourCost = ECONSCALE/distance(house, this); 
			
			//debit the money from the factory
			var existingCosts = parseInt($(this).attr('data-cost'));
			existingCosts += labourCost;
			$(this).attr('data-cost', existingCosts);
			
			gross += labourCost;
		});
		
		//calc expense
		var spending = 0;
		$('#world .com').each(function() {
			var expense = (ECONSCALE/distance(house, this)) * 3;
			if(spending + expense < gross * .9) {
				spending += expense;
				$(this).attr('data-gross', parseInt($(this).attr('data-gross')) + expense);
			}
		});
		
		
		$(this).attr('data-gross', gross);
		$(this).attr('data-cost', spending);
	});
	
	//Retail buys the product they sold from the factories
	$('#world .com').each(function() {
		var productVal = parseInt($(this).attr('data-gross'))*0.8;
		var costOfProduct = 0;
		var store = this;
		$('#world .ind').each(function() {
			if(productVal > 0) {
				var purchaseOrder = (ECONSCALE/distance(store, this));
				costOfProduct += purchaseOrder;
				productVal -= purchaseOrder;
				$(this).attr('data-gross', parseInt($(this).attr('data-gross') + purchaseOrder));
			}
		});
		
		$(this).attr('data-cost', costOfProduct);
	});
}

function tick() {
	var taxRate = $('#taxRate').val();
	playerState['taxRate'] = taxRate/100;



	$('#world .plot').each(function() {
		var cost = parseInt( $(this).attr('data-cost'));
		var gross = parseInt( $(this).attr('data-gross'));

		$(this).attr('data-profit', gross - cost );
	});

	$('#world .plot').each(function() {
		var wealth = parseInt( $(this).attr('data-wealth'));
		var profit = parseInt( $(this).attr('data-profit'));
		
		playerState['demand'][$(this).attr('data-type')] += profit;
		
		var afterTax = profit > 0 ?
		              	(1 - playerState['taxRate']) * profit :
		              	profit;
		playerState['money'] += profit - afterTax;
		
		wealth = wealth + afterTax;
		$(this).attr('data-wealth', wealth);
		if(wealth < -buildingTypes[$(this).attr('data-type')]['cost'])
			destroyPlot($(this).attr('data-x'), $(this).attr('data-y'));
	});
	
	$('#cashPanel span').text(Math.floor(playerState['money']));
	$('#taxPanel span').text(taxRate);
	updateDemandPanel();
	updateHappyPanel();
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
