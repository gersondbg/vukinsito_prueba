const sequelize = require('../database');
const User = require('./User');
const Property = require('./Property');
const Room = require('./Room');
const Review = require('./Review');
const Booking = require('./Booking');
const Extra = require('./Extra');
const Coupon = require('./Coupon');

// Associations

// Property - User (Owner)
Property.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
User.hasMany(Property, { foreignKey: 'ownerId' });

// Room - Property
Room.belongsTo(Property, { foreignKey: 'propertyId' });
Property.hasMany(Room, { foreignKey: 'propertyId' });

// Review - Room
Review.belongsTo(Room, { foreignKey: 'roomId' });
Room.hasMany(Review, { foreignKey: 'roomId', as: 'reviews' });

// Review - User
Review.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Review, { foreignKey: 'userId' });

// Booking - Room
Booking.belongsTo(Room, { foreignKey: 'roomId' }); // Note: roomId in Booking might be string in mock, ensure types match or use UUID
Room.hasMany(Booking, { foreignKey: 'roomId' });

// Booking - User
Booking.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    User,
    Property,
    Room,
    Review,
    Booking,
    Extra,
    Coupon
};
