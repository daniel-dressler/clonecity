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
