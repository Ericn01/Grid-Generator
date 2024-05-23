
const toggleMinMaxDimensions = () => {
    const uniformSizeInputs = document.querySelectorAll('input[name="uniformSize"]');
    const minMaxDimensions = document.querySelector('.minMaxDimensions');
    const equalDimensions = document.querySelector('.equalDimensions');
    const gridSizeTypeSelection = document.querySelector('#notUniformSize')
    // Check #1 upon page load
    minMaxDimensions.style.display = 'none';
    equalDimensions.style.display = 'block';
    // Add an event listener to each input
    uniformSizeInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (gridSizeTypeSelection.checked) {
                equalDimensions.style.display = 'none'
                minMaxDimensions.style.display = 'block'; // Show if 'No' is selected
            } else {
                equalDimensions.style.display = 'block'
                minMaxDimensions.style.display = 'none'; // Hide otherwise
            }
        });
    });
}

const createMiscStylingToggleButton = () => {
    const miscStylingSection = document.querySelector('.formSection.miscStyling');
    const toggleMiscStylingBtn = document.createElement('button');
    toggleMiscStylingBtn.id = 'miscStylingBtn'
    // Initially display the misc styling section
    toggleMiscStylingBtn.textContent = '▼ Hide Misc. Styling Options';
    toggleMiscStylingBtn.addEventListener('click', (e) => {
        // Prevent the default button submit behavior upon a click
        e.preventDefault()
        if (miscStylingSection.style.display === 'none') {
            miscStylingSection.style.display = 'block';
            toggleMiscStylingBtn.textContent = '▲ Hide Misc. Styling Options';
        } else {
            miscStylingSection.style.display = 'none';
            toggleMiscStylingBtn.textContent = '▼ Show Misc. Styling Options';
        }
    });
    document.querySelector('form').insertBefore(toggleMiscStylingBtn, miscStylingSection);
}

const initForm = () => {
    toggleMinMaxDimensions();
    createMiscStylingToggleButton();
}

export { initForm };
