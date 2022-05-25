'use strict';
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
        'Customer', {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'customer',
    });

    Customer.associate = function (models) {
        //M:M
        Customer.belongsToMany(models.Purchase, {
            as: 'customerPurchases',
            foreignKey: 'customer_id',
            targetKey: 'purchase_id',
            through: models.CustomerPurchase,
        });

        //1:M
        Customer.hasMany(models.CustomerPurchase, {
            as: 'purchases',
            foreignKey: 'customer_id',
            sourceKey: 'customer_id',
        });
    };

    return Customer;
};