(function () {
	'use strict';

	function Preloader() {
		this.asset = null;
		this.ready = false;
	}

	Preloader.prototype = {

		preload: function () {
			this.asset = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'preloader');
			this.asset.anchor.setTo(0.5, 0.5);

			this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
			this.load.setPreloadSprite(this.asset);

			this.load.image('snowman', 'assets/snowman.png');
			this.load.image('background', 'assets/background.png');
			this.load.image('scorecircle', 'assets/score.png');
			this.load.image('timesup', 'assets/timesup.png');

			this.load.spritesheet('snowflakes', 'assets/snowflakes.png', 17, 17);
			this.load.spritesheet('snowflakes_large', 'assets/snowflakes_large.png', 64, 64);

			this.load.bitmapFont('gamefont', 'assets/Arial.png', 'assets/Arial.xml');
		},

		create: function () {
			this.asset.cropEnabled = false;
		},

		update: function () {
			if (!!this.ready) {
				this.game.state.start('menu');
			}
		},

		onLoadComplete: function () {
			this.ready = true;
		}
	};

	window['snowgame'] = window['snowgame'] || {};
	window['snowgame'].Preloader = Preloader;

}());