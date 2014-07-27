function Bg(scene) {
	this.sprite = scene.add.sprite(5, 5, "bg");
	this.sprite.width = scene.game.world.width - 10;
	this.sprite.height = scene.game.world.height - 10;
}

Bg.preload = function(scene) {
	scene.load.image('bg', 'assets/img/backgrond600x6k.png');
};