'use strict';
module.exports = (sequelize, DataTypes) => {
    const Purchase = sequelize.define(
        'Purchase',
        {
            purchase_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: 'purchase',
        }
    );

    Purchase.associate = function (models) {
        // M:M
        Purchase.belongsToMany(models.Customer, {
            as: 'PurchaseCustomer',
            foreignKey: 'purchase_id',
            targetKey: 'customer_id',
            through: models.CustomerPurchase,
        });

        //1:M
        Purchase.hasMany(models.CustomerPurchase, {
            as: 'customers',
            foreignKey: 'purchase_id',
            sourceKey: 'purchase_id',
        });
    };

    return Purchase;
};
