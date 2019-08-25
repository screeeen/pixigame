function reset() {
  tilesCollision = [];
  
  time = 1000;
  timeDown = 10;
  stopWatch();

  //tilemap
  for (let x = 0; x < 160; x += 32) {
    for (let y = 0; y < 128; y += 32) {
      if (x == 0 && y === 0) continue;
      if (x === 128 && y === 96) continue;


      let n = Math.floor(Math.random() * 10);
      if (n === 4 || n === 5 || n === 6) {
        tileC = new Sprite(tex["tile00" + n.toString() + ".png"]);
        // tileC.tint = Math.random() * 0xFFFFFF;
        tilesCollision.push(tileC);
        tileC.x = x;
        tileC.y = y;
        gameScene.addChild(tileC);
      } else {
        tile = new Sprite(tex["tile00" + n.toString() + ".png"]);
        tile.x = x;
        tile.y = y;
        gameScene.addChild(tile);
      }
    }
  }
  
  enter = new Sprite(tex["tile014.png"]);
  enter.scale.x = -1;
  enter.x = 32;
  enter.y = 0;
  gameScene.addChild(enter);

  exit = new Sprite(tex["tile014.png"]);
  exit.x = 128;
  exit.y = 96;
  gameScene.addChild(exit);

  player = new Sprite(tex["tile012.png"]);
  player.x = 0;
  player.y = 0;
  gameScene.addChild(player);
}