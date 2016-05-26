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

/*

function hideShopAndButtons () {

  var shopdisplay = document.getElementById("shopdisplay");
  shopdisplay.style.display = "none";
  leaveShopButton.style.display = "none";

}

*/

/*

function displayShopAndButtons () {

  var leaveShopButton = document.getElementById("leaveShopButton");
  var shopdisplay = document.getElementById("shopdisplay");
  shopdisplay.style.display = "initial";
  var leaveShopButton = document.getElementById("leaveShopButton");
  leaveShopButton.style.display = "initial";

}

*/

// hideShopAndButtons();

function player(name, money, inventory) {
this.name = name;
this.money = money;
this.inventory = inventory;

// set inShop equal to a boolean when declaring a new player
}

var player1 = new player ("player1", 100000, []);

function shopItem(itemName, itemCost, itemResaleValue, itemStock, description) {
this.name = itemName;
this.cost = itemCost;
this.resaleValue = itemResaleValue;

// the item stock will be a part of the shop array

this.itemStock = itemStock;
this.description = description;
}
/*

// commenting this part out because it is not needed

shopItem.prototype.showDisplay = function () {
  shop[xCord][yCord] = true;
}
shopItem.prototype.hideDisplay = function () {
  shop[xCord][yCord] = false;
}
}

*/

// ----------------------------------------------------------------- ALL FUNCTIONS INVOLVING MONEY HERE
var updateBalance = function () {
// print to an element
  balance.innerHTML = ("Balance: " + player1.money);
}

// Show the player balance above, this should be called both when a player adds or sells an item.

var notEnough = function () {
  shopNotice.innerHTML = ("You cannot afford that item! You need " + item.price - player1.money + " more coins.");
}

// Above is for when the player can't afford an item that they are trying to buy
// -------------------------------------------------------------------

updateBalance();


var showItemDtn = function (item) {
  if (shop[item.xCord][item.yCord] = true) {
    var itemDescription = document.getElementById("itemDescription");
    itemDescription.innerHTML = item.Description;
  }
}

// find a way to do this with an array within an array later

// let's add an individual showDisplay variable for each item
/* shopItem.prototype.selectAnItem = function () {
return this.currentChoice = true;
}
}
*/

var swordOfAwesome = new shopItem("Sword of Awesome", 70, 35, 10, "An awesome sword", false);
var trevorShield = new shopItem("Trevor's Shield", 10, 5, 10, "Designed by Trevor", false);
var gladiatorSword = new shopItem("Gladiator Sword", 100, 50, 10, "A sword for a gladiator");
var syriesMagicArrow = new shopItem("Syries' Magic Arrow", 100, 50, 10, "An arrow that has rainbow trail and confetti around it");
var syriesMagicBow = new shopItem("Syries' Magic Bow", 100, 50, 10, "A bow that has wings and complements Syries' Magic arrow");

console.log(swordOfAwesome.name);

/*

var swordDescription = document.getElementById("swordDescription");
swordDescription.innerHTML = swordOfAwesome.description;

*/

// item name can be arbitrary
// item attack value designates how much damage per hit
// item attack frequency designates how many times per second the attack will go off
// item type designates what kind of item it is, examples being a sword or a staff, maybe even a shield or a potion
// item class designates which class can use the item, classes being swordsman medic arcanist and archer

// ---------------------------------------------------------------------------------------------|
/*
return to this later when we want to be more specific with items                              |

function newItem(itemName, itemAttackValue, itemAttackFrequency, itemType, itemClass) {        |
this.itemName = name;                                                                        |
this.AttackValue = attackValue;																	|
this.itemAttackFrequency = itemAttackFrequency													|
this.itemType = itemType;																		|
this.itemClass = itemClass;																		|
}																								\
                                                |
*/
// -------------------------------------------------------------------------------------------------

// will be a clickable shop that the user can go to at any time
// aiming to represent in html as an img element with an onclick attribute

// an array of elements
// when the user clicks on one that value becomes false

// meant to toggle the shop div container
// aiming to display it in the middle of the screen, or canvas i guess, we'll see

  function goToShop (player) {
  showPlayerBalance(player1);
  // player.inShop = true;
  displayShopAndButtons();


  }
  // enter the shop
  // turn on the hsop display

  // might not need this

  // view item when it is clicked
  /*

  var viewItem = function (item) {

    item.showItemDtn(item);


  }

  var leaveShop = function () {

      hideShopAndButtons();

    }

  */
  // turn off the shop display
  // turn on the individual itemDisplay
  // shopdisplay.toggleOff;
  // item.displayActive = true;
  // item display should include an image of the item, a description, and a price
  // basically extensive details about the item not shown on the initial shop display

// button onclick

/*
function viewItem (item) {
  item.showDisplay;
}
*/
// on click function
// start with the sword of awesome

// when finished change to false
  // toggle the shop element here
  // aiming to display a div with all of the images and names inside

/*

switch (shop) {
  // now reference the item choices array
case '1':
break;
case '2':
break;
case '3':
break;
case '4':
break;
default:

}

*/

// ALL FUNCTIONS RELATED TO INVENTORY GO HERE -----------------------------------------

var removeStock = function (item) {
        item.itemStock -= 1;
        shopNotice.innerHTML = ("You bought " + item.name + "!" + " There are now only " + item.itemStock + " of " + item.name + " in stock.");
      }

var checkIfTheyHave = function (item) {
  for (var i = 0; i < player1.inventory.length; i++) {
      if (player1.inventory[i] == item) {
        check = i;
        return true;
      }
        // above will have to be adjusted if players can ever have more than one of the same item

    }
}

  var purchaseItem = function (item) {
    if (player1.money < item.cost) {
        notEnough();
      }
    else if (checkIfTheyHave(item)) {
      console.log("You already have a " + item.name);
    }
    else {
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
            shopNotice.innerHTML = ("You just sold " + item.name + " for " + item.resaleValue + " coins! " + "There are now " + item.itemStock + " " + item.name + " in stock.");
          }

  else {
    console.log("didn't return true");

  }
  }

          /*

          else {
            // something happens if they have nothing to sell
          }

          */








/*

        for (var i = 0; i < player1.inventory.length; i++) {
          if (player1.inventory[i] == item) {
            console.log("You already have a " + item.name);
            return true;
          }
          else {
            player1.inventory.push(item.name);
            removeStock(item.itemStock);
            // above will have to be adjusted if players can ever have more than one of the same item
            return;
          }
        }
      }

// believe above is duplicate of another function, possibly remove this to use less memory
*/

/*

var purchaseItem = function (item) {

    if (player1.money < item.cost || addInv(item) == true) {
      if (player1.money < item.cost) {
        notEnough();
        return;
      }
      else if (addInv(item) == true) {
        shopNotice.innerHTML = ("You already have a " + item.name ".");
        return;
      }
    }

    else {
        player1.money = (player1.money - item.cost);
        updateBalance(player1);
        removeStock();
        addInv(item);
    }
  }

*/

/*

        // shopNotifications.innerHTML = ("Your inventory is now: " + player1.inventory);

      // to start let's make every item limited
      // come back to this and fix it, then remove this comment. z will be equal to item stock
      // sword of awesome will have its own shop coordinates

    // creates an alias
    // the problem with this is that it is a local variable and won't affect the global shop array,
    // the one that contains the name, stock, etc. var currentItem = item;
    // set equal to the shop array
    // example of function call:
    // purchaseItem(swordOfAwesome)... so currentItem will then equal the variable swordOfAwesome
    // these comments don't really serve a purpose, moving them now, they are related to the purchaseitem function

*/
