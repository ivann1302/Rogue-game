(function (global) {
  var GameUtils = global.GameUtils || (global.GameUtils = {});

  GameUtils.input = {
    setupKeyboardControls: function (game) {
      var self = game;
      self.keyHandler = function(event) {
        if (self.gameOver || self.gameWon) return;
        var moved = false;
        var attacked = false;


        var code = event.code;

        if (code === 'KeyW' || code === 'ArrowUp') {
          moved = self.player.moveUp(self.map, self.enemies, self.items);
        } else if (code === 'KeyA' || code === 'ArrowLeft') {
          moved = self.player.moveLeft(self.map, self.enemies, self.items);
        } else if (code === 'KeyS' || code === 'ArrowDown') {
          moved = self.player.moveDown(self.map, self.enemies, self.items);
        } else if (code === 'KeyD' || code === 'ArrowRight') {
          moved = self.player.moveRight(self.map, self.enemies, self.items);
        } else if (code === 'Space') {
          attacked = self.player.attack(self.enemies);
        }

        if (moved) {
          self.checkImmediateEnemyAttack();
        }

        if (moved || attacked) {
          self.render();
        }
      };
      document.addEventListener('keydown', self.keyHandler);
    }
  };
})(window);
