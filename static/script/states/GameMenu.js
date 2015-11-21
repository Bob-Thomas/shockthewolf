var GameMenu = function () {
};
GameMenu.prototype = {

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
        this.titleText = game.make.text(game.world.centerX, 100, "THE 'END'", {
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
        game.add.existing(this.titleText);
        game.stage.disableVisibilityChange = true;

        this.addMenuOption('Start', function (target) {
            game.state.start("Game");
        });
        this.addMenuOption('Options', function (target) {
            game.state.start("Options");
        });
        this.addMenuOption('Credits', function (target) {
            game.state.start("Credits");
        });
    }
};
Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
