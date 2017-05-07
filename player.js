    
var moves = ["left", "right", "down", "up", "push left", "push right", "push down", "push up"];

var fullsize = 350;
var step = fullsize/5;


var x = 0.5;
var y = 0.5;

var moveIndex = 0;
var indexes = [];

var colors = ['#f00','#0f0','#00f','#550','#055','#505'];

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}




function right()
{
console.log("right");
// Draw the red line.
canvasContext.beginPath();
canvasContext.strokeStyle = choose(colors);
canvasContext.moveTo(x*step, y*step);
canvasContext.lineTo((x+1)*step, y*step);
x = x + 1;
canvasContext.stroke();	

};

function left()
{
	console.log("left");
	// Draw the red line.
canvasContext.beginPath();
canvasContext.strokeStyle = choose(colors);
canvasContext.moveTo(x*step, y*step);
canvasContext.lineTo((x-1)*step, y*step);
x = x - 1;
canvasContext.stroke();	

};

function up()
{

	console.log("up");
	// Draw the red line.
canvasContext.beginPath();
canvasContext.strokeStyle = choose(colors);
canvasContext.moveTo(x*step, y*step);
canvasContext.lineTo(x*step, (y-1)*step);
y = y - 1;
canvasContext.stroke();	

};

function down()
{


	console.log("down");
	// Draw the red line.
    canvasContext.beginPath();
    canvasContext.strokeStyle = choose(colors);
    canvasContext.moveTo(x*step, y*step);
    canvasContext.lineTo(x*step, (y+1)*step);
    y = y + 1;
    console.log(y,x);
    canvasContext.stroke();	

};



var movesf = [left, right, up, down];

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};
function processData()
{
    eval($('#start'));
	var text = $('#textInput').val();
    var matrix = eval($('#Matrix').val());
    console.log(matrix);
	var splited = text.replaceAll("play_1_t","").replace(/ +(?= )/g,'').split(" ");
	console.log(JSON.stringify(splited));
	
	for (var i in splited)
	{
		var int = parseInt(splited[i]);
		if( int > 0)
		{
			indexes.push(int-1);
		}
		
	}
	console.log(indexes);
	for (var i in indexes)
	{

		var dir = (indexes[i]%4);
		
        console.log(y, x);
	}

    var myVar = setInterval(function(){ myTimer() }, 500);

    function myTimer() 
    {

       var dir = (indexes[moveIndex]%4);
       movesf[dir]();
       moveIndex++;
    }


}

$('#textInput').bind('input propertychange', function() {

    processData();
});




function drawBoard(){
for (var x = 0; x <= fullsize; x += step) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
}


for (var x = 0; x <= bh; x += 40) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
}

context.strokeStyle = "black";
context.stroke();
}





var canvas = document.getElementById('batata');
canvas.height = 360;
canvas.width = 360;

var canvasContext = canvas.getContext('2d');



    var bw = 350;
    var bh = 350;
    var p = 10;
    var cw = bw + (p*2) + 1;
    var ch = bh + (p*2) + 1;

    function drawBoard(){
    for (var x = 0; x <= bw; x += step) {
        canvasContext.moveTo(0.5 + x + p, p);
        canvasContext.lineTo(0.5 + x + p, bh + p);
    }


    for (var x = 0; x <= bh; x += step) {
        canvasContext.moveTo(p, 0.5 + x + p);
        canvasContext.lineTo(bw + p, 0.5 + x + p);
    }

    canvasContext.strokeStyle = "black";
    canvasContext.stroke();
    }

    drawBoard();


document.body.appendChild(canvas); 	
