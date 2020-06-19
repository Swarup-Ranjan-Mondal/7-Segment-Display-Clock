var canvas = document.getElementById('Canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = 1150,
    height = canvas.height = 250,
    digitsHexaCode = [0x7E, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B];

var x = 35, y = 5, l = 80, b = 20;

function sevenSegmentDisplay(x, y, l, b, digit) {
    var value = digitsHexaCode[digit],
        rgb = "rgb(255, 0, 0)", alpha;
    //A
    alpha = (value >> 6) & 1;
    segmentDraw(x, y, l, b, rgb, alpha, 'h');
    //B
    alpha = (value >> 5) & 1;
    x += l + 5; y += b + 5;
    segmentDraw(x, y, l, b, rgb, alpha, 'v');

    //C
    alpha = (value >> 4) & 1;
    y += l + b + 2 * 5;
    segmentDraw(x, y, l, b, rgb, alpha, 'v');
    //D
    alpha = (value >> 3) & 1;
    x -= l + 5; y += l + 5;
    segmentDraw(x, y, l, b, rgb, alpha, 'h');
    //E
    alpha = (value >> 2) & 1;
    x -= b + 5; y -= l + 5;
    segmentDraw(x, y, l, b, rgb, alpha, 'v');
    //F
    alpha = (value >> 1) & 1;
    y -= l + b + 2 * 5;
    segmentDraw(x, y, l, b, rgb, alpha, 'v');
    //G
    alpha = (value >> 0) & 1;
    x += b + 5; y += l + 5;
    segmentDraw(x, y, l, b, rgb, alpha, 'h');
}

function segmentDraw(x, y, l, b, rgb, alpha, view) {
    ctx.beginPath();
    ctx.fillStyle = rgb.substring(0, rgb.length - 1) + ", " + alpha + ")";
    if (view == 'h') {
        ctx.rect(x, y, l, b);
        ctx.moveTo(x, y);
        ctx.lineTo(x - b / 2, y + b / 2);
        ctx.lineTo(x, y + b);
        ctx.moveTo(x + l, y);
        ctx.lineTo(x + l + b / 2, y + b / 2);
        ctx.lineTo(x + l, y + b);
        ctx.fill();
    }
    else if (view == 'v') {
        ctx.rect(x, y, b, l);
        ctx.moveTo(x, y);
        ctx.lineTo(x + b / 2, y - b / 2);
        ctx.lineTo(x + b, y);
        ctx.moveTo(x, y + l);
        ctx.lineTo(x + b / 2, y + l + b / 2);
        ctx.lineTo(x + b, y + l);
        ctx.fill();
    }
}

function semicolon(x, y, w) {
    y += 60;
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.beginPath();
    ctx.rect(x, y, w, w);
    y += w * 5;
    ctx.rect(x, y, w, w);
    ctx.fill();
}

clock = function (x, y, l, b) {
    var date = new Date(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    ctx.fillStyle = "grey";
    ctx.fillRect(0, 0, width, height);

    // hours = hours % 12;
    sevenSegmentDisplay(x, y, l, b, Math.floor(hours / 10));
    x = x + l * 2;
    sevenSegmentDisplay(x, y, l, b, (hours % 10));
    x = x + l * 2;
    semicolon(x, y, b);
    x = x + l + b;
    sevenSegmentDisplay(x, y, l, b, Math.floor(minutes / 10));
    x = x + l * 2;
    sevenSegmentDisplay(x, y, l, b, (minutes % 10));
    x = x + l * 2;
    semicolon(x, y, b);
    x = x + l + b;
    sevenSegmentDisplay(x, y, l, b, Math.floor(seconds / 10));
    x = x + l * 2;
    sevenSegmentDisplay(x, y, l, b, (seconds % 10));
}

clock(x, y, l, b);
setInterval(()=>{
    clock(x, y, l, b);
}, 1000);