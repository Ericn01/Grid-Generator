// Imports
import { colorSchemes } from "./colorsSchemes.js";
import { initForm } from "./formToggling.js";

// Default configuration constants
const defaultConfig = {
    numRows: 5,
    numCols: 5,
    isUniformSize: 'yes',
    verticalGap: 0,
    horizontalGap: 0,
    itemWidth: 225,
    itemHeight: 225,
    minGridItemWidth: 150,
    minGridItemHeight: 100,
    maxWidth: 250,
    maxGridItemWidth: 250,
    maxGridItemHeight: 150,
    colorScheme: 'vibrantColors',
    numColors: 5,
    borderColor: 'black',
    addBoxShadow: 'yes',
    borderRadius: 0
};

// Load configuration from local storage or use default
let config = JSON.parse(localStorage.getItem('gridConfig')) || defaultConfig;

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', () => {
    initForm();
    setupFormListeners();
    applyDimensionSettings(config);
    setDefaultValues();
    updateGridOnInputChange()
    initializeDefaultGrid()
});

function initializeDefaultGrid() {
    const gridContainer = document.querySelector('.gridContainer');
    createGrid(gridContainer);  // Use defaultConfig to create initial grid
}

function setDefaultValues() {
    // Loop through each property in the defaultConfig object
    for (let key in config) {
        const input = document.querySelector(`#${key}`);
        if (input) {
            if (input.type === 'checkbox') {
                // Set checkbox 'checked' state based on boolean conversion or specific string match
                input.checked = config[key] === 'yes' || config[key] === true;
            } else {
                // Set the value for other types of inputs
                input.value = config[key];
                console.log(`${key}: `, input.value)
            }
        }
    }
}

// Adds event listeners to form inputs to update the grid dynamically whenever the input values change.
function updateGridOnInputChange() {
    const gridContainer = document.querySelector('.gridContainer');
    const inputs = document.querySelectorAll('#gridForm input, select'); // grab all inputs
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Validate user input in number / numerical fields
            if (input.type === 'number'){
                checkInputValue(parseInt(input.max), parseInt(input.min), parseInt(input.value), input)
            }
            updateGridConfig();
            createGrid(gridContainer);
        });
    });
}
/**
 * Validates and adjusts the value of a numerical input field to ensure it falls within the specified range.
 * @param {*} max (number): The maximum allowed value.
 * @param {*} min (number): The minimum allowed value.
 * @param {*} currentVal (number): The current value of the input field.
 * @param {*} numericalInput (HTMLInputElement): The input field element.
 */
function checkInputValue(max, min, currentVal, numericalInput){
    if (currentVal == '' || isNaN(currentVal)){
        numericalInput.value = Math.floor((max - min) / 2); // Center the value
    }
    if (currentVal > max){
        numericalInput.value = max;
    } else if (currentVal < min){
        numericalInput.value = min;
    }
}

// Retrieves and returns the form data as an object, with each property corresponding to a form field value.
function updateGridConfig() {
    const formData = new FormData(document.querySelector('#gridForm'));
    config = {
        numRows: parseInt(formData.get('numRows')) || config.numRows,
        numCols: parseInt(formData.get('numCols')) || config.numCols,
        isUniformSize: formData.get('uniformSize') || config.isUniformSize,
        verticalGap: parseInt(formData.get('verticalGap')) || config.verticalGap,
        horizontalGap: parseInt(formData.get('horizontalGap')) || config.horizontalGap,
        // Use these values if the user selects for uniform size
        itemWidth: parseInt(formData.get('itemWidth')) || config.itemWidth,
        itemHeight: parseInt(formData.get('itemHeight')) || config.itemHeight,
        // Use these values if a non-uniform size is selected
        minGridItemWidth: parseInt(formData.get('minGridItemWidth')) || config.minGridItemWidth,
        maxGridItemWidth: parseInt(formData.get('maxGridItemWidth')) || config.maxGridItemWidth,
        minGridItemHeight: parseInt(formData.get('minGridItemHeight')) || config.minGridItemHeight,
        maxGridItemHeight: parseInt(formData.get('maxGridItemHeight')) || config.maxGridItemHeight,
        // Other form data values 
        borderWidth: parseInt(formData.get('borderWidth')) || config.borderWidth,
        colorScheme: formData.get('colorScheme') || config.colorScheme,
        numColors: parseInt(formData.get('numColors')) || config.numColors,
        borderColor: formData.get('borderColor') || config.borderColor,
        addBoxShadow: formData.get('addBoxShadow') || config.addBoxShadow,
        borderRadius: parseInt(formData.get('borderRadius')) || config.borderRadius
    };
    localStorage.setItem('gridConfig', JSON.stringify(config));
}


// Setup event listeners related to form elements
function setupFormListeners() {
    const gridItemDimensions = document.querySelectorAll('.itemWidth, .itemHeight');
    updateRangeDisplays(gridItemDimensions);
    addDimensionInputListeners(gridItemDimensions);

    document.querySelectorAll(".gridDimensions input[type='number'], .miscStyling input[type='number']")
        .forEach(elem => elem.addEventListener('input', () => applyDimensionSettings(config)));
}

// Apply dimension settings based on input or default values
function applyDimensionSettings({ numRows, numCols, verticalGap, horizontalGap, borderWidth }) {
    if (!document.querySelector('.gridContainer')) {
        console.error('Grid container not found.');
        return;
    }
    const maxDimensions = calculateMaxGridItemDimensions(numRows, numCols, verticalGap, horizontalGap, borderWidth);
    setMaxDimensionsOnUI(maxDimensions);
}

// Update UI elements to reflect max dimensions
function setMaxDimensionsOnUI({ maxItemWidth, maxItemHeight }) {
    document.querySelectorAll('.maxWidth').forEach( (elem) => {
        elem.textContent = `${maxItemWidth}px`
        elem.max = maxItemWidth;
    } );
    document.querySelectorAll('.maxHeight').forEach( (elem) => { 
        elem.textContent = `${maxItemHeight}px`
        elem.max = maxItemHeight;
    });
}

function addDimensionInputListeners(elements) {
    elements.forEach(input => {
        input.addEventListener('input', () => updateRangeDisplays(elements));
    });
}


function updateRangeDisplays(elements) {
    const values = Array.from(elements).map(element => element.value);
    const [uniformWidth, uniformHeight, minWidth, maxWidth, minHeight, maxHeight] = values;

    document.querySelector('.widthAndHeight').textContent = `Grid Item Dimensions: ${uniformWidth}px x ${uniformHeight}px`;
    setRangeString(document.querySelector('.dim.width'), 'Width Range: ', minWidth, maxWidth);
    setRangeString(document.querySelector('.dim.height'), 'Height Range: ', minHeight, maxHeight);
}

function setRangeString(element, label, min, max) {
    element.textContent = `${label} ${min}px - ${max}px`;
}

// Calculate maximum dimensions for grid items
function calculateMaxGridItemDimensions(numRows, numCols, verticalGap, horizontalGap, borderWidth) {
    const gridContainer = document.querySelector('.gridContainer');
    if (!gridContainer) {
        console.error('Grid container not found.');
        return { maxItemWidth: 0, maxItemHeight: 0 };
    }
    const gridWidth = gridContainer.offsetWidth;
    const gridHeight = gridContainer.offsetHeight;
    const totalHorizontalGap = (numCols - 1) * horizontalGap + numCols * 2 * borderWidth;
    const totalVerticalGap = (numRows - 1) * verticalGap + numRows * 2 * borderWidth;
    const maxItemWidth = Math.floor((gridWidth - totalHorizontalGap) / numCols);
    const maxItemHeight = Math.floor((gridHeight - totalVerticalGap) / numRows);

    console.log('Max Item Width: ', maxItemWidth, ' Max Item Height: ', maxItemHeight)
    return { maxItemWidth: maxItemWidth, maxItemHeight: maxItemHeight };
}


// Create the grid based on form data
function createGrid(gridContainer) {
    const { numRows, numCols, isUniformSize, verticalGap, horizontalGap, 
            itemWidth, itemHeight, minWidth, minHeight, maxWidth, maxHeight,
            borderWidth, colorScheme, numColors, borderColor, addBoxShadow, borderRadius } = config;
    
    // Determine dimensions based on uniform size setting
    let width = isUniformSize === 'yes' ? itemWidth : getRandomDimension(minWidth, minHeight);
    let height = isUniformSize === 'yes' ? itemHeight : getRandomDimension(maxWidth, maxHeight);

    const colors = colorSchemes[colorScheme].colors.slice(0, numColors);

    setupGridContainer(gridContainer, numRows, numCols, verticalGap, horizontalGap);
    populateGrid(gridContainer, numRows, numCols, colors, borderWidth, height, width, borderColor, addBoxShadow, borderRadius);
}

// =============== Create Grid Helper Functions ===================

// Returns a random dimension value between the specified minimum and maximum values.
function getRandomDimension(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Configures the grid container with the specified settings for rows, columns, and gaps.
 * @param {*} container (HTMLElement): The grid container element.
 * @param {*} rows (number): Number of rows in the grid.
 * @param {*} cols (number): Number of columns in the grid.
 * @param {*} verticalGap (number): Vertical gap between grid items.
 * @param {*} horizontalGap (number): Horizontal gap between grid items.
 */
function setupGridContainer(container, rows, cols, verticalGap, horizontalGap) {
    container.style.padding = '5px';
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.columnGap = `${verticalGap}px`;
    container.style.rowGap = `${horizontalGap}px`;
    container.innerHTML = ''; // Clear previous grid items
}

/**
 * Populates the grid container with grid items based on the provided settings.
 * @param {*} container (HTMLElement): The grid container element.
 * @param {*} numRows  (number): Number of rows in the grid.
 * @param {*} numCols (number): Number of columns in the grid.
 * @param {*} colors (array): Array of colors for the grid items.
 * @param {*} borderWidth (number): Border width of grid items.
 * @param {*} itemWidth (number): Width of grid items.
 * @param {*} itemHeight  (number): Height of grid items.
 * @param {*} borderColor (string): Border color of grid items.
 * @param {*} boxShadow (string): Box shadow setting for grid items.
 * @param {*} borderRadius (number): Border radius of grid items.
 */
function populateGrid(container, numRows, numCols, colors, borderWidth, itemWidth, itemHeight, borderColor, boxShadow, borderRadius) {
    const boxShadowCSS = '1px 1px 5px black';
    for (let i = 0; i < numRows * numCols; i++) {
        const item = document.createElement('div');
        const colorIndex = i % colors.length;
        item.style.cssText = `
            width: ${itemWidth}px;
            height: ${itemHeight}px;
            background-color: ${colors[colorIndex]};
            border: ${borderWidth}px solid ${borderColor};
            box-shadow: ${boxShadow === config.addBoxShadow ? boxShadowCSS : 'none'};
            border-radius: ${borderRadius}px
        `;
        container.appendChild(item);
    }
}
