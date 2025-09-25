(function (global) {
  var GameUtils = global.GameUtils || (global.GameUtils = {});

  GameUtils.input = {
    setupKeyboardControls: function (game) {
      var self = game;
      self.keyHandler = function(event) {
        if (self.gameOver || self.gameWon) return;
        var moved = false;
        var attacked = false;

        console.log('Key pressed:', event.key, 'Key code:', event.keyCode, 'Code:', event.code);

        var code = event.code;
        console.log('Code:', code);

        if (code === 'KeyW' || code === 'ArrowUp') {
          moved = self.player.moveUp(self.map, self.enemies, self.items);
          console.log('UP');
        } else if (code === 'KeyA' || code === 'ArrowLeft') {
          moved = self.player.moveLeft(self.map, self.enemies, self.items);
          console.log('LEFT');
        } else if (code === 'KeyS' || code === 'ArrowDown') {
          moved = self.player.moveDown(self.map, self.enemies, self.items);
          console.log('DOWN');
        } else if (code === 'KeyD' || code === 'ArrowRight') {
          moved = self.player.moveRight(self.map, self.enemies, self.items);
          console.log('RIGHT');
        } else if (code === 'Space') {
          attacked = self.player.attack(self.enemies);
          console.log('ATTACK');
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
