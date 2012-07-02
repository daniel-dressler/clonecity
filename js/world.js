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
		
	if (num >  1.35)
		return "grass_tuff";
	if (num >  1.2)
		return "grass_speck";
	if (num >  0.9)
		return "grass_center_3week";
	if (num >  0.5)
		return "grass_center_2week";
	if (num >  0.2)
		return "grass_center_1week";
}

var BIAS = 0.0;
var TILEMAPPERLIN = new SimplexNoise();
var persistence = 0.7;
var frequency = 0.1;
var amplitude  = 0.1;
var octaves = 2;
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
