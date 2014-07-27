function Ship(scene, winCallback, winThis) {
	this.sprite = scene.add.sprite(1000, 1000, "ship");
	this.sprite.anchor.setTo(0.5, 0.5);
	scene.game.physics.p2.enable(this.sprite);
	this.sprite.body.setCollisionGroup(scene.game.shipCollisionGroup);
	this.sprite.body.collides(scene.game.playerCollisionGroup, winCallback, winThis);
}

Ship.preload = function(scene) {
	scene.load.image('ship', 'assets/img/spaceship.png');
};