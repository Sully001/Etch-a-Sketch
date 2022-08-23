//Create a boolean to check if the mouse has been clicked
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);


//Creating the grid using CSS GRID
function createGrid(size) {
    const canvas = document.querySelector('.canvas');
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

let promptSize = prompt("What size grid would you like?", 16);
createGrid(promptSize);



