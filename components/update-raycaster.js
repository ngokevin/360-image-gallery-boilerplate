/* global AFRAME */
AFRAME.registerComponent('update-raycaster', {
  schema: {type: 'selector'},

  init: function () {
    this.data.components.raycaster.refreshObjects();
  }
});
