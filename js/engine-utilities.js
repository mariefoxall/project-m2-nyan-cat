// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = (enemies) => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

const nextBonusSpot = (bonus) => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const bonusSpots = GAME_WIDTH / BONUS_WIDTH;

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [false, false, false, false, false];
  bonus.forEach((bonus) => {
    spotsTaken[bonus.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * bonusSpots);
  }

  // When the while loop is finished, we are assured that we have a number that corresponds to a free spot, so we return it.
  return candidate;
};

// addBackground contains all the logic to display the starry background of the game.
// It is a variable that refers to a function.
// The function takes one parameter
// The parameter represents the DOM node to which we will add the background
const addDashboard = (root) => {
  const dashboard = document.createElement("div");
  const livesMarkersDiv = document.createElement("div");
  // const livesMarkers = document.createElement("img");
  // livesMarkers.setAttribute("src", "images/guitar.png");
  const pointsDiv = document.createElement("div");

  dashboard.setAttribute("id", "dashboard");
  dashboard.style.height = `${DASHBOARD_HEIGHT}px`;
  dashboard.style.width = `${GAME_WIDTH}px`;
  dashboard.style.background = "lightblue";
  dashboard.style.zIndex = 100;
  dashboard.style.font = "bold 16px monospace";
  dashboard.style.color = "darkblue";
  // dashboard.innerText = `SETLIST:\n${PLAYER_MAX_LIVES} SONGS LEFT!`;
  dashboard.style.padding = "10px";
  dashboard.style.boxSizing = "border-box";
  dashboard.style.position = "relative";

  pointsDiv.setAttribute("id", "points");
  pointsDiv.style.position = "absolute";
  pointsDiv.style.top = "20px";
  pointsDiv.style.left = "20px";
  pointsDiv.innerText = `HIGH SCORE: 0\nLEVEL: 1\nPOINTS: 0`;

  livesMarkersDiv.setAttribute("id", "lives");
  livesMarkersDiv.style.position = "absolute";
  livesMarkersDiv.style.top = "20px";
  livesMarkersDiv.style.right = "30px";
  // livesMarkersDiv.innerText = `SETLIST:\n${PLAYER_MAX_LIVES} SONGS LEFT!`;
  // livesMarkersDiv.style.textAlign = "right";
  root.append(dashboard);
  dashboard.appendChild(pointsDiv);
  dashboard.appendChild(livesMarkersDiv);
  // livesMarkersDiv.appendChild(livesMarkers);
};
const addBackground = (root) => {
  // We create a new img DOM node.
  const bg = document.createElement("img");

  // We set its src attribute and the height and width CSS attributes
  bg.src = "images/stagelights.jpg";
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`;
  bg.style.opacity = 0.7;

  // We add it to the root DOM node
  root.append(bg);

  // We don't want the enemies to go beyond the lower edge of the image
  // so we place a white div to hide the enemies after they reach the bottom.
  // To see what it does, you can comment out all the remaining lines in the function to see the effect.
  const whiteBox = document.createElement("div");

  // We put a high z-index so that the div is placed over all other DOM nodes
  whiteBox.style.zIndex = 100;
  whiteBox.style.position = "absolute";
  whiteBox.style.top = `${GAME_HEIGHT + DASHBOARD_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = "#fff";
  root.append(whiteBox);
};

const addLevelText = (root) => {
  const levelUpdate = document.createElement("div");
  levelUpdate.setAttribute("class", "leveltext");
  levelUpdate.setAttribute("id", "leveltext");

  root.append(levelUpdate);
};
