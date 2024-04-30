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

// Well first thing, we want to wait for the DOM Content to be loaded.
document.addEventListener('DOMContentLoaded', () => {
    initForm();
    setupFormListeners();
});

function setupFormListeners() {
    const gridItemDimensions = document.querySelectorAll('.itemWidth, .itemHeight');
    updateRangeDisplays(gridItemDimensions);
    addDimensionInputListeners(gridItemDimensions);

    const form = document.getElementById('gridForm');
    form.addEventListener('submit', handleFormSubmit);
}

function addDimensionInputListeners(elements) {
    elements.forEach(input => {
        input.addEventListener('input', () => updateRangeDisplays(elements));
    });
}

function updateRangeDisplays(elements) {
    const [minWidth, maxWidth, minHeight, maxHeight] = Array.from(elements).map(element => element.value);
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

    const item = document.createElement('div');
    item.style.cssText = `width: ${itemWidth}px; height: ${itemHeight}px; background-color: ${colors[colorIndex]}; display: flex; justify-content: center; align-items: center; border: ${formData.get('bSize')}px solid ${formData.get('bColor')};`;
    item.textContent = `Item ${index + 1}`;
    return item;
}

function getRandomDimension(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
