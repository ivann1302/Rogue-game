(function (global) {
  var GameUtils = global.GameUtils || (global.GameUtils = {});

  function isOverlappingWithEnemies(game, x, y) {
    for (var j = 0; j < game.enemies.length; j++) {
      if (x === game.enemies[j].x && y === game.enemies[j].y) return true;
    }
    return false;
  }

  function isOverlappingWithItems(game, x, y) {
    for (var i = 0; i < game.items.length; i++) {
      if (x === game.items[i].x && y === game.items[i].y) return true;
    }
    return false;
  }

  GameUtils.placement = {
    placePlayerAtRandomPosition: function (game) {
      var position = game.map.getRandomEmptyPosition();
      game.player.setPosition(position.x, position.y);
    },
    placeEnemiesAtRandomPositions: function (game, count) {
      game.enemies = [];
      for (var i = 0; i < count; i++) {
        var enemy = new Enemy();
        var position;
        var isValidPosition = false;
        while (!isValidPosition) {
          position = game.map.getRandomEmptyPosition();
          if (game.player && position.x === game.player.x && position.y === game.player.y) {
            continue;
          }
          var overlapsWithEnemy = false;
          for (var j = 0; j < game.enemies.length; j++) {
            if (position.x === game.enemies[j].x && position.y === game.enemies[j].y) {
              overlapsWithEnemy = true;
              break;
            }
          }
          if (!overlapsWithEnemy) {
            isValidPosition = true;
          }
        }
        enemy.setPosition(position.x, position.y);
        game.enemies.push(enemy);
      }
    },
    placeItemsAtRandomPositions: function (game, swordCount, healthCount) {
      game.items = [];
      for (var i = 0; i < swordCount; i++) {
        var sword = new Item('sword');
        GameUtils.placement.placeItemAtRandomPosition(game, sword);
      }
      for (var h = 0; h < healthCount; h++) {
        var health = new Item('health');
        GameUtils.placement.placeItemAtRandomPosition(game, health);
      }
    },
    placeItemAtRandomPosition: function (game, item) {
      var position;
      var isValidPosition = false;
      while (!isValidPosition) {
        position = game.map.getRandomEmptyPosition();
        if (game.player && position.x === game.player.x && position.y === game.player.y) {
          continue;
        }
        if (isOverlappingWithEnemies(game, position.x, position.y)) {
          continue;
        }
        if (!isOverlappingWithItems(game, position.x, position.y)) {
          isValidPosition = true;
        }
      }
      item.setPosition(position.x, position.y);
      game.items.push(item);
    }
  };
})(window);
