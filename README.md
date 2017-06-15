frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

## The Random Rock Obstacle Course Frogger Game

This is a somewhat modified game of Frogger. The player must cross a paved path to get to the water on the other side. While crossing, the player must avoid colliding with either the bugs racing down the path or randomly appearing rocks. The player can pick up gems on the way. The game is won when the player collects 15 "lives" or 10 gems. The game is lost if the player has no lives left. A score will show up once the player has the first collision or collects the first gem. 

* Reaching the water grants 1 life point and sends the player back to the start.
* Colliding with a bug or deducts 1 life point and send the player back to the start. 
* Colliding with a rock will deduct one life point and knock the player a short distance towards the grass (starating area). 
* Colliding with either a bug or with a rock will cause the rocks to randomly relocate.
* Colliding with a gem grants a gem point, and "jumps" the player to the blue water squares. 

### To play: 

* Refresh the browser window to start the game.
* Use the arrow keys to move the player: right arrow to move right, left arrow to move left, up arrow to move up, down arrown to move down.
* At this time, the distance the player moves is set by the code and does not vary. The speed of the bugs is randomly set. 
* To "collect" a gem, move until you collide with it.

### Still a work in progress:

* permanently pausing enemy movement after a game is lost/won, until it is reset;
* Player can still pick up gems after a game is won or lost (score will be console logged, but not displayed); if so additional scores may show up on the game board, overlapping the won/lost message.
* further finetuning of collisions.


