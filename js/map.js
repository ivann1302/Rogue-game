function Map() {
    this.width = 40;
    this.height = 24;
    this.grid = [];
    this.rooms = [];


    // Подготовка и создание карты
    this.init = function() {
        this.grid = [];
        for (var y = 0; y < this.height; y++) {
            this.grid[y] = [];
            for (var x = 0; x < this.width; x++) {
                this.grid[y][x] = 1;
            }
        }
        this.generateRooms(); // Вырезает в карте комнаты
        this.createPassages(); // Генерирует коридоры
        this.ensureAccessibility(); // Локально преобразует некоторые стены в пустоту (если много стен)
    };

    // Генерируем комнаты
    this.generateRooms = function() {
        this.rooms = [];
        var numRooms = getRandomInt(5, 10)

        var roomsCreated = 0;
        for (var i = 0; i < numRooms; i++) {
            var roomWidth = getRandomInt(3, 8);
            var roomHeight = getRandomInt(3, 8);
            var roomX = getRandomInt(1, this.width - roomWidth - 1);
            var roomY = getRandomInt(1, this.height - roomHeight - 1);

            // Объект комнаты
            var newRoom = {
                x: roomX,
                y: roomY,
                width: roomWidth,
                height: roomHeight
            };

            // Проверка на пересечение с ранее созданными комнатами
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
            }
        }
    };

    // Создаем коридоры
    this.createPassages = function() {
        var numHorizontalPassages = getRandomInt(3, 5);
        for (var i = 0; i < numHorizontalPassages; i++) {
            var y = getRandomInt(1, this.height - 2);
            var emptyTilesInPassage = 0;
            for (var x = 0; x < this.width; x++) {
                this.grid[y][x] = 0;
                emptyTilesInPassage++;
            }
        }

        var numVerticalPassages = getRandomInt(3, 5);
        for (var i = 0; i < numVerticalPassages; i++) {
            var x = getRandomInt(1, this.width - 2);
            var emptyTilesInPassage = 0;
            for (var y = 0; y < this.height; y++) {
                this.grid[y][x] = 0;
                emptyTilesInPassage++;
            }
        }

        this.connectIsolatedRooms(); // Конект с изолированными комнатами
    };

    // Пробитие маршрута к изолированным комнатам
    this.connectIsolatedRooms = function() {

        var isolatedRoomsCount = 0;

        for (var i = 0; i < this.rooms.length; i++) {
            var room = this.rooms[i];

            if (!isRoomConnected(room, this.grid)) {
                isolatedRoomsCount++;

                if (getRandomInt(0, 1) === 0) {
                    var y = getRandomInt(room.y, room.y + room.height - 1);
                    var emptyTilesInPassage = 0;
                    for (var x = 0; x < this.width; x++) {
                        this.grid[y][x] = 0;
                        emptyTilesInPassage++;
                    }
                } else {
                    var x = getRandomInt(room.x, room.x + room.width - 1);
                    var emptyTilesInPassage = 0;
                    for (var y = 0; y < this.height; y++) {
                        this.grid[y][x] = 0;
                        emptyTilesInPassage++;
                    }
                }
            }
        }

    };

    //  Улучшение доступности комнат
    this.ensureAccessibility = function() {
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
    };

    // Доступ к плитке (тайлу) с защитой от выхода за границы и несформированной плитки
    this.getTile = function(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return 1;
        }

        if (!this.grid || !this.grid[y] || typeof this.grid[y][x] === 'undefined') {
            return 1;
        }

        return this.grid[y][x];
    };

    // Поиск случайной пустой позиции
    this.getRandomEmptyPosition = function() {
        var x, y;
        var attempts = 0;
        do {
            x = getRandomInt(0, this.width - 1);
            y = getRandomInt(0, this.height - 1);
            attempts++;
        } while (this.grid[y][x] !== 0);

        return { x: x, y: y };
    };
}
