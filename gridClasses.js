import colorSchemes  from "./colorsSchemes";

// Default attribute values for a grid item --> Users can change this if they'd like 
const defaultGridItem = {
    height: 100,
    width: 100, 
    borderWidth: 2,
    borderRadius: 1,
    addBoxShadow: 'yes',
    gridColumn: 'auto',
    gridRow: 'auto',
    colorScheme: 'modernChic',
    numColors: 5
}

// Default configuration for the grid - subject to change
const defaultGridConfig = {
    numRows: 5,
    numCols: 4,
    verticalGap: 0,
    horizontalGap: 0
}

class Grid {
    constructor(numRows, numCols, verticalGap, horizontalGap, gridItemConfig, gridContainer) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.verticalGap = verticalGap;
        this.horizontalGap = horizontalGap;
        this.gridPadding = 0;
        this.gridItemConfig = gridItemConfig;
        this.gridContainer = gridContainer;
    }

    updateGrid(newConfig) {
        Object.assign(this, newConfig);
    }

    calculateMaxDimensions() {
        if (!this.gridContainer) {
            console.error('Grid container not found.');
            return { maxItemWidth: 0, maxItemHeight: 0 };
        }
        
        const gridWidth = this.gridContainer.offsetWidth;
        const gridHeight = this.gridContainer.offsetHeight;
        const totalHorizontalGap = (this.numCols - 1) * this.horizontalGap + this.numCols * 2 * this.gridItemConfig.borderWidth;
        const totalVerticalGap = (this.numRows - 1) * this.verticalGap + this.numRows * 2 * this.gridItemConfig.borderWidth;
        const maxItemWidth = (gridWidth - totalHorizontalGap) / this.numCols;
        const maxItemHeight = (gridHeight - totalVerticalGap) / this.numRows;
        
        return { 
            maxItemWidth: Math.floor(maxItemWidth), 
            maxItemHeight: Math.floor(maxItemHeight) 
        };
    }

    renderGrid() {
        // Clear existing content
        this.gridContainer.innerHTML = '';
        
        // Set up grid container styles
        this.gridContainer.style.cssText = `
            display: grid; 
            grid-template-rows: repeat(${this.numRows}, 1fr); 
            grid-template-columns: repeat(${this.numCols}, 1fr); 
            gap: ${this.verticalGap}px ${this.horizontalGap}px; 
            padding: ${this.gridPadding}px
        `;
        
        // Create and append grid items
        for (let i = 0; i < this.numRows * this.numCols; i++) {
            const gridItem = new GridItem(
                this.gridItemConfig.width,
                this.gridItemConfig.height,
                this.gridItemConfig.borderWidth,
                this.gridItemConfig.borderRadius,
                this.gridItemConfig.borderColor,
                this.gridItemConfig.addBoxShadow,
                this.gridItemConfig.colorScheme,
                this.gridItemConfig.numColors,
                i
            );
            this.gridContainer.appendChild(gridItem.renderGridItem());
        }
    }
}

// Singular grid item configuration
class GridItem {
    constructor(width, height, borderWidth, borderRadius, borderColor, addBoxShadow, colorScheme, numColors, gridIndex) {
        this.width = width;
        this.height = height;
        this.borderWidth = borderWidth;
        this.borderRadius = borderRadius;
        this.borderColor = borderColor;
        this.addBoxShadow = addBoxShadow;
        this.colorScheme = colorScheme;
        this.numColors = numColors;
        this.gridIndex = gridIndex;
    }

    updateGridItem(newProps) {
        Object.assign(this, newProps);
    }

    renderGridItem() {
        const item = document.createElement('div');
        
        // Assuming colorSchemes is available globally or imported
        const colors = colorSchemes[this.colorScheme]?.colors?.slice(0, this.numColors) || ['#000'];
        const boxShadowCSS = '1px 1px 5px black'; // Define the shadow style
        
        item.style.cssText = `
            width: ${this.width}px; 
            height: ${this.height}px; 
            border: ${this.borderWidth}px solid ${this.borderColor}; 
            border-radius: ${this.borderRadius}px; 
            box-shadow: ${this.addBoxShadow === 'yes' ? boxShadowCSS : 'none'}; 
            background-color: ${colors[this.gridIndex % colors.length]}
        `;
        
        return item;
    }
}

const defaultGrid = new Grid(defaultGridConfig.numRows, defaultGridConfig.numCols, defaultGridConfig.verticalGap, defaultGridConfig.horizontalGap, defaultGridItem)

export { Grid, GridItem, defaultGrid };