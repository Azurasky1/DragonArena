// My first game
var direction = "right";
var x = 100;
var y = 100;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var img = new Image();
img.src = "trevorDragon.png";
img.onload = function() {
	context.drawImage(img, 100, 100);
}

var dragon = new Object (); 
dragon.x = 100;
dragon.y = 100;

var randomNum = function (num1, num2) {
	
	return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
	

}

var draw = function () {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, randomNum((dragon.x+20), (dragon.y - 20)), randomNum((dragon.x + 20), (dragon.y - 20)));
	console.log("drawing again");
}

var drawHoriz = function () {
	console.log("Drawing");
	if (direction == "right") {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, x, y);
	x++;
		if (x > 165	) {
			direction = "left";
			return;
		}
	}
	else if (direction == "left") {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, x, y);
	x--;
	if (x < 1) {
		direction = "right";
		return;
	}
	}
	}
	
	/* if (dragon.x < 150) {
		context.drawImage(img, newX, dragon.y);
		console.log("moving right now");
	}
	else {
		var newX = randomNum((dragon.x - 20), dragon.x);
		dragon.x = newX;
		context.drawImage(img, newX, dragon.y);		
		console.log("moving left now");
	}
	console.log("drawing again");
	
	*/

var startMoving = function () {
	setInterval(drawHoriz, 12.5);
}

startMoving();

/* function movement(randomX, randomY) {
	window.setTimeout(drawImage(randomNum(250, 400), randomNum(250, 400), 200, 200), 100);	
}
movement();
*/







