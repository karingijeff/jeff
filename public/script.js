// public/script.js

// Function to initialize the map
function initMap() {
    const mapOptions = {
        zoom: 10,
        center: { lat: -34.397, lng: 150.644 }, // Centered on a default location
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);
    fetchCarData(map);
}

// Function to fetch car data from an API or server
async function fetchCarData(map) {
    try {
        const response = await fetch('https://api.example.com/cars'); // Replace with your API endpoint
        const carData = await response.json();
        displayCarsOnMap(carData, map);
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
}

// Function to display car markers on the map
function displayCarsOnMap(cars, map) {
    cars.forEach(car => {
        const { lat, lng, availability } = car;
        const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: availability ? 'Available' : 'Not Available',
        });
        // Optionally add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>Car Details</h3><p>Availability: ${availability ? 'Available' : 'Not Available'}</p>`
        });
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Function to periodically fetch updates from the server
function startRealTimeUpdates() {
    fetchCarData(); // Initial fetch
    setInterval(() => {
        fetchCarData(); // Fetch updates every 30 seconds
    }, 30000);
}

// Load the map and start real-time updates on window load
window.onload = () => {
    initMap();
    startRealTimeUpdates();
};
