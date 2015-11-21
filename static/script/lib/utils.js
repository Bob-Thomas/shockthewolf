var utils = {
    centerGameObjects: function (objects) {
        objects.forEach(function (object) {
            object.anchor.set(0.5);
        });
    }
};