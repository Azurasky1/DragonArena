var shop = [];
var shopNotice = document.getElementById("shopNotice");
var balance = document.getElementById("balance");
var store = document.getElementById("store");
var toggleStore = document.getElementById("store__toggle");
var showStore = document.getElementById("store__show");
var check;

function hideStoreToggle() {
  store.classList.add('hidden');
  showStore.classList.add('show');
}

function showStoreToggle() {
  store.classList.remove('hidden');
  showStore.classList.remove('show');
}

toggleStore.addEventListener('click', hideStoreToggle);
showStore.addEventListener('click', showStoreToggle);

// player object constructor

function player(name, money, inventory) {
this.name = name;
this.money = money;
this.inventory = inventory;
}

var player1 = new player ('player1', 100000, []);

function shopItem(itemName, itemCost, itemResaleValue, itemStock, description) {
this.name = itemName;
this.cost = itemCost;
this.resaleValue = itemResaleValue;

// the item stock will be a part of the shop array
this.itemStock = itemStock;
this.description = description;
}

/**
 * ALL FUNCTIONS INVOLVING MONEY HERE
 */
var updateBalance = function () {
// print to an element
  balance.innerHTML = ('Balance: ' + player1.money);
}

// Show the player balance above, this should be called both when a player adds or sells an item.
var notEnough = function () {
  shopNotice.innerHTML = ('You cannot afford that item! You need ' + item.price - player1.money + ' more coins.');
}

updateBalance();

var showItemDtn = function (item) {
  if (shop[item.xCord][item.yCord] = true) {
    var itemDescription = document.getElementById('itemDescription');
    itemDescription.innerHTML = item.Description;
  }
}

var swordOfAwesome = new shopItem('Sword of Awesome', 70, 35, 10, 'An awesome sword', false);
var trevorShield = new shopItem('Trevor\'s Shield', 10, 5, 10, 'Designed by Trevor', false);
var gladiatorSword = new shopItem('Gladiator Sword', 100, 50, 10, 'A sword for a gladiator');
var syriesMagicArrow = new shopItem('Syries\' Magic Arrow', 100, 50, 10, 'An arrow that has rainbow trail and confetti around it');
var syriesMagicBow = new shopItem('Syries\' Magic Bow', 100, 50, 10, 'A bow that has wings and complements Syries\' Magic arrow');

console.log(swordOfAwesome.name);

function goToShop (player) {
  showPlayerBalance(player1);
  // player.inShop = true;
  displayShopAndButtons();
}
//  -----------------------------------------

/**
 * ALL FUNCTIONS RELATED TO INVENTORY GO HERE
 */

var removeStock = function (item) {
  item.itemStock -= 1;
  shopNotice.innerHTML = ('You bought ' + item.name + '! There are now only ' + item.itemStock + ' of ' + item.name + ' in stock.');
}

var checkIfTheyHave = function (item) {
  for (var i = 0; i < player1.inventory.length; i++) {
    if (player1.inventory[i] == item) {
      check = i;

      return true;
    }

  }
}

var purchaseItem = function (item) {
  if (player1.money < item.cost) {
    notEnough();
  } else if (checkIfTheyHave(item)) {
    console.log("You already have a " + item.name);
  } else {
    player1.inventory.push(item);
    player1.money -= item.cost;

    updateBalance();
    removeStock(item);
  }
}

var sellItem = function (item) {
  if (checkIfTheyHave(item) == true) {
    player1.inventory.splice(check, 1);
    item.itemStock += 1;
    player1.money += item.resaleValue;

    updateBalance();
    shopNotice.innerHTML = ('You just sold ' + item.name + ' for ' + item.resaleValue + ' coins! There are now ' + item.itemStock + ' ' + item.name + ' in stock.');
  } else {
    console.log('didn\'t return true');
  }
}
