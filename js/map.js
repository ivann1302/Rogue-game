function Map() {
    this.width = 40;
    this.height = 24;


    this.grid = [];

    this.rooms = [];

    this.init = function() {
        this.grid = [];
        for (var y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (var x = 0; x < this.width; x++) {
                this.grid[y][x] = 1;
            }
        }

        this.generateRooms();

        this.createPassages();

        this.ensureAccessibility();
    };

    this.generateRooms = function() {
        this.rooms = [];
        var numRooms = getRandomInt(5, 10);

        for (var i = 0; i < numRooms; i++) {
            var roomWidth = getRandomInt(3, 8);
            var roomHeight = getRandomInt(3, 8);
            var roomX = getRandomInt(1, this.width - roomWidth - 1);
            var roomY = getRandomInt(1, this.height - roomHeight - 1);

            var newRoom = {
                x: roomX,
                y: roomY,
                width: roomWidth,
                height: roomHeight
            };

            var overlaps = false;
            for (var j = 0; j < this.rooms.length; j++) {
                if (doRectanglesOverlap(newRoom, this.rooms[j])) {
                    overlaps = true;
                    break;
                }
            }

            if (!overlaps) {
                this.rooms.push(newRoom);


                for (var y = newRoom.y; y < newRoom.y + newRoom.height; y++) {
                    for (var x = newRoom.x; x < newRoom.x + newRoom.width; x++) {
                        this.grid[y][x] = 0;
                    }
                }
            }
        }
    };

    this.createPassages = function() {
        var numHorizontalPassages = getRandomInt(3, 5);
        for (var i = 0; i < numHorizontalPassages; i++) {
            var y = getRandomInt(1, this.height - 2);
            for (var x = 0; x < this.width; x++) {
                this.grid[y][x] = 0; // Empty space
            }
        }

        // Create 3-5 vertical passages
        var numVerticalPassages = getRandomInt(3, 5);
        for (var i = 0; i < numVerticalPassages; i++) {
            var x = getRandomInt(1, this.width - 2);
            for (var y = 0; y < this.height; y++) {
                this.grid[y][x] = 0;
            }
        }
    };

    this.ensureAccessibility = function() {
        for (var y = 1; y < this.height - 1; y++) {
            for (var x = 1; x < this.width - 1; x++) {
                if (this.grid[y][x] === 1) {
                    var emptyNeighbors = 0;

                    for (var dy = -1; dy <= 1; dy++) {
                        for (var dx = -1; dx <= 1; dx++) {
                            if (dx === 0 && dy === 0) continue;

                            if (this.grid[y + dy][x + dx] === 0) {
                                emptyNeighbors++;
                            }
                        }
                    }

                    if (emptyNeighbors >= 5) {
                        this.grid[y][x] = 0;
                    }
                }
            }
        }
    };

    this.getTile = function(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return 1;
        }
        return this.grid[y][x];
    };
}
