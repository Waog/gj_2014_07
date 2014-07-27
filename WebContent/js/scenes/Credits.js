var creditsString = "Made at the Berln Mini Game Jam.\n\n"
+ "Concept: Laura Luiz, Héctor Blanco, Oliver Stadie\n"
+ "Graphics: Héctor Blanco\n"
+ "Development: Oliver Stadie";
Scene.Credits = function(game) {
};
Scene.Credits.prototype = {
    preload : function() {
        this.load.image('creditsBg',
            'assets/placeholder/img/squareGradientTopDownBlue.png');
    },

    create : function() {
        this.bg = this.add.sprite(0, 0, "creditsBg");
        this.bg.width = this.game.world.width;
        this.bg.height = this.game.world.height;

        var textStyle = {
            font : "25px Arial",
            fill : "#ABCDEF",
            align : "center"
        };
        var PADDING = 20;
        var text = this.game.add.text(this.game.world.centerX, PADDING,
            creditsString, textStyle);
        text.wordWrap = true;
        text.wordWrapWidth = this.game.world.width - 2 * PADDING;
        text.anchor.setTo(0.5, 0);

        utils.createButton(this, this.game, "Back", this.onBack,
            this.game.world.centerX, 300);
    },

    onBack : function() {
        this.game.clickSound.play();
        this.game.state.start('MainMenu');
    }
};