'use strict'

//load an image and run the `setup` function when it's done
loader
  .add("./sprites/tileset_desert.json")
  // .add('explosion',"./explosion.wav")
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {
}

//This `setup` function will run when the image has loaded
function setup() {

  roomCount = 0;

  splashScene = new Container();
  app.stage.addChild(splashScene);
  
  gameScene = new Container();
  app.stage.addChild(gameScene);

  interludeScene = new Container();
  app.stage.addChild(interludeScene);

  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);
  
  tex = PIXI.loader.resources["./sprites/tileset_desert.json"].textures;

  //health bar
  healthBar = new PIXI.Container();
  healthBar.position.set(0, 0)
  gameScene.addChild(healthBar); //gamescene isntead of stage??

  innerBar = new PIXI.Graphics();
  innerBar.beginFill(0x060f08);
  innerBar.drawRect(0, 130, 80, 32, 2);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  outerBar = new PIXI.Graphics();
  outerBar.beginFill(0x62e678);
  outerBar.drawRect(0, 130, 80, 32, 2);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;
  outerBar.width = hp;

  message = new PIXI.Text('HEALTH', { fontFamily: 'gbfont', fontSize: 10, fill: 0xffffff, align: 'right' });
  message.x = 5;
  message.y = 130;
  gameScene.addChild(message);

  // TIMEBAR
  timeBar = new PIXI.Container();
  timeBar.position.set(80, 0)
  gameScene.addChild(timeBar); //gamescene isntead of stage??

  innerTimeBar = new PIXI.Graphics();
  innerTimeBar.beginFill(0x060f08);
  innerTimeBar.drawRect(0, 130, 160, 32);
  innerTimeBar.endFill();
  timeBar.addChild(innerTimeBar);

  outerTimeBar = new PIXI.Graphics();
  outerTimeBar.beginFill(0x2d6a37);
  outerTimeBar.drawRect(0, 130, 160, 32);
  outerTimeBar.endFill();
  timeBar.addChild(outerTimeBar);

  timeBar.outer = outerTimeBar;
  outerTimeBar.width = TIME_DOWN;

  messageTimeBar = new PIXI.Text('TIME', { fontFamily: 'gbfont', fontSize: 10, fill: 0xffffff, align: 'right' });
  messageTimeBar.x = 85;
  messageTimeBar.y = 130;
  gameScene.addChild(messageTimeBar);

  scenes = [gameScene, interludeScene, gameOverScene, splashScene];

    //interlude room
    message = new PIXI.Text('Day: ' + roomCount, { fontFamily: 'gbfont', fontSize: 10, fill: 0xffffff, align: 'center' });
    message.x = 12;
    message.y = 64;
    interludeScene.addChild(message);
  
  reset();

  setRoomVisible(splashScene)

  // run the game state
  state = splash;
  
  //Start the game loop 
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
  //Update the current game state:
  state(delta);

  if (rightArrow.isUp && leftArrow.isUp && upArrow.isUp && downArrow.isUp && a_key.isUp) {
    canMove = true;
  }
}


function splash() {
  //splash room
  background = new PIXI.Graphics();
  background.beginFill(0x62e678);
  background.drawRect(0, 0, 160, 144);
  background.endFill();
  splashScene.addChild(background);

  splashText = new PIXI.Text('Very\nsmall\nadventure', { fontFamily: 'gbfont', fontSize: 12, fill: 0x060f08, align: 'left' });
  splashScene.addChild(splashText);
  splashText.tint='060f08';
  splashText.x = 12;
  splashText.y = 44;

  splashText = new PIXI.Text('Press \'a\' to start', { fontFamily: 'gbfont', fontSize: 8, fill: 0x060f08, align: 'left' });
  splashScene.addChild(splashText);
  splashText.tint='0x060f08';
  splashText.x = 12;
  splashText.y = 96;

  if (a_key.isDown && canMove) {
    canMove = false;
    startGame();
  }
}

function interlude() {

    
  if (a_key.isDown && canMove) {
    canMove = false;
    reNewRoom(INTERLUDE);
  }
}

function startGame() {
  reset();
  hp = 80;
  updateHPBar();
  roomCount = 0;
  state = play;
  setRoomVisible(gameScene)
}

function gameOver() {
    //game over room
    background = new PIXI.Graphics();
    background.beginFill(0x62e678);
    background.drawRect(0, 0, 160, 144);
    background.endFill();
    gameOverScene.addChild(background);
  
    gameOverText = new PIXI.Text('GAME OVER', { fontFamily: 'gbfont', fontSize: 12, fill: 0x060f08, align: 'left' });
    gameOverScene.addChild(gameOverText);
    gameOverText.tint = '0x060f08';
    gameOverText.x = 12;
    gameOverText.y = 64;
  
    gameOverTextCaption = new PIXI.Text('You survived ' + roomCount + ' Days.', { fontFamily: 'gbfont', fontSize: 6, fill: 0x060f08, align: 'left' });
    gameOverScene.addChild(gameOverTextCaption);
    gameOverTextCaption.tint = '0x060f08';
    gameOverTextCaption.x = 12;
    gameOverTextCaption.y = 96;

    state = gameOver;
    setRoomVisible(gameOverScene)
    if (a_key.isDown && canMove) {
      canMove = false;
      reNewRoom(GAME_OVER);
    }
}

function setRoomVisible (room) {
  scenes.forEach(scene => scene === room ? scene.visible = true : scene.visible = false)
}

function reNewRoom(stateName) {
  switch (stateName) {
    case (PLAY):
      updateRoomCount()
      state = interlude;
      setRoomVisible(interludeScene)
      break;
    case (INTERLUDE):
      reset();
      state = play;
      setRoomVisible(gameScene)
      break;
    case (GAME_OVER):
      state = splash;
      setRoomVisible(splashScene)
      break;

  }
}

function stopWatch() {

  const intervalId = setInterval(function () {
    TIME_DOWN--;
    if (TIME_DOWN < 0) {
      clearInterval(intervalId);
    }
  }, time);
}

// function blink(){
// var blinking_time=100;
//   const intervalId = setInterval(function() {
//     TIME_DOWN--;
//     if (a_key.isDown < 0) {
//       clearInterval(intervalId);

//     }
//   }, blinking_time);
// }




// function animate(time) {
//     ticker.update(time);
//     console.log(time);

//     // renderer.render(stage);
//     requestAnimationFrame(animate);
// }


//   boomSnd = PIXI.sound.sound.from({
//     url: './explosion.wav',
//     autoPlay: false,
//     preload: true,
//     loaded: function(err, sound) {
//         sound.play();
//     }
// });

  // const sound = PIXI.sound.Sound.from('./explosion.wav');
  // sound.play();