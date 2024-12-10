const ApiError = require('../error/ApiError');
const { Property, Order, PropertyPaymentTerm, PropertyType } = require('../models/models');
const { createObjectCsvWriter } = require('csv-writer');
const { Op, Sequelize } = require('sequelize');
const uuid = require('uuid');
const path = require('path');

class PropertyController {

    async create(req, res, next) {
        try {
            console.log(req.body)
            const { name, description, price, address, propertyPaymentTermId, propertyTypeId } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + '.jpg';
            const createdProperty = await Property.create({ name, description, price, address, propertyPaymentTermId, propertyTypeId, img: fileName });
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            return res.json(createdProperty);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res, next) {
        try {
            const { id, name, description, price, address } = req.body;
            const property = Property.update({ name, description, price, address }, { where: { id } });
            return res.json(property);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const order = await Order.destroy({
                where: { propertyId: id }
            });
            const property = await Property.destroy({
                where: { id }
            });
            return res.json(property);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }


    async getAll(req, res) {
        let { propertyTypeId, propertyPaymentTermId, limit, page, costMin, costMax, searchWord, userId } = req.query;
        page = page || 1;
        limit = limit || 9;
        costMin = costMin || 0;
        costMax = costMax || 999999999;
        searchWord = searchWord || '';
        let offset = page * limit - limit;
        let whereClause = {};

        if (propertyTypeId) {
            whereClause.propertyTypeId = propertyTypeId;
        }

        if (propertyPaymentTermId) {
            whereClause.propertyPaymentTermId = propertyPaymentTermId;
        }

        if (searchWord) {
            whereClause = {
                ...whereClause,
                name: {
                    [Op.iLike]: `%${searchWord}%`
                }
            };
        }

        whereClause.price = {
            [Op.between]: [costMin, costMax]
        };

        try {

            let properties = await Property.findAll({
                include: [
                    {
                        model: PropertyPaymentTerm,
                        as: 'propertyPaymentTerm',
                        attributes: ['id', 'name']
                    },
                    {
                        model: PropertyType,
                        as: 'propertyType',
                        attributes: ['id', 'name']
                    },
                    {
                        model: Order,
                        as: 'orders',
                        required: false,
                        where: userId ? { userId } : {},
                        attributes: []
                    }
                ],
                where: whereClause,
                limit,
                offset,
                attributes: {
                    include: [
                        [
                            Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM orders o
                                JOIN properties p ON o."propertyId" = p.id
                                WHERE p."propertyTypeId" = Property."propertyTypeId"

                            )`),
                            'type_order_count'
                        ],
                        [
                            Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM orders o
                                JOIN properties p ON o."propertyId" = p.id
                                WHERE p."propertyPaymentTermId" = Property."propertyPaymentTermId"

                            )`),
                            'payment_term_order_count'
                        ]

                    ]
                }
            });
            const weights = { type: 2, paymentTerm: 1.5 };

            properties = properties.map(property => {
                const typeOrderCount = property.getDataValue('type_order_count') || 0;
                const paymentTermOrderCount = property.getDataValue('payment_term_order_count') || 0;

                console.log(typeOrderCount, paymentTermOrderCount);
                console.log("priority", typeOrderCount * (weights.type || 1) + paymentTermOrderCount * (weights.paymentTerm || 1));
                const priority =
                    typeOrderCount * (weights.type || 1) +
                    paymentTermOrderCount * (weights.paymentTerm || 1);

                return { ...property.toJSON(), priority };
            });

            // Сортируем объекты по приоритету
            properties.sort((a, b) => b.priority - a.priority);

            return res.json(properties);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ error: 'An error occurred while fetching properties.' });
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const property = await Property.findOne({
            where: { id }
        });
        return res.json(property == null ? {} : property);
    }

    async downloadReport(req, res) {
        const { startDate, endDate, name } = req.query;

        const orders = await Order.findAll({
            include: [
                {
                    model: Property,
                    as: 'property',
                    attributes: ['id', 'name', 'price', 'address']
                }
            ],
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                }
            },
            order: [['createdAt', 'ASC']]

        });

        const csvWriter = createObjectCsvWriter({
            path: name + '.csv',
            header: [
                { id: 'name', title: 'Название объекта' },
                { id: 'status', title: 'Статус заявки' },
                { id: 'createdAt', title: 'Дата создания' },
                { id: 'price', title: 'Цена объекта' }
            ],
            encoding: 'utf8'
        });

        let totalPriceApproved = 0;
        let totalPriceRejected = 0;
        const records = [];
        const revenueByDate = {};

        orders.forEach(order => {
            const { property, status, createdAt } = order;

            const dateKey = createdAt.toISOString().split('T')[0];
            const propertyPrice = parseFloat(property.price);

            if (status === 'Одобрен') {
                revenueByDate[dateKey] = (revenueByDate[dateKey] || 0) + propertyPrice;
            }

            records.push({
                name: property.name,
                status: status,
                createdAt: dateKey,
                price: propertyPrice
            });

            if (status === 'Одобрен') {
                totalPriceApproved += propertyPrice;
            } else if (status === 'Отклонен') {
                totalPriceRejected += propertyPrice;
            }
        });

        const regressionData = Object.entries(revenueByDate)
            .map(([date, revenue], index) => [index + 1, revenue]);

        console.log(regressionData);

        let prediction = 'N/A';
        if (regressionData.length > 1) {
            const { slope, intercept } = performLinearRegression(regressionData);
            prediction = predictNextPeriod(regressionData, slope, intercept).toFixed(2);
        }

        records.push({ name: '', status: '', createdAt: '', price: '' });
        records.push({ name: 'Общая сумма одобренных заявок:', price: totalPriceApproved });
        records.push({ name: 'Общая сумма отклоненных заявок:', price: totalPriceRejected });
        records.push({ name: 'Прогноз дохода на следующий период:', price: prediction });

        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename=' + name + '.csv');

        await csvWriter.writeRecords(records);
        res.download(name + '.csv');
    }

}

function performLinearRegression(data) {
    const n = data.length;
    const xSum = data.reduce((sum, [x]) => sum + x, 0);
    const ySum = data.reduce((sum, [, y]) => sum + y, 0);
    const xySum = data.reduce((sum, [x, y]) => sum + x * y, 0);
    const xSquaredSum = data.reduce((sum, [x]) => sum + x * x, 0);

    const slope = (n * xySum - xSum * ySum) / (n * xSquaredSum - xSum * xSum);
    const intercept = (ySum - slope * xSum) / n;

    return { slope, intercept };
}


function predictNextPeriod(data, slope, intercept) {
    const lastX = data[data.length - 1][0];
    return slope * (lastX + 1) + intercept; // Predict for the next period
}

module.exports = new PropertyController();