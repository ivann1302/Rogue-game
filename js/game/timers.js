(function (global) {
  var GameUtils = global.GameUtils || (global.GameUtils = {});

  GameUtils.timers = {
    stopTimers: function (game) {
      if (game.enemyAttackTimer) { clearInterval(game.enemyAttackTimer); game.enemyAttackTimer = null; }
      if (game.enemyMoveTimer) { clearInterval(game.enemyMoveTimer); game.enemyMoveTimer = null; }
    }
  };
})(window);
