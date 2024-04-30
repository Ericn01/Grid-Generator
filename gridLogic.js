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
    /* Okay, now we think about the items we'll have to grab. 
    * Well obviously we need to use the form data, that's the first step.
    * Another consideration is the relationship between grid dimensions, and the max size of each grid item.
    */
    // This function is called to add the dropdown menus and to get the hidden parts of the form working
    initForm();

    // Grabbing the dimensions HTML nodes (p)
    const [widthRange, heightRange] = document.querySelectorAll('.dim');
    // Adding an event listener to each item
    const gridItemDimensions = document.querySelectorAll('.itemWidth, .itemHeight')
    
    // Range values initalized and displayed 
    setDefaultRangeValues(widthRange, heightRange, gridItemDimensions);

    // Using a for loop to iterate over the NodeList and adding event listeners
    for (const input of gridItemDimensions){
        input.addEventListener('input', () => {
            // minWidth, maxWidth, minHeight, maxHeight
            const values = Array.from(gridItemDimensions).map(input => input.value);
            const [minWidth, maxWidth, minHeight, maxHeight] = values;
            setRangeString(widthRange, 'Width Range: ', minWidth, maxWidth)
            setRangeString(heightRange, 'Height Range: ', minHeight, maxHeight)
        });
    };


    // Here we use the modern FormData object to retrieve form data
    document.querySelector('#submitGridFormBtn').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission
        
        const formData = new FormData(this); // 'this' refers to the form

        // Call the create grid function
        createGrid(formData)

        // Grid template rows - m, grid template columns - n.
        
    });
    
});


const checkMinLessThanMax = (min, max) => {
    minVal = Math.round(parseFloat(min), 2);
    maxVal = Math.round(parseFloat(max), 2);
    if (minVal > maxVal){
        throw new Error("Minimum value cannot be greater than maximum!");
    }
}

const setRangeString = (htmlNode, text, min, max) => {
    htmlNode.textContent = `${text} ${min}px - ${max}px`;
}

/** 
 * Calculates the minimum and maximum pixel values for the width and height of a grid item based on the selection of #rows and #columns
 * 
*/

const calculateMinAndMaxGridValues = (numRows, numColumns) => {
    // to perform this calculation, we will need to know the window size 
}


// Setting these guys up
const setDefaultRangeValues = (widthRange, heightRange, gridItemDimensions) => {
    setRangeString(widthRange, 'Width Range: ', gridItemDimensions[0].value, gridItemDimensions[1].value)
    setRangeString(heightRange, 'Height Range: ', gridItemDimensions[2].value, gridItemDimensions[3].value)
}



const createGrid = (gridParams) => {
        // Get the form values
        const numRows = parseInt(document.querySelector('#rowVal').value);
        const numCols = parseInt(document.querySelector('#colVal').value);
        const minWidth = parseInt(document.querySelector('#minGridItemWidth').value);
        const maxWidth = parseInt(document.querySelector('#maxGridItemWidth').value);
        const minHeight = parseInt(document.querySelector('#minGridItemHeight').value);
        const maxHeight = parseInt(document.querySelector('#maxGridItemHeight').value);
        const colorSchemeName = document.querySelector('#colorScheme').value;
        const numColors = parseInt(document.querySelector('#numColors').value);
        const gridGap = parseInt(document.querySelector('#gridGap').value);
        const borderSize = parseInt(document.querySelector('#bSize').value);
        const borderColor = document.querySelector('#bColor').value;
        
        // Select the color scheme
        const colors = colorSchemes[colorSchemeName][colorMapping[numColors]];

        // Hide the form 
        document.querySelector('.container').style.display = 'none';

        // Create the grid container
        const gridContainer = document.querySelector('.gridContainer');
        gridContainer.style.display = 'grid';
        gridContainer.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
        gridContainer.style.gap = `${gridGap}px`;
    
        // Clear previous items if any
        gridContainer.innerHTML = '';
    
        // Create each grid item
        for (let i = 0; i < numRows * numCols; i++) {
            const gridItem = document.createElement('div');
            const itemWidth = Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
            const itemHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
            const colorIndex = i % colors.length; // Cycle through colors
            
            // Style the grid item
            gridItem.style.width = `${itemWidth}px`;
            gridItem.style.height = `${itemHeight}px`;
            gridItem.style.backgroundColor = colors[colorIndex];
            gridItem.style.display = 'flex';
            gridItem.style.justifyContent = 'center';
            gridItem.style.alignItems = 'center';
            gridItem.style.border = borderColor;
            gridItem.style.borderWidth = borderSize;
            
            // Optionally, add text or content here
            gridItem.textContent = `Item ${i + 1}`;
    
            // Append the item to the grid
            gridContainer.appendChild(gridItem);
    }
}

