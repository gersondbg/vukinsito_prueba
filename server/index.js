const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize, User, Property, Room, Review, Booking, Extra, Coupon } = require('./models');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Sync database (without force to keep data)
sequelize.sync().then(() => {
    console.log('Database connected');
});

// API Routes

// --- Bookings ---
app.post('/api/bookings', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

app.get('/api/bookings', async (req, res) => {
    try {
        // Include associations if needed, e.g., Room name is already stored in Booking but we could join
        const bookings = await Booking.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// --- Rooms ---
app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await Room.findAll({
            include: [{ model: Review, as: 'reviews' }]
        });
        res.json(rooms);
    } catch (error) {
        console.error('Error fetching rooms:', error);
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

app.get('/api/rooms/:id', async (req, res) => {
    try {
        const room = await Room.findByPk(req.params.id, {
            include: [{ model: Review, as: 'reviews' }]
        });
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ error: 'Room not found' });
        }
    } catch (error) {
        console.error('Error fetching room:', error);
        res.status(500).json({ error: 'Failed to fetch room' });
    }
});

// --- Properties ---
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await Property.findAll();
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ error: 'Failed to fetch properties' });
    }
});

// --- Users ---
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// --- Extras ---
app.get('/api/extras', async (req, res) => {
    try {
        const extras = await Extra.findAll();
        res.json(extras);
    } catch (error) {
        console.error('Error fetching extras:', error);
        res.status(500).json({ error: 'Failed to fetch extras' });
    }
});

// --- Coupons ---
app.get('/api/coupons', async (req, res) => {
    try {
        const coupons = await Coupon.findAll();
        res.json(coupons);
    } catch (error) {
        console.error('Error fetching coupons:', error);
        res.status(500).json({ error: 'Failed to fetch coupons' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
