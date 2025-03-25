// Debounce function to optimize resize event handling
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Function to adjust the image map coordinates
function adjustMapCoords() {
    const img = document.getElementById('image');
    const areas = document.querySelectorAll('map area');

    const imgRect = img.getBoundingClientRect(); // Get image dimensions and position
    const scaleX = imgRect.width / img.naturalWidth; // Scale factor for width
    const scaleY = imgRect.height / img.naturalHeight; // Scale factor for height

    areas.forEach(area => {
        const coords = area.getAttribute('coords')
            .split(',')
            .map(Number)
            .filter(coord => !isNaN(coord)); // Ensure valid numeric coordinates

        if (coords.length % 2 === 0) { // Ensure coordinate pairs
            const scaledCoords = coords.map((coord, index) =>
                index % 2 === 0 ? coord * scaleX : coord * scaleY
            );
            area.setAttribute('coords', scaledCoords.join(','));
        }
    });
}

// Event listener for image load to adjust coordinates
const img = document.getElementById('image');
img.addEventListener('load', adjustMapCoords);
if (img.complete) {
    adjustMapCoords(); // Adjust immediately if image is already loaded
}

// Debounced resize listener
window.addEventListener('resize', debounce(adjustMapCoords, 200));
