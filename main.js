'use strict'

//load an image and run the `setup` function when it's done
loader
  .add("/sprites/tileset_desert.json")
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
}

//This `setup` function will run when the image has loaded
function setup() {

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

  //health bar
  healthBar = new PIXI.Container();
  healthBar.position.set(0, 0)
  gameScene.addChild(healthBar); //gamescene isntead of stage??

  innerBar = new PIXI.Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 130, 80, 32,2);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  outerBar = new PIXI.Graphics();
  outerBar.beginFill(0x0000FF);
  outerBar.drawRect(0, 130, 80, 32,2);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;
  outerBar.width = hp;

  message = new PIXI.Text('HEALTH', { fontFamily: 'Arial', fontSize: 10, fill: 0xffffff, align: 'right' });
  message.x = 5;
  message.y = 130;
  gameScene.addChild(message);

  // TIMEBAR
  timeBar = new PIXI.Container();
  timeBar.position.set(80, 0)
  gameScene.addChild(timeBar); //gamescene isntead of stage??

  innerTimeBar = new PIXI.Graphics();
  innerTimeBar.beginFill(0x000000);
  innerTimeBar.drawRect(0, 130, 160, 32);
  innerTimeBar.endFill();
  timeBar.addChild(innerTimeBar);

  outerTimeBar = new PIXI.Graphics();
  outerTimeBar.beginFill(0xFF0000);
  outerTimeBar.drawRect(0, 130, 160, 32);
  outerTimeBar.endFill();
  timeBar.addChild(outerTimeBar);

  timeBar.outer = outerTimeBar;
  outerTimeBar.width = timeDown;

  messageTimeBar = new PIXI.Text('TIME', { fontFamily: 'Arial', fontSize: 10, fill: 0xffffff, align: 'right' });
  messageTimeBar.x = 85;
  messageTimeBar.y = 130;
  gameScene.addChild(messageTimeBar);


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
  hp = 80;
  updateHPBar();
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
      // ticker.stop();

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

function stopWatch(){

  const intervalId = setInterval(function() {
    timeDown--;
    console.log("Day ends in " + timeDown);
    if (timeDown === 0) {
      clearInterval(intervalId);
    }
  }, time);
}
  



// function animate(time) {
//     ticker.update(time);
//     console.log(time);
    
//     // renderer.render(stage);
//     requestAnimationFrame(animate);
// }

