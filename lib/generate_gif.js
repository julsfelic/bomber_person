function generateGif(options) {
  let currentFrame = 1;
  this.gif = new Image();

  setInterval(() => {
    if (currentFrame > options.frames) { currentFrame = 1; }
    this.gif.src = `../assets${this.path}${currentFrame}.png`;
    currentFrame++;
  }, options.refresh);
}

module.exports = generateGif;
