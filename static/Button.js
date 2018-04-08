class Button {
  constructor(x, y, text) {
    this.inFocus = false;
    this.initialAlpha = 0.2;
    this.animSpeed = 0.1;
    this.animProgress = 0.0;

    this.text = new PIXI.Text(text.toUpperCase(), {fontFamily: 'Helvetica', fill: 0xFFFFFF});
    this.text.style.fontSize = 32;
    this.text.x = x;
    this.text.y = y;
    this.text.anchor.x = 0.5;
    this.text.anchor.y = 0.5;



    this.frameGraphics = new PIXI.Graphics();
    // this.frameGraphics.beginFill(0xFFFFFF);
    // this.frameGraphics.fillAlpha = 0.2;
    this.frameGraphics.lineStyle(Math.floor(this.text.style.fontSize/6), 0xFFFFFF);
    this.frameGraphics.drawRect(0, 0, this.text.width * 1.5, this.text.height * 1.5);

    this.frameSprite = new PIXI.Sprite(app.renderer.generateTexture(this.frameGraphics));
    this.frameSprite.x = x;
    this.frameSprite.y = y;
    this.frameSprite.anchor.x = 0.5;
    this.frameSprite.anchor.y = 0.5;

    this.boxGraphics = new PIXI.Graphics();
    this.boxGraphics.beginFill(0xFFFFFF);
    this.boxGraphics.fillAlpha = 1.0;
    this.boxGraphics.lineStyle(0, 0xFFFFFF);
    this.boxGraphics.lineAlpha = 0.0;
    this.boxGraphics.drawRect(0, 0, this.frameGraphics.width, this.frameGraphics.height);

    this.boxSprite = new PIXI.Sprite(app.renderer.generateTexture(this.boxGraphics));
    this.boxSprite.x = x;
    this.boxSprite.y = y;
    this.boxSprite.anchor.x = 0.5;
    this.boxSprite.anchor.y = 0.5;
    this.boxSprite.alpha = 0.2;

    // Add sprite and then text
    app.stage.addChild(this.boxSprite);
    app.stage.addChild(this.frameSprite);
    app.stage.addChild(this.text);

    // Button
    this.boxSprite.buttonMode = true;
    this.boxSprite.interactive = true;

    this.boxSprite.on('pointerover', this.onButtonOver.bind(this))
      .on('pointerout', this.onButtonOut.bind(this))
      .on('pointertap', this.onButtonTap.bind(this));

    // Attach to ticker
    app.ticker.add((delta) => this.updateCallback(delta));
  }

  onButtonOver(){
    this.inFocus = true;
  }

  onButtonOut(){
    this.inFocus = false;
  }

  onButtonTap(){
    if(this.inFocus){
      console.log("Link");
    }
  }

  updateCallback(delta) {
    // Tick animation progress
    if (this.inFocus){
      this.animProgress += this.animSpeed * delta;
    }
    else{
      this.animProgress -= this.animSpeed * delta;
    }
    // Clamp animation progress
    if (this.animProgress > 1){
      this.animProgress = 1;
    }
    else if (this.animProgress < 0){
      this.animProgress = 0;
    }
    // Map animation progress to button box alpha
    this.boxSprite.alpha = this.initialAlpha +
      (1.0 - this.initialAlpha) * this.animProgress;
    // Map animation progress to text colour
    this.text.style.fill = '#' + this.scalarToHex(this.animProgress)
      + this.scalarToHex(this.animProgress)
      + this.scalarToHex(this.animProgress);
  }

  // Convert [0, 1] to hex (00 to FF). Rounds 1 to FF.
  scalarToHex(scalar){
    let hex = Math.floor(256*(1.0 - this.animProgress)).toString(16);
    return hex.length == 1 ? "00" : (hex.length == 3 ? "FF" : hex);
  }

  // Not needed
  hexToComponent(){
    rgbInt = parseInt((galleryButton.text.style.fill.split('#'))[1]);
    // B
    let B = rgbInt % 0x000100;
    // G
    let G = rgbInt % 0x010000 - B;
    // R
    let R = rgbInt - G - B;
    console.warn("Placeholder function hexToComponent called");
  }
}

//
//     button
//         // Mouse & touch events are normalized into
//         // the pointer* events for handling different
//         // button events.
//         .on('pointerdown', onButtonDown)
//         .on('pointerup', onButtonUp)
//         .on('pointerupoutside', onButtonUp)
//         .on('pointerover', onButtonOver)
//         .on('pointerout', onButtonOut);
//
//         // Use mouse-only events
//         // .on('mousedown', onButtonDown)
//         // .on('mouseup', onButtonUp)
//         // .on('mouseupoutside', onButtonUp)
//         // .on('mouseover', onButtonOver)
//         // .on('mouseout', onButtonOut)
//
//         // Use touch-only events
//         // .on('touchstart', onButtonDown)
//         // .on('touchend', onButtonUp)
//         // .on('touchendoutside', onButtonUp)
//
//     // add it to the stage
//     app.stage.addChild(button);
//
//
// function onButtonDown() {
//     this.isdown = true;
//     this.texture = textureButtonDown;
//     this.alpha = 1;
// }
//
// function onButtonUp() {
//     this.isdown = false;
//     if (this.isOver) {
//         this.texture = textureButtonOver;
//     }
//     else {
//         this.texture = textureButton;
//     }
// }
//
// function onButtonOver() {
//     this.isOver = true;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = textureButtonOver;
// }
//
// function onButtonOut() {
//     this.isOver = false;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = textureButton;
// }
