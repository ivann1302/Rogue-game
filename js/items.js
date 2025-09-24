function Item(type) {
    this.x = 0;
    this.y = 0;

    this.type = type || 'health';

    this.setPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };
}
