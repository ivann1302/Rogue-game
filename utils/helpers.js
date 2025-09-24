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
    enemies.splice(index, 1);
    return enemies;
}

function removeItem(items, index) {
    items.splice(index, 1);
    return items;
}

function applyHealthPotion(player) {
    if (player.health < player.maxHealth) {
        player.health = Math.min(player.health + 25, player.maxHealth);
        return true;
    }
    return false;
}

function applySword(player) {
    player.attackPower += 5;
    return true;
}


function checkAndHandleItem(items, player, x, y) {
    for (var i = 0; i < items.length; i++) {
        if (items[i].x === x && items[i].y === y) {
            if (items[i].type === 'health') {
                applyHealthPotion(player);
            } else if (items[i].type === 'sword') {
                applySword(player);
            }

            removeItem(items, i);
            return true;
        }
    }
    return false;
}

function isRoomConnected(room, grid) {
    for (var x = room.x; x < room.x + room.width; x++) {
        if (room.y > 0 && grid[room.y - 1][x] === 0) {
            return true;
        }
        if (room.y + room.height < grid.length && grid[room.y + room.height][x] === 0) {
            return true;
        }
    }

    for (var y = room.y; y < room.y + room.height; y++) {
        if (room.x > 0 && grid[y][room.x - 1] === 0) {
            return true;
        }
        if (room.x + room.width < grid[0].length && grid[y][room.x + room.width] === 0) {
            return true;
        }
    }

    return false;
}
