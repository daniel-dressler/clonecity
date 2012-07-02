'use strict';

function initSprites()
{
	initGrass();
	initDirt();
	initWater();
}


function initGrass()
{
	var SPRITES_GRASS = {
		grass_tuff: [0,0],
		grass_speck: [0,1],
		
		grass_corner_inside_top_left: [1,0],
		grass_corner_inside_top_right: [2,0],
		grass_corner_inside_bottom_left: [1,1],
		grass_corner_inside_bottom_right: [2,1],
		
		grass_corner_outside_top_left: [0,2],
		grass_corner_outside_top_center: [1,2],
		grass_corner_outside_top_right: [2,2],
		grass_corner_outside_center_left: [0,3],
		grass_corner_outside_center_right: [2,3],
		grass_corner_outside_bottom_left: [0,4],
		grass_corner_outside_bottom_center: [1,4],
		grass_corner_outside_bottom_right: [2,4],
		
		
		grass_center_empty: [1,3],
		grass_center_3week: [0,5],
		grass_center_2week: [1,5],
		grass_center_1week: [2,5],
		
	};
	
	Crafty.sprite(TILESIZE, "art/grass.png", SPRITES_GRASS);
}

function initDirt()
{
	var SPRITES_DIRT = {
		dirt_tuff: [0,0],
		dirt_speck: [0,1],
		
		dirt_corner_inside_top_left: [1,0],
		dirt_corner_inside_top_right: [2,0],
		dirt_corner_inside_bottom_left: [1,1],
		dirt_corner_inside_bottom_right: [2,1],
		
		dirt_corner_outside_top_left: [0,2],
		dirt_corner_outside_top_center: [1,2],
		dirt_corner_outside_top_right: [2,2],
		dirt_corner_outside_center_left: [0,3],
		dirt_corner_outside_center_right: [2,3],
		dirt_corner_outside_bottom_left: [0,4],
		dirt_corner_outside_bottom_center: [1,4],
		dirt_corner_outside_bottom_right: [2,4],
		
		
		dirt_center_empty: [1,3],
		dirt_center_3week: [0,5],
		dirt_center_2week: [1,5],
		dirt_center_1week: [2,5],
		
	};
	
	Crafty.sprite(TILESIZE, "art/dirt.png", SPRITES_DIRT);
}

function initWater()
{
	var SPRITES = {
		water_tuff: [0,0],
		water_speck: [0,1],
		
	};
	
	Crafty.sprite(TILESIZE, "art/water.png", SPRITES);
}
