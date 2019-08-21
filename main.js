'use strict'

const leftArrow = keyboard(37);
const upArrow = keyboard(38);
const rightArrow = keyboard(39);
const downArrow = keyboard(40);

const key_uno = keyboard(50);
const key_dos = keyboard(51);
const key_tres = keyboard(52);
const key_cuatro = keyboard(53);




//Aliases
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  Container = PIXI.Container,
  TextStyle = PIXI.TextStyle;

//Create a Pixi Application
let app = new Application({
  width: 160,
  height: 144,
  antialias: true,
  transparent: false,
  resolution: 1
}
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
loader
  .add("/sprites/tileset_desert.json")
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
}

let tile000, tile001, tile002, tile003, tile004, tile005, tile006, tile007, tile008, tile009, tex;
let tilesCollision = [];
let player, enter, exit, tile, tileC;
const speed = 32;
let canMove = true;
const WIDTH = 160;
const HEIGHT = 128;
let gameScene, interludeScene, gameOverScene, splashScene, message, gameOverTextCaption, splashText, gameOverText, hp;
let healthBar, innerBar, outerBar, state;
let roomCount;

//This `setup` function will run when the image has loaded
function setup() {

  hp = 132;
  roomCount = 0;
  gameScene = new Container();
  app.stage.addChild(gameScene);

  interludeScene = new Container();
  app.stage.addChild(interludeScene);

  splashScene = new Container();
  app.stage.addChild(splashScene);


  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);

  splashScene.visible = true;
  interludeScene.visible = false;
  gameScene.visible = false;
  gameOverScene.visible = false;

  let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });

  tex = PIXI.loader.resources["/sprites/tileset_desert.json"].textures;

  //reset the desert room
  reset();

  //health bar
  healthBar = new PIXI.Container();
  healthBar.position.set(0, 0)
  gameScene.addChild(healthBar); //gamescene isntead of stage??

  innerBar = new PIXI.Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 130, 160, 32);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  outerBar = new PIXI.Graphics();
  outerBar.beginFill(0x0000FF);
  outerBar.drawRect(0, 130, 160, 32);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;
  outerBar.width = hp;

  message = new PIXI.Text('HEALTH', { fontFamily: 'Arial', fontSize: 10, fill: 0xffffff, align: 'right' });
  message.x = 5;
  message.y = 130;
  gameScene.addChild(message);

  //interlude room
  message = new PIXI.Text('Day: ' + roomCount, { fontFamily: 'Arial', fontSize: 10, fill: 0xffffff, align: 'center' });
  message.x = app.stage.width / 2;
  message.y = app.stage.height / 2;
  interludeScene.addChild(message);


  //splash room
  splashText = new PIXI.Text('WELCOME', { fontFamily: 'Arial', fontSize: 18, fill: 0xffffff, align: 'left' });
  splashScene.addChild(splashText);
  splashText.x = 12;
  splashText.y = 64;

  splashText = new PIXI.Text('Press left arrow \nto start the quest', { fontFamily: 'Arial', fontSize: 14, fill: 0xffffff, align: 'left' });
  splashScene.addChild(splashText);
  splashText.x = 12;
  splashText.y = 96;

  //game over room
  gameOverText = new PIXI.Text('GAME OVER', { fontFamily: 'Arial', fontSize: 18, fill: 0xffffff, align: 'left' });
  gameOverScene.addChild(gameOverText);
  gameOverText.x = 12;
  gameOverText.y = 64;

  gameOverTextCaption = new PIXI.Text('You survived ' + roomCount + ' Days.', { fontFamily: 'Arial', fontSize: 12, fill: 0xffffff, align: 'left' });
  gameOverScene.addChild(gameOverTextCaption);
  gameOverTextCaption.x = 12;
  gameOverTextCaption.y = 96;



  //Set the game state
  state = splash;

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  //Update the current game state:
  state(delta);

  switcher(); // TOOL

  if (rightArrow.isUp && leftArrow.isUp && upArrow.isUp && downArrow.isUp) {
    canMove = true;
  }
}

function switcher() {
  key_uno.isDown ? startGame() : null;
  key_dos.isDown ? reNewRoom() : null;
  key_cuatro.isDown ? gameOver() : null;
}

function splash() {
  if (leftArrow.isDown && canMove) {
    startGame();
    canMove = false;
  }
}

function interlude() {
  if (leftArrow.isDown && canMove) {
    reNewRoom();
    canMove = false;
  }
}

function startGame() {
  reset();
  hp = 132;
  updateBar();
  state = play;
  interludeScene.visible = false;
  gameOverScene.visible = false;
  splashScene.visible = false;
  gameScene.visible = true;
}

function gameOver() {
  state = gameOver;
  gameOverTextCaption.text = 'You survived ' + roomCount + ' Days.';
  interludeScene.visible = false;
  gameOverScene.visible = true;
  splashScene.visible = false;
  gameScene.visible = false;
  if (leftArrow.isDown && canMove) {
    reNewRoom();
    canMove = false;
  }
}

function reNewRoom() {
  switch (state.name) {
    case ("play"):
      updateRoomCount()
      state = interlude;
      interludeScene.visible = true;
      gameOverScene.visible = false;
      gameScene.visible = false;
      break;
    case ("interlude"):
      reset();
      state = play;
      interludeScene.visible = false;
      gameOverScene.visible = false;
      gameScene.visible = true;
      break;
    case ("gameOver"):
      state = splash;
      interludeScene.visible = false;
      gameOverScene.visible = false;
      gameScene.visible = false;
      splashScene.visible = true
      break;

  }
}

function checkTile(x, y) {
  let col = false;
  let counter = 0
  tilesCollision.forEach(function tileCPrint(tileCol) {
    counter++;

    if (tilesCollision.length > 0 && hitTestRectangle(player, tileCol)) {
      col = true;
    }
  })
  return col;
}

function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};




// function boxesIntersect(a, b) {
//   var ab = a.getBounds();
//   var bb = b.getBounds();
//   return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
// }