function Map() {
    this.width = 40;
    this.height = 24;


    this.grid = [];

    this.rooms = [];

    this.init = function() {
        console.log("Initializing map with dimensions", this.width, "x", this.height);

        // Initialize grid with all walls
        this.grid = [];
        for (var y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (var x = 0; x < this.width; x++) {
                this.grid[y][x] = 1; // 1 represents a wall
            }
        }

        // Generate rooms (sets grid cells to 0 for empty spaces)
        this.generateRooms();

        // Create passages (sets grid cells to 0 for empty spaces)
        this.createPassages();

        // Ensure accessibility (may convert some walls to empty spaces)
        this.ensureAccessibility();

        // Ensure there are at least some empty tiles
        var emptyTiles = 0;
        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                if (this.grid[y][x] === 0) {
                    emptyTiles++;
                }
            }
        }

        // If there are very few empty tiles, create some more
        if (emptyTiles < 100) {
            console.warn("Not enough empty tiles, creating more...");
            // Create a few more passages
            for (var i = 0; i < 3; i++) {
                var y = getRandomInt(1, this.height - 2);
                for (var x = 0; x < this.width; x++) {
                    this.grid[y][x] = 0;
                }
            }

            // Count again
            emptyTiles = 0;
            for (var y = 0; y < this.height; y++) {
                for (var x = 0; x < this.width; x++) {
                    if (this.grid[y][x] === 0) {
                        emptyTiles++;
                    }
                }
            }
        }

        console.log("Map initialized with", emptyTiles, "empty tiles out of", this.width * this.height);
    };

    this.generateRooms = function() {
        this.rooms = [];
        var numRooms = getRandomInt(5, 10);
        console.log("Generating", numRooms, "rooms");

        var roomsCreated = 0;
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
                roomsCreated++;

                var emptyTilesInRoom = 0;
                for (var y = newRoom.y; y < newRoom.y + newRoom.height; y++) {
                    for (var x = newRoom.x; x < newRoom.x + newRoom.width; x++) {
                        this.grid[y][x] = 0;
                        emptyTilesInRoom++;
                    }
                }
                console.log("Room", roomsCreated, "created with", emptyTilesInRoom, "empty tiles");
            }
        }
        console.log("Created", roomsCreated, "rooms out of", numRooms, "attempts");
    };

    this.createPassages = function() {
        // Create random horizontal passages
        var numHorizontalPassages = getRandomInt(3, 5);
        console.log("Creating", numHorizontalPassages, "horizontal passages");
        for (var i = 0; i < numHorizontalPassages; i++) {
            var y = getRandomInt(1, this.height - 2);
            var emptyTilesInPassage = 0;
            for (var x = 0; x < this.width; x++) {
                this.grid[y][x] = 0;
                emptyTilesInPassage++;
            }
            console.log("Horizontal passage", i + 1, "created at y =", y, "with", emptyTilesInPassage, "empty tiles");
        }

        // Create random vertical passages
        var numVerticalPassages = getRandomInt(3, 5);
        console.log("Creating", numVerticalPassages, "vertical passages");
        for (var i = 0; i < numVerticalPassages; i++) {
            var x = getRandomInt(1, this.width - 2);
            var emptyTilesInPassage = 0;
            for (var y = 0; y < this.height; y++) {
                this.grid[y][x] = 0;
                emptyTilesInPassage++;
            }
            console.log("Vertical passage", i + 1, "created at x =", x, "with", emptyTilesInPassage, "empty tiles");
        }

        // Ensure each room is connected to at least one passage
        this.connectIsolatedRooms();
    };

    this.connectIsolatedRooms = function() {
        // Check each room to see if it's connected to a passage
        console.log("Checking for isolated rooms...");
        var isolatedRoomsCount = 0;

        for (var i = 0; i < this.rooms.length; i++) {
            var room = this.rooms[i];

            // If the room is not connected, create a passage to connect it
            if (!isRoomConnected(room, this.grid)) {
                isolatedRoomsCount++;
                console.log("Room", i + 1, "is isolated, connecting it...");

                // Decide randomly whether to create a horizontal or vertical passage
                if (getRandomInt(0, 1) === 0) {
                    // Create horizontal passage
                    var y = getRandomInt(room.y, room.y + room.height - 1);
                    var emptyTilesInPassage = 0;
                    for (var x = 0; x < this.width; x++) {
                        this.grid[y][x] = 0;
                        emptyTilesInPassage++;
                    }
                    console.log("Created horizontal passage at y =", y, "with", emptyTilesInPassage, "empty tiles");
                } else {
                    // Create vertical passage
                    var x = getRandomInt(room.x, room.x + room.width - 1);
                    var emptyTilesInPassage = 0;
                    for (var y = 0; y < this.height; y++) {
                        this.grid[y][x] = 0;
                        emptyTilesInPassage++;
                    }
                    console.log("Created vertical passage at x =", x, "with", emptyTilesInPassage, "empty tiles");
                }
            }
        }

        console.log("Connected", isolatedRoomsCount, "isolated rooms");
    };

    this.ensureAccessibility = function() {
        console.log("Ensuring accessibility...");
        var tilesConverted = 0;

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
                        tilesConverted++;
                    }
                }
            }
        }

        console.log("Converted", tilesConverted, "wall tiles to empty tiles for better accessibility");
    };

    this.getTile = function(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return 1; // Out of bounds is a wall
        }

        // Ensure the grid is properly initialized
        if (!this.grid || !this.grid[y] || typeof this.grid[y][x] === 'undefined') {
            console.error("Grid not properly initialized at", x, y);
            return 1; // Treat as wall if not initialized
        }

        console.log("getTile: grid[" + y + "][" + x + "] =", this.grid[y][x]);
        return this.grid[y][x];
    };

    this.getRandomEmptyPosition = function() {
        var x, y;
        var attempts = 0;
        do {
            x = getRandomInt(0, this.width - 1);
            y = getRandomInt(0, this.height - 1);
            attempts++;
            if (attempts > 1000) {
                console.error("Failed to find an empty position after 1000 attempts!");
                // Force an empty position by setting a random tile to 0
                x = getRandomInt(0, this.width - 1);
                y = getRandomInt(0, this.height - 1);
                this.grid[y][x] = 0;
                break;
            }
        } while (this.grid[y][x] !== 0);

        console.log("Found empty position at", x, y, "after", attempts, "attempts");
        return { x: x, y: y };
    };
}
