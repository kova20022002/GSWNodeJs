// Get all description buttons
const descriptionButtons = document.querySelectorAll('.descriptionButton');

// Add click event listener to each description button
descriptionButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Toggle the visibility of the next sibling element with class "descriptionDropdown"
        const descriptionDropdown = button.nextElementSibling;
        descriptionDropdown.style.display = descriptionDropdown.style.display === 'none' ? 'block' : 'none';
        
        // Toggle the text content of the "+" symbol
        const plusSymbol = button.querySelector('p:last-of-type');
        plusSymbol.textContent = plusSymbol.textContent === '+' ? '-' : '+';
    });
});



