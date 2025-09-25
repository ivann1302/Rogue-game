function Enemy() {
    this.x = 0;
    this.y = 0;

    this.health = 100;
    this.maxHealth = 100;
    this.attackPower = 15;

    this.wasInRange = false;

    this.setPosition = function(x, y) {
        if (window.EnemyUtils && EnemyUtils.state && EnemyUtils.state.setPosition) {
            EnemyUtils.state.setPosition(this, x, y);
        } else {
            this.x = x;
            this.y = y;
        }
    };
}
