const { Sequelize, DataTypes } = require('sequelize');

var DataBase = function () { };

DataBase.GetDB = function () {
    if (typeof DataBase.db === 'undefined') {
        DataBase.InitDB();
    }
    return DataBase.sequelize;
};

DataBase.InitDB = function () {
    DataBase.sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: './customer_db.sqlite3',
        // logging: console.log,                  // Default, displays the first parameter of the log function call
        // logging: (...msg) => console.log(msg), // Displays all log function call parameters
        // logging: false,                        // Disables logging
        // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
        // logging: logger.debug.bind(logger),    // Alternative way to use custom logger, displays all messages
        define: {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false, // disable or enable createdAt, updatedAt and deletedAt
            quoteIdentifiers: false, // set case-insensitive
            underscored: true, // names with underscored
            paranoid: false, // soft delete
        },
        transactionType: 'IMMEDIATE',
        retry: {
            // match: [/Deadlock/i],
            match: [
                Sequelize.ConnectionError,
                Sequelize.ConnectionTimedOutError,
                Sequelize.TimeoutError,
                Sequelize.DatabaseError,
                Sequelize.InstanceError,
                /Deadlock/i,
                'SQLITE_BUSY'],
            max: 5, // Maximum rety X times
            backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
            backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });

    DataBase.sequelize
        .authenticate()
        .then(() => {
            console.log('Connection established successfully.');
        })
        .catch((err) => {

            console.error('Unable to connect to the database:', err);
        });
};

// db.sequelize = sequelize;
DataBase.DataTypes = DataTypes;

module.exports = DataBase;
// module.exports = db;