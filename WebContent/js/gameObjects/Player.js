function Player(scene, playerNumber, loseCallback, loseCallbackThis) {
	this.playerNumber = playerNumber;
	this.scene = scene;

	this.sprite = scene.add.sprite(30, 100, "player");
	this.sprite.anchor.setTo(0.5, 0.5);
	scene.game.physics.p2.enable(this.sprite);
	this.sprite.body.setCollisionGroup(scene.game.playerCollisionGroup);
	this.sprite.body.collides(scene.game.scorpionCollisionGroup, loseCallback, loseCallbackThis);
	this.sprite.body.collides(scene.game.shipCollisionGroup);

	this.player1Keys = {};
	this.player1Keys.upKey = scene.game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.player1Keys.downKey = scene.game.input.keyboard.addKey(Phaser.Keyboard.S);
	this.player1Keys.leftKey = scene.game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.player1Keys.rightKey = scene.game.input.keyboard.addKey(Phaser.Keyboard.D);

	this.player2Keys = {};
	this.player2Keys.upKey = scene.game.input.keyboard.addKey(Phaser.Keyboard.UP);
	this.player2Keys.downKey = scene.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	this.player2Keys.leftKey = scene.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	this.player2Keys.rightKey = scene.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
}

Player.preload = function(scene) {
	scene.load.image('player', 'assets/img/alien01.png');
};

Player.prototype.update = function() {
	var keysToCheck = this.player1Keys;
	if (this.playerNumber == 2) {
		keysToCheck = this.player2Keys;
	}

	this.xDirection;
	this.yDirection;

	var playerSpeed = 5;

	if (keysToCheck.upKey.isDown)
	{
		this.sprite.body.y -= playerSpeed;
		this.yDirection = -1000;
	}
	else if (keysToCheck.downKey.isDown)
	{
		this.sprite.body.y += playerSpeed;
		this.yDirection = 1000;
	} else {
		this.yDirection = 0;
	}

	if (keysToCheck.leftKey.isDown)
	{
		this.sprite.body.x -= playerSpeed;
		this.xDirection = -1000;
	}
	else if (keysToCheck.rightKey.isDown)
	{
		this.sprite.body.x += playerSpeed;
		this.xDirection = 1000;
	} else {
		this.xDirection = 0;
	}

	if (this.xDirection !== 0 || this.yDirection !== 0) {
		this.sprite.body.rotation = this.scene.game.physics.arcade.angleToXY(this.sprite, this.sprite.x + this.xDirection + 1, this.sprite.y + this.yDirection + 1);
		this.sprite.body.rotation += Math.PI / 2;
	}
}