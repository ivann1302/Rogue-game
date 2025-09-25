(function (global) {
  var CharacterUtils = global.CharacterUtils || (global.CharacterUtils = {});

  function isEnemyAt(enemies, x, y) {
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].x === x && enemies[i].y === y) return true;
    }
    return false;
  }

  function tryMove(character, map, enemies, items, nx, ny) {
    if (nx < 0 && map.getTile(0, character.y) === 0 && map.getTile(map.width - 1, character.y) === 0) {
      nx = map.width - 1;
    } else if (nx >= map.width && map.getTile(map.width - 1, character.y) === 0 && map.getTile(0, character.y) === 0) {
      nx = 0;
    }
    if (ny < 0 && map.getTile(character.x, 0) === 0 && map.getTile(character.x, map.height - 1) === 0) {
      ny = map.height - 1;
    } else if (ny >= map.height && map.getTile(character.x, map.height - 1) === 0 && map.getTile(character.x, 0) === 0) {
      ny = 0;
    }

    var targetTile = map.getTile(nx, ny);
    if (targetTile !== 0) return false;
    if (isEnemyAt(enemies, nx, ny)) return false;

    if (typeof checkAndHandleItem === 'function') {
      checkAndHandleItem(items, character, nx, ny);
    }

    character.x = nx;
    character.y = ny;
    return true;
  }

  CharacterUtils.movement = {
    moveUp: function (character, map, enemies, items) {
      return tryMove(character, map, enemies, items, character.x, character.y - 1);
    },
    moveDown: function (character, map, enemies, items) {
      return tryMove(character, map, enemies, items, character.x, character.y + 1);
    },
    moveLeft: function (character, map, enemies, items) {
      return tryMove(character, map, enemies, items, character.x - 1, character.y);
    },
    moveRight: function (character, map, enemies, items) {
      return tryMove(character, map, enemies, items, character.x + 1, character.y);
    }
  };
})(window);
