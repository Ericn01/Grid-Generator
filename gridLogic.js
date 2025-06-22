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
    maxGridItemWidth: 250,
    maxGridItemHeight: 150,
    colorScheme: 'vibrantColors',
    numColors: 5,
    borderColor: 'black',
    borderWidth: 1, // Added missing property
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
    updateGridOnInputChange();
    initializeDefaultGrid();
});

function initializeDefaultGrid() {
    const gridContainer = document.querySelector('.gridContainer');
    if (gridContainer) {
        createGrid(gridContainer);
    } else {
        console.error('Grid container not found during initialization');
    }
}

function setDefaultValues() {
    // Loop through each property in the config object
    for (let key in config) {
        const input = document.querySelector(`#${key}`);
        if (input) {
            if (input.type === 'checkbox') {
                // Set checkbox 'checked' state based on boolean conversion or specific string match
                input.checked = config[key] === 'yes' || config[key] === true;
            } else {
                // Set the value for other types of inputs
                input.value = config[key];
                console.log(`${key}: `, input.value);
            }
        }
    }
}

// Adds event listeners to form inputs to update the grid dynamically whenever the input values change.
function updateGridOnInputChange() {
    const gridContainer = document.querySelector('.gridContainer');
    if (!gridContainer) {
        console.error('Grid container not found for input change listeners');
        return;
    }
    
    const inputs = document.querySelectorAll('#gridForm input, #gridForm select'); // Added #gridForm prefix
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Validate user input in number / numerical fields
            if (input.type === 'number') {
                const max = parseInt(input.max) || 1000;
                const min = parseInt(input.min) || 0;
                const currentVal = parseInt(input.value);
                checkInputValue(max, min, currentVal, input);
            }
            updateGridConfig();
            createGrid(gridContainer);
        });
    });
}

/**
 * Validates and adjusts the value of a numerical input field to ensure it falls within the specified range.
 * @param {number} max - The maximum allowed value.
 * @param {number} min - The minimum allowed value.
 * @param {number} currentVal - The current value of the input field.
 * @param {HTMLInputElement} numericalInput - The input field element.
 */
function checkInputValue(max, min, currentVal, numericalInput) {
    if (currentVal === '' || isNaN(currentVal) || currentVal === null || currentVal === undefined) {
        numericalInput.value = Math.floor((max + min) / 2); // Fixed calculation
        return;
    }
    if (currentVal > max) {
        numericalInput.value = max;
    } else if (currentVal < min) {
        numericalInput.value = min;
    }
}

// Retrieves and returns the form data as an object, with each property corresponding to a form field value.
function updateGridConfig() {
    const formElement = document.querySelector('#gridForm');
    if (!formElement) {
        console.error('Form element not found');
        return;
    }
    
    const formData = new FormData(formElement);
    config = {
        numRows: parseInt(formData.get('numRows')) || config.numRows,
        numCols: parseInt(formData.get('numCols')) || config.numCols,
        isUniformSize: formData.get('isUniformSize') || config.isUniformSize, // Fixed field name
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
    
    // Validate config before saving
    if (validateConfig(config)) {
        localStorage.setItem('gridConfig', JSON.stringify(config));
    }
}

// Added validation function
function validateConfig(configToValidate) {
    const requiredNumericFields = ['numRows', 'numCols', 'itemWidth', 'itemHeight'];
    for (let field of requiredNumericFields) {
        if (!configToValidate[field] || configToValidate[field] <= 0) {
            console.error(`Invalid value for ${field}: ${configToValidate[field]}`);
            return false;
        }
    }
    return true;
}

// Setup event listeners related to form elements
function setupFormListeners() {
    const gridItemDimensions = document.querySelectorAll('.itemWidth, .itemHeight');
    if (gridItemDimensions.length > 0) {
        updateRangeDisplays(gridItemDimensions);
        addDimensionInputListeners(gridItemDimensions);
    }

    document.querySelectorAll(".gridDimensions input[type='number'], .miscStyling input[type='number']")
        .forEach(elem => elem.addEventListener('input', () => applyDimensionSettings(config)));
}

// Apply dimension settings based on input or default values
function applyDimensionSettings({ numRows, numCols, verticalGap, horizontalGap, borderWidth }) {
    const gridContainer = document.querySelector('.gridContainer');
    if (!gridContainer) {
        console.error('Grid container not found.');
        return;
    }
    
    // Add validation for zero values
    if (numRows <= 0 || numCols <= 0) {
        console.error('Invalid grid dimensions');
        return;
    }
    
    const maxDimensions = calculateMaxGridItemDimensions(numRows, numCols, verticalGap, horizontalGap, borderWidth);
    setMaxDimensionsOnUI(maxDimensions);
}

// Update UI elements to reflect max dimensions
function setMaxDimensionsOnUI({ maxItemWidth, maxItemHeight }) {
    document.querySelectorAll('.maxWidth').forEach((elem) => {
        elem.textContent = `${maxItemWidth}px`;
        if (elem.tagName.toLowerCase() === 'input') {
            elem.max = maxItemWidth;
        }
    });
    document.querySelectorAll('.maxHeight').forEach((elem) => {
        elem.textContent = `${maxItemHeight}px`;
        if (elem.tagName.toLowerCase() === 'input') {
            elem.max = maxItemHeight;
        }
    });
}

function addDimensionInputListeners(elements) {
    elements.forEach(input => {
        input.addEventListener('input', () => updateRangeDisplays(elements));
    });
}

function updateRangeDisplays(elements) {
    const values = Array.from(elements).map(element => element.value || '0');
    
    // Safer destructuring with defaults
    const uniformWidth = values[0] || '0';
    const uniformHeight = values[1] || '0';
    const minWidth = values[2] || '0';
    const maxWidth = values[3] || '0';
    const minHeight = values[4] || '0';
    const maxHeight = values[5] || '0';

    const widthAndHeightElement = document.querySelector('.widthAndHeight');
    if (widthAndHeightElement) {
        widthAndHeightElement.textContent = `Grid Item Dimensions: ${uniformWidth}px x ${uniformHeight}px`;
    }
    
    setRangeString(document.querySelector('.dim.width'), 'Width Range: ', minWidth, maxWidth);
    setRangeString(document.querySelector('.dim.height'), 'Height Range: ', minHeight, maxHeight);
}

function setRangeString(element, label, min, max) {
    if (element) {
        element.textContent = `${label} ${min}px - ${max}px`;
    }
}

// Calculate maximum dimensions for grid items
function calculateMaxGridItemDimensions(numRows, numCols, verticalGap, horizontalGap, borderWidth = 0) {
    const gridContainer = document.querySelector('.gridContainer');
    if (!gridContainer) {
        console.error('Grid container not found.');
        return { maxItemWidth: 0, maxItemHeight: 0 };
    }
    
    const gridWidth = gridContainer.offsetWidth;
    const gridHeight = gridContainer.offsetHeight;
    
    // Add validation for container dimensions
    if (gridWidth <= 0 || gridHeight <= 0) {
        console.warn('Grid container has no dimensions');
        return { maxItemWidth: 100, maxItemHeight: 100 }; // Fallback values
    }
    
    const totalHorizontalGap = (numCols - 1) * horizontalGap + numCols * 2 * borderWidth;
    const totalVerticalGap = (numRows - 1) * verticalGap + numRows * 2 * borderWidth;
    const maxItemWidth = Math.floor((gridWidth - totalHorizontalGap) / numCols);
    const maxItemHeight = Math.floor((gridHeight - totalVerticalGap) / numRows);

    console.log('Max Item Width: ', maxItemWidth, ' Max Item Height: ', maxItemHeight);
    return { 
        maxItemWidth: Math.max(maxItemWidth, 10), // Ensure minimum size
        maxItemHeight: Math.max(maxItemHeight, 10) 
    };
}

// Create the grid based on form data
function createGrid(gridContainer) {
    if (!gridContainer) {
        console.error('Grid container is null or undefined');
        return;
    }
    
    const { 
        numRows, numCols, isUniformSize, verticalGap, horizontalGap, 
        itemWidth, itemHeight, minGridItemWidth, minGridItemHeight, 
        maxGridItemWidth, maxGridItemHeight, borderWidth, colorScheme, 
        numColors, borderColor, addBoxShadow, borderRadius 
    } = config;
    
    // Validate colorScheme exists
    if (!colorSchemes[colorScheme]) {
        console.error(`Color scheme '${colorScheme}' not found`);
        return;
    }
    
    // Fixed dimension calculation logic
    let width, height;
    if (isUniformSize === 'yes') {
        width = itemWidth;
        height = itemHeight;
    } else {
        // Use correct min/max values for random dimensions
        width = getRandomDimension(minGridItemWidth, maxGridItemWidth);
        height = getRandomDimension(minGridItemHeight, maxGridItemHeight);
    }

    const colors = colorSchemes[colorScheme].colors.slice(0, numColors);
    if (colors.length === 0) {
        console.error('No colors available in color scheme');
        return;
    }

    setupGridContainer(gridContainer, numRows, numCols, verticalGap, horizontalGap);
    populateGrid(gridContainer, numRows, numCols, colors, borderWidth, width, height, borderColor, addBoxShadow, borderRadius);
}

// =============== Create Grid Helper Functions ===================

// Returns a random dimension value between the specified minimum and maximum values.
function getRandomDimension(min, max) {
    if (min >= max) {
        console.warn(`Invalid range: min (${min}) >= max (${max}). Using min value.`);
        return min;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Configures the grid container with the specified settings for rows, columns, and gaps.
 * @param {HTMLElement} container - The grid container element.
 * @param {number} rows - Number of rows in the grid.
 * @param {number} cols - Number of columns in the grid.
 * @param {number} verticalGap - Vertical gap between grid items.
 * @param {number} horizontalGap - Horizontal gap between grid items.
 */
function setupGridContainer(container, rows, cols, verticalGap, horizontalGap) {
    container.style.padding = '5px';
    container.style.display = 'grid';
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.columnGap = `${horizontalGap}px`; // Fixed: was verticalGap
    container.style.rowGap = `${verticalGap}px`;      // Fixed: was horizontalGap
    container.innerHTML = ''; // Clear previous grid items
}

/**
 * Populates the grid container with grid items based on the provided settings.
 * @param {HTMLElement} container - The grid container element.
 * @param {number} numRows - Number of rows in the grid.
 * @param {number} numCols - Number of columns in the grid.
 * @param {Array} colors - Array of colors for the grid items.
 * @param {number} borderWidth - Border width of grid items.
 * @param {number} itemWidth - Width of grid items.
 * @param {number} itemHeight - Height of grid items.
 * @param {string} borderColor - Border color of grid items.
 * @param {string} boxShadow - Box shadow setting for grid items.
 * @param {number} borderRadius - Border radius of grid items.
 */
function populateGrid(container, numRows, numCols, colors, borderWidth, itemWidth, itemHeight, borderColor, boxShadow, borderRadius) {
    const boxShadowCSS = '1px 1px 5px black';
    const totalItems = numRows * numCols;
    
    for (let i = 0; i < totalItems; i++) {
        const item = document.createElement('div');
        const colorIndex = i % colors.length;
        
        // Generate random dimensions for non-uniform items
        let currentWidth = itemWidth;
        let currentHeight = itemHeight;
        
        if (config.isUniformSize !== 'yes') {
            currentWidth = getRandomDimension(config.minGridItemWidth, config.maxGridItemWidth);
            currentHeight = getRandomDimension(config.minGridItemHeight, config.maxGridItemHeight);
        }
        
        item.style.cssText = `
            width: ${currentWidth}px;
            height: ${currentHeight}px;
            background-color: ${colors[colorIndex]};
            border: ${borderWidth}px solid ${borderColor};
            box-shadow: ${boxShadow === 'yes' ? boxShadowCSS : 'none'};
            border-radius: ${borderRadius}px;
            box-sizing: border-box;
        `;
        container.appendChild(item);
    }
}