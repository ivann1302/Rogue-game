(function (global) {
  var MapUtils = global.MapUtils || (global.MapUtils = {});

  MapUtils.passages = {
    createPassages: function (map) {
      var numHorizontalPassages = getRandomInt(3, 5);
      for (var i = 0; i < numHorizontalPassages; i++) {
        var y = getRandomInt(1, map.height - 2);
        var emptyTilesInPassage = 0;
        for (var x = 0; x < map.width; x++) {
          map.grid[y][x] = 0;
          emptyTilesInPassage++;
        }
      }
      var numVerticalPassages = getRandomInt(3, 5);
      for (var j = 0; j < numVerticalPassages; j++) {
        var vx = getRandomInt(1, map.width - 2);
        var emptyTilesInPassage2 = 0;
        for (var y2 = 0; y2 < map.height; y2++) {
          map.grid[y2][vx] = 0;
          emptyTilesInPassage2++;
        }
      }
      if (typeof MapUtils.passages.connectIsolatedRooms === 'function') {
        MapUtils.passages.connectIsolatedRooms(map);
      }
    },
    connectIsolatedRooms: function (map) {
      var isolatedRoomsCount = 0;
      for (var i = 0; i < map.rooms.length; i++) {
        var room = map.rooms[i];
        if (!isRoomConnected(room, map.grid)) {
          isolatedRoomsCount++;
          if (getRandomInt(0, 1) === 0) {
            var y = getRandomInt(room.y, room.y + room.height - 1);
            var emptyTilesInPassage = 0;
            for (var x = 0; x < map.width; x++) {
              map.grid[y][x] = 0;
              emptyTilesInPassage++;
            }
          } else {
            var x2 = getRandomInt(room.x, room.x + room.width - 1);
            var emptyTilesInPassage3 = 0;
            for (var y3 = 0; y3 < map.height; y3++) {
              map.grid[y3][x2] = 0;
              emptyTilesInPassage3++;
            }
          }
        }
      }
    }
  };
})(window);
