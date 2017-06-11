// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.width = 99; //setting a working width for now
    this.height = 77; //setting a working height for now
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -40;
    }
    this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};
var checkCollisions = function(){
    for(i = 0; i < allEnemies.length; i++){

    //setting up the collision detection with the algorithm from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

    if (allEnemies[i].x < this.x + this.width &&
        allEnemies[i].x + allEnemies[i].width > this.x &&
        allEnemies[i].y < this.y + this.height &&
        allEnemies[i].height + allEnemies[i].y > this.y) {
        console.log("collision detected!");
        this.x = 225;
        this.y = 400;
    }
    }
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.width = 67; //setting a working width
    this.height = 88; //setting a working height
    this.x = x;
    this.y = y;
    this.speed = speed;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite),
        this.x, this.y);

};


Player.prototype.update = function (dt) {
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
        this.y = 400;
    }
    //this.checkCollisions(allEnemies, player);

};
Player.prototype.handleInput = function (allowedKeys) {
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var bug1 = new Enemy(15, 100, 35);
var bug2 = new Enemy(15, 200, 55);
var bug3 = new Enemy(25, 300, 48);

var allEnemies = [bug1, bug2, bug3];

var player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});