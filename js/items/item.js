function Item(type) {
    this.x = 0;
    this.y = 0;

    this.type = type || 'health';

    this.setPosition = function(x, y) {
        if (window.ItemsUtils && ItemsUtils.state && ItemsUtils.state.setPosition) {
            ItemsUtils.state.setPosition(this, x, y);
        } else {
            this.x = x;
            this.y = y;
        }
    };
}
