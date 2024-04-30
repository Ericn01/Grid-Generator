import  { colorSchemes, colorMapping } from "./colorsSchemes.js";
import { initForm } from "./formToggling.js";
/**
 * The goal of this project is to create a m x n grid (dimensions specified by user).
 * The main page will be a form asking for the user's inputs. These will include the following:
 *  1. Dimensions of the grid layout (m x n)
 *  2. Maximum and minimum size of the individual grid items.
 *  3. Color scheme for the grid (random can be selected)
 *  4. Grid gap, border, etc --> Misc styling
 */

// Now we ask ourselves, what functions may be needed for such a project?

// Defining some global variables
let numRows = 0;
let numCols = 0;
let gridGap = 0;
let borderWidth = 0;

// Well first thing, we want to wait for the DOM Content to be loaded.
document.addEventListener('DOMContentLoaded', () => {
    initForm();
    setupFormListeners();
});

function setupFormListeners() {
    const gridItemDimensions = document.querySelectorAll('.itemWidth, .itemHeight');
    updateRangeDisplays(gridItemDimensions);
    addDimensionInputListeners(gridItemDimensions);

    // event listeners to update the values of the global variables (which update the maximum value for grid size)
    document.querySelectorAll(".gridDimensions input[type='number']").forEach( elem => elem.addEventListener('input', () => updateGlobalVariables(gridItemDimensions)));
    document.querySelectorAll(".miscStyling input[type='number']").forEach(elem => elem.addEventListener('input',  () => updateGlobalVariables(gridItemDimensions)));

    const form = document.querySelector('#gridForm');
    form.addEventListener('submit', handleFormSubmit);
}

function updateGlobalVariables (dims) {
    numRows = parseInt(document.querySelector("#rowVal").value);
    numCols = parseInt(document.querySelector('#colVal').value);
    gridGap = parseInt(document.querySelector('#gridGap').value);
    borderWidth = parseInt(document.querySelector("#bSize").value);
    setMaxDimensions(dims)
}

function setMaxDimensions(gridItemDimensions) {
    const maxDimensions = calculateMaxGridItemDimensions();
    gridItemDimensions.forEach((elem) => {
        const id = elem.id;
        if (id.includes('Height')) {
            const maxItemHeight = maxDimensions.maxItemHeight;
            const minMaxHeightBoundary =  Math.ceil(maxItemHeight / 2)
            if (id.includes('min')){ // minimum case
                elem.max = minMaxHeightBoundary;
            } else{ // maximum case (same as the case for uniform grid items)
                elem.max = maxItemHeight;
                elem.min = Math.ceil(maxItemHeight / 2);
            }
        }
        if (id.includes('Width')) {
            const maxItemWidth = maxDimensions.maxItemWidth;
            const minMaxWidthBoundary =  Math.ceil(maxItemWidth / 2)
            if (id.includes('min')){ // minimum case
                elem.max = minMaxWidthBoundary
            } else{ // maximum case (same as the case for uniform grid items)
                elem.max = maxItemWidth;
                elem.min = minMaxWidthBoundary;
            }
        }
    });
}

function addDimensionInputListeners(elements) {
    elements.forEach(input => {
        input.addEventListener('input', () => updateRangeDisplays(elements));
    });
}

function updateRangeDisplays(elements) {
    const [uniformWidth, uniformHeight, minWidth, maxWidth, minHeight, maxHeight] = Array.from(elements).map(element => element.value);
    const uniformDimensionsRange = `Grid Item Dimensions: ${uniformWidth} x ${uniformHeight}`;
    document.querySelector('.widthAndHeight').textContent = uniformDimensionsRange;
    setRangeString(document.querySelector('.dim.width'), 'Width Range: ', minWidth, maxWidth);
    setRangeString(document.querySelector('.dim.height'), 'Height Range: ', minHeight, maxHeight);
}

function setRangeString(element, label, min, max) {
    element.textContent = `${label} ${min}px - ${max}px`;
}

function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    createGrid(formData);
}

function createGrid(formData) {
    console.log(formData);
    const numRows = parseInt(formData.get('rowVal'));
    const numCols = parseInt(formData.get('colVal'));
    const colors = getColorsFromScheme(formData.get('colorScheme'), formData.get('numColors'));
    const gridContainer = setupGridContainer(numRows, numCols, formData.get('gridGap'));

    for (let i = 0; i < numRows * numCols; i++) {
        const gridItem = createGridItem(i, formData, colors);
        gridContainer.appendChild(gridItem);
    }

    document.querySelector('.container').style.display = 'none'; // Hide form
}

/* Returns the color object from */
function getColorsFromScheme(schemeName, numColors) {
    return colorSchemes[schemeName][colorMapping[numColors]];
}

function setupGridContainer(rows, cols, gap) {
    const container = document.querySelector('.gridContainer');
    container.style.cssText = `display: grid; grid-template-rows: repeat(${rows}, 1fr); grid-template-columns: repeat(${cols}, 1fr); gap: ${gap}px;`;
    container.innerHTML = '';
    return container;
}

function createGridItem(index, formData, colors) {
    const minWidth = parseInt(formData.get('minGridItemWidth'));
    const maxWidth = parseInt(formData.get('maxGridItemWidth'));
    const minHeight = parseInt(formData.get('minGridItemHeight'));
    const maxHeight = parseInt(formData.get('maxGridItemHeight'));
    // Return dimensions within the given range
    const itemWidth = getRandomDimension(minWidth, maxWidth);
    const itemHeight = getRandomDimension(minHeight, maxHeight);
    const colorIndex = index % colors.length;
    // Box shadow logic
    const boxShadowCSS = '1px 1px 5px black'

    const item = document.createElement('div');
    item.style.cssText = `width: ${itemWidth}px; height: ${itemHeight}px; background-color: ${colors[colorIndex]}; display: flex; justify-content: center; 
                          align-items: center; border: ${formData.get('bSize')}px solid ${formData.get('bColor')};
                          box-shadow: ${formData.get('addBoxShadow') === 'yes' ? boxShadowCSS : 'none'};`;
    item.textContent = `Item ${index + 1}`;
    return item;
}

function getRandomDimension(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function calculateMaxGridItemDimensions () {
    // Get the window's width and height
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Calculate the total space taken by gaps and borders in both dimensions
    const totalHorizontalGap = (numCols - 1) * gridGap + numCols * 2 * borderWidth;
    const totalVerticalGap = (numRows - 1) * gridGap + numRows * 2 * borderWidth;

    // Calculate maximum width and height for each grid item
    const maxItemWidth = (windowWidth - totalHorizontalGap) / numCols;
    const maxItemHeight = (windowHeight - totalVerticalGap) / numRows;

    // Return an object containing the dynamically calculated max width and height for a singular grid item
    return {
        maxItemWidth: Math.floor(maxItemWidth),
        maxItemHeight: Math.floor(maxItemHeight)
    };
}
