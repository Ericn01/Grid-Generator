import { colorSchemes } from "./colorsSchemes";
import { initForm } from "./formToggling";
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
    * Another consideration is the relationship between grid dimensions, and the max size of each grid item
    * 
    */
    
    initForm();

    // Grabbing the dimensions HTML nodes (p)
    const [widthRange, heightRange] = document.querySelectorAll('.dim');
    // Adding an event listener to each item
    const gridItemDimensions = document.querySelectorAll('.itemValue input')
    // Setting up the default values 
    setRangeString(widthRange, gridItemDimensions[0].value, gridItemDimensions)
    // Using a for loop to iterate over the NodeList and adding event listeners
    for (const input of gridItemDimensions){
        input.addEventListener('input', () => {
            // minWidth, maxWidth, minHeight, maxHeight
            const values = Array.from(gridItemDimensions).map(input => input.value);
            console.log(values)
            const [minWidth, maxWidth, minHeight, maxHeight] = values;

            setRangeString(widthRange, 'Width Range: ', minWidth, maxWidth)
            setRangeString(heightRange, 'Height Range: ', minHeight, maxHeight)
        });
    };


    // Here we use the modern FormData object to retrieve form data
    document.getElementById('gridForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        const formData = new FormData(this); // 'this' refers to the form
    
        // Display the form data in the console for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

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
    htmlNode.textContent = `${text}: ${min}px - ${max}px`;
}

/** 
 * Calculates the minimum and maximum pixel values for the width and height of a grid item based on the selection of #rows and #columns
 * 
*/

const calculateMinAndMaxGridValues = (numRows, numColumns) => {

}


const generateGrids = (numRows, numColumns, minItemWidth, minItemHeight, minItemWidth, maxItemHeight, colorPalette, gridGap)