'use strict';
var ENTS = {};

window.onload = function() {
	Crafty.load(["art/grass.png, art/dirt.png, art/water.png,"
			   + " art/buildings.png"], function() {
		initSprites();
		init();
	});

	function init() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		
		Crafty.init(width, height);
		Crafty.canvas.init();
		generateWorld(width, height);
		
		
		Crafty.e("2D, Canvas, market_static").attr({x: 100, y: 100});
	};
};

