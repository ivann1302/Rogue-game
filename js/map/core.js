(function (global) {
  var MapUtils = global.MapUtils || (global.MapUtils = {});

  MapUtils.core = {
    init: function (map) {
      map.grid = [];
      for (var y = 0; y < map.height; y++) {
        map.grid[y] = [];
        for (var x = 0; x < map.width; x++) {
          map.grid[y][x] = 1;
        }
      }
      if (MapUtils.generation && typeof MapUtils.generation.generateRooms === 'function') {
        MapUtils.generation.generateRooms(map);
      }
      if (MapUtils.passages && typeof MapUtils.passages.createPassages === 'function') {
        MapUtils.passages.createPassages(map);
      }
      if (MapUtils.accessibility && typeof MapUtils.accessibility.ensureAccessibility === 'function') {
        MapUtils.accessibility.ensureAccessibility(map);
      }
    }
  };
})(window);
