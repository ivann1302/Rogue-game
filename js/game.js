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

        this.render();
    };

    // Движение игрока
    this.setupKeyboardControls = function() {
        var self = this;
        document.addEventListener('keydown', function(event) {
            var moved = false;
            var attacked = false;

            console.log('Key pressed:', event.key, 'Key code:', event.keyCode);

            // Get the key in lowercase for consistent comparison
            var key = event.key.toLowerCase();
            console.log('Lowercase key:', key);

            // Handle movement based on key pressed
            if (key === 'w' || key === 'arrowup') {
                moved = self.player.moveUp(self.map, self.enemies);
                console.log('UP');
            } else if (key === 'a' || key === 'arrowleft') {
                moved = self.player.moveLeft(self.map, self.enemies);
                console.log('LEFT');
            } else if (key === 's' || key === 'arrowdown') {
                moved = self.player.moveDown(self.map, self.enemies);
                console.log('DOWN');
            } else if (key === 'd' || key === 'arrowright') {
                moved = self.player.moveRight(self.map, self.enemies);
                console.log('RIGHT');
            } else if (key === ' ') { // Spacebar
                attacked = self.player.attack(self.enemies);
                console.log('ATTACK');
            }

            if (moved || attacked) {
                self.render();
            }
        });
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

        // Find a valid position that doesn't overlap with the player, enemies, or other items
        while (!isValidPosition) {
            position = this.map.getRandomEmptyPosition();

            // Check if position overlaps with player
            if (this.player && position.x === this.player.x && position.y === this.player.y) {
                continue;
            }

            // Check if position overlaps with enemies
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

            // Check if position overlaps with other items
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

        // Set item position and add to items array
        item.setPosition(position.x, position.y);
        this.items.push(item);
    };

    /**
     * Render the game
     */
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

                // Check if the player is on this tile
                if (this.player && this.player.x === x && this.player.y === y) {
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
