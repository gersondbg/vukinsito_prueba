const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    propertyId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hotel: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    images: {
        type: DataTypes.JSON,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    amenities: {
        type: DataTypes.JSON,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    rules: {
        type: DataTypes.JSON,
        allowNull: true
    }
});

module.exports = Room;
