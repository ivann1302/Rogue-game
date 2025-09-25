(function (global) {
  var EnemyUtils = global.EnemyUtils || (global.EnemyUtils = {});

  EnemyUtils.state = {
    setPosition: function (enemy, x, y) {
      enemy.x = x;
      enemy.y = y;
    }
  };
})(window);
