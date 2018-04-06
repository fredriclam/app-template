// Stage initial size
var defaultSize = [192, 108];
var aspectRatio = defaultSize[0] / defaultSize[1];

// Set up stage and renderer
const app = new PIXI.Application({
  width: 800,
  height: 600,
  antialias: true,
  transparent: false,
  resolution: 1
});
const stage = app.stage;
const renderer = app.renderer; // PIXI.autoDetectRenderer(defaultSize[0], defaultSize[1]);
document.body.appendChild(renderer.view);
// List sprites out
const sprites = {};

// Set state to
var state = loading;

// Attach resize callback to onresize event listener
window.onresize = function(event) {
  // Resize app
  resizePixi();
  // Resize background
  stretchToFit();
};
resizePixi();
// Loading
PIXI.loader.add("static/images/yul.JPG").load((loader, resources) => {
  state = doneLoading;
  console.log("Resources loaded.");
})

// Global declarations
var bgTexture;
var bgSprite;

// Loading state
function loading() {

};

// Done loading state
function doneLoading() {
  bgTexture = new PIXI.Texture.fromImage('static/images/yul.JPG');
  bgTexture.textureAspectRatio = bgTexture.width / bgTexture.height;
  bgSprite = new PIXI.Sprite(bgTexture);
  stage.addChild(bgSprite);
  bgSprite.x = window.innerWidth/2;
  bgSprite.y = 0;
  bgSprite.anchor.x = 0.5;
  bgSprite.anchor.y = 0;
  stretchToFit();
  state = mainState;
};

// Stretches bgSprite to fit inner screen
function stretchToFit(){
  bgSprite.width = window.innerWidth+1;
  bgSprite.height = bgSprite.width / bgTexture.textureAspectRatio;
  if (bgSprite.height < window.innerHeight){
    bgSprite.height = window.innerHeight;
    bgSprite.width = bgSprite.height * bgTexture.textureAspectRatio;
  }
  bgSprite.x = window.innerWidth/2;
};

// Main (animation) state
function mainState() {
  window.requestAnimationFrame(() => {renderer.render(stage)});
};

// Resize callback
function resizePixi() {
  // Resize Pixi app
  let w = window.innerWidth+1; // Magic pixel...
  let h = window.innerHeight;
  renderer.resize(w,h);
}

// Add state to ticker
app.ticker.add((delta) => state(delta));
