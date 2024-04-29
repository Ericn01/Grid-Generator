
const toggleMinMaxDimensions = () => {
    const uniformSizeInputs = document.querySelectorAll('input[name="uniformSize"]');
    const minMaxDimensions = document.querySelector('.minMaxDimensions');
    // Add an event listener to each input
    uniformSizeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (document.getElementById('notUniformSize').checked) {
                minMaxDimensions.style.transition = 'all 0.5s';
                minMaxDimensions.style.display = 'flex'; // Show if 'No' is selected
            } else {
                minMaxDimensions.style.transition = '0.3s ease-in';
                minMaxDimensions.style.display = 'none'; // Hide otherwise
            }
        });
    });
}

const createMiscStylingToggleButton = () => {
    const miscStylingSection = document.querySelector('.formSection.miscStyling');
    const toggleMiscStylingBtn = document.createElement('button');
    toggleMiscStylingBtn.id = 'miscStylingBtn'
    // Initially hide the misc styling section
    miscStylingSection.style.display = 'none';
    toggleMiscStylingBtn.textContent = '▼ Show Misc. Styling Options';

    toggleMiscStylingBtn.addEventListener('click', () => {
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

export { initForm, toggleMinMaxDimensions, createMiscStylingToggleButton };
