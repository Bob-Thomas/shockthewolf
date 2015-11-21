var Game = function () {
};
Game.prototype = {

    loadScripts: function () {
    },

    loadBgm: function () {
    },

    loadImages: function () {
    },

    loadFonts: function () {
    },

    init: function () {
        this.titleText = game.make.text(game.world.centerX, 100, "I SHOULD SLEEP", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
    },

    // The preload function then will call all of the previously defined functions:
    preload: function () {
    },


    create: function () {
            var emitter = game.add.emitter(game.world.centerX, game.world.height, 200);

            emitter.makeParticles('particle');

            emitter.setRotation(0, 0);
            emitter.setAlpha(0.3, 0.8);
            emitter.setScale(0.3, 0.3);
            emitter.gravity = -300;

            //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
            //	The 5000 value is the lifespan of each particle before it's killed
            emitter.start(false, 3000, 100);

        game.add.existing(this.titleText)

    }
};