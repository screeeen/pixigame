function play(delta) {

  if (canMove && player.x < WIDTH - 32 && rightArrow.isDown) {
    player.x += speed;
    canMove = false;
    if (checkTile(player.x, player.y)) decreaseLife();
    updateBar();
    checkHP();
    if (hitTestRectangle(player, exit)) reNewRoom();
  }

  if (leftArrow.isDown && canMove && player.x > 0) {
    player.x -= speed
    canMove = false;
    if (checkTile(player.x, player.y)) decreaseLife();
    updateBar();
    checkHP();
    if (hitTestRectangle(player, exit)) reNewRoom();
  }

  if (upArrow.isDown && canMove && player.y > 0) {
    player.y -= speed;
    canMove = false;
    if (checkTile(player.x, player.y)) decreaseLife();
    updateBar();
    checkHP();
    if (hitTestRectangle(player, exit)) reNewRoom();
  }

  if (downArrow.isDown && canMove && player.y < HEIGHT - 32) {
    player.y += speed;
    canMove = false;
    if (checkTile(player.x, player.y)) decreaseLife();
    updateBar();
    checkHP();
    if (hitTestRectangle(player, exit)) reNewRoom();
  }

  if (rightArrow.isUp && leftArrow.isUp && upArrow.isUp && downArrow.isUp) {
    canMove = true;
  }
}