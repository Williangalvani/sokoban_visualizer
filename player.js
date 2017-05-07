    
var moves = ["left", "right", "down", "up", "push left", "push right", "push down", "push up"];

var fullsize = 350;
var step = fullsize/7;


var x = 1;
var y = 1;

var timer = null;
var moveIndex = 0;
var indexes = [];
var matrix = null;

var colors = ['#fff','#000','#550','#555','#055','#505'];

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

var magicspots = [];



function right()
{
    if (matrix[y][x+1]==0)
    {
        matrix[y][x+1]=3;
        matrix[y][x] = 0;   
        x=x+1;
    }
    else if (matrix[y][x+1] == 2 && matrix[y][x+2] == 0)
    {
        matrix[y][x] = 0;
        matrix[y][x+1]=3;
        matrix[y][x+2]=2;  
        x=x+1;
    }else
    {
        alert("bad move?");
    }

}

function left()
{
    if (matrix[y][x-1]==0)
    {
        matrix[y][x-1]=3;
        matrix[y][x] = 0;  
        x=x-1; 
    }
    else if (matrix[y][x-1] == 2 && matrix[y][x-2] == 0)
    {
        matrix[y][x] = 0;
        matrix[y][x-1]=3;
        matrix[y][x-2]=2;  
        x=x-1;
    }else
    {
        alert("bad move?");
    }
}

function up()
{
    if (matrix[y-1][x]==0)
    {
        matrix[y-1][x]=3;
        matrix[y][x] = 0;  
        y=y-1; 
    }
    else if (matrix[y-1][x] == 2 && matrix[y-2][x] == 0)
    {
        matrix[y][x] = 0;
        matrix[y-1][x]=3;
        matrix[y-2][x]=2;  
        y=y-1;
    }else
    {
        alert("bad move?");
    }
}

function down()
{
    if (matrix[y+1][x]==0)
    {
        matrix[y+1][x]=3;
        matrix[y][x] = 0;
        y=y+1;   
    }
    else if (matrix[y+1][x] == 2 && matrix[y+2][x] == 0)
    {
        matrix[y][x] = 0;
        matrix[y+1][x]=3;
        matrix[y+2][x]=2;  
        y=y+1;
    }else
    {
        alert("bad move?");
    }
}



function drawMatrix()
{
    canvasContext.clearRect(0, 0, fullsize, fullsize);
    for (var y_ = 0; y_<7 ;y_++)
    {
        for (var x_ = 0; x_<7 ;x_++)
        {
            canvasContext.fillStyle = colors[matrix[y_][x_]];
            var xstart = 0 + x_*step;
            var ystart = 0 + y_*step
            canvasContext.fillRect(xstart,ystart,step,step);
            canvasContext.fill();
        }
    }
    for(var i=0; i<targets.length;i+=2)
    {
        tx = parseInt(targets[i+1])*step+10;
        ty = parseInt(targets[i])*step+40;
        canvasContext.font="30px Arial";
        canvasContext.fillText("X",tx,ty);
    }
}


var movesf = [left, right, up, down];

String.prototype.replaceAll = function(target, replacement) {
  return this.split(target).join(replacement);
};

function processData()
{
    targets = $('#targets').val().match(/[^[\]]+(?=])/g);
    console.log(targets);
    eval($('#start'));
	var text = $('#textInput').val();
    matrix = eval($('#Matrix').val());
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

    timer = setInterval(function(){ myTimer() }, 200);

    function myTimer() 
    {
        try
        {

           var dir = (indexes[moveIndex]%4);
           console.log(dir)
           movesf[dir]();
           moveIndex++;
           drawMatrix();
        }

        catch(err)
        {
            console.log(err);   
            clearInterval(timer);
           
        }
    }


}

$('#textInput').bind('input propertychange', function() {

    processData();
});



/*
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

*/



var canvas = document.getElementById('batata');
canvas.height = 360;
canvas.width = 360;

var canvasContext = canvas.getContext('2d');


/*
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
*/

document.body.appendChild(canvas); 	
