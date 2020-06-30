// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Bonus {
  // The constructor takes 2 arguments.
  // - theRoot refers to the parent DOM element.
  //   We need a way to add the DOM element we create in this constructor to our DOM.
  // - enemySpot is the position of the enemy (either 0, 1, 2, 3 or 4)
  // Since the constructor takes 2 parameters
  // and the 2 parameters provide important information, we must supply 2 arguments to "new" every time we
  // create an instance of this class.
  constructor(theRoot, bonusSpot, level) {
    // When we create an Enemy instance, for example, new Enemy(someRoot, 3)
    // A new object is created and the constructor of the Enemy class is called. The context (the \`this\` keyword) is going
    // to be the new object. In these lines of code we see how to add 2 properties to this object: spot, root and gameHeight.
    // We do this because we want to access this data in the other methods of the class.
    // - We need the root DOM element so that we can remove the enemy when it is no longer needed. This will be done at a later time.
    // - We need to keep track of the enemy spot so that we don't place two enemies in the same spot.
    this.root = theRoot;
    this.spot = bonusSpot;
    this.hasHitPlayer = false;

    // The x position of the enemy is determined by its width and its spot. We need this information for the lifetime
    // of the instance, so we make it a property of the instance. (Why is this information needed for the lifetime of the instance?)
    this.x = bonusSpot * BONUS_WIDTH;

    // The y position is initially less than 0 so that the enemies fall from the top. This data is stored as a property
    // of the instance since it is needed throughout its lifetime. The destroyed property will indicate whether this enemy
    // is still in play. It is set to true whenever the enemy goes past the bottom of the screen.
    // It is used in the Engine to determine whether or not an enemy is in a particular column.
    this.y = -BONUS_HEIGHT;
    this.destroyed = false;

    // We create a new DOM element. The tag of this DOM element is img. It is the DOM node that will display the enemy image
    // to the user. When the enemy is no longer needed, we will use a reference to this DOM node to remove it from the game. This
    // is why we create a property that refers to it.

    this.domElement = document.createElement("img");

    const bonusImgArray = [
      [
        "images/horns-green1.png",
        "images/horns-green2.png",
        "images/horns-green3.png",
        "images/horns-green4.png",
        "images/horns-green5.png",
        "images/horns-green6.png",
        "images/horns-green5.png",
        "images/horns-green4.png",
        "images/horns-green3.png",
        "images/horns-green2.png",
        "images/horns-green1.png",
        "images/horns-green7.png",
        "images/horns-green8.png",
        "images/horns-green9.png",
        "images/horns-green10.png",
        "images/horns-green11.png",
        "images/horns-green10.png",
        "images/horns-green9.png",
        "images/horns-green8.png",
        "images/horns-green7.png",
      ],
      [
        "images/horns-pink1.png",
        "images/horns-pink2.png",
        "images/horns-pink3.png",
        "images/horns-pink4.png",
        "images/horns-pink5.png",
        "images/horns-pink6.png",
        "images/horns-pink5.png",
        "images/horns-pink4.png",
        "images/horns-pink3.png",
        "images/horns-pink2.png",
        "images/horns-pink1.png",
        "images/horns-pink7.png",
        "images/horns-pink8.png",
        "images/horns-pink9.png",
        "images/horns-pink10.png",
        "images/horns-pink11.png",
        "images/horns-pink10.png",
        "images/horns-pink9.png",
        "images/horns-pink8.png",
        "images/horns-pink7.png",
      ],
    ];

    let imageIndex = 0;
    let bonusIndex = [Math.ceil(Math.random() * 2) - 1];

    // this.domElement.src = enemyImgArray[enemyIndex][imageIndex];
    const changeImage = () => {
      imageIndex += 1;
      if (imageIndex === bonusImgArray[bonusIndex].length) {
        imageIndex = 0;
      }
      this.domElement.src = bonusImgArray[bonusIndex][imageIndex];
    };

    this.domElement.src = bonusImgArray[bonusIndex][imageIndex];
    setInterval(changeImage, 200);

    // this.domElement = document.createElement("img");
    // this.domElement.setAttribute("id", "player");
    // this.domElement.src = playerImgArray[0];
    // setInterval(changeImage, 200);

    // We give it a src attribute to specify which image to display.
    // this.domElement.src = bonusImgArray[Math.ceil(Math.random() * 4) - 1];
    // We modify the CSS style of the DOM node.
    this.domElement.style.position = "absolute";
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y}px`;
    this.domElement.style.zIndex = 5;

    // Show that the user can actually see the img DOM node, we append it to the root DOM node.
    theRoot.appendChild(this.domElement);
    // this.speed = Math.random() / 2 + 0.25;
    this.speedIncrease = 0.1 * level;
    this.speed = Math.random() / 2 + this.speedIncrease;
  }

  // We set the speed property of the enemy. This determines how fast it moves down the screen.
  // To make sure that every enemy has a different speed, we use Math.random()
  // this method will be called on the enemy instance every few milliseconds. The parameter
  // timeDiff refers to the number of milliseconds since the last update was called.
  update(timeDiff) {
    // We update the y property of the instance in proportion of the amount of time
    // since the last call to update. We also update the top css property so that the image
    // is updated on screen
    this.y = this.y + timeDiff * this.speed;
    this.domElement.style.top = `${this.y}px`;

    // If the y position of the DOM element is greater than the GAME_HEIGHT then the enemy is at the bottom
    // of the screen and should be removed. We remove the DOM element from the root DOM element and we set
    // the destroyed property to indicate that the enemy should no longer be in play
    if (this.y > GAME_HEIGHT + DASHBOARD_HEIGHT) {
      this.root.removeChild(this.domElement);

      this.destroyed = true;
    }
  }

  deleteBonus() {
    this.root.removeChild(this.domElement);

    this.destroyed = true;
  }
}
