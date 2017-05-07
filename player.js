var fullsize = 350;
var step = fullsize / 7;


var x = 1;
var y = 1;

var timer = null;
var moveIndex = 0;
var indexes = [];
var matrix = null;

var colors = ['#fff', '#000', '#550', '#555', '#055', '#505'];

function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
}


function right() {
    if (matrix[y][x + 1] == 0) {
        matrix[y][x + 1] = 3;
        matrix[y][x] = 0;
        x = x + 1;
    }
    else if (matrix[y][x + 1] == 2 && matrix[y][x + 2] == 0) {
        matrix[y][x] = 0;
        matrix[y][x + 1] = 3;
        matrix[y][x + 2] = 2;
        x = x + 1;
    } else {
        alert("bad move?");
    }

}

function left() {
    if (matrix[y][x - 1] == 0) {
        matrix[y][x - 1] = 3;
        matrix[y][x] = 0;
        x = x - 1;
    }
    else if (matrix[y][x - 1] == 2 && matrix[y][x - 2] == 0) {
        matrix[y][x] = 0;
        matrix[y][x - 1] = 3;
        matrix[y][x - 2] = 2;
        x = x - 1;
    } else {
        alert("bad move?");
    }
}

function up() {
    if (matrix[y - 1][x] == 0) {
        matrix[y - 1][x] = 3;
        matrix[y][x] = 0;
        y = y - 1;
    }
    else if (matrix[y - 1][x] == 2 && matrix[y - 2][x] == 0) {
        matrix[y][x] = 0;
        matrix[y - 1][x] = 3;
        matrix[y - 2][x] = 2;
        y = y - 1;
    } else {
        alert("bad move?");
    }
}

function down() {
    if (matrix[y + 1][x] == 0) {
        matrix[y + 1][x] = 3;
        matrix[y][x] = 0;
        y = y + 1;
    }
    else if (matrix[y + 1][x] == 2 && matrix[y + 2][x] == 0) {
        matrix[y][x] = 0;
        matrix[y + 1][x] = 3;
        matrix[y + 2][x] = 2;
        y = y + 1;
    } else {
        alert("bad move?");
    }
}

function done() {
    console.log("done!");
    clearInterval(timer);
}

function drawMatrix() {
    canvasContext.clearRect(0, 0, fullsize, fullsize);
    for (var y_ = 0; y_ < 7; y_++) {
        for (var x_ = 0; x_ < 7; x_++) {
            canvasContext.fillStyle = colors[matrix[y_][x_]];
            var xstart = x_ * step;
            var ystart = y_ * step;
            canvasContext.fillRect(xstart, ystart, step, step);
            canvasContext.fill();
        }
    }
    for (var i = 0; i < targets.length; i += 2) {
        tx = parseInt(targets[i + 1]) * step + 10;
        ty = parseInt(targets[i]) * step + 40;
        canvasContext.font = "30px Arial";
        canvasContext.fillText("X", tx, ty);
    }
}


var movesf = [left, right, up, down];

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};

function processData() {
    movesf = eval($('#moves').val());
    console.log(movesf);
    targets = $('#targets').val().match(/[^[\]]+(?=])/g);
    console.log(targets);
    eval($('#start').val());

    var text = $('#textInput').val();
    matrix = eval($('#Matrix').val());
    console.log(matrix);
    var splited = text.replaceAll("play_1_t", "").replaceAll("_t", "").replace(/ +(?= )/g, '').split(" ");
    console.log(JSON.stringify(splited));

    for (var i in splited) {
        var int = parseInt(splited[i]);
        indexes.push(int);


    }
    console.log(indexes);
    for (var i in indexes) {

        var dir = (indexes[i] % 4);

        console.log(y, x);
    }

    timer = setInterval(function () {
        myTimer()
    }, 200);

    function myTimer() {
        try {

            var dir = (indexes[moveIndex]);
            console.log(dir)
            movesf[dir]();
            moveIndex++;
            drawMatrix();
        }

        catch (err) {
            console.log(err);
            clearInterval(timer);

        }
    }


}

$('#textInput').bind('input propertychange', function () {

    processData();
});

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

function updateLink()
{

    var location = window.location.pathname;
    var link = 'https://williangalvani.github.io/sokoban_visualizer/?moves='+encodeURIComponent($("#moves").val());
    link = link +'&start='+encodeURIComponent($("#start").val());
    link = link +'&matrix='+encodeURIComponent($("#Matrix").val());
    link = link +'&targets='+encodeURIComponent($("#targets").val());
    link = link +'&seq='+encodeURIComponent($("#textInput").val());

    data = JSON.stringify({"longUrl": link});
    $.ajax({
  url:"https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyCxihbSCV57kNuQfuEB3-GA7BDttwExw4I",
  type:"POST",
  data:data,
  contentType:"application/json; charset=utf-8",
  dataType:"json",
  success: function( data ) {
    var short = data['id'];
    $( "#link" ).text( data['id'] );
    }
});


    //window.location = link;
}


var params = getQueryParams(window.location.search);

if ('seq' in params)
{
    $("#textInput").val(params['seq']);
}
if ('start' in params)
{
    $("#start").val(params['start']);
}
if ('matrix' in params)
{
    $("#Matrix").val(params['matrix']);
}
if ('targets' in params)
{
    $("#targets").val(params['targets']);
}
if ('moves' in params)
{
    $("#moves").val(params['moves']);
}

var canvas = document.getElementById('batata');
canvas.height = 360;
canvas.width = 360;

var canvasContext = canvas.getContext('2d');


document.body.appendChild(canvas); 	