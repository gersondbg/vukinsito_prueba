const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Extra = sequelize.define('Extra', {
    id: {
        type: DataTypes.STRING, // Keep string ID like 'e1' from mock data or UUID
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Extra;
