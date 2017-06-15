//a method to draw a bounding box around the characters to fine tune the game play: courtesy of Karol https://discussions.udacity.com/t/how-to-pause-the-game/190398/7
function drawBox(x, y, width, height, color) {
    ctx.beginPath();

    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}
//TODO: set up player.gemScore to display at start of game; 
//TODO: set up player.lifeScore to display at start of  game/
//thanks to https://discussions.udacity.com/t/classic-arcade-game-problem-getting-started/244322/4 which describes how to get started; alsohttps://discussions.udacity.com/t/no-idea-whatsoever/197493/23.
//images were cropped to eliminate "extra" transparency on the top of the images, that was leading to offsets and difficulty in fine-tuning collisions. 
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //thanks to Karol's note at https://discussions.udacity.com/t/bugs-and-player-collision-is-occurring-too-early/242650/4 about reducing the width and height for Enemy and Player to make collisions occur when they are nearer to each other.
    this.sprite = 'images/enemy-bug.png';
    this.width = 90; //setting a working width for now
    this.height = 65; //setting a working height for now
    //set random initial x & y coordinates and speed for each enemy; thanks to https://www.kirupa.com/html5/random_numbers_js.htm for the explanation 
    this.x = Math.floor(Math.random() * 11) + 15;
    this.y = Math.floor(Math.random() * 201) + 100;
    this.speed = Math.floor(Math.random() * 101) + 50;
    //the following allows the enemies to be unable to move under certain conditions courtesy of a hint from https://discussions.udacity.com/t/stopping-enemy-movement/241905
    this.canMove = true;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //the following resets the enemy's position to the left side of the board and randomizes the speed as well as the x & y coordinates.
    if (this.x + 25 > 500) {
        this.x = Math.floor(Math.random() * 11) + 15;
        this.y = Math.floor(Math.random() * 201) + 100;
        this.speed = Math.floor(Math.random() * 101) + 50;
    }
    //calls the checkCollisions function.
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //drawBox(this.x, this.y, 100, 75, 'yellow');
};
Enemy.prototype.checkCollisions = function() {
    //setting up the collision detection with the algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        (player.y) < this.y + this.height &&
        (player.height) + player.y > this.y) {

        console.log("collision detected!");
        player.x = 225;
        player.y = 400;
        //collide with a bug and the rocks are moved to random locations
        for (i = 0; i < allRocks.length; i++) {
            allRocks[i].update();
        }
        //plus a life point is deducted
        player.lives = player.lives - 1;
        player.displayLifeScore();
        //player.displayGemScore();

    } else if (player.lives === 0 || player.lives < 0) {
        player.gameLose();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, lives, movement) {
    this.sprite = 'images/char-boy.png';
    this.width = 80; //setting a working width
    this.height = 80; //setting a working height
    //setting the initial location on the gameboard
    this.x = x;
    this.y = y;
    //this sets the amount the player will move in any direction when a key is pressed
    this.movement = movement;
    //this sets the player's initial number of "lives".
    this.lives = lives;
    this.gemScore = 0;
};

Player.prototype.update = function(dt) {
    this.handleInput();

    //if the player gets 15 lives or 10 gems, they win the game. 
    if (player.lives == 15 || player.gemScore == 10) {
        this.gameWin();
    }
    this.resetSides();
    this.resetWater();
    this.checkGemCollisions();

    this.checkRockCollisions();
    this.displayLifeScore();
    this.displayGemScore();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
    //drawBox(this.x, this.y, 80, 80, 'blue');
};
//this displays the player's life score if it is above 0
Player.prototype.displayLifeScore = function() {
    if (player.lives > 0 && player.lives < 15) {
        ctx.clearRect(25, 25, 100, 50);
        ctx.font = '18px Sans Serif';
        ctx.textBaseline = 'top';
        ctx.fillText('Lives: ' + player.lives, 25, 25);
    }
};

//this displays the players gem count or score if the game has not ended
Player.prototype.displayGemScore = function() {
    if (player.gemScore < 10 && (player.lives > 0 && player.lives < 15)) {
        ctx.clearRect(200, 25, 100, 50);
        ctx.font = '18px Sans Serif';
        ctx.textBaseline = 'top';
        ctx.fillText('Gems: ' + player.gemScore, 200, 25);
    }
};

Player.prototype.resetWater = function() {
    //this resets the player's  position back to the original side once they reach the water and adds on a point to the lifescore;
    if (this.y < 35) {
        this.x = 225;
        this.y = 435;
        player.lives = player.lives + 1;
        this.displayLifeScore();
    }
};

Player.prototype.resetSides = function() {
    //this keeps the player from moving off the board except upon reaching the water
    if (this.x > 425) {
        this.x = 400;
    }
    if (this.x < -15) {
        this.x = 15;
    }
    if (this.y > 455) {
        this.y = 435;
    }
};
//this displays a message when the game is lost and clears the enemies off the screen
Player.prototype.gameLose = function() {
    for (i = 0; i < allEnemies.length; i++) {
        //this moves the enemies off screen to end the game;
        allEnemies[i].x = -400;
        allEnemies[i].y = -400;
        allEnemies[i].move = false;
    }
    ctx.clearRect(25, 25, 600, 50);
    ctx.fillStyle = 'red';
    ctx.font = 'bold 20px Sans Serif';
    ctx.textBaseline = 'top';
    ctx.textAlign = 'center';
    ctx.fillText('Game over! Refresh the window to play again', 225, 25);
};
//this displays a message when the game is won and clears the enemies off the screen
Player.prototype.gameWin = function() {
    {
        for (i = 0; i < allEnemies.length; i++) {
            //this moves the enemies off screen to end the game;
            allEnemies[i].x = -400;
            allEnemies[i].y = -400;
            allEnemies[i].move = false;
        }
        ctx.clearRect(25, 25, 600, 50);
        ctx.fillStyle = 'green';
        ctx.font = 'bold 20px Sans Serif';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'center';
        ctx.fillText('You won! Refresh the window to play again', 225, 25);
    }
};
//this.movement is set in the player instantiation. It is the amount the player will move when the key is pressed. https://www.w3schools.com/graphics/game_controllers.asp, https://discussions.udacity.com/t/arcade-game-question/246212/70 and https://discussions.udacity.com/t/how-do-i-make-the-handleinput-listen-the-keys/162024  were helpful in understanding how this worked. 
Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys == 'left') {
        this.x -= this.movement;
    } else if (allowedKeys == 'right') {
        this.x += this.movement;
    } else if (allowedKeys == 'up') {
        this.y -= this.movement;
    } else if (allowedKeys == 'down') {
        this.y += this.movement;
    }
};

Player.prototype.checkGemCollisions = function() {
    //setting up the collision detection with the algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

    if (gem.x < this.x + this.width &&
        gem.x + gem.width > this.x &&
        gem.y < this.y + this.height &&
        gem.height + gem.y > this.y) {
        player.y = 50;
        player.lives = player.lives + 1;
        player.gemScore = player.gemScore + 1; {
            console.log("You have " + player.gemScore + "gems!");
        }
        //this displays the number of gems
        player.displayGemScore();
        //this moves the gem to a new location
        setTimeout(gem.update(), 5000);
    }
};

Player.prototype.checkRockCollisions = function() {
    for (i = 0; i < allRocks.length; i++) {
        if (allRocks[i].x < this.x + this.width &&
            allRocks[i].x + allRocks[i].width > this.x &&
            allRocks[i].y < this.y + this.height &&
            allRocks[i].height + allRocks[i].y > this.y) {
            //this moves the player away from the rock to prevent life points being "drained" by staying near the rock.
            player.y = player.y + (Math.floor(Math.random() * 26) + 25);
            player.x = player.x + (Math.floor(Math.random() * 26) + 25);
            //player.y = 400;
            player.lives = player.lives - 1; {
                console.log("You hit a rock!");
            }
            player.displayLifeScore();
            //this moves the rock to a new location
            setTimeout(allRocks[i].update(), 5000);
        }
    }
};
//this provides an array of gem images that will be randomly selected from each time a gem appears
var gemTypes = ['images/gem-blue.png', 'images/gem-orange.png', 'images/gem-green.png'];

var Gem = function(x, y) {
    this.sprite = gemTypes[Math.floor(Math.random() * gemTypes.length)];
    //thanks to Karol's comment on resizing the gems here: https://discussions.udacity.com/t/change-size-of-gem-image/189661
    this.width = 65;
    this.height = 75;
    this.x = Math.floor(Math.random() * 301) + 100;
    this.y = Math.floor(Math.random() * 301) + 100;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y, this.width, this.height);
    //drawBox(this.x, this.y, 65, 75, 'red');
};

Gem.prototype.update = function() {
    //this resets the gem to a new location that is randomly chosen
    gem.x = Math.floor(Math.random() * 301) + 100;
    gem.y = Math.floor(Math.random() * 301) + 100;
};

//this sets up rocks to randomly trip over. 
var Rock = function(x, y) {
    this.sprite = 'images/rock.png';
    this.width = 90;
    this.height = 90;
    this.x = Math.floor(Math.random() * 301) + 100;
    this.y = Math.floor(Math.random() * 276) + 100;
};

Rock.prototype.update = function() {
    this.x = Math.floor(Math.random() * 301) + 100;
    this.y = Math.floor(Math.random() * 276) + 100;
};

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
    // drawBox(this.x, this.y, 100, 100, 'green');
    //this.width, this.height);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
//var bug4 = new Enemy();

var allEnemies = [bug1, bug2, bug3];

//this sets the player with a given initial location, life number, and movement amount
var player = new Player(225, 435, 10, 40);
var gem = new Gem();
var rock1 = new Rock();
var rock2 = new Rock();

var allRocks = [rock1, rock2];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});