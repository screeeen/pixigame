function play(delta) {
  
  updateTimeBar();
  checkIfTimeOver();

  if (canMove && player.x < WIDTH - 32 && rightArrow.isDown) {
    canMove = false;
    player.x += speed;
    if (checkTile(player.x, player.y)) {
      decreaseLife();
      updateHPBar();
      checkHP();
    }
    if (hitTestRectangle(player, exit)) reNewRoom(PLAY);
  }

  if (leftArrow.isDown && canMove && player.x > 0) {
    canMove = false;
    player.x -= speed
    if (checkTile(player.x, player.y)) {
      decreaseLife();
      updateHPBar();
      checkHP();
    }
    if (hitTestRectangle(player, exit)) reNewRoom(PLAY);
  }

  if (upArrow.isDown && canMove && player.y > 0) {
    canMove = false;
    player.y -= speed;
    if (checkTile(player.x, player.y)) {
      decreaseLife();
      updateHPBar();
      checkHP();
    }
    if (hitTestRectangle(player, exit)) reNewRoom(PLAY);
  }

  if (downArrow.isDown && canMove && player.y < HEIGHT - 32) {
    canMove = false;
    player.y += speed;
    if (checkTile(player.x, player.y)) {
      decreaseLife();
      updateHPBar();
      checkHP();
    }
    if (hitTestRectangle(player, exit)) reNewRoom(PLAY);
  }

}