function Enemy() {
    this.x = 0;
    this.y = 0;

    this.health = 100;
    this.maxHealth = 100;
    this.attackPower = 5;

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };
}
