//FOR HARIPRIYA
//input = string, e.g. "trombone"
//output = [x, y] where x,y are integers

//Dimensions of canvas
var height = 1500;
var width = 2500;
//So we're not right against any of the edges
var margin = 100;

//Defining Horizon - TO BE CHANGED LATER
var horizon = height / 2;

//Full Range of Objects to choose from (for reference, not actually used yet)
var world_objects = ["alarm_clock", "ambulance", "angel", "ant", 
				"backpack", "barn", "basket", "bear", "bee",
				"bicycle", "bird", "book", "brain",
				"bridge", "bulldozer", "bus", "butterfly", "cactus",
				"calendar", "castle", "cat",
				"chair", "couch", "crab", 
				"cruise_ship", "diving_board", "dog", "dolphin",
				"duck", "elephant", "eye", "face",
				"fan", "fire_hydrant", "firetruck", "flamingo", "flower",
				"frog", "garden", "hand",
				"hedgehog", "helicopter", "kangaroo", "key",
				"lantern", "lighthouse", "lion", "lobster",
				"map", "mermaid", "monkey", "mosquito",
				"octopus", "owl", "paintbrush", "palm_tree", "parrot",
				"passport", "peas", "penguin", "pig",
				"pineapple", "pool", "postcard", "power_outlet", "rabbit",
				"radio", "rain", "rhinoceros",
				"rifle", "roller_coaster", "sandwich", "scorpion", "sea_turtle",
				"sheep", "skull", "snail", "snowflake", "speedboat",
				"spider", "squirrel", "steak", "stove", "strawberry",
				"swan", "swing_set", "the_mona_lisa", "tiger", "toothbrush",
				"toothpaste", "tractor", "trombone", "truck", "whale",
				"windmill", "yoga"];


//Classifies as either sky or ground object - TO BE CHANGED LATER
function generate_context(object) {
	var sky_objects = ["angel", "bee", "bird", "butterfly", "helicopter", 
				"mosquito", "owl", "parrot", "rain", "snowflake","swan"];
	if (sky_objects.includes(object)){
		return "sky";
	} else{
		return "ground";
	}
}

//Generates location based on type of object
//Horizontal coordinate = randomized in {margin, width - margin}
//Vertical coordinate = randomized in {margin, horizon} if sky, 
//randomized in {horizon, height - margin} if ground
function getAssociatedLocation(object) {
	var sky_or_ground = generate_context(object);
	var x = Math.floor(Math.random()*(width-2*margin+1))+margin;
	if (sky_or_ground == "sky"){
		var y = Math.floor(Math.random()*(horizon-margin+1))+margin;
	} else {
		var y = Math.floor(Math.random()*(horizon-margin+1))+horizon;
	}
	return [x, y];
}

//DEBUG: x = {100, 2400}, y = {100, 750}
//console.log(getAssociatedLocation("angel"));
//DEBUG: x = {100, 2400}, y = {750, 1400}
//console.log(getAssociatedLocation("trombone"));