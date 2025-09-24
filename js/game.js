/**
 * Main game logic
 */

/**
 * Game constructor
 * Main controller for the game
 */
function Game() {
    // Game properties
    this.map = null;
    this.player = null;
    this.enemies = [];
    this.items = [];

    /**
     * Initialize the game
     */
    this.init = function() {
        // Create and initialize the map
        this.map = new Map();
        this.map.init();

        // Render the map
        this.render();
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

                // Add the tile to the field
                field.appendChild(tile);
            }
        }
    };
}
