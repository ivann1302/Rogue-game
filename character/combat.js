(function (global) {
  var CharacterUtils = global.CharacterUtils || (global.CharacterUtils = {});

  CharacterUtils.combat = {
    attack: function (character, enemies) {
      var attacked = false;
      for (var i = 0; i < enemies.length; i++) {
        var adjacent = (Math.abs(character.x - enemies[i].x) === 1 && character.y === enemies[i].y) ||
                       (Math.abs(character.y - enemies[i].y) === 1 && character.x === enemies[i].x);
        if (adjacent) {
          if (enemies[i].health > 0) {
            enemies[i].health -= character.attackPower;
            attacked = true;
            if (enemies[i].health <= 0 && typeof removeDefeatedEnemy === 'function') {
              removeDefeatedEnemy(enemies, i);
              i--; // stay at same index after removal
            }
          }
        }
      }
      return attacked;
    }
  };
})(window);
