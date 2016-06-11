/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */
AFRAME.registerComponent('set-image', {
  schema: {
    on: {type: 'string'},
    target: {type: 'selector'},
    src: {type: 'string'},
    dur: {type: 'number', default: 300}
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    this.setupFadeAnimation();

    el.addEventListener(data.on, function () {
      // Fade out image.
      data.target.emit('set-image-fade');
      // Wait for fade to complete.
      setTimeout(function () {
        // Set image.
        data.target.setAttribute('material', 'src', data.src);
      }, data.dur);
    });
  },

  /**
   * Setup fade-in + fade-out.
   */
  setupFadeAnimation: function () {
    var data = this.data;

    if (data.target.is('set-image-animation-ready')) { return; }

    // Create animation.
    var animation = document.createElement('a-animation');
    var animationData = {
      attribute: 'material.color',
      begin: 'set-image-fade',
      direction: 'alternate',
      dur: data.dur,
      repeat: 1,
      from: 'white',
      to: 'black'
    };
    Object.keys(animationData).forEach(function (attr) {
      animation.setAttribute(attr, animationData[attr]);
    });

    // Append animation.
    data.target.appendChild(animation);
    data.target.addState('set-image-animation-ready');
  }
});
