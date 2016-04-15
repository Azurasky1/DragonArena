// here is where all the javascript will go, we can add separate files for different parts of the game to make it cleaner

// constructor for the player, keeping it simple
var player = function (balance, inventory) {
	this.balance = balance;	
	this.inventory = inventory;
}

// let's create our first player, and an array to hold all the items we make for later use
var player1 = new player (100, []);
var itemlist = [];


// constructor for an item
// should add description for each and statistics later
var item = function (cost, name, inventory) {
	this.cost = cost;
	this.name = name;
	itemlist.push(this);
	// pushes the items to the global list of items
	// not sure if this will work, find out on the next episode of dragon ball z!
}

// let's create a few items

var sword = new item(10, "Sword");
var shield = new item(10, "Shield");
var healthPotion = new item(10, "Health Potion");


// to-do list:
// check user balance, update it after a transaction
// for now store stock will be infinite and user can buy as much as they can afford
var invCheck = function (user, item) {
	for (var i = 0; i < user.inventory.length; i++) {
		if (user.inventory[i] == item) {
		return true;	
	}
	else {
		return false;		
	}		
}

// function should be the same for every user
var buy = function (user, item) {
	if (user.balance < item.Cost) {
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

var showInv = function (user) {
	var userInv = document.getElementById("userInv");
	userInv.style.display = "visible";
	userInv.innerHTML = (userInv.itemList);
}

buy(player1, sword);