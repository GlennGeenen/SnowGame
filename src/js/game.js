(function () {
	'use strict';

	function Game() {
		this.timer = null;
		this.snowManGroup = null;
		this.scoreText = null;
		this.timeText = null;
		this.score = 0;
		this.loopTime = 2000;

		this.positions = [{
			x: 200,
			y: 780,
			scale: 0.8
		}, {
			x: 450,
			y: 780,
			scale: 0.6
		}, {
			x: 1500,
			y: 720,
			scale: 0.8
		}, {
			x: 1250,
			y: 750,
			scale: 0.8
		}, {
			x: 1200,
			y: 650,
			scale: 0.4
		}, {
			x: 800,
			y: 650,
			scale: 0.4
		}];

		this.availablePositions = [0, 1, 2, 3, 4, 5];

	}

	Game.prototype = {

		create: function () {

			this.add.sprite(0, 0, 'background');

			this.createInterface();

			this.snowManGroup = this.add.group();

			this.createParticleEffects();

			this.score = 0;

			this.timer = this.game.time.create(this.game);
			this.timer.loop(this.loopTime, this.popSnowMan, this);
			this.timer.start();

		},

		createInterface: function () {
			var circle = this.add.sprite(1820, 100, 'scorecircle');
			circle.anchor.set(0.5);

			var style = {
				font: '60px Arial',
				fill: '#FFFFFF',
				align: 'center'
			};

			this.timeText = this.add.text(1820, 100, '60', style);
			this.timeText.anchor.set(0.5);

			circle = this.add.sprite(100, 100, 'scorecircle');
			circle.anchor.set(0.5);

			this.scoreText = this.add.text(100, 100, '0', style);
			this.scoreText.anchor.set(0.5);
		},

		createParticleEffects: function () {

			var backEmitter = this.game.add.emitter(this.game.world.centerX, -32, 600);
			backEmitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
			backEmitter.maxParticleScale = 0.6;
			backEmitter.minParticleScale = 0.2;
			backEmitter.setYSpeed(20, 100);
			backEmitter.gravity = 0;
			backEmitter.width = this.game.world.width * 1.5;
			backEmitter.minRotation = 0;
			backEmitter.maxRotation = 40;

			var midEmitter = this.game.add.emitter(this.game.world.centerX, -32, 250);
			midEmitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
			midEmitter.maxParticleScale = 1.2;
			midEmitter.minParticleScale = 0.8;
			midEmitter.setYSpeed(50, 150);
			midEmitter.gravity = 0;
			midEmitter.width = this.game.world.width * 1.5;
			midEmitter.minRotation = 0;
			midEmitter.maxRotation = 40;

			var frontEmitter = this.game.add.emitter(this.game.world.centerX, -32, 50);
			frontEmitter.makeParticles('snowflakes_large', [0, 1, 2, 3, 4, 5]);
			frontEmitter.maxParticleScale = 1;
			frontEmitter.minParticleScale = 0.5;
			frontEmitter.setYSpeed(100, 200);
			frontEmitter.gravity = 0;
			frontEmitter.width = this.game.world.width * 2;
			frontEmitter.minRotation = 0;
			frontEmitter.maxRotation = 40;

			backEmitter.start(false, 14000, 20);
			midEmitter.start(false, 12000, 40);
			frontEmitter.start(false, 6000, 1000);

		},

		update: function () {

			if (this.timer.seconds >= 70) {
				this.game.state.start('menu');
			} else if (this.timer.seconds >= 20) {
				this.timer.removeAll();
				this.drawTimeUp();
			} else {
				this.timeText.setText(60 - Math.floor(this.timer.seconds));

				this.snowManGroup.forEach(function (snowman) {
					var pointer = this.game.input.activePointer;
					if (typeof snowman !== 'undefined' && snowman.input.pointerDown(pointer.id)) {

						this.createSnowEmitter(pointer.x, pointer.y, snowman.scale.x);

						++this.score;
						this.scoreText.setText('' + this.score);

						this.availablePositions.push(snowman.snowManID);
						this.snowManGroup.remove(snowman);

						return;
					}
				}, this);
			}
		},

		createSnowEmitter: function (x, y, scale) {
			var snowEmitter = this.game.add.emitter(x, y, 100 * scale);
			snowEmitter.makeParticles('snowflakes', [0, 1, 2, 3, 4, 5]);
			snowEmitter.minParticleScale = scale * 0.5;
			snowEmitter.maxParticleScale = scale;
			snowEmitter.maxRotation = 40;
			snowEmitter.start(true, 2000, null, 50);
		},

		popSnowMan: function () {

			if (this.availablePositions.length > 0) {

				var elementPos = Math.floor(Math.random() * this.availablePositions.length);
				var index = this.availablePositions[elementPos];
				this.availablePositions.splice(elementPos, 1);

				var position = this.positions[index];

				var snowman = this.snowManGroup.create(position.x, position.y, 'snowman');
				snowman.scale.setTo(position.scale, position.scale);
				snowman.inputEnabled = true;
				snowman.snowManID = index;

				// Speed Up Popping Snowman
				this.timer.removeAll();
				if (this.loopTime - 100 >= 500) {
					this.loopTime -= 50;
				}
				this.timer.loop(this.loopTime, this.popSnowMan, this);
			}
		},

		drawTimeUp: function () {
			this.timeText.setText('0');
			this.add.sprite(710, 412, 'timesup');

			var style = {
				font: '60px Arial',
				fill: '#FFFFFF'
			};

			this.game.add.text(1000, 540, this.score, style);
		}

	};

	window['snowgame'] = window['snowgame'] || {};
	window['snowgame'].Game = Game;

}());