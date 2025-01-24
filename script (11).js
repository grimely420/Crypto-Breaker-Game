// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");


//=======================================
//
//   const & variables 
//
//=======================================

const FPS = 30; // frames per second
const FRICTION = 0.7; // friction coefficient of space (0 = no friction, 1 = lots of friction)
const GAME_LIVES = 2; // starting number of lives
const LASER_DIST = 0.3; // max distance laser can travel as fraction of screen width
const LASER_EXPLODE_DUR = 0.1; // duration of the lasers' explosion in seconds
const LASER_MAX = 10; // maximum number of lasers on screen at once
const LASER_SPD = 500; // speed of lasers in pixels per second
const ROID_JAG = 0.4; // jaggedness of the asteroids (0 = none, 1 = lots)
const ROID_PTS_LGE = 2; // points scored for a large asteroid
const ROID_PTS_MED = 5; // points scored for a medium asteroid
const ROID_PTS_SML = 10; // points scored for a small asteroid
const ROID_NUM = 3; // starting number of asteroids
const ROID_SIZE = 100; // starting size of asteroids in pixels
const ROID_SPD = 50; // max starting speed of asteroids in pixels per second
const ROID_VERT = 10; // average number of vertices on each asteroid
const SHIP_BLINK_DUR = 0.1; // duration in seconds of a single blink during ship's invisibility
const SHIP_EXPLODE_DUR = 0.3; // duration of the ship's explosion in seconds
const SHIP_INV_DUR = 3; // duration of the ship's invisibility in seconds
const SHIP_SIZE = 30; // ship height in pixels
const SHIP_THRUST = 5; // acceleration of the ship in pixels per second per second
const SHIP_TURN_SPD = 360; // turn speed in degrees per second
const SHOW_BOUNDING = false; // show or hide collision bounding
const SHOW_CENTRE_DOT = false; // show or hide ship's centre dot
const TEXT_FADE_TIME = 2.5; // text fade time in second
const TEXT_SIZE = 40; // text font height in pixels
const DEBUG = true;

let paused = false;
let tokenC = 0;
let gameOvers = 0;
let  roundsPlayed = 1;
let  roundsWon = 0;
let levelsReached = 1;
const roundsLost = roundsPlayed - roundsWon; 
let level = 1;
var  lives, roids, score, scoreHigh, ship, text, textAlpha;
        

        // set up event handlers
        document.addEventListener("keydown", keyDown);
        document.addEventListener("keyup", keyUp);



       
const asteroidImage = new Image();
asteroidImage.src = "assets/asteroid.png"; // 20px X 20px image to shoot

		
//=======================================
//
// Log out user after 1 hour 
//
//=======================================

const warningTime = 60 * 60 * 1000; // 1 hour in milliseconds

setTimeout(() => {
    alert("Your session expired, Please click OK to log out.");
    sendGameDataToServer(tokenC, score, roundsWon, roundsPlayed, roundsLost, levelsReached, gameOvers);
    window.location.href = "index.php";
}, warningTime);


document.addEventListener('DOMContentLoaded', () => {
    const joystick = document.getElementById('joystick');
    const button = document.getElementById('firebutton');
    let joystickCenter = { x: joystick.offsetLeft + joystick.offsetWidth / 2, y: joystick.offsetTop + joystick.offsetHeight / 2 };
    let isDragging = false;

    joystick.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    joystick.addEventListener('touchmove', (e) => {
        if (isDragging) {
            const touch = e.touches[0];
            const dx = touch.clientX - joystickCenter.x;
            const dy = touch.clientY - joystickCenter.y;
            const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 50); // Limit joystick movement to 50px radius
            const angle = Math.atan2(dy, dx);

            // Set ship thrust and rotation based on joystick position
            ship.thrusting = true;
            ship.rot = angle;
            ship.thrust.x = Math.cos(angle) * SHIP_THRUST / FPS;
            ship.thrust.y = -Math.sin(angle) * SHIP_THRUST / FPS;

            joystick.style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;
            e.preventDefault();
        }
    });

    joystick.addEventListener('touchend', () => {
        isDragging = false;
        ship.thrusting = false;
        ship.rot = 0;
        joystick.style.transform = 'translate(0, 0)';
    });

    button.addEventListener('touchstart', () => {
        shootLaser();
        button.style.backgroundColor = 'green';
        console.log('Button pressed');
    });

    button.addEventListener('touchend', () => {
        button.style.backgroundColor = 'red';
        console.log('Button released');
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
 }); 

    // Get references to the button and canvas
    const startButton = document.getElementById("startButton");
    var canv = document.getElementById("gameCanvas");
    let gameInitialized = false; // Flag to prevent multiple initializations
    var ctx = canv.getContext("2d");
    // Hide the game canvas initially
    canv.style.display = "none";

    // Add event listener to the Start button
   startButton.addEventListener("click", function () {
    if (!gameInitialized) {
       
            gameInitialized = true;
            console.log("Start button clicked");

            // Hide the Start button
            startButton.style.display = "none";

            // Show the game canvas
            canv.style.display = "block";
            canv.style.transition = "opacity 1s";
            canv.style.opacity = 1;

            // Initialize the game
            initializeGame();
        }
    
    });

    // Function to initialize the game
    function initializeGame() {
        console.log("Game initialized!");
        newGame(); // Call the game initialization logic
    
        // Start the game loop
        requestAnimationFrame(update);
    }










//=======================================
//
//   togglePause  FUNCTION
//
//=======================================

function togglePause() {
    paused = !paused;
    console.log("Pause state:", paused);
    if (paused) {
        // Display pause text
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.font = TEXT_SIZE + "px dejavu sans mono";
        ctx.fillText("Paused".toUpperCase(), canv.width / 2, canv.height / 2);
    } else {
        // Resume the game loop
        console.log("Resuming game loop");
        requestAnimationFrame(update);
    }
}
		
document.addEventListener("keydown", (ev) => {
    if (ev.key === "p" || ev.key === "P") {
        togglePause();
    }
});
		
		
//=======================================
//
//    createAsteroidBelt   FUNCTION
//
//=======================================

 function createAsteroidBelt() {
       roids = [];
       var x, y;
       for (var i = 0; i < ROID_NUM + level; i++) {
// random asteroid location (not touching spaceship)
               do {
                    x = Math.floor(Math.random() * canv.width);
                    y = Math.floor(Math.random() * canv.height);
                  } while (distBetweenPoints(ship.x, ship.y, x, y) < ROID_SIZE * 2 + ship.r);
                
				roids.push(newAsteroid(x, y, Math.ceil(ROID_SIZE / 2)));
            }
}
		
		
//=======================================
//
//  destroyAsteroid  FUNCTION
//
//=======================================

   function destroyAsteroid(index) {
    var x = roids[index].x;
    var y = roids[index].y;
    var r = roids[index].r;

    // Split the asteroid in two if necessary
    if (r == Math.ceil(ROID_SIZE / 2)) { // Large asteroid
        roids.push(newAsteroid(x, y, Math.ceil(ROID_SIZE / 4)));
        roids.push(newAsteroid(x, y, Math.ceil(ROID_SIZE / 4)));
    } else if (r == Math.ceil(ROID_SIZE / 4)) { // Medium asteroid
        roids.push(newAsteroid(x, y, Math.ceil(ROID_SIZE / 8)));
        roids.push(newAsteroid(x, y, Math.ceil(ROID_SIZE / 8)));
    }

    // Destroy the asteroid
    roids.splice(index, 1);

   // Check for new level
if (roids.length === 0) {
    roundsWon += 1;
    roundsPlayed += 1;

    // Only increment levelsReached if it's a new game (gameOvers == 0) or level is 2 or higher
    if (gameOvers === 0 || level >= 2) {
        levelsReached += 1;
    } else {
        levelsReached = 0;
    }

    level++;
    newLevel();
}

}




//===============================
//
// newAsteroid FUNCTION
//
//===============================

function newAsteroid(x, y, r) {
	var lvlMult = 1 + 0.1 * level;
    var roid = {
                x: x,
                y: y,
                xv: Math.random() * ROID_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
                yv: Math.random() * ROID_SPD * lvlMult / FPS * (Math.random() < 0.5 ? 1 : -1),
                a: Math.random() * Math.PI * 2, // in radians
                r: r,
                offs: [],
                vert: Math.floor(Math.random() * (ROID_VERT + 1) + ROID_VERT / 2)
                };

 // populate the offsets array
		for (var i = 0; i < roid.vert; i++) {
			roid.offs.push(Math.random() * ROID_JAG * 2 + 1 - ROID_JAG);
		}
  return roid;
}
//===============================
//
// distBetweenPoints FUNCTION
//
//===============================

function distBetweenPoints(x1, y1, x2, y2) {           
     return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
		
//===============================
//
// drawShip    FUNCTION
//
//===============================		
		
function drawShip(x, y, a, colour = "white", fillColor ="red") {
    // Draw the ship outline
    ctx.strokeStyle = colour;
    ctx.lineWidth = SHIP_SIZE / 20;
    ctx.beginPath();
    ctx.moveTo(
        x + 4 / 3 * SHIP_SIZE / 2 * Math.cos(a), // Nose
        y - 4 / 3 * SHIP_SIZE / 2 * Math.sin(a)
    );
    ctx.lineTo(
        x - SHIP_SIZE / 2 * (2 / 3 * Math.cos(a) + Math.sin(a)), // Rear left
        y + SHIP_SIZE / 2 * (2 / 3 * Math.sin(a) - Math.cos(a))
    );
    ctx.lineTo(
        x - SHIP_SIZE / 2 * (2 / 3 * Math.cos(a) - Math.sin(a)), // Rear right
        y + SHIP_SIZE / 2 * (2 / 3 * Math.sin(a) + Math.cos(a))
    );
    ctx.closePath();

    // Fill the ship if a fillColor is provided
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    // Stroke the ship outline
    ctx.stroke();
}

		
		
//==========================
//
//   explodeShip  FUNCTION
//
//==========================

 function explodeShip() {
            ship.explodeTime = Math.ceil(SHIP_EXPLODE_DUR * FPS);
        }



//====================
//
// GAMEOVER FUNCTION
//
//====================

function gameOver() {
    console.log("gameOver() called, gameOvers incremented to:", gameOvers + 1);
    gameOvers++; // Increment gameOvers
    ship.dead = true;
    text = "Game Over";
    textAlpha = 1.0;
    
    setTimeout(() => {
        paused = true;
        displayGameOverOptions();
    }, 1000);
}

//==================================
//
// handleGameOverInput FUNCTION
//
//==================================


function handleGameOverInput(event) {
    if (event.key === "r" || event.key === "R") {
        restartGame();
        document.removeEventListener("keydown", handleGameOverInput);
    } else if (event.key === "q" || event.key === "Q") {
        quitGame();
        document.removeEventListener("keydown", handleGameOverInput);
    }
}
//==================================
//
// displayGameOverOptions FUNCTION
//
//==================================

function displayGameOverOptions() {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.font = TEXT_SIZE + "px dejavu sans mono";
    ctx.fillText("Press R to Play Again or Q to Quit", canv.width / 2, canv.height / 2);
    document.addEventListener("keydown", handleGameOverInput);
}
//=================================
//
// restartGame FUNCTION
//
//==================================

function restartGame() {
    console.log("restartGame() called, resetting game state");
    paused = false;
    ship.dead = false;
    text = "Restarting Game";
    sendGameDataToServer(tokenC, score, roundsWon, roundsPlayed, roundsLost, levelsReached, gameOvers);
    initializeGame();
}

//=================================
//
// resetSession FUNCTION
//
//==================================

function resetSession() {
    levelsReached = 0;
    gameOvers = 0;
    
}



//=================================
//
// quitGame FUNCTION
//
//==================================

function quitGame() {
    sendGameDataToServer(tokenC, score, roundsWon, roundsPlayed, roundsLost, levelsReached, gameOvers);
    window.location.href = "index.php"; // Redirect to login page
}

//==============================
//
// NEWGAME & NEWLEVEL FUNCTION
//
//==============================
        

    function newGame() {
    console.log("newGame() called, initializing new game");
    level = 1;
    lives = GAME_LIVES;
    score = 0;
    tokenC = 0;
    ship = newShip();
 
    newLevel(); // Start at the first level
}


    function debugLog(message, ...optionalParams) {
    if (DEBUG) {
        console.log(message, ...optionalParams);
    }
}

function newLevel() {
    debugLog("newLevel() called, current level:", level );
    text = "Level " + level;
    textAlpha = 1.0;
    createAsteroidBelt();
}

		
		
		
		
//======================
//
// NEW SHIP FUNCTION
//
//======================



        function newShip() {
            return {
                x: canv.width / 2,
                y: canv.height / 2,
                a: 90 / 180 * Math.PI, // convert to radians
                r: SHIP_SIZE / 2,
                blinkNum: Math.ceil(SHIP_INV_DUR / SHIP_BLINK_DUR),
                blinkTime: Math.ceil(SHIP_BLINK_DUR * FPS),
                canShoot: true,
                dead: false,
                explodeTime: 0,
                lasers: [],
                rot: 0,
                thrusting: false,
                thrust: {
                    x: 0,
                    y: 0
                }
            }
        }


//======================
//
// shootLaser FUNCTION
//
//======================



     function shootLaser() {
            // create the laser object
            if (ship.canShoot && ship.lasers.length < LASER_MAX) {
                ship.lasers.push({ // from the nose of the ship
                    x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
                    y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
                    xv: LASER_SPD * Math.cos(ship.a) / FPS,
                    yv: -LASER_SPD * Math.sin(ship.a) / FPS,
                    dist: 0,
                    explodeTime: 0
                });
            }

            // prevent further shooting
            ship.canShoot = false;
        }
		
		




//======================
//
//    UPDATE FUNCTION 
// 
//======================

function update() {
	if (paused) return;
    var blinkOn = ship.blinkNum % 2 == 0;       
	var exploding = ship.explodeTime > 0;
// draw space
   ctx.fillStyle = "black";
   ctx.fillRect(0, 0, canv.width, canv.height);
// draw the asteroids
   var a, r, x, y;
   for (var i = 0; i < roids.length; i++) {
// Get the asteroid properties
   var x = roids[i].x;
   var y = roids[i].y;
// Draw the asteroid image scaled to 20x20 pixels
   ctx.drawImage(asteroidImage, x - 10, y - 10, 40, 40);
   }

// thrust the ship
   if (ship.thrusting && !ship.dead) {
      ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
      ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;
// draw the thruster
   if (!exploding && blinkOn) {
      ctx.fillStyle = "red";
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = SHIP_SIZE / 10;
      ctx.beginPath();
      ctx.moveTo( // rear left
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
                );
      ctx.lineTo( // rear centre (behind the ship)
                ship.x - ship.r * 5 / 3 * Math.cos(ship.a),
                ship.y + ship.r * 5 / 3 * Math.sin(ship.a)
                );
     ctx.lineTo( // rear right
              ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
              ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
               );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
} else {
// apply friction (slow the ship down when not thrusting)
       ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
       ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
}



// draw the triangular ship
if (!exploding) {
    if (blinkOn && !ship.dead) {
       drawShip(ship.x, ship.y, ship.a);
    }

// handle blinking
   if (ship.blinkNum > 0) {

// reduce the blink time
           ship.blinkTime--;

// reduce the blink num
		if (ship.blinkTime == 0) {
				ship.blinkTime = Math.ceil(SHIP_BLINK_DUR * FPS);
				ship.blinkNum--;
		}
    }
} else {
                // draw the explosion (concentric circles of different colours)
                ctx.fillStyle = "darkred";
                ctx.beginPath();
                ctx.arc(ship.x, ship.y, ship.r * 1.7, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(ship.x, ship.y, ship.r * 1.4, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "orange";
                ctx.beginPath();
                ctx.arc(ship.x, ship.y, ship.r * 1.1, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "yellow";
                ctx.beginPath();
                ctx.arc(ship.x, ship.y, ship.r * 0.8, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(ship.x, ship.y, ship.r * 0.5, 0, Math.PI * 2, false);
                ctx.fill();
            }

            // show ship's collision circle
            if (SHOW_BOUNDING) {
                ctx.strokeStyle = "lime";
                ctx.beginPath();
                ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
                ctx.stroke();
            }
			 // show asteroids collision circle
            if (SHOW_BOUNDING) {
                ctx.strokeStyle = "lime";
                ctx.beginPath();
                ctx.arc(roids.x, roids.y, roids.r, 0, Math.PI * 2, false);
                ctx.stroke();
            }
            
            // show ship's centre dot
            if (SHOW_CENTRE_DOT) {
                ctx.fillStyle = "red";
                ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);
            }

            // draw the lasers
            for (var i = 0; i < ship.lasers.length; i++) {
                if (ship.lasers[i].explodeTime == 0) {
                    ctx.fillStyle = "salmon";
                    ctx.beginPath();
                    ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
                    ctx.fill();
                } else {
                    // draw the eplosion
                    ctx.fillStyle = "orangered";
                    ctx.beginPath();
                    ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, 0, Math.PI * 2, false);
                    ctx.fill();
                    ctx.fillStyle = "salmon";
                    ctx.beginPath();
                    ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.5, 0, Math.PI * 2, false);
                    ctx.fill();
                    ctx.fillStyle = "pink";
                    ctx.beginPath();
                    ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, 0, Math.PI * 2, false);
                    ctx.fill();
                }
            }

 // draw the game text
            if (textAlpha >= 0) {
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "rgba(255, 255, 255, " + textAlpha + ")";
                ctx.font = "small-caps " + TEXT_SIZE + "px dejavu sans mono";
                ctx.fillText(text, canv.width / 2, canv.height * 0.75);
                textAlpha -= (1.0 / TEXT_FADE_TIME / FPS);
            } else if (ship.dead) {
                // after "game over" fades, start a new game
                newGame();
            }				
		// Draw the lives
for (var i = 0; i < lives; i++) {
    const isExploding = exploding && i === lives - 1;
    const outlineColor = isExploding ? "red" : "white";
    const fillColor = "lime"; // Always fill with lime for lives

    drawShip(
        SHIP_SIZE + i * SHIP_SIZE * 1.2, // x position
        SHIP_SIZE, // y position
        0.5 * Math.PI, // orientation
        outlineColor, // outline color
        fillColor // fill color
    );
}


// draw the current score
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.font = TEXT_SIZE + "px dejavu sans mono";
            ctx.fillText(" SCORE " + score, canv.width - SHIP_SIZE / 2, SHIP_SIZE);
			
// Draw current tokens 
                ctx.textAlign = "right";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "lime";
                ctx.font = (TEXT_SIZE * 0.75) + "px dejavu sans mono";
                ctx.fillText("TOKEN " + tokenC, canv.width - SHIP_SIZE / 2, SHIP_SIZE * 2);

// Detect laser hits on asteroids
                var ax, ay, ar, lx, ly;
                    for (var i = roids.length - 1; i >= 0; i--) {

// Grab the asteroid properties
                                ax = roids[i].x;
                                ay = roids[i].y;
                                ar = roids[i].r;

// Loop over the lasers
                        for (var j = ship.lasers.length - 1; j >= 0; j--) {

// Grab the laser properties
        lx = ship.lasers[j].x;
        ly = ship.lasers[j].y;

// Detect hits
        if (ship.lasers[j].explodeTime == 0 && distBetweenPoints(ax, ay, lx, ly) < ar) {
// Award points based on asteroid size
            if (ar == Math.ceil(ROID_SIZE / 2)) { // Large asteroid
                score += ROID_PTS_LGE;
            } else if (ar == Math.ceil(ROID_SIZE / 4)) { // Medium asteroid
                score += ROID_PTS_MED;
            } else { // Small asteroid
                score += ROID_PTS_SML;
            }

// Award tokens for every 50 points
           if (Math.floor(score / 50) > tokenC) {
                    tokenC++;
            }

            // Destroy the asteroid and activate the laser explosion
            destroyAsteroid(i);
            ship.lasers[j].explodeTime = Math.ceil(LASER_EXPLODE_DUR * FPS);
            break;
        } 
    }
}

            // check for asteroid collisions (when not exploding)
            if (!exploding) {

                // only check when not blinking
                if (ship.blinkNum == 0 && !ship.dead) {
                    for (var i = 0; i < roids.length; i++) {
                        if (distBetweenPoints(ship.x, ship.y, roids[i].x, roids[i].y) < ship.r + roids[i].r) {
                            explodeShip();
                            destroyAsteroid(i);
                            break;
                        }
                    }
                }

                // rotate the ship
                ship.a += ship.rot;

                // move the ship
                ship.x += ship.thrust.x;
                ship.y += ship.thrust.y;
            } else {
                // reduce the explode time
                ship.explodeTime--;

                // reset the ship after the explosion has finished
                if (ship.explodeTime == 0) {
                    lives--;
                    if (lives == 0) {
                        gameOver();
                    } else {
                        ship = newShip();
                    }
                }
            }

            // handle edge of screen
            if (ship.x < 0 - ship.r) {
                ship.x = canv.width + ship.r;
            } else if (ship.x > canv.width + ship.r) {
                ship.x = 0 - ship.r;
            }
            if (ship.y < 0 - ship.r) {
                ship.y = canv.height + ship.r;
            } else if (ship.y > canv.height + ship.r) {
                ship.y = 0 - ship.r;
            }

            // move the lasers
            for (var i = ship.lasers.length - 1; i >= 0; i--) {
                
                // check distance travelled
                if (ship.lasers[i].dist > LASER_DIST * canv.width) {
                    ship.lasers.splice(i, 1);
                    continue;
                }

                // handle the explosion
                if (ship.lasers[i].explodeTime > 0) {
                    ship.lasers[i].explodeTime--;

                    // destroy the laser after the duration is up
                    if (ship.lasers[i].explodeTime == 0) {
                        ship.lasers.splice(i, 1);
                        continue;
                    }
                } else {
                    // move the laser
                    ship.lasers[i].x += ship.lasers[i].xv;
                    ship.lasers[i].y += ship.lasers[i].yv;

                    // calculate the distance travelled
                    ship.lasers[i].dist += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));
                }

                // handle edge of screen
                if (ship.lasers[i].x < 0) {
                    ship.lasers[i].x = canv.width;
                } else if (ship.lasers[i].x > canv.width) {
                    ship.lasers[i].x = 0;
                }
                if (ship.lasers[i].y < 0) {
                    ship.lasers[i].y = canv.height;
                } else if (ship.lasers[i].y > canv.height) {
                    ship.lasers[i].y = 0;
                }
            }

            // move the asteroids
            for (var i = 0; i < roids.length; i++) {
                roids[i].x += roids[i].xv;
                roids[i].y += roids[i].yv;

                // handle asteroid edge of screen
                if (roids[i].x < 0 - roids[i].r) {
                    roids[i].x = canv.width + roids[i].r;
                } else if (roids[i].x > canv.width + roids[i].r) {
                    roids[i].x = 0 - roids[i].r
                }
                if (roids[i].y < 0 - roids[i].r) {
                    roids[i].y = canv.height + roids[i].r;
                } else if (roids[i].y > canv.height + roids[i].r) {
                    roids[i].y = 0 - roids[i].r
                }
         
            }
             requestAnimationFrame(update);
        }
        
        
//=======================================
//
//    sendGameDataToServer FUNCTION
//
//=======================================

function sendGameDataToServer(tokenC, score, roundsWon, roundsPlayed, roundsLost, levelsReached, gameOvers) {
    const data = {
        score: score,
        roundsWon: roundsWon,
        roundsPlayed: roundsPlayed,
        roundsLost: roundsLost,
        tokenC: tokenC,
        levelsReached:levelsReached,
        gameOvers: gameOvers,
    };

    return fetch("updateScore.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === "success") {
                console.log("Game data successfully updated on the server.");
            } else {
                console.error("Failed to update game data:", data.error);
            }
        })
        .catch(error => {
            console.error("Error sending game data:", error);
        });
}


//=======================================
//
// set up event  logout button
//
//=======================================


 const logoutButton = document.getElementById("logoutbutton");
document.getElementById("logoutButton").addEventListener("click", function () {
        fetch("logout.php", { method: "POST" })
        .then(() => {
            window.location.href = "index.php";
        })
        .catch((error) => console.error("Logout failed", error));
        
    sendGameDataToServer(tokenC, score, roundsWon, roundsPlayed, roundsLost, levelsReached, gameOvers);
    resetSession(); // Reset session on logout
    window.location.href = "index.php"; 
});

//====================
//
// KEYDOWN FUNCTION
//
//====================

    function keyDown(/** @type {KeyboardEvent} */ ev) {
			ev.preventDefault();
            if (ship.dead) {
                return;
            }

            switch(ev.keyCode) {
                case 32: // space bar (shoot laser)
                    shootLaser();
                    break;
                case 37: // left arrow (rotate ship left)
                    ship.rot = SHIP_TURN_SPD / 180 * Math.PI / FPS;
                    break;
                case 38: // up arrow (thrust the ship forward)
                    ship.thrusting = true;
                    break;
                case 39: // right arrow (rotate ship right)
                    ship.rot = -SHIP_TURN_SPD / 180 * Math.PI / FPS;
                    break;
            }
        }



//====================
//
// KeyUp FUNCTION
//
//====================

 function keyUp(/** @type {KeyboardEvent} */ ev) {
			ev.preventDefault();
            if (ship.dead) {
                return;
            }

            switch(ev.keyCode) {
                case 32: // space bar (allow shooting again)
                    ship.canShoot = true;
                    break;
                case 37: // left arrow (stop rotating left)
                    ship.rot = 0;
                    break;
                case 38: // up arrow (stop thrusting)
                    ship.thrusting = false;
                    break;
                case 39: // right arrow (stop rotating right)
                    ship.rot = 0;
                    break;
            }
        }




});
//==============================
//
//    END OF FILE
//
//==============================
