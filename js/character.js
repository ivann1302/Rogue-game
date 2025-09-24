function Character() {
    this.x = 0;
    this.y = 0;

    this.health = 100;
    this.maxHealth = 100;
    this.attackPower = 10;

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    this.attack = function(enemies) {
        var attacked = false;

        for (var i = 0; i < enemies.length; i++) {
            if ((Math.abs(this.x - enemies[i].x) === 1 && this.y === enemies[i].y) || 
                (Math.abs(this.y - enemies[i].y) === 1 && this.x === enemies[i].x)) {

                if (enemies[i].health > 0) {
                    enemies[i].health -= this.attackPower;
                    attacked = true;

                    if (enemies[i].health <= 0) {
                        removeDefeatedEnemy(enemies, i);
                        i--;
                    }
                }
            }
        }

        return attacked;
    };

    this.moveUp = function(map, enemies, items) {
        var targetTile = map.getTile(this.x, this.y - 1);
        if (targetTile === 0) {
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].x === this.x && enemies[i].y === this.y - 1) {
                    return false;
                }
            }

            // Check if there's an item at the target position
            checkAndHandleItem(items, this, this.x, this.y - 1);

            this.y--;
            return true;
        } else {
            return false;
        }
    };

    this.moveDown = function(map, enemies, items) {
        var targetTile = map.getTile(this.x, this.y + 1);
        if (targetTile === 0) {
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].x === this.x && enemies[i].y === this.y + 1) {
                    return false;
                }
            }

            // Check if there's an item at the target position
            checkAndHandleItem(items, this, this.x, this.y + 1);

            this.y++;
            return true;
        } else {
            return false;
        }
    };

    this.moveLeft = function(map, enemies, items) {
        var targetTile = map.getTile(this.x - 1, this.y);
        if (targetTile === 0) {
            // Check if there's an enemy at the target position
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].x === this.x - 1 && enemies[i].y === this.y) {
                    return false;
                }
            }

            // Check if there's an item at the target position
            checkAndHandleItem(items, this, this.x - 1, this.y);

            this.x--;
            return true;
        } else {
            return false;
        }
    };

    this.moveRight = function(map, enemies, items) {
        var targetTile = map.getTile(this.x + 1, this.y);
        if (targetTile === 0) {
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].x === this.x + 1 && enemies[i].y === this.y) {
                    return false;
                }
            }

            // Check if there's an item at the target position
            checkAndHandleItem(items, this, this.x + 1, this.y);

            this.x++;
            return true;
        } else {
            return false;
        }
    };
}
