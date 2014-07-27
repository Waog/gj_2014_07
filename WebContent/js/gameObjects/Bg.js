function Bg(scene) {
	this.sprite = scene.add.sprite(0, 0, "bg");
	this.sprite.width = scene.game.world.width;
	this.sprite.height = scene.game.world.height;
}

Bg.preload = function(scene) {
	scene.load.image('bg', 'assets/img/backgrond600x6k.png');
};