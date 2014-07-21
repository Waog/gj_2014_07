var creditsString = "We thank anyone. This game was done by us.\n\n"
        + "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,"
        + "sed diam nonumy eirmod tempor invidunt ut labore et dolore "
        + "magna aliquyam erat, sed diam voluptua. At vero eos et accusam et"
        + " justo duo dolores et ea rebum. Stet clita kasd gubergren, no"
        + " sea takimata sanctus est Lorem ipsum dolor sit amet.";
Scene.Credits = function(game) {
};
Scene.Credits.prototype = {
    preload : function() {
        this.load.image('creditsBg',
                'assets/placeholder/img/squareGradientTopDownBlue.png');
        this.game.load.audio('creditsMenuMusic', utils
                .getAudioFileArray('assets/placeholder/music/track02'));
        this.music = this.game.add.audio('creditsMenuMusic', 1, true);
    },

    create : function() {
        this.music.play();
        
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
        this.music.stop();
        this.game.state.start('MainMenu');
    },
};