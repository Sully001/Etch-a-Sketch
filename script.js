const DEFAULTSIZE = 16;
let paintColor = "rgba(0, 0, 0, 1.0)";


//Create a boolean to check if the mouse has been clicked
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Selecting 
const canvas = document.querySelector('.canvas');
const clearButton = document.querySelector('.clear');
const slider = document.querySelector('.slider');
const slideContainer = document.querySelector('.slidecontainer');
const sizeText = document.querySelector('.size-text');
const gridLineButton = document.querySelector('.toggle-lines');
const colorPicker = document.querySelector('.color-picker');
const rainbowButton = document.querySelector('.rainbow');
const shadingButton = document.querySelector('.shading');
const eraserButton = document.querySelector('.eraser');

//Creating the grid using CSS GRID
function createGrid(size) {
    const GRIDSIZE = size * size;
    canvas.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
    canvas.style["grid-template-rows"] = `repeat(${size}, 1fr)`;

for (let i = 0; i < GRIDSIZE; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('sqaure');
    gridSquare.addEventListener('mouseover', changeColor);
    gridSquare.addEventListener('mousedown', changeColor);
    canvas.append(gridSquare);


    }
}

//Look for that specific div that has been click over and change its color
//e.preventDefault() prevents dragging of any element
function changeColor (e) {
    if (e.type === 'mouseover' &&  !mouseDown) return;
    if (rainbowButton.classList.contains('toggled')) {
        paintColor = randomColor();
        console.log(paintColor);
    } else if (shadingButton.classList.contains('toggled')) {
        //paintColor = "rgb(0, 0, 0)";
        //Get the current opacity of the div
        let currentSquareOpacity = e.target.style.opacity;
        //Turn the current opacity into a number(FLOAT)
        let opacityNumHolder = parseFloat(currentSquareOpacity);

        //Check if the opacity is less than 0.9
        if (opacityNumHolder <= 0.9) {
                opacityNumHolder = Math.round((opacityNumHolder + 0.1) * 10) / 10;
                e.target.style.opacity = opacityNumHolder;
            //If not check if it is at max OPAQUENESS
        } else if (opacityNumHolder === 1.0) {
            e.target.style.opacity = 1.0;
        } else {
            //Otherwise set it to the lowest opaqueness
            e.target.style.opacity = 0.1;
        }
        //console.log(e.target.style.opacity);
    } else if (eraserButton.classList.contains('toggled')) {
        e.target.style.opacity = 1.0;
        paintColor = "transparent";
        e.target.style.removeProperty('opacity');
    } else {
        colorPicking();
        e.target.style.opacity = 1.0;
        console.log(paintColor);
    }
    e.preventDefault();
    e.target.style.backgroundColor = paintColor;
}

//To clear any color on the grid
function clearGridColor() {
    const grid = document.querySelectorAll('.sqaure');
    grid.forEach((gridSquare) => {
        gridSquare.style.backgroundColor = 'white';
        gridSquare.style.removeProperty('opacity');
    })
}

//To get the first value of the slider when the page loads
sizeText.innerHTML = slider.value + " X " + slider.value;

//To get the slider value after it has been moved
function updateSize() {
    sizeText.innerText = slider.value + " X " + slider.value;
    removeGridSquares();
    createGrid(slider.value);
}

function removeGridSquares() {
    document.querySelectorAll('.sqaure').forEach(div => div.remove());
}

function toggleGridLines() {
    const grid = document.querySelectorAll('.sqaure');
    gridLineButton.classList.toggle('toggled');
    grid.forEach((square) => {
        square.classList.toggle('grid-lines');
    })
}
//Updates the current color from what is picked by the user
function colorPicking() {
    let color = colorPicker.value;
    paintColor = hexToRGB(color);
}
//Picks are random color and converts it to hex
function randomColor() {
    let r = Math.floor((Math.random() * 255) + 1);
    let g = Math.floor((Math.random() * 255) + 1);
    let b = Math.floor((Math.random() * 255) + 1);
    let a = "1.0";
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

//Adds to the ALPHA value on RGBA  
//RETURNS A STRING VALUE 
function returnAlpha(color) {
    let slicedAlpha = color.slice(color.length - 4, color.length - 1);
    return slicedAlpha;
}

function changeAlpha(color, alpha) {
    let resetRGBA = color.replace(/\d[.]\d/, alpha);
    return resetRGBA;
}


function hexToRGB(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    let a = "1.0";

    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}


//Clear Button event listener
clearButton.addEventListener('click', clearGridColor);
slider.addEventListener('input', updateSize);
gridLineButton.addEventListener('click', toggleGridLines);
gridLineButton.addEventListener('click', toggleGridLines);
colorPicker.addEventListener('input', colorPicking);
rainbowButton.addEventListener('click', () => {
    eraserButton.classList.remove('toggled');
    shadingButton.classList.remove('toggled');
    rainbowButton.classList.toggle('toggled');
    
    
});
shadingButton.addEventListener('click', () => {
    eraserButton.classList.remove('toggled');
    rainbowButton.classList.remove('toggled');
    shadingButton.classList.toggle('toggled');
    
});
eraserButton.addEventListener('click', () => {
    shadingButton.classList.remove('toggled');
    rainbowButton.classList.remove('toggled');
    eraserButton.classList.toggle('toggled');
});





//Function Calls
createGrid(DEFAULTSIZE);

