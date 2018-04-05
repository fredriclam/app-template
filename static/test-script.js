let x = 3;
console.log(x);


const sprites = {};

//Aliases
const Application = PIXI.Application;
const loader = PIXI.loader;
const resources = PIXI.loader.resources;
const Sprite = PIXI.Sprite;

//Create a Pixi Application
const app = new Application({
  width: 1000,
  height: 700,
  antialias: true,
  transparent: false,
  resolution: 1
});



var testBar = new PIXI.Graphics();

testBar.beginFill(255, 255, 255)
testBar.drawRoundedRect(200, 200, 10, 30, 5);
testBar.lineStyle(0);
app.stage.addChild(testBar);

function gameLoop(delta){
  //Update the current game state:
  // state(delta);
}

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
// loader.onComplete.add(() => {
//   ready = true;
//   //   bindKeys();
// });
