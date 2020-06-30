// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class

    this.enemies = [];
    // We add the background image to the game

    this.livesArray = [];
    addDashboard(this.root);
    addBackground(this.root);
    addLevelText(this.root);

    this.player.createLives();
    this.bonusArray = [];
    this.gameOverText = new Text(this.root, "120px", "300px");
    this.highScore = 0;
    this.newHighScore = true;

    this.gameOverText.update(
      `WELCOME TO GUITAR ZERO!\ndodge beers & collect cheers\npress spacebar to play`
    );
    // document.addEventListener("keydown", this.keyDownRestart);
    return;
  }

  gameOverRestart = () => {
    console.log("restart");
    // location.reload();

    this.enemies.forEach((enemy) => {
      enemy.speedIncrease = 0.1;
      enemy.deleteEnemy();
    });
    this.enemies = [];
    this.bonusArray.forEach((bonus) => {
      bonus.speedIncrease = 0.1;
      bonus.deleteBonus();
    });
    this.bonusArray = [];
    this.gameOverText.update("");
    this.player.lives = PLAYER_MAX_LIVES;
    this.player.points = 0;
    this.player.level = 1;
    this.player.createLives();
    const pointsdiv = document.querySelector("#points");
    pointsdiv.innerText = `HIGH SCORE: ${this.highScore}\nLEVEL: ${this.player.level}\nPOINTS: ${this.player.points}`;
    this.newHighScore = false;
    this.gameLoop();
  };
  keyDownRestart = (event) => {
    console.log("test");
    if (event.code === "Space") {
      event.preventDefault();
      document.removeEventListener("keydown", this.keyDownRestart);
      console.log("space");
      this.gameOverRestart();
    }
  };

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    // This code is to see how much time, in milliseconds, has elapsed since the last
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      enemy.update(timeDiff);
    });

    this.bonusArray.forEach((bonus) => {
      bonus.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    this.bonusArray = this.bonusArray.filter((bonus) => {
      return !bonus.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot, this.player.level));
    }

    while (this.bonusArray.length < MAX_BONUS) {
      const spot = nextBonusSpot(this.bonusArray);
      this.bonusArray.push(new Bonus(this.root, spot, this.player.level));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      console.log("player dead");
      this.gameOverText.update(
        `TOUGH CROWD! PLAY AGAIN?\nhit spacebar for an encore`
      );

      document.addEventListener("keydown", this.keyDownRestart);
      return;
    }

    if (this.isPlayerHit()) {
      console.log("ouch");
      const playerID = document.querySelector("#player");
      playerID.classList.add("hit");

      const removeHit = () => {
        playerID.classList.remove("hit");
      };
      playerID.addEventListener("animationend", removeHit);
      setInterval(function () {
        playerID.removeEventListener("animationend", removeHit);
      }, 1000);
    }
    const levelUp = () => {
      const pointsdiv = document.querySelector("#points");
      this.player.level += 1;
      pointsdiv.innerText = `HIGH SCORE: ${this.highScore}\nLEVEL: ${this.player.level}\nPOINTS: ${this.player.points}`;
      console.log(`level ${this.player.level}`);
      let levelUpText = new Text(this.root, "70px", "300px");
      levelUpText.update(`LEVEL ${this.player.level}`);
      setTimeout(() => {
        levelUpText.delete();
      }, 1000);
    };

    if (this.getPlayerBonus()) {
      console.log("excellent");
      const playerID = document.querySelector("#player");
      playerID.classList.add("bonus");

      const removeBonus = () => {
        playerID.classList.remove("bonus");
      };
      playerID.addEventListener("animationend", removeBonus);
      setInterval(function () {
        playerID.removeEventListener("animationend", removeBonus);
      }, 1000);
      if (this.player.points % 100 === 0) {
        levelUp();
      }
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);

    // console.log(this.player);
    // console.log(this.enemies);
  };

  isPlayerHit = () => {
    let newHit = false;
    const dashboard = document.querySelector("#dashboard");
    const lives = document.querySelector("#lives");
    const playerID = document.querySelector("#player");
    const clang = document.createElement("AUDIO");
    clang.setAttribute("src", "sounds/clang.mp3");
    document.body.appendChild(clang);

    this.enemies.forEach((enemy) => {
      if (!enemy.hasHitPlayer) {
        if (
          enemy.x === this.player.x &&
          enemy.y >
            DASHBOARD_HEIGHT +
              GAME_HEIGHT -
              PLAYER_HEIGHT -
              ENEMY_HEIGHT -
              10 &&
          enemy.y < DASHBOARD_HEIGHT + GAME_HEIGHT - 20
        ) {
          enemy.hasHitPlayer = true;
          this.player.lives -= 1;
          this.player.removeLife();
          clang.currentTime = 0;
          clang.play();
          newHit = true;
          console.log(this.player.lives);
        }
      }
    });

    return newHit;
  };

  isPlayerDead = () => {
    if (this.player.lives === 0) {
      return true;
    }
  };

  getPlayerBonus = () => {
    let newBonus = false;
    const pointsdiv = document.querySelector("#points");
    const excellent = document.createElement("AUDIO");
    excellent.setAttribute("src", "sounds/excellent.mp3");
    document.body.appendChild(excellent);
    this.bonusArray.forEach((bonus) => {
      if (!bonus.hasHitPlayer) {
        if (
          bonus.x === this.player.x &&
          bonus.y >
            DASHBOARD_HEIGHT + GAME_HEIGHT - PLAYER_HEIGHT - BONUS_HEIGHT - 10
        ) {
          bonus.hasHitPlayer = true;
          this.player.points += 10;
          if (this.player.points > this.highScore) {
            this.highScore = this.player.points;
            if (this.newHighScore === false) {
              this.newHighScore = true;
              let levelUpText = new Text(this.root, "70px", "250px");
              levelUpText.update(`NEW HIGH SCORE!`);
              setTimeout(() => {
                levelUpText.delete();
              }, 1000);
            }
          }
          pointsdiv.innerText = `HIGH SCORE: ${this.highScore}\nLEVEL: ${this.player.level}\nPOINTS: ${this.player.points}`;
          excellent.currentTime = 0;
          excellent.play();
          newBonus = true;
          console.log("bonus");
        }
      }
    });

    return newBonus;
  };
}
