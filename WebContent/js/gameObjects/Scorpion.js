function Scorpion(x, y, game, scene) {
	this.game = game;

	this.sprite = scene.add.sprite(x, y, "scorpion");
	this.addPhysicsMovmentAndColision();
}

Scorpion.SPEED = 150;

Scorpion.preload = function(scene) {
	scene.load.image('scorpion', 'assets/img/scorpion.png');
};

Scorpion.prototype.update = function(player) {
	this.sprite.body.rotation = this.game.physics.arcade.angleToXY(this.sprite, player.x, player.y);
	this.sprite.body.velocity.x = Math.cos(this.sprite.body.rotation) * Scorpion.SPEED;
	this.sprite.body.velocity.y = Math.sin(this.sprite.body.rotation) * Scorpion.SPEED;
};

Scorpion.prototype.addPhysicsMovmentAndColision = function() {
	this.game.physics.p2.enable(this.sprite, true);
	this.sprite.body.setCollisionGroup(this.game.scorpionCollisionGroup);
	this.sprite.body.collides([this.game.shieldCollisionGroup, this.game.playerCollisionGroup]);
},

Scorpion.prototype.kill = function() {
	var xOffset = utils.getRndInt(-500, 500);
	var yOffset = utils.getRndInt(-500, 500);
	var rndCorner = utils.getRndInt(1, 4);
	if (rndCorner == 1) {
		xOffset = -500;
	} else if (rndCorner == 2) {
		xOffset = 500;
	} else if (rndCorner == 3) {
		yOffset = -500;
	} else if (rndCorner == 4) {
		yOffset = 500;
	} 

	this.sprite.body.x += xOffset;
	this.sprite.body.y += yOffset;
}