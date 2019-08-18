'use strict'

const leftArrow = keyboard(37);
const upArrow = keyboard(38);
const rightArrow = keyboard(39);
const downArrow = keyboard(40);

//Aliases
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

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
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}

let tile000, tile001, tile002, tile003, tile004, tile005, tile006, tile007, tile008, tile009, tex;
const tiles = [tile000, tile001, tile002, tile003, tile004, tile005, tile006, tile007, tile008, tile009];
let tile12;
const speed = 32;
let canMove = true;
const WIDTH = 160;
const HEIGHT = 144;

//This `setup` function will run when the image has loaded
function setup() {

  tex = PIXI.loader.resources["/sprites/tileset_desert.json"].textures;
  // tiles[0] = new Sprite(tex["tile000" + ".png"]);
  // app.stage.addChild(tiles[0]);

  //init sprites
  for (let i = 0; i < tiles.length; i++) {
    // console.log(tiles[i]);
    // tiles[i].x = (i % 4) * 32;
    // tiles[i].y = (i) * 32 ;
    // app.stage.addChild(tiles[i]);
  }

  //tilemap
  for (let x = 0; x < 160; x += 32) {
    for (let y = 0; y < 144; y += 32) {

      let n = Math.floor(Math.random() * tiles.length);
      let tile = new Sprite(tex["tile00" + n.toString() + ".png"]);
      tile.x = x;
      tile.y = y;
      app.stage.addChild(tile);
    }
  }

  tile12 = new Sprite(tex["tile012.png"]);
  tile12.x = 0;
  tile12.y = 0;
  app.stage.addChild(tile12);

  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {


  if (rightArrow.isDown && canMove && tile12.x < WIDTH-32) {
    tile12.x += speed;
    canMove = false;
  }

  if (leftArrow.isDown && canMove && tile12.x > 0) {
    tile12.x -= speed;
    canMove = false;
  }

  if (upArrow.isDown && canMove &&  tile12.y > 0 ) {
    tile12.y -= speed;
    canMove = false;
  }

  if (downArrow.isDown && canMove &&tile12.y < HEIGHT-32) {
    tile12.y += speed;
    canMove = false;
  }

  if (rightArrow.isUp && leftArrow.isUp && upArrow.isUp && downArrow.isUp) {
    canMove = true;
  }
  //Move the cat 1 pixel 
  // tile000.x += 1;

  //Optionally use the `delta` value
  // tile000.x += 1 + delta;
}
