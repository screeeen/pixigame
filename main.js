'use strict'

// const leftArrow = keyboard(37);
// const upArrow = keyboard(38);
// const rightArrow = keyboard(39);
// const downArrow = keyboard(40);

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

//This `setup` function will run when the image has loaded
function setup() {

  tex = PIXI.loader.resources["/sprites/tileset_desert.json"].textures;

  // tiles[0] = new Sprite(tex["tile000" + ".png"]);
  // app.stage.addChild(tiles[0]);

  //init sprites
  for (let i = 0; i < tiles.length; i++) {
    tiles[i] = new Sprite(tex["tile00" + i.toString() + ".png"]);
    // console.log(tiles[i]);
    
    // tiles[i].x = i * 32;
    // tiles[i].y = (i * 32) % 4;
    // app.stage.addChild(tiles[i]);
  }

  //tilemap
  for (let x = 0; x < 160; x += 32) {
    for (let y = 0; y < 144; y += 32) {

      // console.log(parseInt(app.stage.width));
      // console.log(parseInt(app.stage.height));
      

      let n = Math.floor(Math.random() * tiles.length);
      console.log(x,y,n);
      
      let tile = tiles[n];

      tile.x = x;
      tile.y = y;
      app.stage.addChild(tiles[n]);

    }
  }


  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {

  //Move the cat 1 pixel 
  // tile000.x += 1;

  //Optionally use the `delta` value
  // tile000.x += 1 + delta;
}
