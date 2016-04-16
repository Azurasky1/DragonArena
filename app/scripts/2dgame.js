// here is where all the javascript will go, we can add separate files for different parts of the game to make it cleaner

// constructor for the player, keeping it simple
var player = function (balance, inventory) {
	this.balance = balance;	
	this.inventory = inventory;
	this.health = 100;
}

var index;

// global variable to be adjusted for use in invCheck function, does what splice() does

// let's create our first player, and an array to hold all the items we make for later use
var player1 = new player (100, []);
var itemList = [];


// constructor for an item
// should add description for each and statistics later
var item = function (cost, name, inventory) {
	this.cost = cost;
	this.name = name;
	itemList.push(this);
	// pushes the items to the global list of items
	// not sure if this will work, find out on the next episode of dragon ball z!
}

// let's create a few items

var sword = new item(10, "Sword", "It's very sharp");
var shield = new item(10, "Shield", "Should help against those pesky dragons");
var healthPotion = new item(10, "Health Potion", "Tastes bad but feels good");

var potion = function(effect) {
	this.effect = effect;
	// effect is either a positive or negative integer
}

var goodPotion = new potion(10);
var badPotion = new potion(-10);

function usePotion (user, potion) {
	
	    if (user.health == 0) {
			console.log("You're dead");						
		}
		
		else {
			
		if (user.health < 100 && (potion.effect + user.health > 100)) {
		// sets a cap of 100 on user health
		user.health = 100;
		console.log("You're fully healed! Health: " + user.health)
		}
		else if (user.health + potion.effect <= 0) {
			user.health = 0;
			console.log("You died!");
			// put a die() function here
			// maybe add a function to the user constructor
		}
		else if (user.health < 100 && (potion.effect + user.health <= 100)) {
		user.health += potion.effect;
		console.log("Health: " + user.health);
	}
		else if (user.health == 100 && (potion.effect + user.health < 100)) {
		user.health += potion.effect;	
		console.log("Health: " + user.health);
		}
		else if (user.health == 100 && potion.effect > 0) {
		console.log("You have full health already");
		return;
		}
		
		}
	// add a health bar in somewhere here
}

// to-do list:
// check user balance, update it after a transaction
// for now store stock will be infinite and user can buy as much as they can afford
var invCheck = function (user, item) {
	for (var i = 0; i < user.inventory.length; i++) {
		if (user.inventory[i] == item) {
		index = i;
		return true;	
	}
	else {
		return false;		
	}		
}
}
// function should be the same for every user
var buy = function (user, item) {
	if (user.balance >= item.cost) {
	user.balance -= item.cost;
	console.log("New user balance:" + user.balance);
	user.inventory.push(item);
	console.log("You just bought: " + item.name);	
	}
	else {
		console.log("You can't afford that");
		return;
	}
}

var sell = function (user, item) {
	if (invCheck(user, item)) {		
	user.inventory.splice(i, 1);
	user.balance -= item.cost;
	}
	else {
	console.log("You don't have that");		
	}
}

var findInvNames = function (user) {
		for (i = 0; i < user.inventory.length; i++) {
			return user.inventory[i].name;			
		}
		
	}
	
var showInv = function (user) {
	var userInv = document.getElementById("userInv");
	userInv.innerHTML = findInvNames(user);
	}

buy(player1, sword);
showInv(player1);
sell(player1, sword);
sell(player1, sword);
usePotion(player1, badPotion);
usePotion(player1, goodPotion);