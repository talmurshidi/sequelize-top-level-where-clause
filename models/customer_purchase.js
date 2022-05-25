'use strict';
module.exports = (sequelize, DataTypes) => {
    const CustomerPurchase = sequelize.define(
        'CustomerPurchase',
        {
            customer_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            purchase_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            tableName: 'customer_purchase',
        }
    );

    CustomerPurchase.associate = function (models) {
        CustomerPurchase.belongsTo(models.Customer, {
            as: 'customer',
            foreignKey: 'customer_id',
            targetKey: 'customer_id'
        });

        CustomerPurchase.belongsTo(models.Purchase, {
            as: 'purchase',
            foreignKey: 'purchase_id',
            targetKey: 'purchase_id'
        });

    };

    return CustomerPurchase;
};
