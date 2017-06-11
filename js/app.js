// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //thanks to Karol's note at https://discussions.udacity.com/t/bugs-and-player-collision-is-occurring-too-early/242650/4 about reducing the width and height for Enemy and Player to make collisions occur when they are nearer to each other.
    this.sprite = 'images/enemy-bug.png';
    this.width = 80; //setting a working width for now
    this.height = 65; //setting a working height for now
    //set random initial x & y coordinates for each enemy;
    this.x = Math.floor(Math.random() * 11) + 15;
    this.y = Math.floor(Math.random() * 251) + 50;

    this.speed = Math.floor(Math.random() * 151) + 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //the following resets the enemy's position to the left side of the board and randomizes the speed as well as the x & y coordinates.
    if (this.x > 500) {
        this.x = Math.floor(Math.random() * 11) + 15;
        this.y = Math.floor(Math.random() * 201) + 100;
        this.speed = Math.floor(Math.random() * 151) + 50;

    }
    //calls the checkCollisions function.
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};
Enemy.prototype.checkCollisions = function() {


    //setting up the collision detection with the algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

    if (player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.height + player.y > this.y) {
        console.log("collision detected!");
        player.x = 225;
        player.y = 400;
        player.lives = player.lives - 1; {
            //clearRect(25, 25, 100, 50);
            ctx.font = '18px Sans Serif';
            ctx.textBaseline = 'top';
            ctx.fillText('Lives: ' + player.lives, 25, 25);
        }
        if (player.lives == 0) {
            //clearRect(25, 25, 100, 50);
            ctx.font = '36px Sans Serif';
            ctx.textBaseline = 'top';
            ctx.fillText('Game over!', 25, 25);
        }
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, lives) {
    this.sprite = 'images/char-boy.png';
    this.width = 50; //setting a working width
    this.height = 50; //setting a working height
    this.x = x;
    this.y = y;
    this.lives = lives;
    this.gemScore = 0;

};


Player.prototype.update = function(dt) {
    //this.handleInput();
    if (this.x > 450) {
        this.x = 425;
    }
    if (this.x < -15) {
        this.x = 15;
    }
    if (this.y > 425) {
        this.y = 400;
    }
    if (this.y < -15) {
        this.x = 225;
        this.y = 400;
        player.lives = player.lives + 1;
        //clearRect(25, 25, 100, 50);
        ctx.font = '18px Sans Serif';
        ctx.textBaseline = 'top';
        ctx.fillText('Lives: ' + player.lives, 25, 25);
    }
    this.checkGemCollisions();

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);

};

Player.prototype.handleInput = function(allowedKeys) {
    if (allowedKeys == 'left') {
        this.x -= 20;
    } else if (allowedKeys == 'right') {
        this.x += 20;
    } else if (allowedKeys == 'up') {
        this.y -= 20;
    } else {
        this.y += 20;
    }

};

Player.prototype.checkGemCollisions = function() {


    //setting up the collision detection with the algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    var gemReset = function() {
        gem.x = Math.floor(Math.random() * 301) + 100;
        gem.y = Math.floor(Math.random() * 301) + 50;
    };
    if (gem.x < this.x + this.width &&
        gem.x + gem.width > this.x &&
        gem.y < this.y + this.height &&
        gem.height + gem.y > this.y) {
        player.y = 10;
        player.gemScore = player.gemScore + 1; {
            console.log("You have " + player.gemScore + "gems!")
        };
        setTimeout(gemReset, 1500)
    }
};
var gemTypes = ['images/gem-blue.png', 'images/gem-orange.png', 'images/gem-green.png'];
var Gem = function(x, y) {
    this.sprite = gemTypes[Math.floor(Math.random() * gemTypes.length)]
    this.width = 75
    this.height = 75
    this.x = Math.floor(Math.random() * 301) + 100;
    this.y = Math.floor(Math.random() * 301) + 50;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
//var bug4 = new Enemy();

var allEnemies = [bug1, bug2, bug3];

var player = new Player(200, 400, 10);
var gem = new Gem();


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