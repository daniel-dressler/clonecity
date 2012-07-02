'use strict';

function generateWorld(width, height)
{
	var t = '';
	for(var posX = 0; posX <= width; posX += TILESIZE) {
		for(var posY = -0; posY <= height; posY += TILESIZE) {
				t = mapPosToTile(posX, posY);
				if (!!t)
					Crafty.e("2D, Canvas, "+t).attr({x: posX, y: posY});
		}
		
	}
}

function mapPosToTile(x, y)
{
	x = x / 16;
	y = y / 16 ;
	var num = perlin(x, y) % 2;
	if (num < -0.9)
		return "dirt_tuff";
	if (num < -0.8)
		return "dirt_speck";
	if (num >  0.99)
		return "dirt_center_3week";
	if (num >  0.7)
		return "dirt_center_2week";
	/*if (num >    0.5)
		return "dirt_center_1week";
	
	
	/*
	var top_left = Number(perlin(x-1, y-1) > 0);//is grass if > 0?
	var top_center = Number(perlin(x,   y-1) > 0);
	var top_right = Number(perlin(x+1, y-1) > 0);
	
	var center_left = Number(perlin(x-1,   y) > 0);
	var center_center = Number(perlin(x,     y) > 0);
	var center_right = Number(perlin(x+1,   y) > 0);
	
	var bottom_left = Number(perlin(x-1, y+1) > 0);
	var bottom_center = Number(perlin(x,   y+1) > 0);
	var bottom_right = Number(perlin(x+1, y+1) > 0);
	
	if (!center_center)
		return "dirt_center_empty";

   /* cord[-1][-1] + cord[ 0][-1] + cord[+1][-1]
    * cord[-1][ 0]                + cord[+1][ 0]
    * cord[-1][+1] + cord[ 0][+1] + cord[+1][+1]
	*/

	//smoothing
	/*
	if (!top_left && !top_right)
		top_center = 0;
	if (!bottom_right && !top_right)
		center_right = 0;
	if (!bottom_right && !bottom_left)
		bottom_center = 0;
	if (!bottom_left && !top_left)
		center_left = 0;
	*//*
	
	var t = "" + top_center + center_right + bottom_center + center_left;
	
	//console.log(t);
	return TILEMAP[t];
	*/
}

var BIAS = 0.0;
var TILEMAPPERLIN = new SimplexNoise();
var persistence = 0.15;
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

    return t;
}
