function Character() {
    this.x = 0;
    this.y = 0;

    this.health = 100;
    this.maxHealth = 100;
    this.attackPower = 10;

    this.setPosition = function(x, y) {
        if (window.CharacterUtils && CharacterUtils.state && CharacterUtils.state.setPosition) {
            CharacterUtils.state.setPosition(this, x, y);
        } else {
            this.x = x;
            this.y = y;
        }
    };

    this.attack = function(enemies) {
        if (window.CharacterUtils && CharacterUtils.combat && CharacterUtils.combat.attack) {
            return CharacterUtils.combat.attack(this, enemies);
        }
        // Fallback (should not happen if scripts loaded): inline simple attack
        var attacked = false;
        for (var i = 0; i < enemies.length; i++) {
            var adjacent = (Math.abs(this.x - enemies[i].x) === 1 && this.y === enemies[i].y) ||
                           (Math.abs(this.y - enemies[i].y) === 1 && this.x === enemies[i].x);
            if (adjacent) {
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
        if (window.CharacterUtils && CharacterUtils.movement && CharacterUtils.movement.moveUp) {
            return CharacterUtils.movement.moveUp(this, map, enemies, items);
        }
        return false;
    };

    this.moveDown = function(map, enemies, items) {
        if (window.CharacterUtils && CharacterUtils.movement && CharacterUtils.movement.moveDown) {
            return CharacterUtils.movement.moveDown(this, map, enemies, items);
        }
        return false;
    };

    this.moveLeft = function(map, enemies, items) {
        if (window.CharacterUtils && CharacterUtils.movement && CharacterUtils.movement.moveLeft) {
            return CharacterUtils.movement.moveLeft(this, map, enemies, items);
        }
        return false;
    };

    this.moveRight = function(map, enemies, items) {
        if (window.CharacterUtils && CharacterUtils.movement && CharacterUtils.movement.moveRight) {
            return CharacterUtils.movement.moveRight(this, map, enemies, items);
        }
        return false;
    };
}
