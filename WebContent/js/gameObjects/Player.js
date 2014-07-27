function Player(scene, playerNumber, loseCallback, loseCallbackThis) {
	this.playerNumber = 0;

	this.sprite = scene.add.sprite(30, 100, "player");
	this.sprite.anchor.setTo(0.5, 0.5);
	scene.game.physics.p2.enable(this.sprite, true);
	this.sprite.body.setCollisionGroup(scene.game.playerCollisionGroup);
	this.sprite.body.collides(scene.game.scorpionCollisionGroup, loseCallback, loseCallbackThis);
}

Player.preload = function(scene) {
	scene.load.image('player', 'assets/img/alien01.png');
};

Player.prototype.aMethodName = function() {
	// do something
};