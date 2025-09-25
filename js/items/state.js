(function (global) {
  var ItemsUtils = global.ItemsUtils || (global.ItemsUtils = {});

  ItemsUtils.state = {
    setPosition: function (item, x, y) {
      item.x = x;
      item.y = y;
    }
  };
})(window);
