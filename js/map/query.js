(function (global) {
  var MapUtils = global.MapUtils || (global.MapUtils = {});

  MapUtils.query = {
    getTile: function (map, x, y) {
      if (x < 0 || x >= map.width || y < 0 || y >= map.height) {
        return 1;
      }
      if (!map.grid || !map.grid[y] || typeof map.grid[y][x] === 'undefined') {
        return 1;
      }
      return map.grid[y][x];
    },
    getRandomEmptyPosition: function (map) {
      var x, y;
      var attempts = 0;
      do {
        x = getRandomInt(0, map.width - 1);
        y = getRandomInt(0, map.height - 1);
        attempts++;
      } while (map.grid[y][x] !== 0);
      return { x: x, y: y };
    }
  };
})(window);
