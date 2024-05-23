# Grid Generator To-Do Page

**Remember**, the goal of this project is to create a dynamic and highly customizable CSS grid template based which can be manipulated via a form. Listed below is some of the functionality that I have either currently implemented or would like to implement in the future.


## Project Sections

### 1. Initial Page Load

When the page loads there is some default behavior that is expected. We expect a grid with pre-selected values to be generated based off the default config object. If the user has already visited the page and changed the configuration of the grid, we'll retrieve whatever is stored in local storage under gridConfig. The values within each of the inputs and text elements should reflect the actual values present at this time. 

### 2. User inputs / grid customization

Upon customizing the grid elements, the grid config object should be updated automatically. The changes made will also be saved to local storage, that way the layout is saved and can be loaded the next time the user visits the page. Of course, the actual CSS grid that is presented should be updated and re-rendered, accurately displaying the current values in the configuration. 

Another caveat here is the maximum grid item dimensions calculation. If a user changes the value of the border width input for example, the maximum dimensions of each grid item will have to be updated. This change will be dynamic and reflected in the sliders that control the width / height of each item. The same will be done for changes to the # rows, columns, etc. There will be a variable that stores the current % of the slider's fill rate and 


## Important Functionality

1. Calculate the maximum width and height of each grid item based off the number of rows and columns in the grid, along with grid gaps, grid item borders, and the dimensions of the grid container (including padding, margins, etc). 

2. Properly display the grid after generation.

3. Generate the CSS code for the given grid layout when the user requests it. 

4. Allow users to load in custom grid configuration items from their computer's file system (in JSON format), and generate a custom grid based on it. 