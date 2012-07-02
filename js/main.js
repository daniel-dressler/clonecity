'use strict';
var ENTS = {};

window.onload = function() {
	Crafty.load(["art/grass.png, art/dirt.png, art/water.png"], function() {
		initSprites();
		init();
	});

	function init() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		
		Crafty.init(width, height);
		Crafty.canvas.init();
		generateWorld(width, height);
	};
};

