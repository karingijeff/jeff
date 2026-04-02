const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Dummy data for cars
let cars = [
    { id: 1, location: 'LocationA', available: true },
    { id: 2, location: 'LocationB', available: false }
];

// Get all cars
app.get('/api/cars', (req, res) => {
    res.json(cars);
});

// Update car location
app.put('/api/cars/:id/location', (req, res) => {
    const carId = parseInt(req.params.id);
    const { location } = req.body;
    
    const car = cars.find(c => c.id === carId);
    if (car) {
        car.location = location;
        res.json(car);
    } else {
        res.status(404).send('Car not found');
    }
});

// Update car availability
app.put('/api/cars/:id/availability', (req, res) => {
    const carId = parseInt(req.params.id);
    const { available } = req.body;

    const car = cars.find(c => c.id === carId);
    if (car) {
        car.available = available;
        res.json(car);
    } else {
        res.status(404).send('Car not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
