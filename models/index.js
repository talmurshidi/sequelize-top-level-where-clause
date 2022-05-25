var fs = require('fs');
var path = require('path');
var basename = path.basename(__filename);

let dbConn = require('../db_config.js'),
    DataTypes = dbConn.DataTypes,
    sequelize = dbConn.sequelize;

if (!sequelize) sequelize = dbConn.GetDB();

const models = {};

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        models[model.name] = model;
    });

Object.keys(models).forEach((modelName) => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

//Fix the wrong count issue in findAndCountAll()
sequelize.addHook('beforeCount', function (options) {
    if (this._scope.include && this._scope.include.length > 0) {
        options.distinct = true
        options.col = this._scope.col || options.col || `"${this.options.name.singular}".id`
    }

    if (options.include && options.include.length > 0) {
        options.include = null
    }
})

module.exports = { sequelize, DataTypes, models };
