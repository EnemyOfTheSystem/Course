const { PropertyType } = require('../models/models');

class PropertyTypeController {

    async create(req, res) {
        const { name, description } = req.body;
        const propertyType = await PropertyType.create({ name, description });
        return res.json(propertyType);
    }

    async getAll(req, res) {
        const propertyTypes = await PropertyType.findAll()
        return res.json(propertyTypes);
    }

}

module.exports = new PropertyTypeController();