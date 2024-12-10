const sequelize = require('../db');
const { DataTypes } = require('sequelize');

// User Model
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING }
});

// Comment Model
const Comment = sequelize.define('comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    commentBody: { type: DataTypes.STRING, allowNull: false },
});

// Property Model
const Property = sequelize.define('property', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING(1000), allowNull: false },
    price: { type: DataTypes.DECIMAL, allowNull: false },
    address: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING }
});

// PropertyType Model
const PropertyType = sequelize.define('propertyType', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    weight: { type: DataTypes.INTEGER },
    description: { type: DataTypes.STRING }
});

// PropertyPaymentTerm Model
const PropertyPaymentTerm = sequelize.define('propertyPaymentTerm', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    period: { type: DataTypes.INTEGER, allowNull: false }
});

// Order Model
const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    phone: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING },
    status: {
        type: DataTypes.ENUM('Новая', 'В обработке', 'Одобрен', 'Отклонен'),
        defaultValue: 'Новая'
    },
});

// Associations (Relationships)

// User has many Comments
User.hasMany(Comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Comment.belongsTo(User);

// User has many Orders
User.hasMany(Order, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Order.belongsTo(User);

// User has many Properties
User.hasMany(Property, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Property.belongsTo(User);

// Property has many Comments
Property.hasMany(Comment, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Comment.belongsTo(Property);

// Property has many Orders
Property.hasMany(Order, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Order.belongsTo(Property);

// Property belongs to PropertyPaymentTerm
PropertyPaymentTerm.hasMany(Property, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Property.belongsTo(PropertyPaymentTerm);

// Property belongs to PropertyType
PropertyType.hasMany(Property, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
Property.belongsTo(PropertyType);

module.exports = {
    User,
    Comment,
    Property,
    PropertyType,
    PropertyPaymentTerm,
    Order
};
