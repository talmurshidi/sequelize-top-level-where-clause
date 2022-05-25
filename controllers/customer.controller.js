const Associations = require('../models/index');
const models = Associations.models;
const Customer = models.Customer;
const sequelize = Associations.sequelize;
const { QueryTypes, Op } = require('sequelize');

async function findAndCountAllCustomer() {
    let result = await Customer.findAndCountAll({
        subQuery: false,
        where: {
            '$purchases.purchase_id$': 2
        },
        include: [
            {
                model: models.CustomerPurchase,
                as: "purchases",
                attributes: ['customer_id', 'purchase_id'],
                separate: true,
                include: [
                    {
                        model: models.Purchase,
                        as: 'purchase',
                        attributes: ['purchase_id', 'name']
                    }
                ],
            }
        ],
        limit: 1,
        offset: 0,
    });

    return result;
}

module.exports = { findAndCountAllCustomer }