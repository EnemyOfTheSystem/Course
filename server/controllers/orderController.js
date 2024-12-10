const { Order, User, Property } = require('../models/models');

class OrderController {

    async create(req, res) {
        const { phone, message, status, userId, propertyId } = req.body;
        const order = await Order.create({ phone, message, status, userId, propertyId });
        return res.json(order);
    }

    async update(req, res) {
        const { id, status } = req.body;
        const order = await Order.update({ status }, { where: { id } });
        return res.json(order);
    }

    async delete(req, res) {
        const { id } = req.params;
        console.log(id);
        const order = await Order.destroy({ where: { id } });
        return res.json(order);
    }

    async getAll(req, res) {
        const { userId, propertyId } = req.query;
        console.log(userId, propertyId);
        let orders;
        if (!userId && !propertyId) {
            orders = await Order.findAll({
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    },
                    {
                        model: Property,
                        as: 'property',
                        attributes: ['id', 'name', 'price', 'address']
                    }
                ],
                order: [['createdAt', 'ASC']]
            });
        } else if (userId && !propertyId) {
            orders = await Order.findAll({
                where: { userId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    },
                    {
                        model: Property,
                        as: 'property',
                        attributes: ['id', 'name', 'price', 'address']
                    }
                ],
                order: [['createdAt', 'ASC']]
            });
        } else if (userId && propertyId) {
            orders = await Order.findAll({
                where: { propertyId, userId },
                include: [
                    {
                        model: User,
                        as: 'user',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    },
                    {
                        model: Property,
                        as: 'property',
                        attributes: ['id', 'name', 'price', 'address']
                    }
                ],
                order: [['createdAt', 'ASC']]
            });
        }
        return res.json(orders);
    }

    async getUserOrders(req, res) {

    }

}

module.exports = new OrderController();