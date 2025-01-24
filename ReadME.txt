things to change and upgrade in game 

1. make it harder to win 

each level the amount of enemies increases.
each level the laser does not shoot as far 


2. come up with how to win and how to keep earning more coins 

Each game is only going to be a short a mount of levels and each win you collect N coins and if you lose you lose N coins and when you logout for that session
the amount of coins you have gets added to he total tokens in the table the game needs to keep track of how many games have been won, lost, and the high score 
since the user logged in and once they log out up date the table with the total games from that session with the total games in the datbase 
along with the total games lost and the high score which is added up from each laser that hits an enemy is 1 point so each enemy divide twice so it starts as 
one pice then splits into two then those pieces when shot split in two so each enemy splits into four pieces total  each game gets harder pased on the player stats 
unless its a new user the game starts at the default settings and grows with the user so example if i just started my first game after registration i would 
have 0 games won,  0 games lost, 0 high score, 0 tokens thats the stats table then the settings table would have all default numbers for each section like 
enemies per level which starts at 100 would say 100 and then it would hold the laser distance variable stating at 0.8 and going down to a min of 0.2 and the 
amount of lives you start with goes from 5 to 1 from the fist game to the top user classes which there is 4 user classes newb!, presis, pro, platnuim.


STARTING VALUES PER USER CLASSS 

#NEWB!
 
const LASER_DIST = 0.8; // max distance laser can travel as fraction of screen width,
const ROID_NUM = 3; // starting number of asteroids  
const GAME_LIVES = 5; // starting number of lives

#PRESIS:

const LASER_DIST = 0.6; // max distance laser can travel as fraction of screen width,
const ROID_NUM = 10; // starting number of asteroids  
const GAME_LIVES = 4; // starting number of lives

#PRO:

const LASER_DIST = 0.4; // max distance laser can travel as fraction of screen width,
const ROID_NUM = 20; // starting number of asteroids  
const GAME_LIVES = 3; // starting number of lives

#PLATNUIM:

const LASER_DIST = 0.8; // max distance laser can travel as fraction of screen width,
const ROID_NUM = 3; // starting number of asteroids  
const GAME_LIVES = 2; // starting number of lives


3. how many points = how many coins OR amount of coins won per game won  


4. change picture to something funny getting split up like the asteroids


5. change background 



6. make and  integrate saving process and logging process of each users games won, games lost, and total high score.