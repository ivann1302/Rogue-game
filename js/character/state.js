(function (global) {
  var CharacterUtils = global.CharacterUtils || (global.CharacterUtils = {});
  CharacterUtils.state = {
    setPosition: function (character, x, y) {
      character.x = x;
      character.y = y;
    }
  };
})(window);
