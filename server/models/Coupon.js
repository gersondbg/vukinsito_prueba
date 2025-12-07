const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Coupon = sequelize.define('Coupon', {
    code: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    discount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('percentage', 'fixed'),
        allowNull: false
    },
    validUntil: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    usageLimit: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    usedCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Coupon;
