const game = {
  maxRows: 100,
  maxCols: 100,
  bgColor:"rgba(0, 0, 0, 0.85)",
  started: false,
  enemyLasers:[], // Each index holds an object with the location of each enemy laser as it moves as well as the ID to it's interval and other important data
  grid:[], // Will hold a 2D grid array that contains important information such as whether each cell is occupied by a player or enemy object. First index is x coordinate that holds another array that's index is the y coordinate that holds the object data. So game.grid[1][2] holds the object for the cell at coordinates x:1, y:2.
  playerDefault: { // Player defaults so when the game starts we can clone this object and spawn the player.
    health: 200,
    movementSpeed: 20,
    location:[[45,86],[46,86],[44,87],[45,87],[46,87],[47,87],[43,88],[44,88],[45,88],[46,88],[47,88],[48,88],[43,89],[44,89],[47,89],[48,89],[43,90],[48,90]],
    lasers:[], // Each index holds an object with the location of each player laser as it moves as well as the ID to it's interval and other important data
    laserSpeed:50, // Lower is faster
    laserColor:"green",
    laserDamage:10,
    color:"white",
    type:"player",
  },
}
 // Defaults for enemy type one. We clone this data when we spawn an enemy of this type. Initalized AFTER the game object so we can reference the enemyLasers array.
game.enemyTypeOne = {
    health: 100,
    movementSpeed: 10,
    location:[[1,2],[2,3],[4,5]], // Each array position is a segment (cell) of the enemy on the grid that contains it's x,y coordinates. So Location[0][0] = x coordinate of segment 0 and Location[0][1] is the y coordinate of segment 0.
    moveTimer:0, // Stores this enemy's moving interaval ID
    attackTimer:0, // stores this enemy's atacking interval ID
    index:-1, // An index that we use to store on the grid cells that it occupies so we can reference this instance of object during collisions.
    lasers:game.enemyLasers, // Creates a reference to the game.enemyLasers array
    laserSpeed:50,
    laserDamage:5,
    laserColor:"red",
    color:"red",
    type:"enemy", // Used to help modularize functions based on object
  enemyTypeOneSpawnLocations:[
    [[],[],[],[],[]]
  ],
}
let player = {}; // the object that will hold the player data
let enemy = [null,null,null] // Each index in the array will hold an enemy object or instance of an enemy. We clone the enemy type from one of the default enemies. ie: game.enemy[0] = structuredClone(game.enemyTypeOne)

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
        playerOccupied:false, // true of false depending on if the player occupies this location, mainly for laser logic
        debrisOccupied:-1, // Refers to the index of the debris array for the debris object that occupies this location
        playerLaserOccupied:-1, // Refers to the index of the laser array for the laser object that occupies this location. Used for laser collision.
        element:elem, // Stores a reference to it's respective DIV element for easier manipulation later.
        color:"rgba(0, 0, 0, 0.85)", // start with background color, this is currently only for dev testing
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
    if (event.code === "ArrowLeft" && (!edgeDetect("left",player.location))) {
      direction = "left";
    } else if(event.code === "ArrowRight" && (!edgeDetect("right",player.location))) {
      direction = "right";
    } else if(event.code === "ArrowDown" && (!edgeDetect("down",player.location))) {
      direction = "down";
    } else if(event.code === "ArrowUp" && (!edgeDetect("up",player.location))) {
      direction = "up";
    }
    if(direction !== "none") {
      gridUpdate("player",player.location,-1,true); // Removes current location from the cell data.
      move(direction,player.location,player.color); // Moves the object by undrawing, updating coordinates and then redrawing
      gridUpdate("player",player.location,-1,false); // Adds the new updated location to the cell data.
    }
  }
});

// Dev shit. Currently using this to "draw" on the grid for object concept art.
function devTool(element) {
  const x = element.getAttribute("data-x");
  const y = element.getAttribute("data-y");
  if(game.grid[x][y].color === game.bgColor) {
    element.style.backgroundColor = "red";
    game.grid[x][y].color = "red";
  } else {
    element.style.backgroundColor = game.bgColor;
    game.grid[x][y].color = game.bgColor;
  }
  console.log(`Grid position X: ${x}, Y: ${y}`);
  console.log(game.grid[x][y]);
}

function gameStart() {
  game.started = true;
  player = structuredClone(game.playerDefault);
  spawnPlayer();
}

function spawnPlayer(){
  render(false,player.location,player.color);
  for(let i=0; i<player.location.length; i++) {
    const x = player.location[i][0];
    const y = player.location[i][1];
    game.grid[x][y].playerOccupied = true;
  }
}

// Function for rendering. 
function render(undraw, location, renderColor) {
  if(undraw === true) {
    renderColor = game.bgColor;
  }
  for(let i=0; i<location.length; i++) {
    const x = location[i][0];
    const y = location[i][1];
    game.grid[x][y].element.style.backgroundColor = renderColor;
  }
}

function move(direction, location, renderColor) {
  render(true,location,game.bgColor); // Undraws the current location
  // ecapsulate the if statements below in a for loop that iterates through the location
  for(let i=0; i<location.length; i++) {
    if(direction === "up") {
      location[i][1] -= 1;
    } else if(direction === "down") {
      location[i][1] += 1;
    } else if(direction === "left") {
      location[i][0] -= 1;
    } else if(direction === "right") {
      location[i][0] += 1;
    }

  }
  render(false,location,renderColor); // Draws the updated location
}

function gridUpdate(type, location, index, remove) {
  for(let i=0; i<location.length; i++) {
    const x = location[i][0];
    const y = location[i][1];
    switch(type) {
      case "player":
        if(remove) {
          game.grid[x][y].playerOccupied = false;
        } else if(!remove) {
          game.grid[x][y].playerOccupied = true;
        }
      break;

      case "enemy":
        if(remove) {
          game.grid[x][y].enemyOccupied = -1;
        } else if(!remove) {
          game.grid[x][y].enemyOccupied = index;
        }
      break;

      case "playerLaser":
        if(remove) {
          game.grid[x][y].playerLaserOccupied = -1;
        } else if(!remove) {
          game.grid[x][y].playerLaserOccupied = index;
        }
      break;
      }
  }
}

function edgeDetect(direction, location) {
  for (let i = 0; i < location.length; i++) {
    if ((direction === "left" && location[i][0] <= 0) ||
      (direction === "right" && location[i][0] >= game.maxCols - 1) ||
      (direction === "down" && location[i][1] >= game.maxRows - 1) ||
      (direction === "up" && location[i][1] <= 0))    
    {
      return true;
    }
  }
  return false;
}

// Modular function for creating lasers when they are shot by either a player or enemy object. The parameter is for the originating object so we can get properties off of the object that fires the laser and determine how to draw and store the laser.
function shootLaser(entity) {
  // place an if (player.laserCooldown is false && entity.type is player) OR entity.type is "enemy" here and encapsulate everything below
  let index;
  const x = entity.location[0][0]; // Sets the x coordinate for the first piece of the object for reference when calculating laser spawn point.
  const y = entity.location[0][1]; // Sets the y coordinate for the first piece of the object for reference when calculating laser spawn point.
  if(entity.lasers.length === 0) { // If the array is empty, set the index to 0.
    index = 0;
  } else if(entity.lasers.indexOf(null) !== -1) { // if null is found, set the index to the first null index found.
    index = entity.lasers.indexOf(null);
  } else { // otherwise if there are no null indexes and the array isn't empty, we set the index to the first uninitiated index
    index = entity.lasers.length;
  }
  // Create the new laser object in it's respective array with it's respective properties based on the object that shot it.
  entity.lasers[index] = {
    index:index,
    color:entity.laserColor,
    type:entity.type,
    moveInterval:null,
    laserDamage:entity.laserDamage,
  }
  // Adjust the spawn location for the laser depending on whether it's a player laser or enemy laser.
  if(entity.type === "player") {
    entity.lasers[index].location = [[x,y-1],[x+1,y-1],[x,y-2],[x+1,y-2],[x,y-3],[x+1,y-3]];
  } else if (entity.type === "enemy") {
    entity.lasers[index].location = [[x,y-1],[x+1,y-1],[x,y-2],[x+1,y-2],[x,y-3],[x+1,y-3]]; // <-- Change later
  }
  render(false, entity.lasers[index].location, entity.laserColor);
  entity.lasers[index].moveInterval = setInterval(moveLaser, entity.laserSpeed, entity.lasers[index]);
  // set player.laserCooldown = true here
  // add await here that resets player.laserCooldown to false
  // set player.laserCooldown to false after the await
}

// probably pass entire laser object here instead of location parameter so we can get values related to whether it's an enemy or player
function moveLaser(laserObject) {
  const location = laserObject.location;
  const index = laserObject.index;
  let direction;
  let friendOrFoe;
  // Determine how the grid is updated and how the laser moved based on the entity that shot the laser.
  if(laserObject.type === "player") {
    friendOrFoe = "playerLaser";
    direction = "up";
  } else if(laserObject.type === "enemy") {
     friendOrFoe = "playerLaser";
     direction = "up";
  }
  // check last index for being on row 0 and if it is, destroy laser, alternatively, do this in the collision checker for lasers
  gridUpdate(friendOrFoe, location, index, true); // Removes laser data from cells
  move(direction, location, player.laserColor); // Moves and renders the new location
  gridUpdate(friendOrFoe, location, index, false); // Adds the laser data to the new cells
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
    if(laserObject.location[i][1] <= 0) {
      destroy = true;
    // If a laser hits the bottom edge, destroy it
    } else if(laserObject.location[i][0] >= game.maxRows-1) {
      destroy = true;
    }
  }
  if(destroy) {
    destroyLaser(laserObject);
  }
}

// Function for removing lasers from the game once they've collided with something.
function destroyLaser(laserObject) {
  let friendOrFoe;
  let laserArray;
  let location = laserObject.location;
  let index = laserObject.index;
  clearInterval(laserObject.moveInterval); // Stops the interval related to this laser.
  if(laserObject.type === "player") {
    friendOrFoe = "playerLaser";
    laserArray = player.lasers;
  } else if(laserObject.type === "enemy") {
    friendOrFoe = "enemyLaser";
    laserArray = game.enemyLasers;
  }
  gridUpdate(friendOrFoe, location, index, true); // Remove the laser data from the grid array.
  render(true, location, game.bgColor); // Undraw the laser.
  laserArray[index] = null; // Set the laser's respective array index to null to remove it.
}