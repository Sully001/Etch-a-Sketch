const DEFAULTSIZE = 16;


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


//Creating the grid using CSS GRID
function createGrid(size) {
    const GRIDSIZE = size * size;
    canvas.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
    canvas.style["grid-template-rows"] = `repeat(${size}, 1fr)`;

for (let i = 0; i < GRIDSIZE; i++) {
    const gridSquare = document.createElement('div');
    gridSquare.classList.add('sqaure');
    gridSquare.addEventListener('mouseover', changeColor)
    gridSquare.addEventListener('mousedown', changeColor)
    canvas.append(gridSquare);

    }
}

//Look for that specific div that has been click over and change its color
//e.preventDefault() prevents dragging of any element
function changeColor (e) {
    if (e.type === 'mouseover' &&  !mouseDown) return;
    e.preventDefault();
    e.target.style.backgroundColor = 'black';
}

//To clear any color on the grid
function clearGridColor() {
    const grid = document.querySelectorAll('.sqaure');
    grid.forEach((gridSquare) => {
        gridSquare.style.backgroundColor = 'white';
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
    grid.forEach((square) => {
        square.classList.toggle('grid-lines');
    })
}

function checkGridLines() {
    if (document.querySelectorAll('.grid-lines').length !== 0) {
        return true;
    }
}


//Clear Button event listener
clearButton.addEventListener('click', clearGridColor);
slider.addEventListener('input', updateSize);
gridLineButton.addEventListener('click', toggleGridLines);
gridLineButton.addEventListener('click', toggleGridLines);





//Function Calls
createGrid(DEFAULTSIZE);



