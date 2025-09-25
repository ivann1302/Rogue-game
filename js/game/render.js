(function (global) {
  var GameUtils = global.GameUtils || (global.GameUtils = {});

  GameUtils.render = {
    render: function (game) {
      var field = document.querySelector('.field');
      var fieldBox = document.querySelector('.field-box');
      var maxWidth = window.innerWidth - 40;
      var maxHeight = window.innerHeight - 100;
      var tileWidth = Math.floor(maxWidth / game.map.width);
      var tileHeight = Math.floor(maxHeight / game.map.height);
      var tileSize = Math.min(tileWidth, tileHeight);
      var mapWidth = game.map.width * tileSize;
      var mapHeight = game.map.height * tileSize;
      field.style.width = mapWidth + 'px';
      field.style.height = mapHeight + 'px';
      field.innerHTML = '';
      if (game.player && !isAlive(game.player) && !game.gameOver) {
        game.gameOver = true;
        game.stopTimers();
      }
      if (!game.gameOver && !game.gameWon && game.enemies.length === 0) {
        game.gameWon = true;
        game.stopTimers();
      }
      for (var y = 0; y < game.map.height; y++) {
        for (var x = 0; x < game.map.width; x++) {
          var tile = document.createElement('div');
          tile.className = 'tile';
          tile.style.width = tileSize + 'px';
          tile.style.height = tileSize + 'px';
          tile.style.left = (x * tileSize) + 'px';
          tile.style.top = (y * tileSize) + 'px';
          if (game.map.getTile(x, y) === 1) {
            tile.classList.add('tileW');
          }
          var hasPlayer = false;
          var hasEnemy = false;
          if (game.player && isAlive(game.player) && game.player.x === x && game.player.y === y) {
            tile.classList.add('tileP');
            hasPlayer = true;
            var healthBar = document.createElement('div');
            healthBar.className = 'health';
            healthBar.style.width = (game.player.health / game.player.maxHealth * 90) + '%';
            tile.appendChild(healthBar);
          }
          if (!hasPlayer) {
            for (var i = 0; i < game.enemies.length; i++) {
              if (game.enemies[i].x === x && game.enemies[i].y === y) {
                tile.classList.add('tileE');
                hasEnemy = true;
                var eHealthBar = document.createElement('div');
                eHealthBar.className = 'health';
                eHealthBar.style.width = (game.enemies[i].health / game.enemies[i].maxHealth * 90) + '%';
                tile.appendChild(eHealthBar);
                break;
              }
            }
          }
          if (!hasPlayer && !hasEnemy) {
            for (var k = 0; k < game.items.length; k++) {
              if (game.items[k].x === x && game.items[k].y === y) {
                if (game.items[k].type === 'sword') {
                  tile.classList.add('tileSW');
                } else if (game.items[k].type === 'health') {
                  tile.classList.add('tileHP');
                }
                break;
              }
            }
          }
          field.appendChild(tile);
        }
      }
      if (game.gameOver) {
        var overlay = document.createElement('div');
        overlay.setAttribute('data-overlay', 'game-over');
        overlay.style.position = 'absolute';
        overlay.style.left = '0';
        overlay.style.top = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.7)';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '1000';
        var title = document.createElement('div');
        title.textContent = 'Поражение';
        title.style.fontFamily = 'Playfair Display, serif';
        title.style.fontSize = Math.max(18, Math.floor(tileSize * 0.8)) + 'px';
        title.style.marginBottom = '16px';
        var btn = document.createElement('button');
        btn.textContent = 'Начать сначала';
        btn.style.fontSize = Math.max(14, Math.floor(tileSize * 0.5)) + 'px';
        btn.style.padding = '8px 12px';
        btn.style.cursor = 'pointer';
        btn.onclick = function() { window.location.reload(); };
        overlay.appendChild(title);
        overlay.appendChild(btn);
        field.appendChild(overlay);
      } else if (game.gameWon) {
        var overlayW = document.createElement('div');
        overlayW.setAttribute('data-overlay', 'game-won');
        overlayW.style.position = 'absolute';
        overlayW.style.left = '0';
        overlayW.style.top = '0';
        overlayW.style.width = '100%';
        overlayW.style.height = '100%';
        overlayW.style.background = 'rgba(0,0,0,0.7)';
        overlayW.style.display = 'flex';
        overlayW.style.flexDirection = 'column';
        overlayW.style.alignItems = 'center';
        overlayW.style.justifyContent = 'center';
        overlayW.style.zIndex = '1000';
        var titleW = document.createElement('div');
        titleW.textContent = 'Победа';
        titleW.style.fontFamily = 'Playfair Display, serif';
        titleW.style.fontSize = Math.max(18, Math.floor(tileSize * 0.8)) + 'px';
        titleW.style.marginBottom = '16px';
        var btnW = document.createElement('button');
        btnW.textContent = 'Начать сначала';
        btnW.style.fontSize = Math.max(14, Math.floor(tileSize * 0.5)) + 'px';
        btnW.style.padding = '8px 12px';
        btnW.style.cursor = 'pointer';
        btnW.onclick = function() { window.location.reload(); };
        overlayW.appendChild(titleW);
        overlayW.appendChild(btnW);
        field.appendChild(overlayW);
      }
    }
  };
})(window);
