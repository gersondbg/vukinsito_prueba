const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.STRING,
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
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Review;
