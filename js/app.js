// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // The image/sprite for enemies
    this.sprite = 'images/enemy-bug.png';

    // Set the enemies initial position
    this.x = x;
    this.y = y;

    // Set the enemies speed
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x <= 505) {
        this.x += this.speed * dt;
    } else {
        this.x = 0;
    }
    // Handles any collision with player
    if (this.y == player.y && (this.x + 80 >= player.x && this.x - 80 <= player.x)) {
            player.x = 200;
            player.y = 400;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.wonGame = false;
}

// Player update method
Player.prototype.update = function() {
    if (this.y == -25 & this.wonGame == false) {
        this.wonGame = true;
        setTimeout(()=> {
            window.alert('You just won!');
            this.x = 200;
            this.y = 400;
            this.wonGame = false;
        }, 100);

    }
}

// Player render method
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Player handleInput method
Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'up':
            if (this.y > -25) {
                this.y -= 85;
            }
            break;

        case 'down':
            if (this.y < 400) {
                this.y += 85;
            }
            break;

        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            break;

        case 'right':
            if (this.x < 400) {
                this.x += 100;
            }
            break;

        default:
            break;
    }
}

// Instantiate all enemies and put them in an array called allEnemies
let enemy1 = new Enemy(400,60,300);
let enemy2 = new Enemy(200,145,200);
let enemy3 = new Enemy(280,230,100);
let allEnemies = [enemy1,enemy2,enemy3];

// Place the player object in a variable called player
let player = new Player(200,400);

// This listens for key presses and sends the keys to the Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
