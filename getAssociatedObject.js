//FOR HARIPRIYA:
//input: string, e.g. "cat", OPTIONAL: probability distribution, e.g. [0.5, 0.3, 0.2]
//output: string, e.g. "dog"
//function to call: getAssociatedObject(world_objects, object, prob_dist = [0.5, 0.3, 0.2]);

//Full Range of Objects to choose from
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


//console.log(world_objects.length);
//console.log(generate_map(world_objects,"angel"));
//console.log(getAssociatedObject(world_objects,"angel"));
for (var i = 0; i < world_objects.length; i++){
	getAssociatedObject(world_objects,world_objects[i]);
}

function getAssociatedObject(world_objects, object, prob_dist = [0.3, 0.5, 0.2]){
	//Alternate prob_dist for testing purposes
	//prob_dist = [0.25, 0.15, 0.6]
	var layer = get_weighted_layer(prob_dist);
	//layer = 0;
	var map = generate_map(world_objects, object);
	//console.log(map);
	var map_layer = map[layer];
	if (map_layer.length==0){
		return map[0][Math.floor(Math.random() * map[0].length)]
	}
	var associatedObject = map_layer[Math.floor(Math.random() * map_layer.length)];
	console.log([object, layer, associatedObject]);
	resturn associatedObject;
}


//Generates a tree given the closest neighbors to the object
function generate_map(world_objects, object) {
    console.log(world_objects);
    console.log(object);
	var layer1 = generate_nearest_neighbors(world_objects, object);
	
	//Making layer 2
	var layer2 = [];
	for (var i = 0; i < layer1.length; i++){
		var neighbor = layer1[i];
		var neighbor_list = generate_nearest_neighbors(world_objects,neighbor);
		//console.log(neighbor_list);
		for (var j = 0; j < neighbor_list.length; j++){
			if (!(layer1.includes(neighbor_list[j]))) {
				layer2.push(neighbor_list[j]);
			}
		}
	}
	//console.log(layer2);

	//Making layer 3
	var layer3 = [];
	for (var i = 0; i < layer2.length; i++){
		var neighbor = layer2[i];
		var neighbor_list = generate_nearest_neighbors(world_objects,neighbor);
		for (var j = 0; j < neighbor_list.length; j++){
			if ((!(layer1.includes(neighbor_list[j]))) && (!(layer2.includes(neighbor_list[j])))) {
				layer3.push(neighbor_list[j]);
			}
		}
	}

	var map = [layer1, layer2, layer3]
	//map = [["1a", "1b", "1c"],["2a", "2b"],["3a", "3b", "3c", "3d"]];
	return map;
}

//Map to Closest Neighbors - TO BE CHANGED TO CONCEPT NET IN FUTURE
function generate_nearest_neighbors(world_objects, object) {
	var nearest_neighbors_dictionary = {
		"alarm_clock" : ["backpack", "bus", "calendar","power_outlet","radio"], 
		"ambulance" : ["angel","bicycle","bridge","bus","firetruck","helicopter","key","truck"], 
		"angel" : ["butterfly","castle","eye","face","lantern","mermaid","yoga"], 
		"ant" : ["basket","bee","butterfly","flower","garden","mosquito","sandwich","snail","spider"], 
		"backpack" : ["alarm_clock","book","bus","key","map","passport","trombone"], 
		"barn" : ["bulldozer","cat","dog","duck","garden","hedgehog","lantern","pig","rabbit","sheep","tractor","windmill"], 
		"basket" : ["ant", "bear", "bicycle", "butterfly", "flower", "hand", "garden","sandwich"], 
		"bear" : ["bee","butterfly","dolphin","elephant","flamingo","hedgehog","lion","monkey","octopus","owl","parrot","penguin","pig","rabbit","rhinoceros","sea_turtle","squirrel","swan","tiger"], 
		"bee" : ["ant","bear","bird","butterfly","flower","garden","mosquito","snail","spider"],
		"bicycle" : ["backpack","basket","bridge","bus","castle","fire_hydrant","map","monkey","truck"], 
		"bird" : ["bear","bee","butterfly","cat","parrot","peas","rabbit","squirrel","windmill"], 
		"book" : ["backpack","bus","castle","chair","couch","fan","hand","key","lantern","map","owl","radio","yoga"], 
		"brain" : ["backpack","book","bus","eye","face","map","skull","yoga"],
		"bridge" : ["bicycle","castle","cruise_ship","dolphin","duck","frog","garden","lantern","lighthouse","mermaid","pool","speedboat","swan","truck","whale"], 
		"bulldozer" : ["castle","fire_hydrant","helicopter","tractor","truck"], 
		"bus" : ["alarm_clock","ambulance","backpack","bicycle","book","bridge","cactus","castle","key","map","truck"], 
		"butterfly" : ["ant","bear","bee","bird","flower","garden","rabbit","snail"], 
		"cactus" : ["butterfly","flower","garden","kangaroo","scorpion","skull","windmill"],
		"calendar" : ["alarm_clock","fan","map"], 
		"castle" : ["bridge","bulldozer","bus","cat","firetruck","flamingo","flower","garden","helicopter","lantern","palm_tree","pool","rain","roller_coaster","snowflake","swan","swing_set"], 
		"cat" : ["bird","chair","couch","dog","parrot","rabbit","squirrel"],
		"chair" : ["backpack","book","cat","dog","fan","lantern","stove","trombone"], 
		"couch" : ["backpack","book","cat","dog","fan","stove"], 
		"crab" : ["dolphin","frog","lobster","octopus"], 
		"cruise_ship" : ["bird","bridge","bus","calendar","diving_board","dolphin","lighthouse","mermaid","palm_tree","penguin","postcard","speedboat","whale"], 
		"diving_board" : ["bridge","pool"], 
		"dog" : ["cat","fire_hydrant","rabbit","sheep","squirrel"], 
		"dolphin" : ["bear","bridge","cruise_ship","elephant","lion","mermaid","palm_tree","penguin","sea_turtle"],
		"duck" : ["barn","cat","flamingo","frog","hedgehog","pig","rabbit","rifle","sheep","swan"], 
		"elephant" : ["bear","flamingo","lion","monkey","rhinoceros","rifle","tiger"], 
		"eye" : ["brain","face","hand"], 
		"face" : ["brain","eye","flower","hand","mosquito","rain","toothbrush","toothpaste","trombone"],
		"fan" : ["chair","couch","radio","trombone"], 
		"fire_hydrant" : ["bulldozer","bus","dog","firetruck"], 
		"firetruck" : ["ambulance","barn","bulldozer","fire_hydrant","helicopter","rain","truck"], 
		"flamingo" : ["bear","bird","crab","elephant","frog","lion","palm_tree","tiger"], 
		"flower" : ["ant","basket","bee","bird","butterfly","cactus","garden","hedgehog","rabbit","rain","snail","spider"],
		"frog" : ["ant","bear","duck","garden","rain"], 
		"garden" : ["barn","bee","bird","bridge","butterfly","castle","chair","flower","hedgehog","lantern","mosquito","palm_tree","pig","pool","rabbit","rain","roller_coaster","sheep","snail","spider","squirrel","strawberry","swan","swing_set"], 
		"hand" : ["basket","bird","brain","butterfly","face","key","lantern","mosquito","paintbrush","parrot","sandwich"],
		"hedgehog" : ["bear","bird","flower","garden","rabbit","snail"], 
		"helicopter" : ["ambulance","bird","firetruck","palm_tree","rain","speedboat","truck"], 
		"kangaroo" : ["cactus","monkey"], 
		"key" : ["backpack","hand"],
		"lantern" : ["hand","map","parrot","radio"], 
		"lighthouse" : ["bridge","castle","cruise_ship","dolphin","firetruck","garden","lantern","lobster","mermaid","palm_tree","parrot","speedboat","whale"], 
		"lion" : ["bear","elephant","monkey","rhinoceros","rifle","sheep","tiger"], 
		"lobster" : ["basket","crab","dolphin","octopus","palm_tree","pineapple","sea_turtle"],
		"map" : ["calendar","cruise_ship","hand","lantern","lighthouse","paintbrush","passport","postcard","radio"], 
		"mermaid" : ["angel","bridge","crab", "dolphin","lobster","octopus","palm_tree","pool","sea_turtle","speedboat","whale"], 
		"monkey" : ["bear","bird","elephant","lion","rhinoceros","tiger"], 
		"mosquito" : ["ant","bee","butterfly","spider"],
		"octopus" : ["bear","dolphin","whale"], 
		"owl" : ["barn","bear","bird","rabbit","skull","snowflake"], 
		"paintbrush" : ["angel","bird","castle","chair","flower","hand","lantern","map","owl","skull","the_mona_lisa","trombone"], 
		"palm_tree" : ["bird","cactus","crab", "flower","garden","helicopter","mosquito","parrot","pineapple","postcard","rain","sea_turtle","speedboat","swing_set"], 
		"parrot" : ["bird","cat","dog","rabbit"],
		"passport" : ["backpack", "bicycle","bus","calendar","map","postcard"], 
		"peas" : ["duck","pineapple","strawberry"], 
		"penguin" : ["bear","bird","elephant","monkey","snowflake","whale"], 
		"pig" : ["bear","rabbit","rifle","sheep"],
		"pineapple" : ["flower","palm_tree","peas","sandwich","strawberry"], 
		"pool" : ["bridge","castle","diving_board","duck","flamingo","garden","mermaid","mosquito","palm_tree","swing_set"], 
		"postcard" : ["book","map","passport"], 
		"power_outlet" : ["alarm_clock","fan","radio","stove","toothbrush","toothpaste"], 
		"rabbit" : ["bear","bird","butterfly","cat","dog","duck","flower","garden","owl","rifle","squirrel"],
		"radio" : ["alarm_clock","bus","chair","couch","paintbrush","power_outlet"], 
		"rain" : ["bicycle","bird","bus","cactus","flower","frog","garden","palm_tree","pool","snowflake"], 
		"rhinoceros" : ["bear","bird","elephant","flamingo","lion","monkey","rifle","tiger"],
		"rifle" : ["bird","elephant","lion","rabbit","squirrel","swan"], 
		"roller_coaster" : ["rain","swing_set"], 
		"sandwich" : ["ant","basket","peas","steak","stove"], 
		"scorpion" : ["ant","cactus","spider"], 
		"sea_turtle" : ["crab","dolphin","flamingo","frog","lobster","mermaid","octopus","palm_tree","pineapple","whale"],
		"sheep" : ["duck","garden", "pig","rabbit"], 
		"skull" : ["ambulance", "angel","brain","lion","rifle","scorpion"], 
		"snail" : ["ant","bee","butterfly","spider"], 
		"snowflake" : ["garden","rain"], 
		"speedboat" : ["bridge","duck","helicopter","lighthouse","mermaid","palm_tree"],
		"spider" : ["ant","bee","book","butterfly","garden","snail"], 
		"squirrel" : ["bear","bird","butterfly","cat","duck","flower","garden","palm_tree","rabbit","rifle"], 
		"steak" : ["dog","lobster","peas","pineapple","sandwich","stove"], 
		"stove" : ["bird","chair","couch","crab","fan","lantern","lobster","peas","pineapple","power_outlet","radio","sandwich","steak"], 
		"strawberry" : ["flower","garden","peas","pineapple","sandwich","steak"],
		"swan" : ["bird","duck","flower","frog","garden","rain","rifle","snowflake","speedboat"], 
		"swing_set" : ["bird","garden","pool","rain","roller_coaster","spider"], 
		"the_mona_lisa" : ["paintbrush"], 
		"tiger" : ["bear","lion","monkey","rhinoceros","rifle"], 
		"toothbrush" : ["alarm_clock","chair","fan","key","power_outlet","radio"],
		"toothpaste" : ["alarm_clock","fan","radio"], 
		"tractor" : ["barn","bulldozer","rabbit","sheep","truck"], 
		"trombone" : ["chair", "couch"], 
		"truck" : ["ambulance","barn","bicycle","bulldozer","firetruck","helicopter","key","sheep"], 
		"whale" : ["crab","cruise_ship","dolphin","lobster","mermaid","octopus","penguin","rain","sea_turtle"],
		"windmill" : ["barn","bird","cactus"], 
		"yoga" : ["alarm_clock","angel","brain","face","fan","paintbrush","radio","rain"]};

	//nearest_neighbors_dictionary = {
	//	"angel" : ["1a", "1b", "1c"],
	//	"1a" : ["1b", "2a"],
	//	"1b" : ["2b"],
	//	"1c" : [],
	//	"2a" : ["3a", "3b", "3c", "3d"],
	//	"2b" : ["1a", "1b", "1c"]
	//};

	return nearest_neighbors_dictionary[object];
}

//Helper function for get_weighted_layer
function pdf_to_cdf(pdf){
	var cdf = Array(pdf.length);
	cdf[0] = pdf[0];
	for (var i = 1; i < pdf.length; i++){
		cdf[i] = cdf[i-1] + pdf[i];
	}
	return cdf
}

//Given a prob_dist, generate the layer to access with the weight of the prob_dist on each layer
function get_weighted_layer(pdf){
	var rand = Math.random();
	var cdf = pdf_to_cdf(pdf);
	for (var i = 0; i < cdf.length; i++){
		if (rand < cdf[i]){
			return i;
		}
	}
	return "Error: get_weighted_layer";
}

