//Create a boolean to check if the mouse has been clicked
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

const canvas = document.querySelector('.canvas');


//Creating the grid using CSS GRID
function createGrid(size) {
    const GRIDSIZE = size * size;
    canvas.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
    canvas.style["grid-template-rows"] = `repeat(${size}, 1fr)`;

for (let i = 0; i < GRIDSIZE; i++) {
    const div = document.createElement('div');
    div.classList.add('divs');
    div.addEventListener('mouseover', changeColor)
    div.addEventListener('mousedown', changeColor)
    canvas.append(div);

    }
}

//Look for that specific div that has been click over and change its color
//e.preventDefault() prevents dragging of any element
function changeColor (e) {
    if (e.type === 'mouseover' &&  !mouseDown) return;
    e.preventDefault();
    e.target.style.backgroundColor = 'black';
}


//Function to clear the grid 
function clearGrid() {
const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    const squares = document.querySelectorAll('.divs');
    squares.forEach ((square) => {
        square.style.backgroundColor = 'white';
    }) 
} )
}

function clearFullGrid() {
    const grid = document.querySelectorAll('.divs');
    grid.forEach((square) => {
        square.remove();
    })
}

function changeSize() {
    const button = document.querySelector('.change-size');
    const inputSize = document.querySelector('.user-size');
    button.addEventListener('click', () => {
        clearFullGrid();
        const value = inputSize.value;
        createGrid(value);
    })
    
}

//Running Parts of the Program
let called = false;
let promptSize = prompt("What size grid would you like?", 16);
let changedValue = changeSize();


createGrid(promptSize);
clearGrid();



