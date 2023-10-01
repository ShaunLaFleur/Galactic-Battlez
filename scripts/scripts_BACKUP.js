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
    movementPatterns: [ // 
      [[-1, 0],[-1, 0],[-1, 0],[1, 0],[0, 1],[-1, 0],[0, -1],[1, 0],[1, 0],[0, 1],[0, -1],[0, -1],[-1, 0],[1, 0],[0, 1]],
      [[-1, 0],[-1, 0],[-1, 0],[1, 0],[0, -1],[0, -1],[-1, 0],[-1, 0],[1, 0],[0, 1],[-1, 0],[-1, 0],[-1, 0],[1, 0],[0, 1]],
      [[1, 0],[1, 0],[1, 0],[-1, 0],[0, 1],[1, 0],[1, 0],[1, 0],[-1, 0],[0, 1],[1, 0],[1, 0],[1, 0],[-1, 0],[0, 1]],
      [[-1, 0],[-1, 0],[0, -1],[1, 0],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[-1, 0],[-1, 0],[1, 0],[0, -1],[0, -1]],
      [[-1, 0],[1, 0],[0, -1],[0, -1],[1, 0],[0, -1],[1, 0],[0, -1],[0, -1],[1, 0],[1, 0],[-1, 0],[0, -1],[0, -1],[0, -1]]
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
      [[-1, 0],[-1, 0],[-1, 0],[1, 0],[0, -1],[0, -1],[0, -1],[1, 0],[1, 0],[0, 1],[0, 1],[0, 1],[-1, 0],[-1, 0],[-1, 0]],
      [[1, 0],[0, 1],[-1, 0],[-1, 0],[1, 0],[1, 0],[0, -1],[0, -1],[-1, 0],[-1, 0],[1, 0],[1, 0],[0, 1],[0, 1],[0, 1]],
      [[0, -1],[0, -1],[-1, 0],[-1, 0],[-1, 0],[-1, 0],[-1, 0],[1, 0],[1, 0],[1, 0],[0, -1],[0, -1],[0, -1],[0, -1],[1, 0]],
      [[1, 0],[1, 0],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[1, 0],[1, 0],[1, 0],[1, 0],[1, 0]],
      [[0, -1],[0, -1],[0, -1],[-1, 0],[-1, 0],[-1, 0],[-1, 0],[-1, 0],[1, 0],[1, 0],[0, -1],[0, -1],[1, 0],[1, 0],[1, 0]]
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
  spawnLocations:[
    [[10,22],[11,22],[12,22],[13,21],[12,21],[11,21],[10,21],[9,21],[8,20],[9,20],[10,20],[11,20],[12,20],[13,20],[14,20],[14,19],[13,19],[12,19],[11,19],[10,19],[9,19],[8,19],[7,19],[6,18],[7,18],[8,18],[9,18],[10,18],[11,18],[12,18],[13,18],[14,18],[15,17],[14,17],[13,17],[12,17],[11,17],[10,17],[9,17],[8,17],[7,17],[6,17],[6,16],[7,16],[8,16],[9,16],[10,16],[11,16],[12,16],[13,16],[14,16],[15,16],[16,15],[15,15],[14,15],[13,15],[12,15],[11,15],[10,15],[9,15],[8,15],[7,15],[7,14],[8,14],[9,14],[10,14],[11,14],[12,14],[13,14],[14,14],[15,14],[16,14],[15,13],[14,13],[13,13],[12,13],[11,13],[10,13],[9,13],[8,13],[9,12],[10,12],[11,12],[12,12],[13,12],[12,11],[11,11],[10,11]]
  ],
}
const game = {
  maxRows: 100,
  maxCols: 100,
  started: false,
  laserCooldown: 300, // Cooldown in milliseconds
  enemyBoundary: 36, // The row that the enemy will never go below.
  deathFlashes: 10,
  deathFlashSpeed: 200,
  spawnFlashes: 4,
  spawnFlashSpeedd: 500,
  enemyLasers: [], // Each index holds an object with the location of each enemy laser as it moves as well as the ID to it's interval and other important data
  grid: [], // Will hold a 2D grid array that contains important information such as whether each cell is occupied by a player or enemy object. First index is x coordinate that holds another array that's index is the y coordinate that holds the object data. So game.grid[1][2] holds the object for the cell at coordinates x:1, y:2.
  debris: [null, null, null],
  playerDefaults: { // Player defaults so when the game starts we can clone this object and spawn the player.
    name:"User",
    health: 50,
    movement: { speed: 20, distance: 5 },
    location:[[48,87],[47,88],[48,88],[49,88],[46,89],[47,89],[48,89],[49,89],[50,89],[46,90],[47,90],[49,90],[50,90],[46,91],[50,91]],
    alive: false,
    lives: 3,
    laserCooldown: false,
    laserProperties:{ // Holds the laser properties so when a new laser object is created it can inherit the properties.
      homeArray: [], // Each index holds an object with the location of each player laser as it moves as well as the ID to it's interval and other important data
      laserCount:0, // Holds the current amount of lasers being fired
      laserMax:1, // How many lasers can be fired at once.
      speed:25, // Lower is faster
      color:"laser", // The name of the CSS color class.
      damage:10,
      type:"playerlaser",
      direction:[0, -1], // Up
      index:-1,
      movement: {speed: 2, distance: 1},
      moveInterval: null,
      origin: "player",
    },
    color:"player", // The name of the CSS color class.
    type:"player",
    index: 1,
    homeArray: null,
  },
  enemyDefaults: [
    { // Start of enemy type 1 object
    name:"EnemyTypeOne",
    health: 30,
    movement: { speed: 1200, distance: 8 },
    location:[], // Each array position is a segment (cell) of the enemy on the grid that contains it's x,y coordinates. So Location[0][0] = x coordinate of segment 0 and Location[0][1] is the y coordinate of segment 0.
    moveInterval:0, // Stores this enemy's moving interaval ID
    attackInterval:0, // stores this enemy's atacking interval ID
    attackSpeed:1500, // How often a laser is fired.
    index:-1, // An index that we use to store on the grid cells that it occupies so we can reference this instance of object during collisions.
    homeArray:[], // Will store a reference to the enemy array.
    alive: true,
    laserProperties: {
      homeArray:[], // Will hold a reference to the enemy lasers array.
      laserCount:0, // Holds the current amount of lasers being fired
      laserMax:1, // How many lasers can be fired at once.
      damage: 10, // The amount of damage done to the player if the laser hits.
      color: "enemyLaser", // The name of the CSS color class.
      type: "enemylaser",
      direction: [0, 1], // Down
      index:-1,
      movement: {speed: 10, distance: 1},
      moveInterval: null,
      origin: "enemy",
    },
    color:"enemy", // The name of the CSS color class.
    type: "enemy",
    movementPatterns: {
      patterns: [], // Sets a reference to the enemie's movement pattern array so we don't have to copy it when we copy these default settings.
      patternIndex: 0, // Keeps track of which pattern is currently active.
      stepIndex: 0, // Keeps track of which step of the pattern the enemy is acting out.
    },
    spawnLocations: enemyData.typeOne.spawnLocations, // Sets a reference to the enemie's spawn locations array so we don't have to copy it when we copy these default settings.
    }, // End of enemy type 1 object
    { // Start of enemy type 2 object
      name:"EnemyTypeTwo",
      health: 50,
      movement: { speed: 1200, distance: 10 },
      location:[], // Each array position is a segment (cell) of the enemy on the grid that contains it's x,y coordinates. So Location[0][0] = x coordinate of segment 0 and Location[0][1] is the y coordinate of segment 0.
      moveInterval:0, // Stores this enemy's moving interaval ID
      attackInterval:0, // stores this enemy's atacking interval ID
      attackSpeed:1500, // How often a laser is fired.
      index:-1, // An index that we use to store on the grid cells that it occupies so we can reference this instance of object during collisions.
      homeArray:[], // Will store a reference to the enemy array.
      alive: true,
      laserProperties: {
        homeArray:[], // Will reference to the enemy lasers array.
        laserCount:0, // Holds the current amount of lasers being fired
        laserMax: 2, // How many lasers can be fired at once.
        damage:20, // The amount of damage done to the player if the laser hits.
        color:"enemyLaser", // The name of the CSS color class.
        type:"enemylaser",
        direction: [0, 1], // Down
        index:-1,
        movement: {speed: 10, distance: 1},
        moveInterval: null,
        origin: "enemy",
      },
      color:"enemy", // The name of the CSS color class.
      type:"enemy",
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
    debrisArray: debrisData.debrisArray, // this will need to be done after the structuredClone
    type:"debris",
    index:-1,
    homeArray:[], // Will store a reference to the array it exists in later.
    moveInterval: null,
  }
}
let player = {}; // the object that will hold the player data
let enemy = [null, null, null] // Each index in the array will hold an enemy object or instance of an enemy. We clone the enemy type from one of the default enemies. ie: game.enemy[0] = structuredClone(game.enemyTypeOne)
let devArray = [];

window.onload = function() {
  generateGrid();
}

// Generates the grid array. Since DIVs are placed left to right, we iterate through the rows on the outter loop and columns on the inner. We initialize each column once during their first iteration and then push each row into its respective column each subsequent iteration. The row index of the array holds an object containing the cell's data. So the result is game.grid[x][y], with the y index holding the object.
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
        element:elem, // Stores a reference to it's respective DIV element for easier manipulation later.
        colored:false, // this is currently only for dev testing
        occupying: { // Object that holds properties that reference each object type that occupies this cell. 0 means none of this type currently occupy the cell.
          player:0,
          enemy:0,
          debris:0,
          playerlaser:0,
          enemylaser:0,
        }
      });
    }
  }
}

// Key press functionality
document.addEventListener("keydown", event => {
  if(!game.started || !player.alive) {
    return;
  }
  if(event.code === "Space") {
    shootLaser(player);
  } else {
    let dx;
    let dy;
    if (event.code === "ArrowLeft" && (!invalidLocation(-1, 0, player.location, player))) {
      dx = -1;
      dy = 0;
    } else if(event.code === "ArrowRight" && (!invalidLocation(1, 0, player.location, player))) {
      dx = 1;
      dy = 0;
    } else if(event.code === "ArrowDown" && (!invalidLocation(0, 1, player.location, player))) {
      dx = 0;
      dy = 1;
    } else if(event.code === "ArrowUp" && (!invalidLocation(0, -1, player.location, player))) {
      dx = 0;
      dy = -1;
    }
    if(dx !== undefined) {
      gridUpdate(player,true); // Removes current location from the cell data.
      move(dx, dy, player); // Moves the object by undrawing, updating coordinates and then redrawing
      gridUpdate(player,false); // Adds the new updated location to the cell data.
    }
  }
});

// Dev shit. Currently using this to "draw" on the grid for object concept art.
function devTool(element) {
  const x = element.getAttribute("data-x");
  const y = element.getAttribute("data-y");
  console.log(game.grid[x][y].occupied);
  // change this to work with css classes
  if(!game.grid[x][y].colored) {
    element.classList.add("player");
    game.grid[x][y].colored = true;
  } else {
    element.classList.remove("player");
    devArray.push(`[${x},${y}],`);
    game.grid[x][y].colored = false;
  }
  console.log(`Grid position X: ${x}, Y: ${y}`);
  console.log(game.grid[x][y]);
}

function gameStart() {
  game.started = true;
  createPlayerObject();
  spawnPlayer(game.spawnFlashes);
  // spawnEnemy();
  // enemySpawnTimer();
  // debrisSpawnTimer();
}

function createPlayerObject() {
  player = structuredClone(game.playerDefaults);
  player.laserProperties.homeArray = laserData.playerLasers // Store a reference to the playerLasers array; structuredClone doesn't properly clone references so we can't preset this reference. This may be solved by using classes.
}

// Uses the setTimeout() function and a flash counter to display a flashing animation before the player is actually ready to move.
function spawnPlayer(flash) {
  if(flash <= 0) { // Once flashing reaches 0, the player is fully spawned and able to be controlled.
    render(false,player.location,player.color);
    gridUpdate(player,false);
    player.alive = true;
  } else {
    if(flash%2 === 0) { // Each iteration, when flash is an even number, we flash the player on.
      render(false,player.location,player.color);
    } else { // Otherwise, each other iteration we flash the player off.
      render(true,player.location,player.color);
    }
  }
  if(flash > 0) { // We recursively call this function until flash reaches 0, then the actual spawn in occurs.
    setTimeout(() => {
      spawnPlayer(flash-1);
    },game.spawnFlashSpeed);
  }
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
  enemyObject = enemy[index]; // Sets a reference to the enemy object
  enemyObject.homeArray = enemy; // Sets the homeArray to the enemy array to point out that it exists inside of the enemy array.
  enemyObject.laserProperties.homeArray = laserData.enemyLasers; // Sets a reference to the enemy lasers array.
  enemyObject.movementPatterns.patterns = enemyData.typeOne.movementPatterns; // Updates the reference to make sure it points to the enemyData array and not some duplicate.
  max = enemyObject.movementPatterns.patterns.length-1; // Sets the maximum number that can be randomly generated to the last index of the patterns array.
  enemyObject.movementPatterns.currentPattern = Math.floor(Math.random()*((max+1)-0)+0); // Sets a random movement pattern to the active one.
  enemyObject.index = index; // Stores the index the object occupies in the enemy array as a property in the object
  enemyObject.location = chooseSpawnLocation(enemyObject.spawnLocations); // Calls the function to choose a random, valid spawn location and sets its returned value as the location.
  gridUpdate(enemyObject, false); // Update the grid cells the enemy occupies
  render(false, enemyObject.location, enemyObject.color); // Renders the enemy object on the board.
  enemyObject.attackInterval = setInterval(shootLaser, enemyObject.attackSpeed, enemyObject); // Starts the attack interval for this enemy
  enemyObject.moveInterval = setInterval(enemyMovement, enemyObject.movement.speed, enemyObject); // Starts the moving interval for this enemy
}

// Function for choosing a random, valid location to spawn an enemy. The parameter is a 2D array holding all possible spawn points.
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
        game.grid[x][y].occupying.enemy !== 0 ||
        game.grid[x][y].occupying.player !== 0 ||
        game.grid[x][y].occupying.debris !== 0 ||
        game.grid[x][y].occupying.playerlaser !== 0 ||
        game.grid[x][y].occupying.enemylaser !== 0
        ){
        locationFound = false;
      } else {
        locationFound = true;
      }
    }
  }
  return possibleLocations[index];
}

// Have to refactor this and the pattern storage. Directions such as "left" and "right" need to be adjusted to be coords.
function enemyMovement(enemyEntity) {
  const patterns = enemyEntity.movementPatterns.patterns;
  const max = patterns.length-1; // Sets max to the last index of the patterns array
  const patternIndex = enemyEntity.movementPatterns.patternIndex; // Stores the index of the current movement pattern
  const stepIndex = enemyEntity.movementPatterns.stepIndex; // Stores the index of the current step we are on in the current movement pattern.
  const dx = patterns[patternIndex][stepIndex][0];
  const dy = patterns[patternIndex][stepIndex][1];
  if(!invalidLocation(dx, dy, enemyEntity.location, enemyEntity)) {
    gridUpdate(enemyEntity, true); // Removes current location data from the grid.
    move(dx, dy, enemyEntity); // Move and re-render object
    gridUpdate(enemyEntity, false); // Update location data on the grid
  }
  if(stepIndex === patterns[patternIndex].length-1) { // Check if we are at the last step of the movement pattern.
    enemyEntity.movementPatterns.stepIndex = 0; // If we are, we reset the step to 0 and
    enemyEntity.movementPatterns.patternIndex = Math.floor(Math.random()*((max+1)-0)+0); // generate a new random pattern to follow
  } else {
    enemyEntity.movementPatterns.stepIndex++; // otherwise we continue following the currrent movement pattern
  }
}

// Function for moving and rendering objects on the board. moveDistance is how many cells each movement jumps per movement update.
// Could modularize by sending -1 or 1 instead of direction and then using that to convert the moveDistance variable to negative/positive, then adjust the x or y coordinate accordingly.
function move(dx, dy, entity) {
  const location = entity.location;
  const renderColor = entity.color;
  const distance = entity.movement.distance;
  dx *= distance; 
  dy *= distance;

  if(typeof entity.alive !== undefined && entity.alive === false) { // if the entity that is moving has the alive parameter, checks if it is false or not
    return;
  }
  render(true, location, renderColor); // Undraws the current location
  for(const coords of location) {
    coords[0] += dx;
    coords[1] += dy;
  }
  render(false, location, renderColor); // Draws the updated location
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

function gridUpdate(entity, remove) {
  let homeArray;
  const index = entity.index;
  const location = entity.location;
  if(entity.type !== "player") {
     homeArray = entity.homeArray;
  }
  for(let i=0; i<location.length; i++) {
    const x = location[i][0];
    const y = location[i][1];
    if(remove) {
      game.grid[x][y].occupying[entity.type] = 0;
    } else if(!remove) {
      if(entity.type === "player") {
        game.grid[x][y].occupying.player = player; // Stores a reference to the player object.
      } else {
        game.grid[x][y].occupying[entity.type] = homeArray[index]; // Sets a reference to the object that occupies this location
      }
    }
  }
}

function invalidLocation(dx, dy, location, entity) {
  console.log(`Checking invalid with a dx of ${dx} and a dy of ${dy}`);
  const distance = entity.movement.distance;
  dx *= distance; // Since different objects/entities may move more than one grid space per movement, we multiply dx with the distance property to get the correct grid cell to check.
  dy *= distance; // Since different objects/entities may move more than one grid space per movement, we multiply dx with the distance property to get the correct grid cell to check.
  console.log(`dx of ${dx} and a dy of ${dy} after distance update`);
  console.log(isOutsideGrid(dx, dy));
  for(const coords of location) {
    const x = coords[0];
    const y = coords[1];
    if(isOutsideGrid(x+dx, y+dy) || entity.type === "enemy" && (enemyDetected(x+dx, y+dy,entity) || game.grid[x+dx][y+dy].occupying.player !== 0 || game.grid[x+dx][y+dy].occupying.debris !== 0)) {
      return true; // As soon as any coordinate from the location is found to be an invalid location we stop the loop and return true.
    }
  }
  return false; // <-- Must be placed OUTSIDE of the for loop, otherwise it will prematurely return false before all location coordinates are checked.
  // Helper function to determine if the potential location is outside of the grid area.
  function isOutsideGrid(x, y) {
    return x < 0 || x >= game.maxCols || y < 0 || y >= game.maxRows;
  }
}

// This function is required because we can't simply check for "enemyOccupied" on adjacent cells, because this will trigger on the moving enemy's own self, since each individual piece that makes up the enemy checks its adjacent cells.
function enemyDetected(x, y, enemy) {
  if(game.grid[x][y].occupying.enemy === 0) { // If there's no enemy at this location we just return false for no enemy detected.
    return false;
  } else {
    for(let i=0; i<enemy.location.length; i++) { // Loops through the currently moving enemy's location array to search coordinates.
      if(enemy.location[i][0] === x && enemy.location[i][1] === y) { // Searches the given coordinates to see if they exist in the moving enemy's location array.
        return false; // If it is found, we return false, because no enemy (other enemy) is detected and it is safe to move.
      }
    }
  }
  return true; // Otherwise, we know the enemy occupying this grid is not the same enemy currently moving, so we return true, since an enemy (different enemy) IS  detected at this location.
}

// Modular function for creating lasers when they are shot by either a player or enemy object. The parameter is for the originating object so we can get properties off of said object so we can create the laser accordingly.
function shootLaser(entity) {
  // If the object shooting a laser is a player, we check if their laser is on cooldown.
  if(entity.type === "player" && entity.laserCooldown || !entity.alive) {
    return;
  }
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
  const laserObject = entity.laserProperties.homeArray[index]; // Sets a reference to the newly created laser object
  laserObject.homeArray = entity.laserProperties.homeArray; // Updates laser array reference. structuredClone() doesn't seem to be cloning the reference properly.
  laserObject.index = index; // Stores the index that it occupies in its laser Array as a property value for later reference.
  laserObject.location = laserSpawnLocation(entity); // Call the function for determining the laser's spawn location for proper firing animation.
  render(false, laserObject.location, laserObject.color);
  laserObject.moveInterval = setInterval(moveLaser, laserObject.movement.speed, laserObject);
  // Check if more lasers need to be fired in the case of objects that fire multiple at once.
  entity.laserProperties.laserCount++;
  if(entity.laserProperties.laserCount === entity.laserProperties.laserMax) {
    entity.laserProperties.laserCount = 0;
  } else {
    shootLaser(entity); // If max lasers haven't been shot, we recursively call the shoot laser function again to shoot another.
  }
  // After a laser is fired, if it was the player who fired the laser, we put the laser on cooldown to prevent laser spam.
  if(entity.name === "User") {
    entity.laserCooldown = true;
    setTimeout(() => {
      entity.laserCooldown = false;
    }, game.laserCooldown);
  }
}

// Can modularize more here. When updating entity's location, I can update it's laser location by checking if current i (iteration) is < length of the laser location array and update accordingly. This will ugly up the move function, though.
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
  const dx = laserObject.direction[0];
  const dy = laserObject.direction[1];
  gridUpdate(laserObject, true); // Removes laser data from cells
  move(dx, dy, laserObject); // Moves and renders the new location
  gridUpdate(laserObject, false); // Adds the laser data to the new cells
  laserCollisionCheck(laserObject); // Checks for laser collisions after the laser moves.
}

// Function for checking if the laser has collided with anything.
function laserCollisionCheck(laserObject) {
  for(let i = 0; i<laserObject.location.length; i++) {
    let x = laserObject.location[i][0];
    let y = laserObject.location[i][1]; // Sets the position to one row above or below depending on which direction the laser is moving (using modifier variable)
    // If a laser hits the top edge, destroy it
    if(y === 0) {
      destroyObject(laserObject);
      return true;
    // If a laser hits the bottom edge, destroy it
    } else if(y >= game.maxRows-1) {
      destroyObject(laserObject);
      return true;
    } else if(laserObject.type === "playerlaser" && game.grid[x][y].occupying.enemy !== 0) {
      const enemyObject = game.grid[x][y].occupying.enemy;
      laserHitsEntity(laserObject, enemyObject); // Send both the laser object and the enemy object to a function for handling the collision
      return true;
    } else if(laserObject.type === "enemylaser" && game.grid[x][y].occupying.player !== 0) {
      laserHitsEntity(laserObject, player);
      return true;
    }
  }
  return false;
}

// Refactor this to work both ways. Whether an enemy laser hits a player or a player laser hits an enemy.
function laserHitsEntity(laserObject, entityObject) {
  const damage = laserObject.damage;
  const defaultColor = entityObject.color;
  entityObject.health -= damage;
  if(entityObject.color !== "damage-taken") {
    render(true,entityObject.location,entityObject.color); // Unrender and remove current color/css class
    entityObject.color = "damage-taken"; // Change its color to the damage-taken color
    render(false,entityObject.location,entityObject.color); // Render current color/css class
    setTimeout(() => {
      render(true,entityObject.location,entityObject.color); // Unrender and remove current color/css class
      entityObject.color = defaultColor; // Chnage its color back to default
      render(false,entityObject.location,entityObject.color); // Render current color/css class
    }, 500);
  }
  if(entityObject.health <= 0 && entityObject.alive) { // If the entity now has 0 or less health, call the death animation function that also destroys the object.
    deathAnimation(entityObject, game.deathFlashes);
  }
  destroyObject(laserObject); // Destroys the laser object.
}

function deathAnimation(entityObject, flashing) {
  if(entityObject.alive === true) {
    entityObject.alive = false;
  }
  if(flashing <= 0) {
    destroyObject(entityObject);
  } else {
    if(flashing % 2 !== 0) {
      render(true,entityObject.location,entityObject.color);
    } else {
      render(false,entityObject.location,entityObject.color);
    }
  }
  if(flashing > 0) {
    setTimeout(() => {
      deathAnimation(entityObject, flashing-1);
    }, game.deathFlashSpeed);
  }
}

// Modular function for destroying objects of any (or most) types. Takes two parameters, the first clearly being the object we want to destroy and the second being the array that the object exists in, so we can adjust said array once the object is gone. Player object or other objects without arrays that need updating can simply send "null" for second parameter.
function destroyObject(objectToDestroy) {
  // temporary to check if player death occurs properly
  if(objectToDestroy.name === "User") {
    playerDeath();
  }
  const location = objectToDestroy.location;
  const index = objectToDestroy.index;
  const objectArray = objectToDestroy.homeArray;
  if(objectToDestroy.moveInterval) {
    console.log("Clearing move interval");
    clearInterval(objectToDestroy.moveInterval); // Stops the move interval if it exists.
  }
  if(objectToDestroy.attackInterval) {
    console.log("Clearing attack interval");
    clearInterval(objectToDestroy.attackInterval); // Stops the attack interval if it exists.
  }
  removeFromGrid(objectToDestroy); // Removes the object from the grid and unrendors it
  if(objectArray !== null) { // Player object will send null as array since it's the only object not stored in an array.
    objectArray[index] = null; // Set the object's respective array index to null to remove it
  }
}

// Will be used to detect if a player has collided with debris or an enemy. Called AFTER the player moves.
function playerCollisionCheck(gameObject) {
  const location = gameObject.location;
  for(i=0; i<location.length; i++) {
    const x = length[i][0];
    const y = length[i][1];
  }
}

function playerDeath() {
  player.lives--;
  if(player.lives > 0) {
    removeFromGrid(player); // Removes the players current position from the grid and unrendors it.
    player.location = structuredClone(game.playerDefaults.location); // Reset player's location to the default (spawn) location.
    player.health = game.playerDefaults.health; // Resets health to default.
    spawnPlayer(game.spawnFlashes); // Respawns player
    // update inner html for lives count
  } else {
    removeFromGrid(player);
    player = {};
    // destroy all enemies
    // destroy all debris
    // stop enemy spawn timer
    // stop debris spawn timer
    // set all laser arrays to empty
    // unrendor player, set to alive = false;
    alert("GAME OVER");
  }
}

function removeFromGrid(gameObject) {
  gridUpdate(gameObject, true);
  render(true, gameObject.location, gameObject.color, false);
}