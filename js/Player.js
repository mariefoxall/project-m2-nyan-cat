// There will only be one instance of this class. This instance will contain the
// data and methods related to the burger that moves at the bottom of your screen
class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.x = 4 * PLAYER_WIDTH;
    this.lives = PLAYER_MAX_LIVES;
    this.points = 0;
    this.level = 1;

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
    const y = DASHBOARD_HEIGHT + GAME_HEIGHT - PLAYER_HEIGHT - 10;

    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    const playerImgArray = [
      "images/avatar1.png",
      "images/avatar2.png",
      "images/avatar3.png",
      "images/avatar2.png",
    ];

    let index = 0;

    const changeImage = () => {
      index += 1;
      if (index === playerImgArray.length) {
        index = 0;
      }
      this.domElement.src = playerImgArray[index];
    };

    this.domElement = document.createElement("img");
    this.domElement.setAttribute("id", "player");
    this.domElement.src = playerImgArray[0];
    setInterval(changeImage, 200);

    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${y}px`;
    this.domElement.style.zIndex = "10";
    root.appendChild(this.domElement);
  }

  // This method will be called when the user presses the left key. See in Engine.js
  // how we relate the key presses to this method
  moveLeft() {
    if (this.x > 0) {
      this.x = this.x - PLAYER_WIDTH;
    }

    this.domElement.style.left = `${this.x}px`;
  }

  // We do the same thing for the right key. See Engine.js to see when this happens.
  moveRight() {
    if (this.x + PLAYER_WIDTH < GAME_WIDTH) {
      this.x = this.x + PLAYER_WIDTH;
      // this.x = this.x + 10;
    }
    this.domElement.style.left = `${this.x}px`;
  }

  // show number of lives
  createLives() {
    const livesContainer = document.querySelector("#lives");
    for (let i = 0; i < PLAYER_MAX_LIVES; i++) {
      console.log(`lives ${i}`);
      const livesimg = document.createElement("img");
      livesimg.setAttribute("id", `life-${i + 1}`);
      livesimg.setAttribute("src", "images/guitar1.png");
      livesContainer.appendChild(livesimg);
      // this.livesArray.push(livesimg);
      // console.log(this.livesArray);
    }
  }

  removeLife() {
    const lives = document.querySelector("#lives");
    lives.lastChild.remove();
    console.log(lives);
  }
  // moveUp() {
  //   if (this.y > DASHBOARD_HEIGHT) {
  //     this.y = this.y - 10;
  //   }
  //   this.domElement.style.top = `${this.x}px`;
  // }

  // moveDown() {
  //   if (this.y + PLAYER_HEIGHT < GAME_HEIGHT + DASHBOARD_HEIGHT) {
  //     this.y = this.y + 10;
  //   }

  //   this.domElement.style.top = `${this.y}px`;
  // }
}
