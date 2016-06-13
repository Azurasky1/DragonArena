// README                                                                                                                  |

// This document was created by: Bill B. on June 13, 2016.                                                                 |

// Developers for this project: Bill B. github: (@Azurasky1) and Andrea SonnY github:(@andreasonny83)                      |

// To submit changes, fork this repository, create a local clone, commit changes and submit                                |
// a pull request.                                                                                                         |

---------------------------------------------------------------------------------------------------------------------------|

<-- 
This file will detail every aspect of our 2D game. It will cover ideas on how to approach the
the core JavaScript logic that is necessary to create a stable build, basic features that should be
included upon release, extra game features that maybe included later to enhance the user experience,
and a plan for generating feedback with the help of testers. The purpose of this document
is for the sake of transparency between developers. By ensuring a clear development path by assigning
priority levels to different parts of the project, a stable build can be completed as quickly and efficiently as possible.
-->

<!-- 
Each section of this document will have its own priority number.
1 = Core game logic, and should be completed before anything else.
2 = Basic features that will be included in the initial game.
3 = Extra features that may be included later, to enhance the player experience.
Note: Features that share the same priority level are further prioritized using a hyphen
and another number (1-3) to indicate most important (1) or least important (3)
-->

// To mark a completed feature, copy it, CTRL + F the title of the relevant feature, then replace all using
// the same title with a concatenated "DONE" placed at the end.

<--
Table of Contents:

1. Game Modes. Priority Level: 3-2
	1.1 PVP (Player v.s. Player)
	1.2 PVE (Player v.s. Environment)
	1.3 Lobby System

2. Class System. Priority Level: 2-1
	2.1 Classes
	2.2 Medic
	2.3 Mage
	2.4 Archer
	2.5 Knight
	2.6 Spells
	2.7 Thoughts about classes, their abilities, and auto-attacks
		2.7.1 A little bit about abilities
		2.7.2 Auto-attacks
	
3. Items. Priority Level: 3
		3.1 The Item Object Properties
		3.2 How items will be distributed
		3.3 Inventory
		3.4 Trading
		
4. Canvas-Related Functionality. Priority Level: 1
	4.1 Avatars
	4.2 Projectiles
	4.3 Collision Detection
	4.4 Animations
	4.5 Player Indicators
	4.6 Player Summary
	
5. Player Interaction. Priority Level: 2-2
	5.1 Chat (express & socket io)
	5.2 Party System (team up with other players)
	
6. Alpha Testing and Onward. Priority Level: 3-1
		6.1 Launch
		6.2 Testing
		6.3 Feedback System
		6.4 Attracting a Playerbase	
-->

// On to the fun part... introducing (drum roll, please?!):

<!-- 
Dragon Arena is a 2D game built using mostly pure JavaScript. It is a project meant to allow the developers involved
to hone their JavaScript skills by learning what it is like to program the core game logic for a multi-player game.
It utilizes node.js, express, socket.io, and MongoDB for its user chat system, and for managing player data that
travels between the client and the server.
-->

---------------------------------------------------------------------------------------------------------------------------|

<!-- 

1. Game Modes. Priority Level: 3

	This section will detail the different types of game modes that will be available for players to choose from,
	as well as a lobby system, meant to prevent issues that arise from having too many players on a canvas at once.

	1.1 PVP (Player v.s. Player)
		- Players can fight each other in an all out brawl.
		- This could be divided into different subtypes, such as team battle, free for all, etc.
		- See (2.2 Medic & 5.2 Party System)

	1.2 PVE (Player v.s. Environment)
		- Players team up to fight a dragon that is out to obliterate the entire raid. Other enemies
		could be included as well. However, a dragon is the simplest, and most classic example of this.

	1.3 Lobby System
		- With too many players, the game will become too hectic to play. We will need
		separate lobbies, each with a player cap.
		- Lobbies can be used as a way of separating players that want to play different game modes.
		- What is the best way to create this?

2. Class System. Priority Level: 2

	This section will detail the classes of this game, and talk about their roles. In addition, it will list what their
	abilities are, and touch upon the important question of auto-attacks, whether or not they should be included within
	the game, and what type of programming logic that will entail.

	2.1 Classes
		- The game will initially have four separate classes. These classes are:
			Medic, Archer, Mage, and Knight
		- Each class has its own type of damage (magic or physical)
			- Mages & Medic: Magic
			- Archers & Knights: Physical
		- Each class is either melee or ranged. This will influence the combat logic, because ranged classes
			will be able to attack from a further distance than melee classes.
		-The problem of incentivizing people to play medics: see (2.2 Medic)

	2.2 Medic
		- Primarily a healer, but can deal damage too
		- Ranged magic class
		- Healing others should be as as simple as hovering over someone and pressing a button.
		- Incentivizing people to play healers is important.
			- In a PVP game mode, most players will opt to play a class that does damage instead.
				How can a party system be utilized as a way around this? See (5.2 Party System)

	2.3 Mage
		- Damage
		- Ranged magic class
		- Attacks: Fireball
		- See (2.7 Thoughts) for more on abilities and auto-attacks.

	2.4 Archer
		- Damage
		- Ranged physical class
		- Attacks: Flame Arrow
		- See (2.7 Thoughts) for more on abilities and auto-attacks.

	2.5 Knight
		- Damage
			- Could potentially be created as class that soaks damage
		- Melee physical class
		- Attacks: Slash
		- See (2.7 Thoughts) for more on abilities and auto-attacks.

	2.7 Spells
		- For now, each class will have one spell, but more can be added later. What keycode should spells be assigned to?
		- Spells can be cast using an eventListener that listens for keyup and keydown events. We could allow the user
		to change the key to something other than the default option.
		
---------------------------------------------------------------------------------------------------------------------------|
	2.8 Thoughts about classes, their abilities, and auto-attacks

		2.8.1 A little bit about abilities
			- Something to consider is if the abilities associated with each class (mage: fireball, archer: flaming arrow)
			should be made as class-specific auto-attacks, or abilities with their own cooldowns.

		2.8.2 Auto-attacks
			- Should they be included in the game at all? If so, they will need their own attack speed value. For ranged
			classes, they will need their own collision detection logic, particle size, speed etc. Initiating an auto-attack
			could mean simply right-clicking another unit while in range, initiating an "attacking" state on the player object.
---------------------------------------------------------------------------------------------------------------------------|

3. Items. Priority Level: 3

	This section will detail items within the game, approaches on creating items in JavaScript, how the user
	will obtain items, and how they will eventually need to be able to exchange items because of item rarity.

	3.1 The Item Object Properties
	- Each item should have its own unique name and JavaScript ID.
	- Each item should be an object with its own unique properties.
		- What are the item's statistics?
			- What kind of statistics are they? Which aspect of the player will be enhanced?
			- How rare is the item? Will we utilize WoW-style rarity? (Gray, white, green, blue, purple)
			- See how rarity will inevitably necessitate a trading system at (3.4)
			
	3.1 Creating the Item Objects
		- An object constructor can be utilized to generate a list that includes many different item objects.
			- We can store this list of items in a JSON file.
		- A fun way to create items would be to include a list of certain keywords, and have a function mix-and-match
			the different keywords. For example ("Sword" + "of" + "Justice") ("Bow" + "of" + "Righteousness")
		- In addition, the function could generate item statistics that are completely random.
			We can create several functions, each one generating an item of different rarity.
	
	3.2 How items will be distributed
		- Should items be bought in the store, or dropped by monsters randomly?
			- If the item can be bought in the store, how much will it cost?
		- Should other players drop random items upon death? Should they keep their items upon death?

	3.3 Inventory
		- Once new types of items are added to the game, an inventory will become a necessary element of the game.
		- Inventory can be done in a few ways: 
			- Final Fantasy-esque: i.e., items are essentially an ordered list inside of a div container
			- WoW-esque: items are accessed from a button, which displays several rows of square divs that show item
			icons. When hovering over an item, a user can view the item information. In addition, the user
			can organize their items in whatever manner that they see fit.
		
	3.4 Trading
		- A system that incorporates items of different rarities dropping randomly will inherently
			give these rare items value among the playerbase. This will inevitably 
			lead towards the need for a trading system.
			Option 1: Players can initiate a trade with another nearby player
			Option 2: An auction house that allows players to list their own items or purchase those of other players

4. Canvas-Related Functionality. Priority Level: 1
	
	This addresses all aspects of this project that will interact with the canvas, the screen that everyone
	will see when they direct their browser to our game. The big question is how we will solve the problem of
	screens that have different resolutions. Not every screen will have access to the same amount of pixels.
	
	4.1 Avatars
	- How much space will each character take up on the canvas?
		- How will we adjust the position and sizes of the avatars according to individual screen resolution?
		
	4.2 Projectiles	
		- How big will projectiles be?
		- Where do they appear on the canvas, in relation to the character?
		- How fast will players move? Projectiles?

	4.3 Collision Detection
		- Using if/else statements:
			- Check to make sure that there is space between each side of an element on the canvas and all other elements
		- I think we could streamline one set of collision detection logic that can apply
			to every element. It will be easier to visualize once we start writing it.
		- This should check for interaction between players, dragons, and projectiles. ALL ELEMENTS!
		
	4.4 Animations
		- Player avatars should be spritesheets in order to create a clean animation for the player.
		- Free spritesheets can be used for now.
		- In the future, we may seek to find someone who would like to contribute some of their art
			for use in our game. I have some friends that may be willing to help with this.
		- Note: requestAnimationFrame() is better than setTimeout() in this situation.
			- It consumes less resources. This game should consume as little system resources as possible.

	4.5 Player Indicators
		- Located above each player
			- Health bars
			- Status indicators (ex: player is currently attacking)
			- Any other relevant information
		- Allows users to quickly identify attack targets, who needs healing, etc.
		- Can be health and any other important information

	4.6 Player Summary
		- Available to each character in a sleek box on a corner of the canvas.
		- Details crucial information that is available at a glance to the player.
			- Health, mana (or energy), amount of gold
			- Anything else that the developers or players (6.3 Player Feedback) deem necessary

5. Player Interaction. Priority Level: 3

	This section will detail how the players will communicate with one another. It will also cover any features that
	can be included to make player interactions more seamless.
	
	5.1 Chat (express & socket io)
		- Available in the corner of the screen.
		- Provide the following chat choices:
			- Nearby players (in this case, a certain amount of pixels around the player)
				- What is the best way to do this?
			- party chat (see 5.2 Party System)
			- all players (every player in the lobby)
			- private messages between players
		- User should be able to scale the chat to a size that they deem fit.

	5.2 Party System (team up with other players)
		- Think Final Fantasy-esque parties, where each party member has access to crucial information
			about the other players such as health and mana.
		- Players should be able to send invites to other players easily to start parties of their own.
		- Invites to parties should be easy to see, but not intrusive to the player experience.
		
6. Alpha Testing and Onward. Priority Level: 2

	This section will cover the alpha testing phase of our game. Once we have a stable build, we need to launch it.
	This is where we can receive valuable feedback, and push our programming to the limit by adding more advanced
	functionality and refining what we had included in the initial version of the game. This section also covers
	who our target audiences will be, and good ways to get more people playing our game.
  
	6.1 Launch
		- Game can either be launched with its own domain name, or through github
		
	6.2 Testing
		- I have several friends that would love to test out the game
		
	6.3 Feedback System
		- Once a stable enough build is ready, a button that submits user feedback to a database will be
		useful for pinpointing new features, and current features that need to be improved upon.
			- MongoDB? I haven't had much experience using databases yet.
  
	6.4 Attracting a Playerbase
		- This game is merely meant to practice JavaScript. However, we can put truly put our code to the
		test if we get a bunch of concurrent players using our servers. Reddit is a great place to get the
		word out, and receive valuable feedback. Other other social media tools can help get the word out about our game.

-->

---------------------------------------------------------------------------------------------------------------------------|

// This is the end of the document.
