//var SOCKET = io.connect('http://' + document.domain + ':' + location.port);

var
    c,
    ctx,
    users
    ;

window.onload = function () {
    c = document.getElementById('canvas');
    ctx = c.getContext("2d");
    ctx.canvas.width = window.innerWidth-19;
    ctx.canvas.height = window.innerHeight-19;
    users = [];
    for(var i = 0; i < 1000; i++) {
        addUser()
    }
    draw()
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function draw() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = 'rgb(' + getRandomInt(1, 255) + ',' + getRandomInt(1, 255) + ',' + getRandomInt(1, 255) + ')';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        ctx.fillStyle = user.fill;
        if (user.shape === "square") {
            ctx.fillRect(user.x, user.y, user.width, user.height);
        } else if (user.shape === "ball") {
            ctx.arc(user.x, user.y, user.width, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
        }
        if (user.x < 0 || user.x > ctx.canvas.width) {
            user.vector[0] = -user.vector[0]
        }
        if (user.y < 0 || user.y > ctx.canvas.height) {
            user.vector[1] = -user.vector[1]
        }
        //if(user.y)
        //user.update();
        var random = getRandomInt(10, 20);
        //user.width = random;
        //user.height = random;
        user.x += user.vector[0];
        user.y += user.vector[1];
    }
    requestAnimationFrame(draw);
}

function User() {
    this.x = 0;
    this.y = 0;
    this.vector = [getRandomInt(1, 50), getRandomInt(1, 50)];
    this.width = 10;
    this.height = 10;
    this.fill = 'rgb(' + getRandomInt(1, 255) + ',' + getRandomInt(1, 255) + ',' + getRandomInt(1, 255) + ')';
    this.shape = (getRandomInt(0, 1)) ? "square" : "ball";
}

function addUser() {
    var rect = new User;
    var size = 10;
    rect.x = getRandomInt(0, ctx.canvas.width);
    rect.width = size;
    rect.height = size;
    users.push(rect);
}
