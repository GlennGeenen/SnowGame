window.onload = function () {
	'use strict';

	var w = window.innerWidth;
	var h = window.innerHeight;

	var gameWidth = (h > w) ? h : w;
	var gameHeight = (h > w) ? w : h;

	// Game is designed in 1920 * 1080
	var scale = 1;
	if (gameWidth / 1920 > gameHeight / 1080) {
		scale = gameHeight / 1080;
		gameWidth = gameHeight * (1920 / 1080);
	} else {
		gameHeight = gameWidth / (1920 / 1080);
		scale = gameWidth / 1920;
	}

	var ns = window['snowgame'];

	var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'snowgame-game');
	game.gameScale = scale;

	game.state.add('boot', ns.Boot);
	game.state.add('preloader', ns.Preloader);
	game.state.add('menu', ns.Menu);
	game.state.add('game', ns.Game);

	game.state.start('boot');

	//	if ('WebSocket' in window) {
	//		game.websocket = new WebSocket('ws://localhost:8181');
	//		game.websocket.onopen = function () {
	//			game.websocket.send('{MouseMode:1}');
	//		};
	//	}

};