function Ship(scene) {
	this.sprite = scene.add.sprite(600, 200, "ship");
	this.sprite.anchor.setTo(0.5, 0.5);
	scene.game.physics.p2.enable(this.sprite);
	this.sprite.body.setCollisionGroup(scene.game.shipCollisionGroup);
	this.sprite.body.collides(scene.game.playerCollisionGroup, scene.onWin, scene);
}

Ship.preload = function(scene) {
	scene.load.image('ship', 'assets/img/spaceship.png');
};