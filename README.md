# UDACITY frontend-nanodegree-arcade-game
## The Random Rock Obstacle Course Frogger Game
### Objective

This is a somewhat modified game of Frogger. The player must cross a paved path to get to the water on the other side. While crossing, the player must avoid colliding with either the bugs racing down the path or randomly appearing rocks. The player can pick up gems on the way. The game is won when the player collects 15 "lives" or 10 gems. The game is lost if the player has no lives left. A score will show up once the player has the first collision or collects the first gem.

### How To play: 

* To load the game, go to https://lhwitherspoon.github.io/frontend-nanodegree-arcade-game/. The bugs will start moving when you open up the link.
* After winning or losing, refresh the browser window to reload the game, using the `REFRESH` symbol &#10227; on your browser. (If you do not see this symbol, check your browser's help documentation )
* Use the arrow keys to move the player: right arrow to move right, left arrow to move left, up arrow to move up, down arrown to move down.
* At this time, the distance the player moves is set by the code and does not vary. The speed of the bugs is randomly set each time a bug appears on the screen.
* To "collect" a gem, move until you collide with it.

#### Game Play Notes

* Reaching the water grants 1 life point and sends the player back to the start.
* Colliding with a bug or deducts 1 life point and send the player back to the start. 
* Colliding with a rock will deduct one life point and knock the player a short distance towards the grass (starating area). 
* Colliding with either a bug or with a rock will cause the rocks to randomly relocate.
* Colliding with a gem grants a gem point, and "jumps" the player to the blue water squares. 

### Still a work in progress:

* ~~permanently pausing enemy movement after a game is lost/won, until it is reset;~~
* ~~Player can still pick up gems after a game is won or lost (score will be console logged, but not displayed); if so additional scores may show up on the game board, overlapping the won/lost message.~~
* further finetuning of collisions.


