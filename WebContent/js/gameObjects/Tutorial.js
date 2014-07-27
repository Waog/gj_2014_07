function Tutorial(scene) {
	var tutorialString = "player 1: asdw\nplayer 2: arrow keys\nprotect each other!\nfind your UFO to escape...";
	var tutorialTextField = scene.game.add.text(10, 10, tutorialString);
	tutorialTextField.fixedToCamera = true;
	scene.game.add.tween(tutorialTextField).to({
		alpha: 0
	}, 10000, Phaser.Easing.Exponential.InOut, true);
}