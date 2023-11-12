const leftArrow = keyboard(37);
const upArrow = keyboard(38);
const rightArrow = keyboard(39);
const downArrow = keyboard(40);
const a_key = keyboard(65);
const s_key = keyboard(83);

//only debug
const key_uno = keyboard(50);
const key_dos = keyboard(51);
const key_tres = keyboard(52);
const key_cuatro = keyboard(53);

//Aliases
let Application = PIXI.Application,
	loader = PIXI.loader,
	resources = PIXI.loader.resources,
	Sprite = PIXI.Sprite,
	Container = PIXI.Container,
	TextStyle = PIXI.TextStyle,
	sound = PIXI.Sound;

//Create a Pixi Application
let app = new Application({
	width: 160,
	height: 144,
	antialias: true,
	transparent: false,
	resolution: 2,
});
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

// let u = new SpriteUtilities(PIXI);
let tile000, tile001, tile002, tile003, tile004, tile005, tile006, tile007, tile008, tile009, tex;
let tilesCollision = [];
let gameScene, interludeScene, gameOverScene, splashScene;
let player, enter, exit, tile, tileC;
const speed = 32;
let canMove = true;
const WIDTH = 160;
const HEIGHT = 128;
let background;
let message, messageTimeBar, gameOverTextCaption, splashText, gameOverText, hp;
let healthBar, innerBar, outerBar;
let timeBar, innerTimeBar, outerTimeBar;
let roomCount, state;
let timeDown;
let boomSnd;
