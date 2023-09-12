const difficulty = {
  setting: 0,
  damageMod: 0,
  movementSpeedMod: 0,
  attackSpeedMod: 0,
  healthMod: 0,
}
const laserData = {
  playerLasers: [],
  enemyLasers: [],
}
const enemyData = {
  typeOne: {
    movementPatterns: [
      ["left", "left", "left", "right", "down", "left", "up", "right", "right", "down", "up", "up", "left", "right", "down"],
      ["left", "left", "left", "right", "up", "up", "left", "left", "right", "down", "left", "left", "left", "right", "down"],
      ["right", "right", "right", "left", "down", "right", "right", "right", "left", "down", "right", "right", "right", "left", "down"],
      ["left", "left", "up", "right", "down", "down", "down", "down", "down", "down", "left", "left", "right", "up", "up"],
      ["left","right","up","up","right","up","right","up","up","right","right","left","up","up","up"]
    ],
    spawnLocations: [ // A 2D array storing all possible spawn positions/locations.
    [[44,5],[41,4],[42,4],[43,4],[44,4],[45,4],[46,4],[47,4],[46,3],[45,3],[44,3],[43,3],[42,3],[43,2],[43,1],[42,1],[45,2],[45,1],[46,1]],
    [[44,15],[41,14],[42,14],[43,14],[44,14],[45,14],[46,14],[47,14],[46,13],[45,13],[44,13],[43,13],[42,13],[43,12],[43,11],[42,11],[45,12],[45,11],[46,11]],
    [[34,15],[31,14],[32,14],[33,14],[34,14],[35,14],[36,14],[37,14],[36,13],[35,13],[34,13],[33,13],[32,13],[33,12],[33,11],[32,11],[35,12],[35,11],[36,11]],
    [[54,15],[51,14],[52,14],[53,14],[54,14],[55,14],[56,14],[57,14],[56,13],[55,13],[54,13],[53,13],[52,13],[53,12],[53,11],[52,11],[55,12],[55,11],[56,11]],
    [[74,5],[71,4],[72,4],[73,4],[74,4],[75,4],[76,4],[77,4],[76,3],[75,3],[74,3],[73,3],[72,3],[73,2],[73,1],[72,1],[75,2],[75,1],[76,1]],
    [[14,5],[11,4],[12,4],[13,4],[14,4],[15,4],[16,4],[17,4],[16,3],[15,3],[14,3],[13,3],[12,3],[13,2],[13,1],[12,1],[15,2],[15,1],[16,1]]
    ]
  },
  typeTwo: {
    movementPatterns: [
      ["left","left","left","right","up","up","up","right","right","down","down","down","left","left","left"],
      ["right","down","left","left","right","right","up","up","left","left","right","right","down","down","down"],
      ["up","up","left","left","left","left","left","right","right","right","up","up","up","up","right"],
      ["right","right","down","down","down","down","down","down","down","down","right","right","right","right","right"],
      ["up","up","up","left","left","left","left","left","right","right","up","up","right","right","right"]
    ],
    spawnLocations: [ // A 2D array storing all possible spawn positions/locations.
    [[46,15],[47,15],[48,15],[49,14],[48,14],[47,14],[46,14],[45,14],[44,12],[44,13],[45,13],[46,13],[47,13],[48,13],[49,13],[50,13],[50,12],[48,12],[47,12],[46,12],[46,11],[47,11],[48,11],[49,10],[48,9],[49,8],[48,7],[49,6],[46,10],[45,9],[46,8],[45,7],[46,6]],
    [[36,15],[37,15],[38,15],[39,14],[38,14],[37,14],[36,14],[35,14],[34,12],[34,13],[35,13],[36,13],[37,13],[38,13],[39,13],[40,13],[40,12],[38,12],[37,12],[36,12],[36,11],[37,11],[38,11],[39,10],[38,9],[39,8],[38,7],[39,6],[36,10],[35,9],[36,8],[35,7],[36,6]],
    [[66,15],[67,15],[68,15],[69,14],[68,14],[67,14],[66,14],[65,14],[64,12],[64,13],[65,13],[66,13],[67,13],[68,13],[69,13],[70,13],[70,12],[68,12],[67,12],[66,12],[66,11],[67,11],[68,11],[69,10],[68,9],[69,8],[68,7],[69,6],[66,10],[65,9],[66,8],[65,7],[66,6]],
    ],
  }
}
const debrisData = {
  debrisArray:[null, null, null],
  spawnLocations:[],
}
const game = {
  maxRows: 100,
  maxCols: 100,
  started: false,
  enemyBoundary: 36, // The row that the enemy will never go below.
  enemyLasers: [], // Each index holds an object with the location of each enemy laser as it moves as well as the ID to it's interval and other important data
  grid: [], // Will hold a 2D grid array that contains important information such as whether each cell is occupied by a player or enemy object. First index is x coordinate that holds another array that's index is the y coordinate that holds the object data. So game.grid[1][2] holds the object for the cell at coordinates x:1, y:2.
  debris: [null, null, null],
  playerDefaults: { // Player defaults so when the game starts we can clone this object and spawn the player.
    name:"User",
    health: 200,
    movement: { speed: 20, distance: 2 },
    location:[[48,87],[47,88],[48,88],[49,88],[46,89],[47,89],[48,89],[49,89],[50,89],[46,90],[47,90],[49,90],[50,90],[46,91],[50,91]],
    laserProperties:{ // Holds the laser properties so when a new laser object is created it can inherit the properties.
      homeArray: [], // Each index holds an object with the location of each player laser as it moves as well as the ID to it's interval and other important data
      laserCount:0, // Holds the current amount of lasers being fired
      laserMax:1, // How many lasers can be fired at once.
      speed:25, // Lower is faster
      color:"laser", // The name of the CSS color class.
      damage:10,
      gridParameter:"playerLaserOccupied",
      direction:"up",
      index:-1,
      movement: {speed: 2, distance: 1},
      moveInterval: null,
    },
    color:"player", // The name of the CSS color class.
    gridParameter:"playerOccupied",
    index: 1,
    homeArray: null,
  },
  enemyDefaults: [
    { // Start of enemy type 1 object
    name:"EnemyTypeOne",
    health: 100,
    movement: { speed: 200, distance: 2 },
    location:[], // Each array position is a segment (cell) of the enemy on the grid that contains it's x,y coordinates. So Location[0][0] = x coordinate of segment 0 and Location[0][1] is the y coordinate of segment 0.
    moveInterval:0, // Stores this enemy's moving interaval ID
    attackInterval:0, // stores this enemy's atacking interval ID
    attackSpeed:1500, // How often a laser is fired.
    index:-1, // An index that we use to store on the grid cells that it occupies so we can reference this instance of object during collisions.
    homeArray:[], // Will store a reference to the enemy array.
    laserProperties: {
      homeArray:[], // Will hold a reference to the enemy lasers array.
      laserCount:0, // Holds the current amount of lasers being fired
      laserMax:1, // How many lasers can be fired at once.
      damage: 5, // The amount of damage done to the player if the laser hits.
      color:"enemy", // The name of the CSS color class.
      gridParameter:"enemyLaserOccupied",
      direction:"down",
      index:-1,
      movement: {speed: 2, distance: 1},
      moveInterval: null,
    },
    color:"enemy", // The name of the CSS color class.
    gridParameter:"enemyOccupied",
    movementPatterns: {
      patterns: [], // Sets a reference to the enemie's movement pattern array so we don't have to copy it when we copy these default settings.
      patternIndex: 0, // Keeps track of which pattern is currently active.
      stepIndex: 0, // Keeps track of which step of the pattern the enemy is acting out.
    },
    spawnLocations: enemyData.typeOne.spawnLocations, // Sets a reference to the enemie's spawn locations array so we don't have to copy it when we copy these default settings.
    }, // End of enemy type 1 object
    { // Start of enemy type 2 object
      name:"EnemyTypeTwo",
      health: 200,
      movement: { speed: 200, distance: 3 },
      location:[], // Each array position is a segment (cell) of the enemy on the grid that contains it's x,y coordinates. So Location[0][0] = x coordinate of segment 0 and Location[0][1] is the y coordinate of segment 0.
      moveInterval:0, // Stores this enemy's moving interaval ID
      attackInterval:0, // stores this enemy's atacking interval ID
      attackSpeed:1500, // How often a laser is fired.
      index:-1, // An index that we use to store on the grid cells that it occupies so we can reference this instance of object during collisions.
      homeArray:[], // Will store a reference to the enemy array.
      laserProperties: {
        homeArray:[], // Reference to the enemy lasers array.
        laserCount:0, // Holds the current amount of lasers being fired
        laserMax:2, // How many lasers can be fired at once.
        damage:10, // The amount of damage done to the player if the laser hits.
        color:"enemy", // The name of the CSS color class.
        gridParameter:"enemyLaserOccupied",
        direction:"down",
        index:-1,
        movement: {speed: 2, distance: 1},
        moveInterval: null,
      },
      color:"enemy", // The name of the CSS color class.
      gridParameter:"enemyOccupied",
      movementPatterns: { // Stores the AI movement patterns in a 2D array. One pattern is played out at a time at random.
        patterns: [],
        patternIndex: 0, // Keeps track of which pattern is currently active.
        stepIndex: 0, // Keeps track of which step of the pattern the enemy is acting out.
      },
      spawnLocations: enemyData.typeTwo.spawnLocations,
      }, // End of enemy type 2 object
  ],
  debrisDefaults: {
    health:20,
    damage:100,
    movement:{speed:20, distance:1},
    debrisArray: debrisData.debrisArray,
    gridParameter: "debrisOccupied",
    index:-1,
    homeArray:[], // Will store a reference to the array it exists in later.
    moveInterval: null,
  }
}
let player = {}; // the object that will hold the player data
let enemy = [null, null, null] // Each index in the array will hold an enemy object or instance of an enemy. We clone the enemy type from one of the default enemies. ie: game.enemy[0] = structuredClone(game.enemyTypeOne)

window.onload = function() {
  generateGrid();
}

// Generates the grid array. Since DIVs are placed left to right, we iterate through the rows on the outter loop and columns on the inner. We initialize each column once during their first iteration and then push each row into the column each subsequent iteration. The row index of the array holds an object containing the cell's data.
function generateGrid() {
  for(let y=0; y<game.maxRows; y++) {
    for(let x=0; x<game.maxCols; x++) {
      if(y===0) {
        game.grid.push([]); // Initializes the columns on first passthrough.
      }
      // Create the grid DIV elements
      const container = document.getElementById('grid');
      const elem = document.createElement('div');
      container.appendChild(elem);
      elem.setAttribute('data-x', x);
      elem.setAttribute('data-y', y);
      elem.setAttribute("onClick","devTool(this)"); // remove this test functionality later
      elem.className = "cell";
      // Pushes an object that holds the cells data into it's corresponding column and row.
      game.grid[x].push({
        enemyOccupied:-1, // Refers to the index of the enemy array for the enemy that occupies this location
        playerOccupied:-1, // true of false depending on if the player occupies this location, mainly for laser logic
        debrisOccupied:-1, // Refers to the index of the debris array for the debris object that occupies this location
        playerLaserOccupied:-1, // Refers to the index of the laser array for the laser object that occupies this location. Used for laser collision.
        enemyLaserOccupied:-1, // Refers to the index of the enemy laser array for the laser object that occupies this location. Used for laser collision.
        element:elem, // Stores a reference to it's respective DIV element for easier manipulation later.
        colored:false, // start with background color, this is currently only for dev testing
      });
    }
  }
}

// Key press functionality
document.addEventListener("keydown", event => {
  if(event.code === "Space") {
    shootLaser(player);
  } else {
    let direction = "none";
    if (event.code === "ArrowLeft" && (!invalidLocation("left", player.location, player.movement.distance, false))) {
      direction = "left";
    } else if(event.code === "ArrowRight" && (!invalidLocation("right", player.location, player.movement.distance, false))) {
      direction = "right";
    } else if(event.code === "ArrowDown" && (!invalidLocation("down", player.location, player.movement.distance, false))) {
      direction = "down";
    } else if(event.code === "ArrowUp" && (!invalidLocation("up", player.location, player.movement.distance, false))) {
      direction = "up";
    }
    if(direction !== "none") {
      gridUpdate(player.gridParameter,player.location,1,true); // Removes current location from the cell data.
      move(direction,player); // Moves the object by undrawing, updating coordinates and then redrawing
      gridUpdate(player.gridParameter,player.location,1,false); // Adds the new updated location to the cell data.
    }
  }
});

// Dev shit. Currently using this to "draw" on the grid for object concept art.
function devTool(element) {
  const x = element.getAttribute("data-x");
  const y = element.getAttribute("data-y");
  // change this to work with css classes
  if(!game.grid[x][y].colored) {
    element.classList.add("player");
    game.grid[x][y].colored = true;
  } else {
    element.classList.remove("player");
    game.grid[x][y].colored = false;
  }
  console.log(`Grid position X: ${x}, Y: ${y}`);
  console.log(game.grid[x][y]);
}

function gameStart() {
  game.started = true;
  player = structuredClone(game.playerDefaults);
  player.laserProperties.homeArray = laserData.playerLasers // Store a reference to the playerLasers array
  render(false,player.location,player.color);
  gridUpdate(player.gridParameter,player.location,1,false);
}

// Enemy spawning logic.
function spawnEnemy() {
  let max;
  if(enemy.indexOf(null) === -1) {
    return; // return and avoid spawning an enemy since there are no empty slots available for an enemy spawn
  }
  const index = enemy.indexOf(null); // Sets the index to the first available spot in the enemy array
  max = game.enemyDefaults.length-1; // Sets the maximum number that can be randomly generated to the last index of the enemyDefaults array.
  const randomEnemyIndex = Math.floor(Math.random()*((max+1)-0)+0); // Generates a random index to copy from the enemy.enemyDefaults array, effectively choosing a random enemy type to spawn.
  enemy[index] = structuredClone(game.enemyDefaults[randomEnemyIndex]); // Copies the chosen enemy type's default object properties
  enemy[index].homeArray = enemy; // Sets the homeArray to the enemy array to point out that it exists inside of the enemy array.
  enemy[index].laserProperties.homeArray = laserData.enemyLasers; // Sets a reference to the enemy lasers array.
  enemy[index].movementPatterns.patterns = enemyData.typeOne.movementPatterns; // Updates the reference to make sure it points to the enemyData array and not some duplicate.
  max = enemy[index].movementPatterns.patterns.length-1; // Sets the maximum number that can be randomly generated to the last index of the patterns array.
  enemy[index].movementPatterns.currentPattern = Math.floor(Math.random()*((max+1)-0)+0); // Sets a random movement pattern to the active one.
  enemy[index].index = index; // Stores the index the object occupies in the enemy array as a property in the object
  enemy[index].location = chooseSpawnLocation(enemy[index].spawnLocations); // Calls the function to choose a random, valid spawn location and sets its returned value as the location.
  gridUpdate(enemy[index].gridParameter, enemy[index].location, index, false); // Update the grid cells the enemy occupies
  render(false, enemy[index].location, enemy[index].color); // Renders the enemy object on the board.
  enemy[index].attackInterval = setInterval(shootLaser, enemy[index].attackSpeed, enemy[index]); // Starts the attack interval for this enemy
  enemy[index].moveInterval = setInterval(enemyMovement, enemy[index].movement.speed, enemy[index]); // Starts the moving interval for this enemy
}

// Function for choosing a random, valid location to spawn an enemy. The parameter is a 2D array holding the possible spawn points.
function chooseSpawnLocation(possibleLocations) {
  let locationFound = false;
  let index;
  const max = possibleLocations.length-1; // Sets the maximum number that can be randomly generated to match the last index of the possibleLocations array.
// While loop will check a random spawn location from the possibleLocations array and check it for validity until a valid spawn location is found.
  while(!locationFound) {
    index = Math.floor(Math.random()*((max+1)-0)+0);
    for(let i=0; i<possibleLocations[index].length; i++) {
      const x = possibleLocations[index][i][0];
      const y = possibleLocations[index][i][1];
      if(
        game.grid[x][y].enemyOccupied !== -1 ||
        game.grid[x][y].playerOccupied === true ||
        game.grid[x][y].debrisOccupied !== -1 ||
        game.grid[x][y].playerLaserOccupied !== -1 ||
        game.grid[x][y].enemyLaserOccupied !== -1
        ){
        locationFound = false;
      } else {
        locationFound = true;
      }
    }
  }
  return possibleLocations[index];
}

function enemyMovement(enemyEntity) {
  const patterns = enemyEntity.movementPatterns.patterns;
  const max = patterns.length-1; // Sets max to the last index of the patterns array
  const patternIndex = enemyEntity.movementPatterns.patternIndex;
  const stepIndex = enemyEntity.movementPatterns.stepIndex;
  let direction = patterns[patternIndex][stepIndex];
  if(!invalidLocation(direction, enemyEntity.location, enemyEntity.movement.distance, true)) {
    gridUpdate(enemyEntity.gridParameter, enemyEntity.location, enemyEntity.index, true); // Removes current location data from the grid.
    move(direction, enemyEntity); // Move and re-render object
    gridUpdate(enemyEntity.gridParameter, enemyEntity.location, enemyEntity.index, false); // Update location data on the grid
  }
  if(stepIndex === patterns[patternIndex].length-1) {
    enemyEntity.movementPatterns.stepIndex = 0;
    enemyEntity.movementPatterns.patternIndex = Math.floor(Math.random()*((max+1)-0)+0);
  } else {
    enemyEntity.movementPatterns.stepIndex++;
  }
}

// Function for moving and rendering objects on the board. moveDistance is how many cells each movement jumps per movement update.
function move(direction,entity) {
  const location = entity.location;
  const renderColor = entity.color;
  const moveDistance = entity.movement.distance;
  render(true,location,entity.color); // Undraws the current location
  for(let i=0; i<location.length; i++) {
    if(direction === "up") {
      location[i][1] -= moveDistance;
    } else if(direction === "down") {
      location[i][1] += moveDistance;
    } else if(direction === "left") {
      location[i][0] -= moveDistance;
    } else if(direction === "right") {
      location[i][0] += moveDistance;
    }
  }
  render(false,location,renderColor); // Draws the updated location
}

// Function for rendering. Adds and removes css classes for the rendering.
function render(undraw, location, renderColor) {
  for(let i=0; i<location.length; i++) {
    const x = location[i][0];
    const y = location[i][1];
    if(undraw === true) {
      game.grid[x][y].element.classList.remove(renderColor);
    } else {
      game.grid[x][y].element.classList.add(renderColor);
    }
  }
}

function gridUpdate(gridParameter, location, index, remove) {
  for(let i=0; i<location.length; i++) {
    const x = location[i][0];
    const y = location[i][1];
    if(remove) {
      game.grid[x][y][gridParameter] = -1;
    } else if(!remove) {
      game.grid[x][y][gridParameter] = index;
    }
  }
}

// Function for checking for invalid movements based on entityType (player or enemy). "Distance"" is used to adjust for objects moving different amounts of rows per movement.
function invalidLocation(direction, location, distance, isEnemy) {
  // Loops through each segment of the location to check for invalid grid positions.
  for (let i = 0; i < location.length; i++) {
    const x = location[i][0];
    const y = location[i][1];
    if (
      (direction === "left" && x <= distance-1) ||
      (direction === "right" && x >= game.maxCols - distance) ||
      (direction === "down" && y >= game.maxRows - distance) ||
      (direction === "up" && y <= distance-1) ||
      (direction === "down" && isEnemy === true && y === game.enemyBoundary) // Prevents the enemies from going below the row that was set in game.enemyBoundary
      // Add a bunch of checks for enemy's here, dissallowing them to collidde with other enemies or falling debris
    ){
      return true;
    }
  }
  return false;
}

// Modular function for creating lasers when they are shot by either a player or enemy object. The parameter is for the originating object so we can get properties off of the object that fires the laser and determine how to draw and store the laser.
function shootLaser(entity) {
  let index;
  const x = entity.location[0][0]; // Sets the x coordinate for the first piece of the object for reference when calculating laser spawn point.
  const y = entity.location[0][1]; // Sets the y coordinate for the first piece of the object for reference when calculating laser spawn point.
  if(entity.laserProperties.homeArray.length === 0) { // If the array is empty, set the index to 0.
    index = 0;
  } else if(entity.laserProperties.homeArray.indexOf(null) !== -1) { // if null is found, set the index to the first null index found.
    index = entity.laserProperties.homeArray.indexOf(null);
  } else { // otherwise if there are no null indexes and the array isn't empty, we set the index to the first uninitiated index
    index = entity.laserProperties.homeArray.length;
  }
  // Create a new laser object in its respective array at index "index" with its respective properties inherited from the entity that shot it.
  entity.laserProperties.homeArray[index] = structuredClone(entity.laserProperties); // Clones the laser object from the originating entity's laserProperties object parameter.
  entity.laserProperties.homeArray[index].homeArray = entity.laserProperties.homeArray; // Updates laser array reference. structuredCopy() doesn't seem to be cloning the reference properly.
  entity.laserProperties.homeArray[index].index = index; // Stores the index that it occupies in its laser Array as a property value for later reference.
  entity.laserProperties.homeArray[index].location = laserSpawnLocation(entity); // Call the function for determining the laser's spawn location for proper firing animation.
  render(false, entity.laserProperties.homeArray[index].location, entity.laserProperties.color);
  entity.laserProperties.homeArray[index].moveInterval = setInterval(moveLaser, entity.laserProperties.speed, entity.laserProperties.homeArray[index]);
  // Check if more lasers need to be fired in the case of objects that fire multiple at once.
  entity.laserProperties.laserCount++;
  if(entity.laserProperties.laserCount === entity.laserProperties.laserMax) {
    entity.laserProperties.laserCount = 0;
  } else {
    shootLaser(entity); // If max lasers haven't been shot then calls the shoot laser function again to shoot another.
  }
}

function laserSpawnLocation(entity) {
  const entityName = entity.name
  let spawn;
  let x;
  let y;
  switch(entityName) {
    case "User":
      x = entity.location[0][0];
      y = entity.location[0][1];
      spawn = [[x,y-1],[x,y-2],[x,y-3]];
      break;

    case "EnemyTypeOne":
      x = entity.location[0][0];
      y = entity.location[0][1];
      spawn = [[x,y+1],[x,y+2],[x,y+3]]
      break;

    case "EnemyTypeTwo":
      if(entity.laserProperties.laserCount === 0) {
        x = entity.location[0][0];
        y = entity.location[0][1];
        spawn = [[x,y+1],[x,y+2],[x,y+3]];
      } else {
        x = entity.location[2][0];
        y = entity.location[2][1];
        spawn = [[x,y+1],[x,y+2],[x,y+3]];
      }
      break;
  }
return spawn;
}

// probably pass entire laser object here instead of location parameter so we can get values related to whether it's an enemy or player
function moveLaser(laserObject) {
  const location = laserObject.location;
  const index = laserObject.index;
  const direction = laserObject.direction;
  const gridParameter = laserObject.gridParameter;
  // check last index for being on row 0 and if it is, destroy laser, alternatively, do this in the collision checker for lasers
  gridUpdate(gridParameter, location, index, true); // Removes laser data from cells
  move(direction, laserObject); // Moves and renders the new location
  gridUpdate(gridParameter, location, index, false); // Adds the laser data to the new cells
  laserCollision(laserObject);
}

// Function for checking if the laser has collided with anything.
function laserCollision(laserObject) {
  let destroy = false;
  // check CURRENT positions for any collisions. We allow lasers to overlap other objects for better visual effects.
  for(let i = 0; i<laserObject.location.length; i++) {
    let x = laserObject.location[i][0];
    let y = laserObject.location[i][1];
    // If a laser hits the top edge, destroy it
    if(y === 0) {
      destroy = true;
    // If a laser hits the bottom edge, destroy it
    } else if(y >= game.maxRows-1) {
      destroy = true;
    }
  }
  if(destroy) {
    destroyObject(laserObject);
  }
}

// Modular function for destroying objects of any (or most) types. Takes two parameters, the first clearly being the object we want to destroy and the second being the array that the object exists in, so we can adjust said array once the object is gone. Player object or other objects without arrays that need updating can simply send "null" for second parameter.
function destroyObject(objectToDestroy) {
  const location = objectToDestroy.location;
  const index = objectToDestroy.index;
  const gridParameter = objectToDestroy.gridParameter;
  const objectArray = objectToDestroy.homeArray;
  if(objectToDestroy.moveInterval) {
    console.log("Clearing move interval");
    clearInterval(objectToDestroy.moveInterval); // Stops the move interval if it exists.
  }
  if(objectToDestroy.attackInterval) {
    console.log("Clearing attack interval");
    clearInterval(objectToDestroy.attackInterval); // Stops the attack interval if it exists.
  }
  gridUpdate(gridParameter, location, index, true); // Remove the object data from the grid array.
  render(true, location, objectToDestroy.color); // Undraw the object.
  if(objectArray !== null) { // Player object will send null as array since it's the only object not stored in an array.
    objectArray[index] = null; // Set the object's respective array index to null to remove it
  }
}

function playerCollisions(gameObject) {
  const location = gameObject.location;
  for(i=0; i<location.length; i++) {
    const x = length[i][0];
    const y = length[i][1];
  }
}