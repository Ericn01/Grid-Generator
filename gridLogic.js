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
    itemWidth: 200,
    itemHeight: 200,
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

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', () => {
    initFormSettings();
    setDefaultValues();
    updateGridOnInputChange()
    initializeDefaultGrid()
});

function initFormSettings() {
    initForm();
    setupFormListeners();
    initializeGridDimensions();
}

function initializeDefaultGrid() {
    const gridContainer = document.querySelector('.gridContainer');
    createGrid(defaultConfig, gridContainer);  // Use defaultConfig to create initial grid
}

function setDefaultValues() {
    // Loop through each property in the defaultConfig object
    const DOMKeyMappings = {numRows: 'rowVal', numCols: 'colVal', 
                            borderColor: 'bColor', borderRadius: 'bRadius', borderWidth: 'bSize', borderColor: 'bColor', 
                            itemWidth: 'gridItemWidth', itemHeight: 'gridItemHeight'}
    for (let key in defaultConfig) {
        const originalKey = key;
        const mapping = DOMKeyMappings[key];
        if (mapping){
            key = mapping;
        }
        console.log(key)
        const input = document.querySelector(`#${key}`);
        if (input) {
            if (input.type === 'checkbox') {
                // Set checkbox 'checked' state based on boolean conversion or specific string match
                input.checked = defaultConfig[originalKey] === 'yes' || defaultConfig[originalKey] === true;
            } else {
                // Set the value for other types of inputs
                input.value = defaultConfig[originalKey];
                console.log(`${key}: `, input.value)
            }
        }
    }
}

function updateGridOnInputChange() {
    const inputs = document.querySelectorAll('#gridForm input, select');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Validate user input in number / numerical fields
            if (input.type === 'number'){
                checkInputValue(parseInt(input.max), parseInt(input.min), parseInt(input.value), input)
            }
            const formData = fetchFormData();
            const gridContainer = document.querySelector('.gridContainer');
            createGrid(formData, gridContainer);
        });
    });
}

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

function fetchFormData() {
    const formData = new FormData(document.querySelector('#gridForm'));
    return {
        numRows: parseInt(formData.get('rowVal')) || defaultConfig.NUM_ROWS,
        numCols: parseInt(formData.get('colVal')) || defaultConfig.NUM_COLS,
        isUniformSize: formData.get('uniformSize') || defaultConfig.IS_UNIFORM,
        verticalGap: parseInt(formData.get('verticalGap')) || defaultConfig.VERTICAL_GAP,
        horizontalGap: parseInt(formData.get('horizontalGap')) || defaultConfig.HORIZONTAL_GAP,
        // Use these values if the user selects for uniform size
        itemWidth: parseInt(formData.get('gridItemWidth')) || defaultConfig.ITEM_WIDTH,
        itemHeight: parseInt(formData.get('gridItemHeight')) || defaultConfig.ITEM_HEIGHT,
        // Use these values if a non-uniform size is selected
        minGridItemWidth: parseInt(formData.get('gridItemHeight')) || defaultConfig.MIN_WIDTH,
        maxGridItemWidth: parseInt(formData.get('gridItemHeight')) || defaultConfig.MAX_WIDTH,
        minGridItemHeight: parseInt(formData.get('gridItemHeight')) || defaultConfig.MIN_HEIGHT,
        maxGridItemHeight: parseInt(formData.get('gridItemHeight')) || defaultConfig.MAX_HEIGHT,
        // Other form data values 
        borderWidth: parseInt(formData.get('bSize')) || defaultConfig.BORDER_WIDTH,
        colorScheme: formData.get('colorScheme') || defaultConfig.COLOR_SCHEME,
        numColors: parseInt(formData.get('numColors')) || defaultConfig.NUM_COLORS,
        borderColor: formData.get('bColor') || defaultConfig.BORDER_COLOR,
        addBoxShadow: formData.get('addBoxShadow') || defaultConfig.ADD_BOX_SHADOW,
        borderRadius: parseInt(formData.get('bRadius')) || defaultConfig.BORDER_RADIUS
    };
}

// Initialize grid dimensions with default values
function initializeGridDimensions() {
    const dimensions = fetchInitialDimensions();
    applyDimensionSettings(dimensions);
}

// Fetch initial values from DOM or use defaults
function fetchInitialDimensions() {
    const numRows = parseInt(document.querySelector("#rowVal").value) || defaultConfig.numRows;
    const numCols = parseInt(document.querySelector('#colVal').value) || defaultConfig.numCols;
    const verticalGap = parseInt(document.querySelector('#verticalGap')) || defaultConfig.verticalGap;
    const horizontalGap = parseInt(document.querySelector('#horizontalGap')) || defaultConfig.horizontalGap;
    const borderWidth = parseInt(document.querySelector("#bSize").value) || defaultConfig.borderWidth;
    return { numRows, numCols, verticalGap, horizontalGap, borderWidth };
}

// Setup event listeners related to form elements
function setupFormListeners() {
    const gridItemDimensions = document.querySelectorAll('.itemWidth, .itemHeight');
    updateRangeDisplays(gridItemDimensions);
    addDimensionInputListeners(gridItemDimensions);

    document.querySelectorAll(".gridDimensions input[type='number'], .miscStyling input[type='number']")
        .forEach(elem => elem.addEventListener('input', () => applyDimensionSettings(fetchInitialDimensions())));

    const form = document.querySelector('#gridForm');
    form.addEventListener('submit', handleFormSubmit);
}

// Apply dimension settings based on input or default values
function applyDimensionSettings({ numRows, numCols, verticalGap, horizontalGap, borderWidth }) {
    const maxDimensions = calculateMaxGridItemDimensions(numRows, numCols, verticalGap, horizontalGap, borderWidth);
    setMaxDimensionsOnUI(maxDimensions);
}

// Update UI elements to reflect max dimensions
function setMaxDimensionsOnUI({ maxItemWidth, maxItemHeight }) {
    const widthElements = document.querySelectorAll('.maxWidth');
    const heightElements = document.querySelectorAll('.maxHeight');
    widthElements.forEach(elem => elem.textContent = `${maxItemWidth}px`);
    heightElements.forEach(elem => elem.textContent = `${maxItemHeight}px`);
}

function addDimensionInputListeners(elements) {
    elements.forEach(input => {
        input.addEventListener('input', () => updateRangeDisplays(elements));
    });
}


function updateRangeDisplays(elements) {
    const [uniformWidth, uniformHeight, minWidth, maxWidth, minHeight, maxHeight] = Array.from(elements).map(element => element.value);
    const uniformDimensionsRange = `Grid Item Dimensions: ${uniformWidth}px x ${uniformHeight}px`;
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

// Calculate maximum dimensions for grid items
function calculateMaxGridItemDimensions(numRows, numCols, verticalGap, horizontalGap, borderWidth) {
    const gridContainer = document.querySelector('.gridContainer');
    const gridWidth = gridContainer.offsetWidth;
    const gridHeight = gridContainer.offsetHeight;
    const totalHorizontalGap = (numCols - 1) * horizontalGap + numCols * 2 * borderWidth;
    const totalVerticalGap = (numRows - 1) * verticalGap + numRows * 2 * borderWidth;
    const maxItemWidth = (gridWidth - totalHorizontalGap) / numCols;
    const maxItemHeight = (gridHeight - totalVerticalGap) / numRows;
    return { maxItemWidth: Math.floor(maxItemWidth), maxItemHeight: Math.floor(maxItemHeight) };
}

// Create the grid based on form data
function createGrid(gridData, gridContainer) {
    const { numRows, numCols, isUniformSize, verticalGap, horizontalGap, 
            itemWidth, itemHeight, minWidth, minHeight, maxWidth, maxHeight,
            borderWidth, colorScheme, numColors, borderColor, addBoxShadow, borderRadius } = gridData;
    
    console.log(colorScheme)

    // Determine dimensions based on uniform size setting
    let width = isUniformSize === 'yes' ? itemWidth : getRandomDimension(minWidth, minHeight);
    let height = isUniformSize === 'yes' ? itemHeight : getRandomDimension(maxWidth, maxHeight);

    const colors = colorSchemes[colorScheme].colors.slice(0, numColors);
    setupGridContainer(gridContainer, numRows, numCols, verticalGap, horizontalGap);
    populateGrid(gridContainer, numRows, numCols, colors, borderWidth, height, width, borderColor, addBoxShadow, borderRadius);
}

function getRandomDimension(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setupGridContainer(container, rows, cols, verticalGap, horizontalGap) {
    container.style.padding = '5px';
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.columnGap = `${verticalGap}px`;
    container.style.rowGap = `${horizontalGap}px`;
    container.innerHTML = ''; // Clear previous grid items
}

function populateGrid(container, numRows, numCols, colors, borderWidth, itemWidth, itemHeight, borderColor, boxShadow, borderRadius) {
    // Box shadow defined
    console.log('Height ', itemHeight, 'px\nWidth ', itemWidth, 'px')
    const boxShadowCSS = '1px 1px 5px black';
    for (let i = 0; i < numRows * numCols; i++) {
        const item = document.createElement('div');
        const colorIndex = i % colors.length;
        item.style.cssText = `width: ${itemWidth}px; height: ${itemHeight}px; background-color: ${colors[colorIndex]};
        border: ${borderWidth}px solid ${borderColor}; box-shadow: ${boxShadow === 'yes' ? boxShadowCSS : 'none'}; border-radius: ${borderRadius}px`;
        container.appendChild(item);
    }
}
