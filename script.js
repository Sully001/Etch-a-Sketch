let promptSize = prompt("What size grid would you like?", 16);

// Our default grid size will be 16 x 16 in size
let size = promptSize
let click = false;
const DEFAULTGRIDSIZE = size * size;

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

//Grab the canvas which has a display of grid 
//Set its column and rows to the default
const canvas = document.querySelector('.canvas');
canvas.style["grid-template-columns"] = `repeat(${size}, 1fr)`;
canvas.style["grid-template-rows"] = `repeat(${size}, 1fr)`;

for (let i = 0; i < DEFAULTGRIDSIZE; i++) {
    const div = document.createElement('div');
    div.classList.add('divs');
    div.addEventListener('mouseover', changeColor)
    div.addEventListener('mousedown', changeColor)
    canvas.append(div);
}

function changeColor (e) {
    if (e.type === 'mouseover' &&  !mouseDown) return;
    e.preventDefault();
    e.target.style.backgroundColor = 'black';
    
} 

