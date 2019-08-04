'use strict'

//Aliases
let Application = PIXI.Application,
  loader = PIXI.loader,
  resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({
  width: 400,
  height: 300,
  antialias: false,
  transparent: false,
  resolution: 1
}
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
loader
  .add("./sprites/tilesetOeste.jpg")
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler() {
  console.log("loading");
}

//This `setup` function will run when the image has loaded
function setup() {

  //Create the `tileset` sprite from the texture
  let texture = PIXI.utils.TextureCache["./sprites/tilesetOeste.jpg"];

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  //(`Rectangle` is an alias for `PIXI.Rectangle`)
  let rectangle = new PIXI.Rectangle(28, 28, 28, 28);

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;

  //Create the sprite from the texture
  let rocket = new Sprite(texture);

  //Position the rocket sprite on the canvas
  rocket.x = app.renderer.width / 2;
  rocket.y = app.renderer.height / 2;

  for (let x = 0; x < app.renderer.width; x++) {
    for (let y = 0; x < app.renderer.height; y++) {

    }
  }

  //Add the rocket to the stage
  app.stage.addChild(rocket);

  //Render the stage   
  app.renderer.render(app.stage);
}

