var paths = [];
var statetopath = {0: []};
var color = "rgb(0, 0, 0)";
var canvas;
var mouses2 = [];
var currentCanv;
var globalbool = false;
var globaltwice = false;
var ptouchIsDown;
var pmouseIsPressed;
var listyforpoints = [];
var relatedObj;
var modeluse;
var undobool = false;
var prob_dist = [0.3, 0.5, 0.2];
var userID = Math.floor(Math.random() * 10000000000); //Generates random user ID (up to 10 digits)
var gender;
var age_range;
var center_x;
var center_y;
var object_history = [];

var original_x = 0;
var original_y = 0;
var new_x = 0;
var new_y = 0;
var original_width = 512;
var original_height = 512;
var new_width = 512;
var new_height = 512;
var scale_ratio = 1;

var cvsStk;
var current_layer_ID = "defaultCanvas0";
var drawing_layer_ID = "defaultCanvas0";
var layer_history = [];
var number_of_objects = 0;

var historyforpts = {
    listyforpoints: [],
    counter: 1,
    saveState: function() {
    	if(undobool == false  && globaltwice == false){
			var dataURL = document.getElementById("defaultCanvas0").toDataURL();
			listyforpoints.push(dataURL);
		}
		undobool = false;
      },
    undo: function(){
    	  listyforpoints.pop();
    	  globalbool = false;
    	  globaltwice = false;
    	  undobool = true;
    	  setup();
    	  listyforpoints.pop();
    	  listyforpoints.pop();
    	  newcan = listyforpoints[listyforpoints.length-1];
		  var image=new Image();
		  image.onload=function(){
			drawingContext.drawImage(image, 0, 0, 1250, 750);
			};
		image.src = newcan;
	},
	 clearly: function(){
	 	globalbool = false;
	 	globaltwice = false;
	 	setup();
	 	listyforpoints = [];
	 	
	 },
	 savepath: function(){
	    var dataURL = document.getElementById("defaultCanvas0").toDataURL();

    	var content = "";
		var pathsJoin = '';
		  paths.forEach(function(row, index){
			pathsJoin += "[" + row.toString()  + "],";
		  });
		  pathsJoin = pathsJoin.slice(0,-1);
		  pathsJoin = "[[" + pathsJoin + "]]"
		  //check size of imagedata

		  //var listyforpointsJoin = listyforpointsdata.join();
		  //listyforpointsJoin = "[" + listyforpointsJoin + "]";
		  //console.log(listyforpointsJoin)
		  content = pathsJoin + "\n" + dataURL;
		  //console.log(content);

		  //paths.forEach(function(point, index) {
		  //  content += point.join(",") + "\n";
		  //});

		// OLD DOWNLOAD CODE (txt of paths)
		//return encodeURI(content);
		//   var a         = document.createElement('a');
 		//a.href        = 'data:attachment/csv,' +  encodeURI(content);
 		//a.href        = 'data:attachment/csv,' +  content;
 		//a.target      = '_blank';
 		//a.download    =  "demoday.txt";
 		//document.body.appendChild(a);
 		//a.click();


 		//GENERATE PROBABILITY DISTRIBUTION - BINOMIAL, n = 2
 		var slider = document.getElementById("slider").value;
 		var p = slider / 100;
		//first value
		var prob0 = (1-p) * (1-p);
		//second value
		var prob1 = 2 * p * (1-p);
		//third value
		var prob2 = 1 * p * p;

		prob_dist = [prob0, prob1, prob2]; //REMINDER TO ADD NORMALIZATION CHECK 
		console.log(prob_dist);
		$.get('textfile.txt', function(data){
		    var object = data.toString();
		    console.log(object);
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
	    relatedObj = getAssociatedObject.getAssociatedObject(world_objects, object, prob_dist = [0.5, 0.3, 0.2]);
	    console.log(relatedObj);
		}, 'text');


		currentCanv  = document.getElementById("defaultCanvas0").toDataURL();
	    if (dicty[relatedObj]["model_raw_data"] == undefined){
	      var image=new Image();
		  image.onload=function(){
			drawingContext.drawImage(image, 0, 0, 500, 500);
		};
		  image.src = dicty[relatedObj]["imagedata"];
	    }
	    else{
			globalbool = true;
			globaltwice = true;
			modeluse = dicty[relatedObj]["model_raw_data"];
			setup();
		}
	    //alert(similar);

	    //paths = [];
	 },
	 startover: function(){
	 	paths = [];
	 },
    };



    
function undo(){
    historyforpts.undo();
}

function cleary(){
		var truefalse = prompt("Are you sure you want to clear your work? Cannot be undone.", "Yes");
		if (truefalse == "Yes"){
		historyforpts.clearly();
		cvsStk.deleteAllLayers();
		cvsStk = undefined;
		}
}

function beginy(){
		historyforpts.savepath();
}

function startyd(){
		historyforpts.startover();
}

function downloadimage(){
	gender = document.getElementById("gender").value;
 	age_range = document.getElementById("age_range").value;

 	var defaultCanvas0ctx = document.getElementById("defaultCanvas0").getContext("2d");
 	var defaultCanvas0imagedata = defaultCanvas0ctx.getImageData(0, 0, 2500, 1500);

 	var current_canvas = document.getElementById(current_layer_ID);
 	var current_canvas_ctx = current_canvas.getContext("2d");
 	
 	//Remove section and replace with last line for nonscaled pages
 	var half_canvas = document.createElement("canvas");
 	half_canvas.width = 2500;
 	half_canvas.height = 1500;
 	var half_canvas_ctx = half_canvas.getContext("2d");
 	half_canvas_ctx.drawImage(defaultCanvas0, 0, 0, 1250, 750);
 	var half_canvas_image_data = half_canvas_ctx.getImageData(0, 0, 2500, 1500);
 	current_canvas_ctx.putImageData(white2transparentImageData(half_canvas_image_data), 0, 0);
 	
 	//var current_filter_image_data = white2transparentImageData(defaultCanvas0imagedata); //TO REPLACE
 	//current_canvas_ctx.putImageData(current_filter_image_data, 0, 0, 0, 0, 1250, 750); //TO REPLACE

	//Find the center of userdrawn image
	var imagedataarray1D = defaultCanvas0imagedata.data;
	var imagedataarray2D = [];

	if (object_history.length == 0){
		object_history.push(defaultCanvas0imagedata.data);
	} else {
		object_history.push(defaultCanvas0imagedata.data);
		lastimagedataarray1D = object_history[object_history.length - 1];
	}

    var list_nonzero_x = [];
    var list_nonzero_y = [];
    for (var i=0;i<imagedataarray1D.length;i+=4){ //WILL BREAK WITH COLOR
    	if (imagedataarray1D[i] != 0 & imagedataarray1D[i] != 255){
    		list_nonzero_x.push((i*0.25)%defaultCanvas0imagedata.width);
    		list_nonzero_y.push(Math.floor((i*0.25)/defaultCanvas0imagedata.width));
    	}
    }

    var min_x = Math.min.apply(Math,list_nonzero_x);
    var max_x = Math.max.apply(Math,list_nonzero_x);
    var min_y = Math.min.apply(Math,list_nonzero_y);
    var max_y = Math.max.apply(Math,list_nonzero_y);
    var range_x = max_x - min_x;
    var range_y = max_y - min_y;
    var ratio_x = range_x / 512;
    var ratio_y = range_y / 512;

    scale_ratio = Math.max(ratio_x, ratio_y) * 1.2;
    center_x = 0.5*(max_x + min_x);
    center_y = 0.5*(max_y + min_y);

 	//Checks that crop is within range
 	var crop_top = Math.floor(center_y) - Math.ceil(256*scale_ratio);
 	if (crop_top < 0){ 
 		crop_top = 0;
 	} else if (crop_top > (1500 - 256*scale_ratio)){
 		crop_top = 1500-256*scale_ratio;	
 	}
 	var crop_left = Math.floor(center_x) - Math.ceil(256*scale_ratio);
 	if (crop_left < 0){ 
 		crop_left = 0;
 	} else if (crop_left > (2500 - 256*scale_ratio)){
 		crop_left = 2500-256*scale_ratio;
 	}
 	
 	//Makes the cropped canvas
 	var crop_canvas = document.createElement("canvas");
 	crop_canvas.width = 512;
 	crop_canvas.height = 512;

 	//Redraws image to the cropped 512x512 canvas
 	var crop_ctx = crop_canvas.getContext("2d");
 	crop_ctx.fillStyle = 'white';
 	crop_ctx.fillRect(0, 0, 512, 512);

 	var defaultimageobject = new Image();
 	defaultimageobject.src = document.getElementById("defaultCanvas0").toDataURL("image/png");
 	//document.body.appendChild(defaultimageobject);
    defaultimageobject.onload = function(){
    	//crop_ctx.drawImage(defaultimageobject, 0, 0, 800, 800, 0, 0, 512, 512);
    	original_x = crop_left;
    	original_y = crop_top;
    	new_x = 0;
    	new_y = 0;

    	//Resolve border issue on the top and left
    	if (crop_left <= 2){ //WILL CAUSE MINOR ISSUES WITH RESCALE BACK TO ORIGINAL IMAGE
    		original_x = 2;
    	}
    	if (crop_top <= 2){ //WILL CAUSE MINOR ISSUES WITH RESCALE BACK TO ORIGINAL IMAGE
    		original_y = 2;
    	}

    	original_width = Math.ceil(512*scale_ratio);
    	original_height = Math.ceil(512*scale_ratio);

    	new_width = 512;
    	new_height = 512;

    	//Hopefully resolves border issue on the bottom and right
    	if (crop_left + original_width > 2500){
    		new_width = (2500 - crop_left - 4)/original_width * 512;
    		original_width = 2500 - crop_left - 4;
    	}
    	if (crop_top + original_height > 1500){
    		new_height = (1500 - crop_top - 4)/original_height * 512;
    		original_height = 1500 - crop_top - 4;
    	}
    	//defaultCanvas0ctx.fillStyle = "#FF9900";
    	//defaultCanvas0ctx.fillRect(original_x/2, original_y/2, original_width/2, original_height/2);
    	crop_ctx.drawImage(defaultimageobject, original_x, original_y, original_width, original_height, new_x, new_y, new_width, new_height);
    	//console.log(crop_ctx.getImageData(0, 0, 512, 512).data);
    	var a         = document.createElement('a');
 		a.href        = crop_canvas.toDataURL();
 		//a.download    =  userID + "-" + gender + "-" + age_range + ".jpg";
 		a.download    =  "color3.png";
 		a.click();
    }	
}

//NOTE SECURITY ISSUES: https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
//NEED TO RUN to work: python3 -m http.server
//Then navigate to: http://localhost:8000/creARcopy.html
function colorimage(){
	var colorimageobject = new Image(512, 512);
 	//console.log(original_x);
 	//console.log(original_y);
 	//console.log(scale_ratio*512);
 	colorimageobject.onerror = function(){
 		alert("No color image to overlay! Setting to default colored image.");
 		colorimageobject.src = "transparent.png";
 	}

 	colorimageobject.onload = function(){
 		var filterImageData = image2imageData(colorimageobject);
 		var transparentImageData = white2transparentImageData(filterImageData);
 		var transparentDataURL = imageData2dataURL(transparentImageData);
 		//console.log(transparentDataURL);
 		var transparentimageobject = new Image(512, 512);
 		transparentimageobject.onload = function(){
 			var defaultctx = document.getElementById(drawing_layer_ID).getContext("2d");
 			defaultctx.clearRect(2, 2, document.getElementById(drawing_layer_ID).width-4, document.getElementById(drawing_layer_ID).height-4);
 			defaultctx.drawImage(transparentimageobject, original_x, original_y, Math.ceil(scale_ratio*512), Math.ceil(scale_ratio*512));
 		}
 		transparentimageobject.src = transparentDataURL;
 	
 		//var defaultctx = document.getElementById("defaultCanvas0").getContext("2d");
 		//defaultctx.drawImage(colorimageobject, original_x/2, original_y/2, Math.ceil(scale_ratio*512/2), Math.ceil(scale_ratio*512/2));
 	}
 	colorimageobject.src = "color2.png";
	//colorimageobject.crossOrigin = "anonymous";
}

//https://www.arc.id.au/CanvasLayers.html
function changelayer(){
	number_of_objects += 1;
	document.getElementById("changelayer").innerHTML = "New Object: " + number_of_objects;
	if (cvsStk === undefined){
		cvsStk = new CanvasStack("defaultCanvas0");
	}
	var defaultCanvas0ctx = document.getElementById("defaultCanvas0").getContext("2d");
	//defaultCanvas0ctx.clearRect(2, 2, 1250-4, 750-4);
	//defaultCanvas0ctx.rect(0,0, 1249,749);
	drawing_layer_ID = cvsStk.createLayer();
	current_layer_ID = cvsStk.createLayer();
	//var div = document.getElementById("toolbar");

	//var drawing_canvas = document.createElement("canvas");
	//drawing_canvas.width = 2500;
	//drawing_canvas.height = 1500;
	//drawing_canvas.id = "drawing_canvas" + number_of_objects;
	//drawing_layer_ID = "drawing_canvas" + number_of_objects;
	//drawing_canvas.style.cssText = "width: 1250px; height: 750px; position:absolute; left:0; top:0";

	//var current_canvas = document.createElement("canvas");
	//current_canvas.width = 2500;
	//current_canvas.height = 1500;
	//current_canvas.id = "current_canvas" + number_of_objects;
	//current_layer_ID = "current_canvas" + number_of_objects;
	//current_canvas.style.cssText = "width: 1250px; height: 750px; position:absolute; left:0; top:0";

	//div.appendChild(drawing_canvas);
	//div.appendChild(current_canvas);
}

function image2imageData(image){
	var c = document.createElement("canvas");
    c.width = image.width;
    c.height = image.height;
    var ctx = c.getContext("2d");
    //image.onload = function() {
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, image.width, image.height);
    //return c.toDataURL('image/png');
	//};
	
}

function white2transparentImageData(imageData){
    var pixel = imageData.data;
        var r=0, g=1, b=2,a=3;
    for (var p = 0; p<pixel.length; p+=4)
    {
      if ((pixel[p+r] == 255) & (pixel[p+g]) == 255 & (pixel[p+b] == 255)){ // if white then change alpha to 0
      	pixel[p+a] = 0;
      }
      if (pixel[p] != 0){
      }  
    }
    imageData.data = pixel;
    return imageData;
}



function imageData2dataURL(imageData){
    var c = document.createElement('canvas');
    c.width = imageData.width;
    c.height = imageData.height;
    var ctx = c.getContext('2d');

    ctx.putImageData(imageData, 0, 0);
    
    return c.toDataURL('image/png');
	
}

function selectColor(el){
    for(var i=0;i<document.getElementsByClassName("palette").length;i++){
        document.getElementsByClassName("palette")[i].style.borderColor = "#777";
        document.getElementsByClassName("palette")[i].style.borderStyle = "solid";
    }
    el.style.borderColor = "#D2691E";
    el.style.borderStyle = "solid";
    color = window.getComputedStyle(el).backgroundColor;
}

 function setup() {
 	canvas = createCanvas(1250, 750);
 	//canvas = document.getElementById("defaultCanvas0");
 	canvas.parent("toolbar");
 	rect(0,0, 1249,749);
	strokeWeight(2).strokeCap(ROUND);
	stroke(0);
	ptouchIsDown = touchIsDown;
  	pmouseIsPressed = mouseIsPressed;
	if (globalbool == true){
		  var image=new Image();
		  image.onload=function(){
			drawingContext.drawImage(image, 0, 0, 1250, 750);
		};
	image.src = currentCanv;
	}
	if (globaltwice == true){
		var rnn_model_data = JSON.parse(modeluse);
		rnn_model = new SketchRNN(rnn_model_data);
	  encode_strokes();

	  // copies over the model
	  model_x = Math.floor(Math.random()*1000);
	  model_y = Math.floor(Math.random()*500);
	  model_prev_pen = [0, 1, 0];
	}
}

function touchStarted() {
}

function touchMoved() {
	return false;
}
        
function touchEnded() {
	historyforpts.saveState();
	downloadimage();
	//setTimeout(colorimage(),2000);
    return false;
}

var strokes=[[-4,0,1,0,0]]; 
// sketch_rnn model
var rnn_model;
var rnn_model_data;
var temperature = 0.25;
var min_sequence_length = 5;

var model_pdf; // store all the parameters of a mixture-density distribution
var model_state;
var model_prev_pen;
var model_x, model_y;

// variables for the sketch input interface.
var start_x, start_y;
var end_x, end_y;

// UI
// dom
var model_sel;

var encode_strokes = function() {
  model_state = rnn_model.zero_state();
  // encode strokes
  model_state = rnn_model.update(rnn_model.zero_input(), model_state);
};
// 
var draw = function() {
if (cvsStk === undefined){
    changelayer();
}
if (globaltwice == false){
  if (ptouchIsDown && touchIsDown){
  	var thickness = document.getElementById("thickness").value;
    drawingContext.strokeStyle = color;
    paths.push([(touchX-8)/1250, (touchY-8)/750]);
    strokeWeight(thickness).strokeCap(SQUARE);
    line(touchX, touchY, ptouchX, ptouchY);
  }
  if (pmouseIsPressed && mouseIsPressed){
  	//console.log(drawingContext);
  	var thickness = document.getElementById("thickness").value;
    drawingContext.strokeStyle = color;
    paths.push([(mouseX-8)/1250, (mouseY-8)/750]);
    strokeWeight(thickness).strokeCap(SQUARE);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  ptouchIsDown = touchIsDown;
  pmouseIsPressed = mouseIsPressed;
}

if (globaltwice == true){
  var model_dx, model_dy;
  var model_pen_down, model_pen_up, model_pen_end;
  model_pdf = rnn_model.get_pdf(model_state);
  [model_dx, model_dy, model_pen_down, model_pen_up, model_pen_end] = rnn_model.sample(model_pdf, temperature);

  if (model_pen_end === 1) {
    currentCanv = document.getElementById("defaultCanvas0").toDataURL();
    listyforpoints.push(currentCanv);
    globalbool = true;
    globaltwice = false;
	setup();
  } else {

    if (model_prev_pen[0] === 1) {

      // draw line connecting prev point to current point.
      stroke("#B0B0B0");
      strokeWeight(1);
      line(model_x, model_y, model_x+model_dx, model_y+model_dy);
    }
    model_prev_pen = [model_pen_down, model_pen_up, model_pen_end];
    model_state = rnn_model.update([model_dx, model_dy, model_pen_down, model_pen_up, model_pen_end], model_state);

    model_x += model_dx;
    model_y += model_dy;
  }
}
};

// 
// 
// 
