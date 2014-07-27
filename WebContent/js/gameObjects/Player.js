function Player(scene, playerNumber, loseCallback, loseCallbackThis) {
	this.playerNumber = 0;
	this.scene = scene;

	this.sprite = scene.add.sprite(30, 100, "player");
	this.sprite.anchor.setTo(0.5, 0.5);
	scene.game.physics.p2.enable(this.sprite, true);
	this.sprite.body.setCollisionGroup(scene.game.playerCollisionGroup);
	this.sprite.body.collides(scene.game.scorpionCollisionGroup, loseCallback, loseCallbackThis);

	this.upKey1 = scene.game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.downKey1 = scene.game.input.keyboard.addKey(Phaser.Keyboard.S);
	this.leftKey1 = scene.game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.rightKey1 = scene.game.input.keyboard.addKey(Phaser.Keyboard.D);
}

Player.preload = function(scene) {
	scene.load.image('player', 'assets/img/alien01.png');
};

Player.prototype.aMethodName = function() {
	// do something
};

Player.prototype.update = function() {
	// player 1 control
	this.x1TurnDirection;
	this.y1TurnDirection;

	if (this.upKey1.isDown)
	{
		this.sprite.body.y--;
		this.y1TurnDirection = -1000;
	}
	else if (this.downKey1.isDown)
	{
		this.sprite.body.y++;
		this.y1TurnDirection = 1000;
	} else {
		this.y1TurnDirection = 0;
	}

	if (this.leftKey1.isDown)
	{
		this.sprite.body.x--;
		this.x1TurnDirection = -1000;
	}
	else if (this.rightKey1.isDown)
	{
		this.sprite.body.x++;
		this.x1TurnDirection = 1000;
	} else {
		this.x1TurnDirection = 0;
	}

	if (this.x1TurnDirection !== 0 || this.y1TurnDirection !== 0) {
		this.sprite.body.rotation = this.scene.game.physics.arcade.angleToXY(this.sprite, this.sprite.x + this.x1TurnDirection + 1, this.sprite.y + this.y1TurnDirection + 1);
		this.sprite.body.rotation += Math.PI / 2;
	}
}