
const toggleMinMaxDimensions = () => {
    const uniformSizeInputs = document.querySelectorAll('input[name="uniformSize"]');
    const minMaxDimensions = document.querySelector('.minMaxDimensions');
    uniformSizeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (document.getElementById('notUniformSize').checked) {
                minMaxDimensions.style.display = 'flex'; // Show if 'No' is selected
            } else {
                minMaxDimensions.style.display = 'none'; // Hide otherwise
            }
        });
    });
}

const createMiscStylingToggleButton = () => {
    const miscStylingSection = document.querySelector('.formSection.miscStyling');
    const toggleMiscStylingBtn = document.createElement('button');
    // Initially hide the misc styling section
    miscStylingSection.style.display = 'none';
    toggleMiscStylingBtn.textContent = '▼ Show Miscellaneous Styling Options';
    toggleMiscStylingBtn.style.display = 'block';
    toggleMiscStylingBtn.style.margin = '10px auto';
    toggleMiscStylingBtn.addEventListener('click', () => {
        if (miscStylingSection.style.display === 'none') {
            miscStylingSection.style.display = 'block';
            toggleMiscStylingBtn.textContent = '▲ Hide Miscellaneous Styling Options';
        } else {
            miscStylingSection.style.display = 'none';
            toggleMiscStylingBtn.textContent = '▼ Show Miscellaneous Styling Options';
        }
    });
    document.querySelector('form').insertBefore(toggleMiscStylingBtn, miscStylingSection);
}

const initForm = () => {
    toggleMinMaxDimensions();
    createMiscStylingToggleButton();
}

export { initForm, toggleMinMaxDimensions, createMiscStylingToggleButton };
