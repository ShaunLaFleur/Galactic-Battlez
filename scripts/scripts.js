/*
unrender
ternary if to swap between damage class and default class
render
*/

// Game Settings
const maxRows = 100;
const maxCols = 100;
const laserCooldown = 300; // Player laser coolddown in milliseconds.
const enemyBoundary = 36; // The row enemies are unable to go below.
const deathFlashes = 10; // How many times an entity flashes when it dies.
const deathFlashSpeed = 200; // The flash speed in milliseconds.
const spawnFlashes = 4; // How many times the player flashes when they spawn.
const spawnFlashSpeed = 500; // The spawn flash speed in milliseconds.
const enemyArray = [null, null, null]; // Defines how many enemies can exist at once. Enemies can only be spawned if null exists in the array, they are not added to the array otherwwise.
const objectTypes = ["player", "playerLaser", "enemy", "enemyLaser"] // Used to initiate the cell object parameters that we need to set as null

// Player Settings
const playerHealth = 50;
const playerMoveSpeed = 20; // The cooldown in milliseconds for how fast the player can move again after moving.
const playerMoveDistance = 5; // How many cells the player moves per movement.
const playerSpawnLocation = [[50, 90], [49, 91], [50, 91], [51, 91], [48, 92], [49, 92], [50, 92], [51, 92], [52, 92], [48, 93], [49, 93], [51, 93], [52, 93], [48, 94], [52, 94]];
const playerLives = 3;
const playerConcurrentLasers = 1;
const playerEntityType = "player";
const playerDefaultColorClass = "player-entity"; // We change the colorClass property of the player when it flashes due to damage being taken, so we can restore its default class by referencing this.
const playerLaserSpeed = 25;
const playerLaserDamage = 10;
const playerLaserType = "playerLaser";
const playerLaserColorClass = "playerLaser";

// Enemy Settings
const enemyType = "enemy";
const enemyLaserColorClass = "enemyLaser";
const enemyLaserType = "enemyLaser";

// Enemy Type One
const enemyTypeOneHealth = 30;
const enemyTypeOneMovementSpeed = 1200;
const enemyTypeOneMovementDistance = 8;
const enemyTypeOneAttackSpeed = 1500;
const enemyTypeOneColorClass = "enemy-entity";
const enemyTypeOneLaserMax = 1;
const enemyTypeOneLaserDamage = 10;
const enemyTypeOneLaserSpeed = 10;
const enemyTypeOneMovementPatterns = [ 
  [[-1, 0],[-1, 0],[-1, 0],[1, 0],[0, 1],[-1, 0],[0, -1],[1, 0],[1, 0],[0, 1],[0, -1],[0, -1],[-1, 0],[1, 0],[0, 1]],
  [[-1, 0],[-1, 0],[-1, 0],[1, 0],[0, -1],[0, -1],[-1, 0],[-1, 0],[1, 0],[0, 1],[-1, 0],[-1, 0],[-1, 0],[1, 0],[0, 1]],
  [[1, 0],[1, 0],[1, 0],[-1, 0],[0, 1],[1, 0],[1, 0],[1, 0],[-1, 0],[0, 1],[1, 0],[1, 0],[1, 0],[-1, 0],[0, 1]],
  [[-1, 0],[-1, 0],[0, -1],[1, 0],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[0, 1],[-1, 0],[-1, 0],[1, 0],[0, -1],[0, -1]],
  [[-1, 0],[1, 0],[0, -1],[0, -1],[1, 0],[0, -1],[1, 0],[0, -1],[0, -1],[1, 0],[1, 0],[-1, 0],[0, -1],[0, -1],[0, -1]]
];
const enemyTypeOneSpawnLocations = [ // A 2D array storing all possible spawn positions/locations.
  [[44,5],[41,4],[42,4],[43,4],[44,4],[45,4],[46,4],[47,4],[46,3],[45,3],[44,3],[43,3],[42,3],[43,2],[43,1],[42,1],[45,2],[45,1],[46,1]],
  [[44,15],[41,14],[42,14],[43,14],[44,14],[45,14],[46,14],[47,14],[46,13],[45,13],[44,13],[43,13],[42,13],[43,12],[43,11],[42,11],[45,12],[45,11],[46,11]],
  [[34,15],[31,14],[32,14],[33,14],[34,14],[35,14],[36,14],[37,14],[36,13],[35,13],[34,13],[33,13],[32,13],[33,12],[33,11],[32,11],[35,12],[35,11],[36,11]],
  [[54,15],[51,14],[52,14],[53,14],[54,14],[55,14],[56,14],[57,14],[56,13],[55,13],[54,13],[53,13],[52,13],[53,12],[53,11],[52,11],[55,12],[55,11],[56,11]],
  [[74,5],[71,4],[72,4],[73,4],[74,4],[75,4],[76,4],[77,4],[76,3],[75,3],[74,3],[73,3],[72,3],[73,2],[73,1],[72,1],[75,2],[75,1],[76,1]],
  [[14,5],[11,4],[12,4],[13,4],[14,4],[15,4],[16,4],[17,4],[16,3],[15,3],[14,3],[13,3],[12,3],[13,2],[13,1],[12,1],[15,2],[15,1],[16,1]]
];
/* -- End Const Variable Setup -- */

// These initiatations aren't entirely necessary but they help remind me of functionality I'll be using.
class Enemy {
  constructor() {
    this.position = [];
    this.homeArray = game.enemies;
    this.attackInterval;
    this.movementInterval;
    this.index = -1;
    this.type = enemyType;
    this.movementPatternIndex;
    this.movementPatternStepIndex;
  }
}

class EnemyTypeOne extends Enemy {
  constructor() {
    this.health = enemyTypeOneHealth;
    this.movementSpeed = enemyTypeOneMovementSpeed;
    this.movementDistance = enemyTypeOneMovementDistance;
    this.colorClass = enemyTypeOneColorClass;
    this.movementPatterns = enemyTypeOneMovementPatterns;
    this.spawnLocations = enemyTypeOneSpawnLocations;
    this.laserMax = enemyTypeOneLaserMax;
    this.laserCount = 0;
  }
}

class EnemyTypeTwo extends Enemy {

}

class Player {
  constructor() {
    this.type = playerEntityType;
    this.health = playerHealth;
    this.movementSpeed = playerMoveSpeed;
    this.moveDistance = playerMoveDistance;
    this.position = structuredClone(playerSpawnLocation); // Clones the PLAYER_SPAWN_LOCATION array.
    this.alive = true;
    this.lives = playerLives;
    this.laserCooldown = false;
    this.laserClass = PlayerLaser;
    this.laserCount = 0;
    this.concurrentLasers = playerConcurrentLasers;
    this.colorClass = playerDefaultColorClass;
    this.defaultColorClass = playerDefaultColorClass; // So we can modularize the damage flashing
    this.index = 1; // Used to store this value on the cell to signify the player occupies the cell. This is called index just for modularity, because other objects use indexes.
    this.laserArray = game.playerLasers; // The array that stores player laser objects when they're created.
  }

  spawn() {
    render("draw", this);
  }

  move(dx, dy) {
    const adj = this.moveDistance; // Use moveDistance to multiply the dx and dy adjustments to make the player move the correct distance
    dx *= adj;
    dy *= adj;
    if(isValidMove(dx, dy, this.position, this.type)) { // Check if the updated positon is within the grid boundaries
      moveObject(dx, dy, this); // Move to the new position if it's within grid boundaries
      // check player collisions by calling an external function
    }
  }
}

class Laser {
  constructor() {
    this.moveInterval; // The lasers movement interval is stored here.
    this.position;
    this.homeArray; // Self reference the array the laser object exists in
    this.index = null; // Holds the index where this laser object exists within its home array.
  }

  startMoveInterval() {
    this.moveInterval = setInterval(() => this.move(), this.speed);
  }

  move() {
    const dx = this.direction[0];
    const dy = this.direction[1];
    if(isValidMove(dx, dy, this.position, this.type)) {
      moveObject(dx, dy, this);
      // call modular laser collision check function here
    } else {
      deleteObject(this);
    }
  }
}

class EnemyLaser extends Laser {
  constructor() {
    super();
    this.homeArray = game.enemyLasers;
    this.laserColorClass = enemyLaserColorClass;
    this.type = enemyLaserType;
    this.index = -1;
    this.moveInterval;
    this.direction = [0, 1]; // Down
  }
}

class EnemyTypeOneLaser extends EnemyLaser {
  constructor() {
    super();
    this.damage = enemyTypeOneLaserDamage;
    this.speed = enemyTypeOneLaserSpeed;
  }
}

class EnemyTypeTwoLaser extends EnemyLaser {
  constructor() {
    super();
  }

}

class PlayerLaser extends Laser {
  constructor() {
    super();
    this.type = playerLaserType;
    this.speed = playerLaserSpeed; // How often the laser move function is called in milliseconds.
    this.damage = playerLaserDamage;
    this.colorClass = playerLaserColorClass;
    this.direction = [0, -1]; // Up
  }

  spawnLaser() {
    const x = player.position[0][0];
    const y = player.position[0][1];
    this.position = [[x,y-1],[x,y-2],[x,y-3]]
    render("draw", this);
    this.startMoveInterval(); // Start the moving interval
  }
}

class Cell {
  constructor(element) {
    this.element = element;
    element.classList.remove(...element.classList);
    element.classList.add("cell");
    this.initializeOccupancy();
  }

  // To track what objects are occupying each cell, we use the same name as the "type" property of each object as a property of each cell object, and then either set it to null or a direct reference to the object that occupies it.
  initializeOccupancy() {
    for(const type of objectTypes) {
      this[type] = null;
    }
  }
}

// The class for the grid object. Contains a method of creating the grid array and inserts objects from the cell class into their respective array positions.
class Grid {
  constructor() {
    this.cell = [];
    this.generateGrid();
  }

  generateGrid() {
    for(let y=0; y<game.rows; y++) {
      for(let x=0; x<game.cols; x++) {
        if(y===0) {
          this.cell.push([]); // Initializes the columns on first passthrough.
        }
        const selector = `[data-x="${x}"][data-y="${y}"]`;
        const element = document.querySelector(selector);
        this.cell[x][y] = new Cell(element);
      }
    }
  }
}

class Game {
  constructor() {
    this.rows = maxRows;
    this.cols = maxCols;
    this.laserCooldown = laserCooldown; // Player laser coolddown in milliseconds.
    this.enemyBoundary = enemyBoundary; // The row enemies are unable to go below.
    this.deathFlashes = deathFlashes; // How many times an entity flashes when it dies.
    this.deathFlashSpeed = deathFlashSpeed; // The flash speed in milliseconds.
    this.spawnFlashes = spawnFlashes; // How many times the player flashes when they spawn.
    this.spawnFlashSpeed = spawnFlashSpeed; // The spawn flash speed in milliseconds.
    this.enemyTypes = [EnemyTypeOne, EnemyTypeTwo]; // Stores references to each enemy class type. Used for spawning a random enemy type.
    this.playerLasers = [];
    this.enemyLasers = [];
    this.enemies = [...enemyArray]; // Copies the enemyArray from setup.
    this.debris = [];
    this.enemySpawnInterval;
  }
}

/* -- End Class & Method Setup -- */

let game = new Game(); // Start a new game instance
let player = new Player(); // Create a new player instance.
let grid; // Prepare the grid variable to store a new grid instance after the DOM is generated after window load.

// DOM grid creation.
window.onload = function () {
  for(let y=0; y<game.rows; y++) {
    for(let x=0; x<game.cols; x++) {
      // Create the grid DIV elements
      const container = document.getElementById('grid');
      const elem = document.createElement('div');
      container.appendChild(elem);
      elem.setAttribute('data-x', x);
      elem.setAttribute('data-y', y);
      elem.setAttribute("onClick","devTool(this)"); // remove this test functionality later
      elem.classList.add("cell");
    }
  }
  grid = new Grid(); // Generate a new grid object that holds the cells array.
}

// Key press functionality
document.addEventListener("keydown", event => {
  console.log("Event listener triggered");
  if(event.code === "Space") {
    shootLaser(player);
  } else {
    let dx;
    let dy;
    if (event.code === "ArrowLeft") {
      console.log("Left triggered");
      dx = -1;
      dy = 0;
    } else if(event.code === "ArrowRight") {
      dx = 1;
      dy = 0;
    } else if(event.code === "ArrowDown") {
      dx = 0;
      dy = 1;
    } else if(event.code === "ArrowUp") {
      dx = 0;
      dy = -1;
    }
    if(dx !== undefined) {
      player.move(dx, dy);
    }
  }
});

// Function for choosing a random enemy to spawn
function spawnRandomEnemy() {
  if(game.enemies.indexOf(null) === -1) {
    return; // Return if there are no empty spots to spawn an enemy in the enemies array
  }
  const index = game.enemies.indexOf(null); // Grab the index of the empty spot in the array
  // do stuff
}


// We pass the entire object when moving and rendering due to the large amount of parameters needed. It's more future proof and easier to maintain. If we need to add/remove parameters later we don't need to do so at every function call, but only in the functions themselves.
function moveObject(dx, dy, movingObject) {
  const position = movingObject.position;
  render("undraw", movingObject); // Undraw the current position
  // Update the coordinates to the new location based on the dx and dy adjustments.
  for(const coords of position) { 
    coords[0] += dx;
    coords[1] += dy;
  }
  render("draw", movingObject);
}

// Handles rendering or unrendering objects from the grid. I could use a single loop and while updating the position in the moveObject function, send the coordinates over to be drawn/undrawn, however, keeping them separate allows me to use the render function separately from the move function, such as when spawning objects.
function render(action, renderingObject) {
  const colorClass = renderingObject.colorClass;
  const objectType = renderingObject.type;
  const position = renderingObject.position;
  for(const coords of position) {
    const x = coords[0];
    const y = coords[1];
    if(action === "draw") {
      grid.cell[x][y].element.classList.add(colorClass);
      grid.cell[x][y][objectType] = renderingObject; // Set a direct reference to the object that occupies this cell
    } else {
      grid.cell[x][y][objectType] = null; // Set null. We use null instead of undefined because when undefined is thrown I know I made an error such as in type name.
      grid.cell[x][y].element.classList.remove(colorClass);
    }
  }
}

function isValidMove(dx, dy, position, entityType) {
  for(const coords of position) {
    const x = coords[0] + dx;
    const y = coords[1] + dy;
    if(x < 0 || x >= game.cols || y < 0 || y >= game.rows || (entityType === "enemy" && (y > game.enemyBoundary || !noEnemyCollision()))) {
      return false; // Return false if this is an invalid movement
    }
  }
  return true; // If we make it through the checks, then we return true because this movement is valid and acceptable.

  // Unlike players, enemy units are not allowed to move into other objects, so we need additional checks before they move using this helper function
  function noEnemyCollision(x, y) {
    return true;
  }
}

function shootLaser(entity) {
  // Create laser object
  const laserArray = entity.laserArray;
  const laserClass = entity.laserClass;
  let index = laserArray.indexOf(null);
  if(index === -1) {
    laserArray.push(new laserClass());
    index = laserArray.length-1; // Updates the index
  } else {
    laserArray[index] = new laserClass();
  }
  entity.laserCount++;
  laserArray[index].index = index; // Stores the index that the laser object occupies in the array it exists in
  laserArray[index].homeArray = laserArray; // Stores a self reference to the array that the laser object exists in
  laserArray[index].spawnLaser(entity.laserCount); // Creates the laser on the grid and starts moving it. Parameter is for entities that shoot multiple lasers at once.
  // Check for entities that can fire multiple lasers at once.
  if(entity.laserCount < entity.concurrentLasers) {
    shootLaser(entity); // If we need to shoot another laser because this entity can shoot multiple at once, we recursively call the shoot laser function
  } else {
    entity.laserCount = 0;
  }
}

// Function for removing non-player objects from the game
function deleteObject(objectToDelete) {
  const objectArray = objectToDelete.homeArray;// Stores a reference to the array this object exists in
  const index = objectToDelete.index; // Stores the index the object occupies of the array it exists in
  // Clear any intervals attached to this object if they exist.
  clearObjectIntervals(objectToDelete);
  // Remove this object from the grid.
  render("undraw", objectToDelete);
  // Remove this object from its home array.
  objectArray[index] = null;
}

// Separate function for clearing intervals so when we reset the game we can simply clear intervals rather than run through the entire object deletion process (since we'll be creating a new Game instance anyhow)
function clearObjectIntervals(objectToDelete) {
  if(objectToDelete.moveInterval) {
    clearInterval(objectToDelete.moveInterval);
  }
  if(objectToDelete.attackInterval) {
    clearInterval(objectToDelete.attackInterval);
  }
}