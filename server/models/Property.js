const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Property = sequelize.define('Property', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ownerId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ownerName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'pending', 'suspended'),
        defaultValue: 'pending'
    },
    revenue: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    }
});

module.exports = Property;
