function Shield(scene, scorpion, carrier, protectee) {
	this.scene = scene;
	this.carrier = carrier;
	this.protectee = protectee;

	if (carrier.playerNumber == 1) {
		this.sprite = this.scene.add.sprite(0, 0, "shield1");
	} else {
		this.sprite = this.scene.add.sprite(0, 0, "shield2");
	}
	this.sprite.anchor.setTo(0.5, 0.5);
	scene.game.physics.p2.enable(this.sprite);
	this.sprite.body.setRectangle(15, 70, 40, 0);
	this.sprite.body.setCollisionGroup(scene.game.shieldCollisionGroup);
	this.sprite.body.collides(scene.game.scorpionCollisionGroup, scorpion.kill, scorpion);
}

Shield.preload = function(scene) {
	scene.load.image('shield1', 'assets/img/shield01.png');
	scene.load.image('shield2', 'assets/img/shield02.png');
};

Shield.prototype.update = function() {
	this.sprite.body.x = this.carrier.sprite.x;
	this.sprite.body.y = this.carrier.sprite.y;
	this.sprite.body.rotation = this.scene.game.physics.arcade.angleToXY(this.carrier.sprite, this.protectee.sprite.x, this.protectee.sprite.y);
	this.sprite.body.rotation += Math.PI;
};