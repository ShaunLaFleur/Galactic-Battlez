// Game Settings
const MAX_ROWS = 100;
const MAX_COLS = 100;
const LASER_COOLDOWN = 300; // Player laser coolddown in milliseconds.
const ENEMY_BOUNDARY = 36; // The row enemies are unable to go below.
const DEATH_FLASHES = 10; // How many times an entity flashes when it dies.
const DEATH_FLASH_SPEED = 200; // The flash speed in milliseconds.
const SPAWN_FLASHES = 4; // How many times the player flashes when they spawn.
const SPAWN_FLASH_SPEED = 500; // The spawn flash speed in milliseconds.

// Player Settings
const HEALTH = 50;
const PLAYER_MOVE_SPEED = 20; // The cooldown in milliseconds for how fast the player can move again after moving.
const PLAYER_MOVE_DISTANCE = 5; // How many cells the player moves per movement.
const PLAYER_SPAWN_LOCATION = [[50, 90], [49, 91], [50, 91], [51, 91], [48, 92], [49, 92], [50, 92], [51, 92], [52, 92], [48, 93], [49, 93], [51, 93], [52, 93], [48, 94], [52, 94]];
const PLAYER_LIVES = 3;
const PLAYER_LASER_MAX = 1;
const PLAYER_ENTITY_TYPE = "player";
const PLAYER_COLOR_CLASS = "player-entity";
const PLAYER_LASER_SPEED = 25;
const PLAYER_LASER_DAMAGE = 10;
const PLAYER_LASER_TYPE = "playerlaser";
const PLAYER_LASER_COLOR_CLASS = "playerLaser"


class Enemy {

}

class EnemyOne extends Enemy {

}

class EnemyTwo extends Enemy {

}

class Player {
  constructor() {
    this.type = PLAYER_ENTITY_TYPE;
    this.health = HEALTH;
    this.movementSpeed = PLAYER_MOVE_SPEED;
    this.moveDistance = PLAYER_MOVE_DISTANCE;
    this.position = structuredClone(PLAYER_SPAWN_LOCATION); // Clones the PLAYER_SPAWN_LOCATION array.
    this.alive = true;
    this.lives = PLAYER_LIVES;
    this.laserCooldown = false;
    this.laserClass = PlayerLaser;
    this.laserCount = 0;
    this.laserMax = PLAYER_LASER_MAX;
    this.colorClass = PLAYER_COLOR_CLASS;
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
    if(isInsideGrid(dx, dy, this.position)) { // Check if the updated positon is within the grid boundaries
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
    if(isInsideGrid(dx, dy, this.position)) {
      moveObject(dx, dy, this);
      // call modular laser collision check function here
    } else {
      deleteObject(this);
    }
  }
}

class PlayerLaser extends Laser {
  constructor() {
    super();
    this.type = PLAYER_LASER_TYPE;
    this.speed = PLAYER_LASER_SPEED; // How often the laser move function is called in milliseconds.
    this.damage = PLAYER_LASER_DAMAGE;
    this.colorClass = PLAYER_LASER_COLOR_CLASS;
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
    this.player = 0;
    element.classList.remove(...element.classList);
    element.classList.add("cell");
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
    this.rows = MAX_ROWS;
    this.cols = MAX_COLS;
    this.enemyTypes = [EnemyOne, EnemyTwo]; // Stores references to each enemy class type. Used for spawning a random enemy type.
    this.playerLasers = [];
    this.enemyLasers = [];
  }
}

/* -- End Setup -- */

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

/* 
dx and dy are coordinate adjustments
color class is the css class to add/remove
objectType is the objectType used to create a parameter in the cell object in order to track what object occupies it
position is the location to be drawn/undrawn on the grid
index is mainly used for non-player objects that exist in arrays, this value is placed with the objectType property to indicate what type of object and its index in its home array so we can refernce it indirectly
*/
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
  const index = renderingObject.index;
  for(const coords of position) {
    const x = coords[0];
    const y = coords[1];
    if(action === "draw") {
      grid.cell[x][y].element.classList.add(colorClass);
      grid.cell[x][y][objectType] = index;
    } else {
      grid.cell[x][y][objectType] = 0;
      grid.cell[x][y].element.classList.remove(colorClass);
    }
  }
}

function isInsideGrid(dx, dy, position) {
  for(const coords of position) {
    const x = coords[0] + dx;
    const y = coords[1] + dy;
    if(x < 0 || x >= game.cols || y < 0 || y >= game.rows) {
      return false;
    }
  }
  return true;
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
  laserArray[index].index = index; // Stores the index that the laser object occupies in the array it exists in
  laserArray[index].homeArray = laserArray; // Stores a self reference to the array that the laser object exists in
  laserArray[index].spawnLaser(); // Creates the laser on the grid and starts moving it
}

// Function for removing non-player objects from the game
function deleteObject(objectToDelete) {
  const objectArray = objectToDelete.homeArray;// Stores a reference to the array this object exists in
  const index = objectToDelete.index; // Stores the index the object occupies of the array it exists in
  // Clear any intervals attached to this object if they exist.
  if(objectToDelete.moveInterval) {
    clearInterval(objectToDelete.moveInterval);
  }
  if(objectToDelete.attackInterval) {
    clearInterval(objectToDelete.attackInterval);
  }
  // Remove this object from the grid.
  render("undraw", objectToDelete);
  // Remove this object from its home array.
  objectArray[index] = null;
}