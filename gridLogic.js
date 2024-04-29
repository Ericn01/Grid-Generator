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

    // Here we use the modern FormData object to retrieve form data
    document.getElementById('gridForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
    
        const formData = new FormData(this); // 'this' refers to the form
    
        // Display the form data in the console for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

    });
    
});