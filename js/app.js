// Enemies our player must avoid
var level = 1;
document.getElementById('level').innerHTML = level
var score = document.querySelector('.score')
var live = document.querySelector('.live')
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    //enemt constructor
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * (level * 0.25) * dt
    // Speed will increase every time when level increse 
    if (this.x > 550) {
        this.x = -50
    }

    if (this.x + 60 > player.x &&
        this.x < player.x + 60 &&
        this.y + 60 > player.y &&
        this.y < player.y + 60) {
        //collision conditions    
        player.x = 200;
        player.y = 400;
        //if player collides with enemy player will come to starting position
        live.textContent--;
        score.textContent++;
        //when enemy hits lives goes dowm by one
        if(live.textContent == 0) {
            alert('You lose!  Play again ');
            //alert message
            score.textContent = 1;
            //level = 1
            live.textContent = 3;
            //lives = 3

        }

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

const Player = function (x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    //player constructor
}

Player.prototype.update = function () {
    if (player.y < 10) {
        document.getElementById('level').innerHTML = level
        level++
        //level increase by 1 when reach the water
        this.restart()
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

}

Player.prototype.handleInput = function (direction) {
    if (direction == "left" && this.x > 0) {
        this.x = this.x - 100
    }
    if (direction == "up" && this.y > 0) {
        this.y = this.y - 90
    }
    if (direction == "right" && this.x < 400) {
        this.x = this.x + 100
    }
    if (direction == "down" && this.y < 370) {
        this.y = this.y + 90
    }
    // conditions of the player movement 

}

Player.prototype.restart = function () {
    this.x = 200;
    this.y = 400;
    // restart function for player intial postion
}

const enemy1 = new Enemy(400, 60, 300);
const enemy2 = new Enemy(200, 150, 300);
const enemy3 = new Enemy(300, 230, 250);
//new enemy position and speed

const allEnemies = [enemy1, enemy2, enemy3]

const player = new Player(200, 400);
//new player starting position

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