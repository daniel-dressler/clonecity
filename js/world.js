'use strict';

function generateWorld(width, height)
{
	for(var posX = 0; posX <= width; posX += TILESIZE) {
		for(var posY = -0; posY <= height; posY += TILESIZE) {
				Crafty.e("2D, Canvas, "+mapPosToTile(posX, posY)).attr({x: posX, y: posY});
		}
		
	}
}

function mapPosToTile(x, y)
{
	x = x / 16;
	y = y / 16 ;
	var top_left =  perlin(x, y) + BIAS;
	var top_right = perlin(x + 1, y) + BIAS;
	var bot_left =  perlin(x, y + 1) + BIAS;
	var bot_right = perlin(x + 1, y + 1) + BIAS;
	
	var t = "";/* t for tile */
	/* This is a hardcoded trie tree */
	if (top_left < 0) {
		if (top_right < 0) {
			if (bot_left < 0) {
				if (bot_right < 0) {
					t = "dirt_center_empty";
				} else {
					t = "grass_corner_outside_top_left";
				}
			} else {
				if (bot_right < 0) {
					t = "grass_corner_outside_top_right";
				} else {
					t = "grass_corner_outside_top_center";
				}
			}
		} else {
			if (bot_left < 0) {
				if (bot_right < 0) {
					t = "grass_corner_outside_bottom_left";
				} else {
					t = "grass_corner_outside_center_left";
				}
			} else {
				if (bot_right < 0) {
					t = "grass_tuff";
				} else {
					t = "grass_corner_inside_bottom_right";
				}
			}
		}
	} else {
		if (top_right < 0) {
			if (bot_left < 0) {
				if (bot_right < 0) {
					t = "grass_corner_outside_bottom_right";
				} else {
					t = "grass_speck";
				}
			} else {
				if (bot_right < 0) {
					t = "grass_corner_outside_center_right";
				} else {
					t = "grass_corner_inside_bottom_left";
				}
			}
		} else {
			if (bot_left < 0) {
				if (bot_right < 0) {
					t = "grass_corner_outside_bottom_center";
				} else {
					t = "grass_corner_inside_top_right";
				}
			} else {
				if (bot_right < 0) {
					t = "grass_corner_inside_top_left";
				} else {
					/* Add varity */
					t = "grass_center_empty";
				}
			}
		}
	}
	
	return t;
}


var BIAS = 0.0;
var TILEMAPPERLIN = new SimplexNoise();
var persistence = 0.05;
var frequency = 0.07;
var amplitude  = 0.6;
var octaves = 1;
var randomseed = 0.123134;
function perlin(x, y)
{
	//properties of one octave (changing each loop)
    var t = 0.0;
    var _amplitude = 1;
    var freq = frequency;

    for(var k = 0; k < octaves; k++) 
    {
        t += TILEMAPPERLIN.noise(x * freq + randomseed, y * freq + randomseed) * _amplitude;
        _amplitude *= persistence;
        freq *= 2;
    }

    return t  + BIAS*_amplitude;
}
