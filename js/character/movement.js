(function (global) {
  var CharacterUtils = global.CharacterUtils || (global.CharacterUtils = {});

  function isEnemyAt(enemies, x, y) {
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].x === x && enemies[i].y === y) return true;
    }
    return false;
  }

  function tryMove(character, map, enemies, items, nx, ny) {
    var targetTile = map.getTile(nx, ny);
    if (targetTile !== 0) return false; // blocked by wall
    if (isEnemyAt(enemies, nx, ny)) return false; // blocked by enemy

    // pick up item if any
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
