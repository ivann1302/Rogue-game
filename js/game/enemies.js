(function (global) {
  var GameUtils = global.GameUtils || (global.GameUtils = {});

  GameUtils.enemies = {
    checkImmediateEnemyAttack: function (game) {
      for (var i = 0; i < game.enemies.length; i++) {
        var e = game.enemies[i];
        var adjacent = (Math.abs(game.player.x - e.x) === 1 && game.player.y === e.y) ||
                       (Math.abs(game.player.y - e.y) === 1 && game.player.x === e.x);
        if (adjacent) {
          if (!e.wasInRange) {
            if (e.health > 0 && game.player.health > 0) {
              game.player.health -= e.attackPower;
              if (game.player.health < 0) game.player.health = 0;
            }
            e.wasInRange = true;
          }
        } else {
          e.wasInRange = false;
        }
      }
    },
    enemiesAttack: function (game) {
      for (var i = 0; i < game.enemies.length; i++) {
        var e = game.enemies[i];
        if ((Math.abs(game.player.x - e.x) === 1 && game.player.y === e.y) || (Math.abs(game.player.y - e.y) === 1 && game.player.x === e.x)) {
          if (e.health > 0 && game.player.health > 0) {
            game.player.health -= e.attackPower;
            if (game.player.health < 0) game.player.health = 0;
          }
        }
      }
    },
    enemiesRandomMove: function (game) {
      for (var i = 0; i < game.enemies.length; i++) {
        var e = game.enemies[i];
        if (e.health <= 0) continue;
        var adjacentToPlayer = (Math.abs(game.player.x - e.x) === 1 && game.player.y === e.y) || (Math.abs(game.player.y - e.y) === 1 && game.player.x === e.x);
        if (adjacentToPlayer) continue;
        var dirs = [
          {dx: 0, dy: -1},
          {dx: 0, dy: 1},
          {dx: -1, dy: 0},
          {dx: 1, dy: 0}
        ];
        var tried = 0;
        while (tried < 4) {
          var idx = getRandomInt(0, dirs.length - 1);
          var nx = e.x + dirs[idx].dx;
          var ny = e.y + dirs[idx].dy;
          var tile = game.map.getTile(nx, ny);
          var blocked = tile !== 0;
          if (!blocked) {
            if (game.player.x === nx && game.player.y === ny) {
              blocked = true;
            } else {
              for (var j = 0; j < game.enemies.length; j++) {
                if (j !== i && game.enemies[j].x === nx && game.enemies[j].y === ny) { blocked = true; break; }
              }
            }
          }
          if (!blocked) {
            e.x = nx;
            e.y = ny;
            break;
          }
          tried++;
        }
      }
    }
  };
})(window);
