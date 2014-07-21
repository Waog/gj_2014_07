Scene.Lose = function(game) {
};
Scene.Lose.prototype = {
    preload : function() {
        this.load.image('loseBg',
                'assets/placeholder/img/squareGradientTopDownRed.png');
        this.game.load.audio('loseSceneMusic', utils
                .getAudioFileArray('assets/placeholder/music/track02'));
        this.music = this.game.add.audio('loseSceneMusic', 1, true);
    },

    create : function() {
        this.music.play();
        
        this.bg = this.add.sprite(0, 0, "loseBg");
        this.bg.width = this.game.world.width;
        this.bg.height = this.game.world.height;
        this.bg.inputEnabled = true;
        this.bg.events.onInputDown.add(this.onInteraction, this);

        var textString = "Game\nOver!";
        var textStyle = {
            font : "60px Arial",
            fill : "#ABCDEF",
            align : "center"
        };
        var text = this.game.add.text(this.game.world.centerX,
                this.game.world.centerY, textString, textStyle);
        text.anchor.setTo(0.5, 0.5);
    },

    onInteraction : function() {
        this.game.clickSound.play();
        this.music.stop();
        this.game.state.start('MainMenu');
    },
};