var Options = function () {
};
Options.prototype = {

    menuConfig: {
        startY: 260,
        startX: "center"
    },

    loadScripts: function () {
    },

    loadBgm: function () {
    },

    loadImages: function () {
    },

    loadFonts: function () {
    },

    init: function () {
        this.titleText = game.make.text(game.world.centerX, 100, "OPTIONS", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
    },

    // The preload function then will call all of the previously defined functions:
    preload: function () {
        this.optionCount = 1;
    },


    create: function () {
        var playSound = gameOptions.playSound,
            playMusic = gameOptions.playMusic;

        game.add.existing(this.titleText);
        this.addMenuOption(playMusic ? 'Mute Music' : 'Play Music', function (target) {
            playMusic = !playMusic;
            target.text = playMusic ? 'Mute Music' : 'Play Music';
            musicPlayer.volume = playMusic ? 1 : 0;
        });
        this.addMenuOption(playSound ? 'Mute Sound' : 'Play Sound', function (target) {
            playSound = !playSound;
            target.text = playSound ? 'Mute Sound' : 'Play Sound';
        });
        this.addMenuOption('<- Back', function () {
            game.state.start("GameMenu");
        });
    }
};

Phaser.Utils.mixinPrototype(Options.prototype, mixins);
