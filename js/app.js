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
        rock.update();
        player.lives = player.lives - 1;
        player.displayLifeScore();
        //player.displayGemScore();

    } else if (player.lives == 0 || player.lives < 0) {
        for (i = 0; i < allEnemies.length; i++) {
            allEnemies[i].x = -400;
            allEnemies[i].y = -400;
            allEnemies[i].move = false;
        }
        ctx.clearRect(25, 25, 600, 50);
        ctx.fillStyle = 'red'
        ctx.font = 'bold 20px Sans Serif';
        ctx.textBaseline = 'top'
        ctx.textAlign = 'center'
        ctx.fillText('Game over! Refresh the window to play again', 225, 25);
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
        player.displayLifeScore();
        player.displayGemScore();
    }
    this.checkGemCollisions();
    this.checkRockCollisions();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
};

Player.prototype.displayLifeScore = function() {
    if (player.lives > 0) {
        ctx.clearRect(25, 25, 100, 50);
        ctx.font = '18px Sans Serif';
        ctx.textBaseline = 'top';
        ctx.fillText('Lives: ' + player.lives, 25, 25);
    } //the next part tells it to simply draw a blank rectangle if the lives are 0 or less.  
    else if (player.lives < 1) {
        ctx.clearRect(25, 25, 100, 50);
    }
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

var gemTypes = ['images/gem-blue.png', 'images/gem-orange.png', 'images/gem-green.png'];

var Gem = function(x, y) {
    this.sprite = gemTypes[Math.floor(Math.random() * gemTypes.length)];
    this.width = 100;
    this.height = 100;
    this.x = Math.floor(Math.random() * 301) + 100;
    this.y = Math.floor(Math.random() * 301) + 50;
}

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
};

Gem.prototype.update = function() {

    gem.x = Math.floor(Math.random() * 301) + 100;
    gem.y = Math.floor(Math.random() * 301) + 50;
};

Player.prototype.displayGemScore = function() {
    ctx.clearRect(200, 25, 100, 50);
    ctx.font = '18px Sans Serif';
    ctx.textBaseline = 'top';
    ctx.fillText('Gems: ' + player.gemScore, 200, 25);
}

Player.prototype.checkGemCollisions = function() {
    //setting up the collision detection with the algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

    if (gem.x < this.x + this.width &&
        gem.x + gem.width > this.x &&
        gem.y < this.y + this.height &&
        gem.height + gem.y > this.y) {
        player.y = 10;
        player.gemScore = player.gemScore + 1; {
            console.log("You have " + player.gemScore + "gems!")
        };
        //this displays the number of gems
        player.displayGemScore();
        //this moves the gem to a new location
        setTimeout(gem.update(), 5000)
    }
};

var Rock = function(x, y) {
    this.sprite = 'images/rock.png';
    this.width = 100;
    this.height = 100;
    this.x = Math.floor(Math.random() * 301) + 100;
    this.y = Math.floor(Math.random() * 301) + 50;
}

Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);
};

Rock.prototype.update = function() {
    rock.x = Math.floor(Math.random() * 301) + 100;
    rock.y = Math.floor(Math.random() * 301) + 50;
};

Player.prototype.checkRockCollisions = function() {
    if (rock.x < this.x + this.width &&
        rock.x + rock.width > this.x &&
        rock.y < this.y + this.height &&
        rock.height + rock.y > this.y) {
        player.y = rock.y - 50;
        player.x = rock.x - 50;
        player.lives = player.lives - 1; {
            console.log("You hit a rock!")

        };
        //this displays the number of gems
        player.displayLifeScore();
        //this moves the gem to a new location
        setTimeout(rock.update(), 5000)


    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy();
var bug2 = new Enemy();
var bug3 = new Enemy();
//var bug4 = new Enemy();

var allEnemies = [bug1, bug2, bug3];

var player = new Player(225, 400, 10);
var gem = new Gem();
var rock = new Rock();


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