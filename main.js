'use strict';

//load an image and run the `setup` function when it's done
loader
	.add('./sprites/tileset_desert.json')
	// .add('explosion',"./explosion.wav")
	.on('progress', loadProgressHandler)
	.load(setup);

function loadProgressHandler(loader, resource) {}

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

	//splash room
	background = new PIXI.Graphics();
	background.beginFill(0x62e678);
	background.drawRect(0, 0, 160, 144);
	background.endFill();
	splashScene.addChild(background);

	tex = PIXI.loader.resources['./sprites/tileset_desert.json'].textures;

	//   boomSnd = PIXI.sound.sound.from({
	//     url: './explosion.wav',
	//     autoPlay: false,
	//     preload: true,
	//     loaded: function(err, sound) {
	//         sound.play();
	//     }
	// });

	const sound = PIXI.sound.Sound.from('./explosion.wav');
	sound.play();

	//health bar
	healthBar = new PIXI.Container();
	healthBar.position.set(0, 0);
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

	message = new PIXI.Text('HEALTH', {
		fontFamily: 'gbfont',
		fontSize: 10,
		fill: 0xffffff,
		align: 'right',
	});
	message.x = 5;
	message.y = 130;
	gameScene.addChild(message);

	// TIMEBAR
	timeBar = new PIXI.Container();
	timeBar.position.set(80, 0);
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
	outerTimeBar.width = timeDown;

	messageTimeBar = new PIXI.Text('TIME', {
		fontFamily: 'gbfont',
		fontSize: 10,
		fill: 0xffffff,
		align: 'right',
	});
	messageTimeBar.x = 85;
	messageTimeBar.y = 130;
	gameScene.addChild(messageTimeBar);

	//interlude room
	message = new PIXI.Text('Day: ' + roomCount, {
		fontFamily: 'gbfont',
		fontSize: 10,
		fill: 0xffffff,
		align: 'center',
	});
	message.x = 12;
	message.y = 64;
	interludeScene.addChild(message);

	//game over room
	background = new PIXI.Graphics();
	background.beginFill(0x62e678);
	background.drawRect(0, 0, 160, 144);
	background.endFill();
	gameOverScene.addChild(background);

	gameOverText = new PIXI.Text('GAME OVER', {
		fontFamily: 'gbfont',
		fontSize: 12,
		fill: 0x060f08,
		align: 'left',
	});
	gameOverScene.addChild(gameOverText);
	gameOverText.tint = '0x060f08';
	gameOverText.x = 12;
	gameOverText.y = 64;

	gameOverTextCaption = new PIXI.Text('You survived ' + roomCount + ' Days.', {
		fontFamily: 'gbfont',
		fontSize: 8,
		fill: 0x060f08,
		align: 'left',
	});
	gameOverScene.addChild(gameOverTextCaption);
	gameOverTextCaption.tint = '0x060f08';
	gameOverTextCaption.x = 12;
	gameOverTextCaption.y = 96;

	reset();

	splashScene.visible = true;
	interludeScene.visible = false;
	gameScene.visible = false;
	gameOverScene.visible = false;

	//Set the game state
	state = splash;

	splashText = new PIXI.Text('Very small \n adventure', {
		fontFamily: 'gbfont',
		fontSize: 12,
		fill: 0x060f08,
		align: 'left',
	});
	splashScene.addChild(splashText);
	splashText.tint = '060f08';
	splashText.x = 12;
	splashText.y = 64;

	splashText = new PIXI.Text("Press 'a' to start", {
		fontFamily: 'gbfont',
		fontSize: 8,
		fill: 0x060f08,
		align: 'left',
	});
	splashScene.addChild(splashText);
	splashText.tint = '0x060f08';
	splashText.x = 12;
	splashText.y = 96;

	//Start the game loop
	app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
	//Update the current game state:
	state(delta);

	switcher(); // TOOL

	if (rightArrow.isUp && leftArrow.isUp && upArrow.isUp && downArrow.isUp && a_key.isUp) {
		canMove = true;
	}
}

function switcher() {
	key_uno.isDown ? boomSnd.play('explosion.wav', 0.5, false) : null;
	key_dos.isDown ? console.log('p') : null;
	// key_cuatro.isDown ? gameOver() : null;
}

function splash() {
	if (a_key.isDown && canMove) {
		canMove = false;
		startGame();
	}
}

function interlude() {
	if (a_key.isDown && canMove) {
		canMove = false;
		reNewRoom();
	}
}

function startGame() {
	reset();
	hp = 80;
	updateHPBar();
	roomCount = 0;
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
	if (a_key.isDown && canMove) {
		canMove = false;
		reNewRoom();
	}
}

function reNewRoom() {
	switch (state.name) {
		case 'play':
			updateRoomCount();
			state = interlude;
			// ticker.stop();

			interludeScene.visible = true;
			gameOverScene.visible = false;
			gameScene.visible = false;
			break;
		case 'interlude':
			reset();
			state = play;
			interludeScene.visible = false;
			gameOverScene.visible = false;
			gameScene.visible = true;
			break;
		case 'gameOver':
			state = splash;
			interludeScene.visible = false;
			gameOverScene.visible = false;
			gameScene.visible = false;
			splashScene.visible = true;
			break;
	}
}

function stopWatch() {
	const intervalId = setInterval(function () {
		timeDown--;
		if (timeDown < 0) {
			clearInterval(intervalId);
		}
	}, time);
}

// function blink(){
// var blinking_time=100;
//   const intervalId = setInterval(function() {
//     timeDown--;
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
