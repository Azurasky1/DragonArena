(function(global) {
  'use strict';

  var shopNotice = document.getElementById('shopNotice');
  var balance = document.getElementById('balance');
  var store = document.getElementById('store');
  var toggleStore = document.getElementById('store__toggle');
  var showStore = document.getElementById('store__show');
  var shop = [];
  var check;

  /**
   * [hideStoreToggle description]
   */
  function hideStoreToggle() {
    store.classList.add('hidden');
    showStore.classList.add('show');
  }

  /**
   * [showStoreToggle description]
   */
  function showStoreToggle() {
    store.classList.remove('hidden');
    showStore.classList.remove('show');
  }

  toggleStore.addEventListener('click', hideStoreToggle);
  showStore.addEventListener('click', showStoreToggle);

  /**
   * player object constructor
   *
   * @param {String} name      [description]
   * @param {Number} money     [description]
   * @param {Array} inventory [description]
   */
  function Player(name, money, inventory) {
    this.name = name;
    this.money = money;
    this.inventory = inventory;
  }

  var player1 = new Player('player1', 100000, []);

  /**
   * [shopItem description]
   *
   * @param  {String} itemName        [description]
   * @param  {Number} itemCost        [description]
   * @param  {[type]} itemResaleValue [description]
   * @param  {[type]} itemStock       [description]
   * @param  {[type]} description     [description]
   */
  function shopItem(itemName, itemCost, itemResaleValue,
      itemStock, description) {
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
  function updateBalance() {
    // print to an element
    balance.textContent = ('Balance: ' + player1.money);
  }

  /**
   * Show the player balance above, this should be called both when a player adds or sells an item.
   */
  function notEnough() {
    shopNotice.innerHTML = ('You cannot afford that item! You need ' +
      item.price - player1.money + ' more coins.');
  }

  updateBalance();

  /**
   * [showItemDtn description]
   *
   * @param  {[type]} item [description]
   */
  function showItemDtn(item) {
    if (shop[item.xCord][item.yCord] === true) {
      var itemDescription = document.getElementById('itemDescription');
      itemDescription.innerHTML = item.Description;
    }
  }

  var swordOfAwesome = new shopItem('Sword of Awesome',
    70, 35, 10, 'An awesome sword', false);
  var trevorShield = new shopItem('Trevor\'s Shield',
    10, 5, 10, 'Designed by Trevor', false);
  var gladiatorSword = new shopItem('Gladiator Sword',
    100, 50, 10, 'A sword for a gladiator');
  var syriesMagicArrow = new shopItem('Syries\' Magic Arrow',
    100, 50, 10, 'An arrow that has rainbow trail and confetti around it');
  var syriesMagicBow = new shopItem('Syries\' Magic Bow',
    100, 50, 10, 'A bow that has wings and complements Syries\' Magic arrow');

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

  /**
   * [removeStock description]
   *
   * @param  {[type]} item [description]
   */
  function removeStock(item) {
    item.itemStock -= 1;
    shopNotice.innerHTML = ('You bought ' + item.name +
      '! There are now only ' + item.itemStock + ' of ' +
      item.name + ' in stock.');
  }

  /**
   * [checkIfTheyHave description]
   *
   * @param  {[type]} item [description]
   */
  function checkIfTheyHave(item) {
    for (var i = 0; i < player1.inventory.length; i++) {
      if (player1.inventory[i] === item) {
        check = i;

        return true;
      }
    }
  }

  /**
   * [purchaseItem description]
   *
   * @param  {[type]} item [description]
   */
  function purchaseItem(item) {
    if (player1.money < item.cost) {
      notEnough();
    } else if (checkIfTheyHave(item)) {
      console.log('You already have a ' + item.name);
    } else {
      player1.inventory.push(item);
      player1.money -= item.cost;

      updateBalance();
      removeStock(item);
    }
  }

  /**
   * [sellItem description]
   *
   * @param  {[type]} item [description]
   */
  function sellItem(item) {
    if (checkIfTheyHave(item) == true) {
      player1.inventory.splice(check, 1);
      item.itemStock += 1;
      player1.money += item.resaleValue;

      updateBalance();
      shopNotice.innerHTML = ('You just sold ' + item.name + ' for ' +
        item.resaleValue + ' coins! There are now ' + item.itemStock +
        ' ' + item.name + ' in stock.');
    } else {
      console.log('didn\'t return true');
    }
  }
})(typeof window === 'undefined' ? global : window);
