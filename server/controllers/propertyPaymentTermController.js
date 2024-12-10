const { PropertyPaymentTerm } = require('../models/models.js');

class PropertyPaymentTermController {

    async create(req, res) {
        const { name, period } = req.body;
        const propertyPaymentTerm = await PropertyPaymentTerm.create({ name, period });
        return res.json(propertyPaymentTerm);
    }

    async getAll(req, res) {
        const paymentTerms = await PropertyPaymentTerm.findAll()
        return res.json(paymentTerms);
    }

}

module.exports = new PropertyPaymentTermController();