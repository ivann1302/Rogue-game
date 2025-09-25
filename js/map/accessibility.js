(function (global) {
  var MapUtils = global.MapUtils || (global.MapUtils = {});

  MapUtils.accessibility = {
    ensureAccessibility: function (map) {
      var tilesConverted = 0;
      for (var y = 1; y < map.height - 1; y++) {
        for (var x = 1; x < map.width - 1; x++) {
          if (map.grid[y][x] === 1) {
            var emptyNeighbors = 0;
            for (var dy = -1; dy <= 1; dy++) {
              for (var dx = -1; dx <= 1; dx++) {
                if (dx === 0 && dy === 0) continue;
                if (map.grid[y + dy][x + dx] === 0) {
                  emptyNeighbors++;
                }
              }
            }
            if (emptyNeighbors >= 5) {
              map.grid[y][x] = 0;
              tilesConverted++;
            }
          }
        }
      }
    }
  };
})(window);
