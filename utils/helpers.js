function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function doRectanglesOverlap(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function removeDefeatedEnemy(enemies, index) {
    // Remove the enemy at the specified index
    enemies.splice(index, 1);
    return enemies;
}

function isRoomConnected(room, grid) {
    // Check if a room has at least one passage connected to it
    // Check the perimeter of the room

    // Check top and bottom edges
    for (var x = room.x; x < room.x + room.width; x++) {
        // Top edge
        if (room.y > 0 && grid[room.y - 1][x] === 0) {
            return true;
        }
        // Bottom edge
        if (room.y + room.height < grid.length && grid[room.y + room.height][x] === 0) {
            return true;
        }
    }

    // Check left and right edges
    for (var y = room.y; y < room.y + room.height; y++) {
        // Left edge
        if (room.x > 0 && grid[y][room.x - 1] === 0) {
            return true;
        }
        // Right edge
        if (room.x + room.width < grid[0].length && grid[y][room.x + room.width] === 0) {
            return true;
        }
    }

    return false;
}
