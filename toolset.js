

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