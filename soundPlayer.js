//Load the sounds
sounds.load([
  "./sprites/explosion.wav"
]);

//Assign the callback function that should run
//when the sounds have loaded
sounds.whenLoaded = setup;
let explosion = sounds["./sprites/explosion.wav"];


function setup() {
  console.log("sounds loaded");
  //Create the sounds
  //Pan the shoot sound to the right
  explosion.pan = 0.8;
  //Make the music loop
  music.loop = true;
  //Set the pan to the left
  music.pan = -0.8;
  //Set the music volume
  music.volume = 0.7;  
  //Set a reverb effect on the bounce sound
  //arguments: duration, decay, reverse?
  //music.setReverb(2, 2, false);
  //Set the sound's `reverb` property to `false` to turn it off
  //music.reverb = false;
  //Add an echo effect to the bounce sound
  //arguments: delay time, feedback time, optional frequency filtering
  explosion.setEcho(0.2, 0.3, 1000);
  //Set `echo` to false to turn it off
  //bounce.echo = false;
  
    if (!music.playing) {
      music.play();
    }
    console.log("music playing");
  };
  //Pause the music 
  c.press = function() {
    music.pause();
    console.log("music paused");
  };
  //Restart the music 
  d.press = function() {
    music.restart();
    console.log("music restarted");
  };
  //Play the music from the 10 second mark
  e.press = function() {
    music.playFrom(10);
    console.log("music start point changed");
  };
  
  //Play the bounce sound
  f.press = function() { bounce.play() };
  //Fade the music out over 3 seconds
  g.press = function() { 
    music.fadeOut(3);
  };
  //Fade the music in over 3 seconds
  h.press = function() { 
    music.fadeIn(3);
  };
}
/*
Part 2 - Working with sound effects
===================================
*/
var i = keyboard(73),
    j = keyboard(74),
    k = keyboard(75),
    l = keyboard(76);
i.press = function(){ shootSound() };
j.press = function(){ jumpSound() };
k.press = function(){ explosionSound() };
l.press = function(){ bonusSound() };
//The sound effect functions
//The shoot sound
function shootSound() {
  soundEffect(
    1046.5,           //frequency
    0,                //attack
    0.3,              //decay
    "sawtooth",       //waveform
    1,                //Volume
    -0.8,             //pan
    0,                //wait before playing
    1200,             //pitch bend amount
    false,            //reverse bend
    0,                //random pitch range
    25,               //dissonance
    [0.2, 0.2, 2000], //echo: [delay, feedback, filter]
    undefined         //reverb: [duration, decay, reverse?]
  );
}
//The jump sound
function jumpSound() {
  soundEffect(
    523.25,       //frequency
    0.05,         //attack
    0.2,          //decay
    "sine",       //waveform
    3,            //volume
    0.8,          //pan
    0,            //wait before playing
    600,          //pitch bend amount
    true,         //reverse
    100,          //random pitch range
    0,            //dissonance
    undefined,    //echo: [delay, feedback, filter]
    undefined     //reverb: [duration, decay, reverse?]
  );
}
//The explosion sound
function explosionSound() {
  soundEffect(
    16,          //frequency
    0,           //attack
    1,           //decay
    "sawtooth",  //waveform
    1,           //volume
    0,           //pan
    0,           //wait before playing
    0,           //pitch bend amount
    false,       //reverse
    0,           //random pitch range
    50,          //dissonance
    undefined,   //echo: [delay, feedback, filter]
    undefined    //reverb: [duration, decay, reverse?]
  );
}
    
