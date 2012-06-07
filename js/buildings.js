'use strict';

var BUILDINGIDCOUNTER = 42;

function plotClick(event, map) {
	var pl = playerState['selector'];
	var x = event.pageX - map.offsetLeft;
	var y = event.pageY - map.offsetTop;
	
	//x&y are grid locations not pixels
	x = Math.floor(x / PLOTWIDTH);
	y = Math.floor(y / PLOTHEIGHT);
	
	if(!plotEmpty(x, y)) {
		if(playerState['selector']['name'] == 'des') {
			destroyPlot(getBldByLoc(x, y));
			spend(pl.cost);
		}
		return false;
	}
	
	
	if(!canSpend(pl.cost) || pl.name == 'des')
		return false;
	
	var plot = $("\
	<div data-id='"+ BUILDINGIDCOUNTER++ +"' \
	style='top:"+ y*PLOTHEIGHT +"px; left:"+ x*PLOTWIDTH +"px;'\
	data-x='"+x+"' data-y='"+y+"'\
	data-type='"+pl.name+"' data-density='low'\
	data-edu='"+pl.education+"' data-wealth='"+pl.wealth+"'\
	data-cost='"+pl.labour+"' data-gross='0' data-profit='0'\
	class='plot "+pl.name+" low'></div>");

	spend(pl.cost);
	placePlot(plot);
	calcEcon();
	return true;
}

//Encapsulate building data
function getBldById(id) {
	return $('.plot[data-id="'+ id +'"]');
}

function getBldByLoc(x ,y) {
	return $('.plot[data-x="'+x+'"][data-y="'+y+'"]');
}

//helper functions
function _getBldData(building, attribute) {
	return parseInt($(building).attr(attribute));
}

function _setBldData(building, attribute, newVal) {
	return $(building).attr(attribute, newVal);
}

//ID
function getBldId(building) {
	return _getBldData(building, 'data-id');
}

function setBldId(building, newVal) {
	return _setBldData(building, 'data-id', newVal);
}

//Location
function getBldLoc(building) {
	return {
		x: _getBldData(building, 'data-x'),
		y: _getBldData(building, 'data-y'), 
	}
}

//Type
function getBldType(building) {
	return $(building).attr('data-type');
}

//Wealth
function getBldWealth(building) {
	return _getBldData(building, 'data-wealth');
}

function setBldWealth(building, newVal) {
	return _setBldData(building, 'data-wealth', newVal);
}

//Gross
function getBldGross(building) {
	return _getBldData(building, 'data-gross');
}

function setBldGross(building, newVal) {
	return _setBldData(building, 'data-gross', newVal);
}

//Costs
function getBldCost(building) {
	return _getBldData(building, 'data-cost');
}

function setBldCost(building, newVal) {
	return _setBldData(building, 'data-cost', newVal);
}

//Profit
function getBldProfit(building) {
	return _getBldData(building, 'data-profit');
}

function setBldProfit(building, newVal) {
	return _setBldData(building, 'data-profit', newVal);
}





