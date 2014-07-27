Scene.GameScene = function(game) {
};
Scene.GameScene.prototype = {
    preload : function() {
        Bg.preload(this);
        Scorpion.preload(this);
        Player.preload(this);
        Shield.preload(this);
        Ship.preload(this);

        this.game.load.audio('hit', utils
            .getAudioFileArray('assets/placeholder/fx/hit'));
        this.hitSound = this.game.add.audio('hit');
    },

    create : function() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.9;
        this.game.physics.p2.setImpactEvents(true);

        this.game.scorpionCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.shieldCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.shipCollisionGroup = this.game.physics.p2.createCollisionGroup();

        new Bg(this);

        var tutorialString = "player 1: asdw\nplayer 2: arrow keys\nprotect each other!";
        this.game.add.text(10, 10, tutorialString);

        this.scorpion = new Scorpion(800, 200, this.game, this);
        this.player1 = new Player(this, 1, this.onLose, this);
        this.player2 = new Player(this, 2, this.onLose, this);
        this.shield1 = new Shield(this, this.scorpion, this.player1, this.player2);
        this.shield2 = new Shield(this, this.scorpion, this.player2, this.player1);
        this.ship = new Ship(this, this.onWin, this);
    },

    update : function() {
        this.player1.update();
        this.player2.update();
        this.shield1.update();
        this.shield2.update();
        this.scorpion.update(this.player1.sprite);
    },

    onWin : function() {
        this.hitSound.play();
        this.game.state.start('Win');
    },

    onLose : function() {
        this.hitSound.play();
        this.game.state.start('Lose');
    }
};