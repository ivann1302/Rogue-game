function Game() {
    this.map = null;
    this.player = null;
    this.enemies = [];
    this.items = [];

    this.init = function() {
        this.map = new Map();
        this.map.init();
        document.querySelector('.field').focus();

        this.player = new Character();

        this.placePlayerAtRandomPosition();

        this.placeEnemiesAtRandomPositions(10);

        this.placeItemsAtRandomPositions(2, 10);

        this.setupKeyboardControls();

        this.checkImmediateEnemyAttack();

        this.render();

        var self = this;
        this.enemyAttackTimer = setInterval(function() {
            self.enemiesAttack();
            self.render();
        }, 2000);

        this.enemyMoveTimer = setInterval(function() {
            self.enemiesRandomMove();
            self.render();
        }, 1000);
    };

    // Движение игрока
    this.setupKeyboardControls = function() {
        var self = this;
        document.addEventListener('keydown', function(event) {
            var moved = false;
            var attacked = false;

            console.log('Key pressed:', event.key, 'Key code:', event.keyCode, 'Code:', event.code);

            // Use event.code for more consistent behavior across browsers and keyboard layouts
            var code = event.code;
            console.log('Code:', code);

            // Handle movement based on key pressed
            if (code === 'KeyW' || code === 'ArrowUp') {
                moved = self.player.moveUp(self.map, self.enemies, self.items);
                console.log('UP');
            } else if (code === 'KeyA' || code === 'ArrowLeft') {
                moved = self.player.moveLeft(self.map, self.enemies, self.items);
                console.log('LEFT');
            } else if (code === 'KeyS' || code === 'ArrowDown') {
                moved = self.player.moveDown(self.map, self.enemies, self.items);
                console.log('DOWN');
            } else if (code === 'KeyD' || code === 'ArrowRight') {
                moved = self.player.moveRight(self.map, self.enemies, self.items);
                console.log('RIGHT');
            } else if (code === 'Space') { // Spacebar
                attacked = self.player.attack(self.enemies);
                console.log('ATTACK');
            }

            if (moved) {
                // Trigger immediate enemy attack when entering adjacency
                self.checkImmediateEnemyAttack();
            }

            if (moved || attacked) {
                self.render();
            }
        });
    };

    // One-time immediate enemy attack upon entering adjacency; periodic attacks handled by enemiesAttack timer
    this.checkImmediateEnemyAttack = function() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i];
            var adjacent = (Math.abs(this.player.x - e.x) === 1 && this.player.y === e.y) ||
                           (Math.abs(this.player.y - e.y) === 1 && this.player.x === e.x);

            if (adjacent) {
                if (!e.wasInRange) {
                    if (e.health > 0 && this.player.health > 0) {
                        this.player.health -= e.attackPower;
                        if (this.player.health < 0) this.player.health = 0;
                    }
                    e.wasInRange = true;
                }
            } else {
                // Reset flag when leaving adjacency to allow future immediate attack on re-entry
                e.wasInRange = false;
            }
        }
    };

    // Размещение игрока в случайном месте
    this.placePlayerAtRandomPosition = function() {
        var position = this.map.getRandomEmptyPosition();
        console.log("Placing player at position:", position.x, position.y, "with tile value:", this.map.getTile(position.x, position.y));
        this.player.setPosition(position.x, position.y);
    };

    // Размещение врагов в случайном месте
    this.placeEnemiesAtRandomPositions = function(count) {
        // Clear existing enemies
        this.enemies = [];

        for (var i = 0; i < count; i++) {
            var enemy = new Enemy();
            var position;
            var isValidPosition = false;

            while (!isValidPosition) {
                position = this.map.getRandomEmptyPosition();

                if (this.player && position.x === this.player.x && position.y === this.player.y) {
                    continue;
                }

                var overlapsWithEnemy = false;
                for (var j = 0; j < this.enemies.length; j++) {
                    if (position.x === this.enemies[j].x && position.y === this.enemies[j].y) {
                        overlapsWithEnemy = true;
                        break;
                    }
                }

                if (!overlapsWithEnemy) {
                    isValidPosition = true;
                }
            }

            // Set enemy position and add to enemies array
            enemy.setPosition(position.x, position.y);
            this.enemies.push(enemy);
        }
    };

    /**
     * Place items at random empty positions
     * @param {number} swordCount - Number of swords to place
     * @param {number} healthCount - Number of health potions to place
     */
    this.placeItemsAtRandomPositions = function(swordCount, healthCount) {
        // Clear existing items
        this.items = [];

        // Create and place swords
        for (var i = 0; i < swordCount; i++) {
            var sword = new Item('sword');
            this.placeItemAtRandomPosition(sword);
        }

        // Create and place health potions
        for (var i = 0; i < healthCount; i++) {
            var health = new Item('health');
            this.placeItemAtRandomPosition(health);
        }
    };

    /**
     * Place a single item at a random empty position
     * @param {Item} item - The item to place
     */
    this.placeItemAtRandomPosition = function(item) {
        var position;
        var isValidPosition = false;

        while (!isValidPosition) {
            position = this.map.getRandomEmptyPosition();

            if (this.player && position.x === this.player.x && position.y === this.player.y) {
                continue;
            }

            var overlapsWithEnemy = false;
            for (var i = 0; i < this.enemies.length; i++) {
                if (position.x === this.enemies[i].x && position.y === this.enemies[i].y) {
                    overlapsWithEnemy = true;
                    break;
                }
            }

            if (overlapsWithEnemy) {
                continue;
            }

            var overlapsWithItem = false;
            for (var i = 0; i < this.items.length; i++) {
                if (position.x === this.items[i].x && position.y === this.items[i].y) {
                    overlapsWithItem = true;
                    break;
                }
            }

            if (!overlapsWithItem) {
                isValidPosition = true;
            }
        }

        item.setPosition(position.x, position.y);
        this.items.push(item);
    };

    this.enemiesAttack = function() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i];
            if ((Math.abs(this.player.x - e.x) === 1 && this.player.y === e.y) || (Math.abs(this.player.y - e.y) === 1 && this.player.x === e.x)) {
                if (e.health > 0 && this.player.health > 0) {
                    this.player.health -= e.attackPower;
                    if (this.player.health < 0) this.player.health = 0;
                }
            }
        }
    };

    this.enemiesRandomMove = function() {
        for (var i = 0; i < this.enemies.length; i++) {
            var e = this.enemies[i];
            if (e.health <= 0) continue;

            var adjacentToPlayer = (Math.abs(this.player.x - e.x) === 1 && this.player.y === e.y) || (Math.abs(this.player.y - e.y) === 1 && this.player.x === e.x);
            if (adjacentToPlayer) continue;

            var dirs = [
                {dx: 0, dy: -1},
                {dx: 0, dy: 1},
                {dx: -1, dy: 0},
                {dx: 1, dy: 0}
            ];
            var tried = 0;
            while (tried < 4) {
                var idx = getRandomInt(0, dirs.length - 1);
                var nx = e.x + dirs[idx].dx;
                var ny = e.y + dirs[idx].dy;
                var tile = this.map.getTile(nx, ny);
                var blocked = tile !== 0;
                if (!blocked) {
                    if (this.player.x === nx && this.player.y === ny) {
                        blocked = true;
                    } else {
                        for (var j = 0; j < this.enemies.length; j++) {
                            if (j !== i && this.enemies[j].x === nx && this.enemies[j].y === ny) { blocked = true; break; }
                        }
                    }
                }
                if (!blocked) {
                    e.x = nx;
                    e.y = ny;
                    break;
                }
                tried++;
            }
        }
    };

    this.render = function() {
        // Get the field element
        var field = document.querySelector('.field');
        var fieldBox = document.querySelector('.field-box');

        // Calculate the maximum available width and height
        var maxWidth = window.innerWidth - 40; // Subtract some padding
        var maxHeight = window.innerHeight - 100; // Subtract space for header and margins

        // Calculate the tile size to fit the map within the available space
        var tileWidth = Math.floor(maxWidth / this.map.width);
        var tileHeight = Math.floor(maxHeight / this.map.height);
        var tileSize = Math.min(tileWidth, tileHeight); // Use the smaller dimension to maintain square tiles

        // Update the field dimensions
        var mapWidth = this.map.width * tileSize;
        var mapHeight = this.map.height * tileSize;
        field.style.width = mapWidth + 'px';
        field.style.height = mapHeight + 'px';

        // Clear the field
        field.innerHTML = '';

        // Render the map
        for (var y = 0; y < this.map.height; y++) {
            for (var x = 0; x < this.map.width; x++) {
                var tile = document.createElement('div');
                tile.className = 'tile';

                // Set tile size
                tile.style.width = tileSize + 'px';
                tile.style.height = tileSize + 'px';

                // Position the tile
                tile.style.left = (x * tileSize) + 'px';
                tile.style.top = (y * tileSize) + 'px';

                // Set the tile type
                if (this.map.getTile(x, y) === 1) {
                    tile.classList.add('tileW'); // Wall
                }

                // Check if the player is on this tile and alive
                if (this.player && isAlive(this.player) && this.player.x === x && this.player.y === y) {
                    tile.classList.add('tileP'); // Player

                    // Add health bar
                    var healthBar = document.createElement('div');
                    healthBar.className = 'health';
                    healthBar.style.width = (this.player.health / this.player.maxHealth * 90) + '%';
                    tile.appendChild(healthBar);
                }

                // Check if an enemy is on this tile
                for (var i = 0; i < this.enemies.length; i++) {
                    if (this.enemies[i].x === x && this.enemies[i].y === y) {
                        tile.classList.add('tileE'); // Enemy

                        // Add health bar
                        var healthBar = document.createElement('div');
                        healthBar.className = 'health';
                        healthBar.style.width = (this.enemies[i].health / this.enemies[i].maxHealth * 90) + '%';
                        tile.appendChild(healthBar);
                        break;
                    }
                }

                // Check if an item is on this tile
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].x === x && this.items[i].y === y) {
                        if (this.items[i].type === 'sword') {
                            tile.classList.add('tileSW'); // Sword
                        } else if (this.items[i].type === 'health') {
                            tile.classList.add('tileHP'); // Health potion
                        }
                        break;
                    }
                }

                // Add the tile to the field
                field.appendChild(tile);
            }
        }
    };
}
