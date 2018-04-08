// Stage initial size
var defaultSize = [192, 108];
var aspectRatio = defaultSize[0] / defaultSize[1];
var bgImagePathLarge = "static/images/yul.jpg";
var bgImagePathMobile = "static/images/yul_small.jpg"; // Smaller texture

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

// Set state to initial state
var state = init;
// Global declarations
var bgTexture;
var bgSprite;

// Call initial state once
init();

// Initial state
function init() {
  // Resize app
  resizePixi();

  // Create loading screen
  loadingText = new PIXI.Text("Loading...\n" +
    "Optimizing for your window width: " + window.innerWidth,
    {fontFamily :"Arial",
    fontSize: 36,
    fill: "white",
    align:"center"});
  loadingText.x = window.innerWidth/2;
  loadingText.y = window.innerHeight/2;
  loadingText.anchor.x = 0.5;
  loadingText.anchor.y = 0.5;
  app.stage.addChild(loadingText);
  // Render once
  renderer.render(stage);

  // Attach resize callback to onresize event listener
  window.onresize = function(event) {
    // Resize app
    resizePixi();
    // Resize background
    stretchToFit();
  };

  bgImagePath = bgImagePathLarge;
  // Check for small screens
  if (window.innerWidth < 1200){
    bgImagePath = bgImagePathMobile;
  }
  // Load background image
  PIXI.loader.add(bgImagePath).load((loader, resources) => {
    state = doneLoading;
    console.log("Resources loaded.");
    console.log("Loaded " + bgImagePath);
  })

  state = loading;
}

// Loading state
function loading() {

};

// Done loading state
function doneLoading() {
  bgTexture = new PIXI.Texture.fromImage(bgImagePath);
  bgTexture.textureAspectRatio = bgTexture.width / bgTexture.height;
  bgSprite = new PIXI.Sprite(bgTexture);
  stage.addChild(bgSprite);
  bgSprite.x = window.innerWidth/2;
  bgSprite.y = 0;
  bgSprite.anchor.x = 0.5;
  bgSprite.anchor.y = 0;
  stretchToFit();
  state = mainState;

  galleryButton = new Button(0.75*window.innerWidth,
    0.65*window.innerHeight, "Hi");
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
  // Filtering

  // Render
  window.requestAnimationFrame(() => {renderer.render(stage)});
};

// Resize callback
function resizePixi() {
  // Resize Pixi app
  let w = window.innerWidth+1; // Magic pixel...
  let h = window.innerHeight+1;
  renderer.resize(w,h);
}

// Add state to ticker
app.ticker.add((delta) => state(delta));
