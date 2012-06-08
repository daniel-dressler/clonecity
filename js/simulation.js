'use strict';

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


function canSpend(ammount) {
	return ammount <= playerState['money'];
}

function spend(ammount) {
	return 0 <= (playerState['money'] -= ammount);
}

/* util math functions */
function distance(element1, element2) {
	var bld1 = getBldLoc(element1);
	var bld2 = getBldLoc(element2);

	//Pythagorean formula
	var deltaX = bld1.x - bld2.x;
	var deltaY = bld1.y - bld2.y;
		
	return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
}

function calcEcon() {
	//blank slate
	$('#world .plot').each(function() {
		setBldGross(this, 0);
		setBldCost(this, 0);
	});
	
	$('#world .res').each(function() {
		var house = this;
		var gross = 0;
		$('#world .ind, #world .com, #world .farm').each(function() {
			var labourCost = ECONSCALE/distance(house, this); 
			
			//debit the money from the factory
			var existingCosts = getBldCost(this);
			existingCosts += labourCost;
			setBldCost(this, existingCosts);
			
			gross += labourCost;
		});
		
		//calc expense
		var spending = 0;
		$('#world .com').each(function() {
			var expense = (ECONSCALE/distance(house, this)) * 3;
			if(spending + expense < gross * .9) {
				spending += expense;
				setBldGross(this, getBldGross(this) + expense);
			}
		});
		
		
		setBldGross(this, gross);
		setBldCost(this, spending);
	});
	
	//Retail buys the product they sold from the factories
	$('#world .com').each(function() {
		var productVal = getBldGross(this)*0.8;
		var costOfProduct = 0;
		var store = this;
		$('#world .ind').each(function() {
			if(productVal > 0) {
				var purchaseOrder = (ECONSCALE/distance(store, this));
				costOfProduct += purchaseOrder;
				productVal -= purchaseOrder;
				setBldGross(this, getBldGross(this) + purchaseOrder);
			}
		});
		
		setBldCost(this, costOfProduct);
	});
}

function tick() {
	var taxRate = $('#taxRate').val();
	playerState['taxRate'] = taxRate/100;


	$('#world .plot').each(function() {
		var cost = getBldCost(this);
		var gross = getBldGross(this);
		setBldProfit(this, gross - cost );
		
		
		var wealth = getBldWealth(this);
		var profit = getBldProfit(this);
		
		playerState['demand'][getBldType(this)] += profit;
		
		var afterTax = profit > 0 ?
		              	(1 - playerState['taxRate']) * profit :
		              	profit;
		playerState['money'] += profit - afterTax;
		
		wealth = wealth + afterTax;
		setBldWealth(this, wealth);
		if(wealth < -buildingTypes[getBldType(this)]['cost']) {
			sayMessage(this, "We are bankrupt!", 2);
			destroyPlot(this);
		} else if(wealth < 0) {
			sayMessage(this, "We are going bankrupt.", 2);
		}
	});
	
	updateCashPanel(Math.floor(playerState['money']))
	updateTaxPanel(taxRate)
	updateDemandPanel();
	updateHappyPanel();
	
	gcMessages();
}
