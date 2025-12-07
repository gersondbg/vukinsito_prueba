const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4, // Keep generation for new bookings
        primaryKey: true
    },
    roomId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hotelName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    checkIn: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    checkOut: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    guests: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('confirmed', 'pending', 'cancelled'),
        defaultValue: 'pending'
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guestName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guestEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    couponCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    extras: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = Booking;
