
// setting up canvas and constants
const rows = 28;
const columns = 28;
const cell_size = 17.85;

var black_background = Array(rows*columns).fill("#000000");
var white_background = Array(rows*columns).fill("#ffffff");

const c   = document.querySelector('canvas');
const c_i = document.querySelector('#cell-index');
const ctx = c.getContext('2d');

var mouse = {x: undefined, y: undefined, isClicked: false};
var grid, swatch;

const def_color_array = ["#ffffff", "#b4b4b4", "#909090", "#494848", "#000000"];

/// MOUSE INPUT SECTION
c.addEventListener("mousemove",(e)=> {
	// mouse_coordinate - element_position_offset - border_width
    mouse.x = e.clientX-c.offsetLeft-20;
   	mouse.y = e.clientY-c.offsetTop-20;
});
c.addEventListener("mousedown",(e)=> mouse.isClicked = true);
c.addEventListener("mouseup",(e)=> mouse.isClicked = false);
/// MOUSE INPUT SECTION

// Initialization
function init() {
	grid = new Grid(rows, columns, cell_size);
	swatch = new Swatch(def_color_array);
	swatch.setSwatchView();

	// setup code here
    animate();
}

// animation loop
function animate() {
    requestAnimationFrame(animate);
	ctx.clearRect(0, 0, rows*cell_size, columns*cell_size);
	grid.update(mouse, ctx)
}
init();


function displayCellIndex(x, y) {
	c_i.innerHTML = x + ", " + y;
}

const hexToDecimal = hex => parseInt(hex, 16);

$(document).ready( function() {
    $('#submit').click(function() {
        var curr_grid = grid.export();

        $.ajax({
            type: "POST",
            url: "http://localhost:5000/call_predict",
            data: JSON.stringify({ 'data' : curr_grid.map(h => hexToDecimal(h.slice(1, 3))) }),
            crossDomain: true,
            dataType: "json",
            contentType : "application/json",

            //if received a response from the server
            success: function(response, textStatus, jqXHR) {
                    console.log(response, textStatus, jqXHR);
                    $("#uploadResponse").text(response['prediction']);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
            } 
        });
    });
});