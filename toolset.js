function checkTile(x, y) {
  let col;
  tilesCollision.forEach(function tileCPrint(tileCol) {
    // console.log(tileCol._texture.textureCacheIds[0], tileCol.x, tileCol.y);
    console.log("-----");

    if (tilesCollision.length > 0 && hitTestRectangle(player, tileCol)) {
      console.log("YES:", x, y, "|", tileCol.x, tileCol.y, hitTestRectangle(player, tileCol));
      col = true;
    } else {
      // console.log("NO:", x, y, "|", tileCol.x, tileCol.y);
      col = false;
    }
  })
  return col;
}

function decreaseLife() {
  hp -= 30;
}

function updateBar() {
  outerBar.width = hp;
}

function updateRoomCount() {
  roomCount++;
  message.text = 'ROOM: ' + roomCount;
}

function checkHP() {
  hp < 1 ? gameOver() : null;
}