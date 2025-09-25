(function (global) {
  var MapUtils = global.MapUtils || (global.MapUtils = {});

  MapUtils.generation = {
    generateRooms: function (map) {
      map.rooms = [];
      var numRooms = getRandomInt(5, 10);
      var roomsCreated = 0;
      for (var i = 0; i < numRooms; i++) {
        var roomWidth = getRandomInt(3, 8);
        var roomHeight = getRandomInt(3, 8);
        var roomX = getRandomInt(1, map.width - roomWidth - 1);
        var roomY = getRandomInt(1, map.height - roomHeight - 1);
        var newRoom = { x: roomX, y: roomY, width: roomWidth, height: roomHeight };
        var overlaps = false;
        for (var j = 0; j < map.rooms.length; j++) {
          if (doRectanglesOverlap(newRoom, map.rooms[j])) { overlaps = true; break; }
        }
        if (!overlaps) {
          map.rooms.push(newRoom);
          roomsCreated++;
          var emptyTilesInRoom = 0;
          for (var y = newRoom.y; y < newRoom.y + newRoom.height; y++) {
            for (var x = newRoom.x; x < newRoom.x + newRoom.width; x++) {
              map.grid[y][x] = 0;
              emptyTilesInRoom++;
            }
          }
        }
      }
    }
  };
})(window);
