const customerController = require('./controllers/customer.controller.js');

getCustomers();

function getCustomers() {
    let customers = customerController.findAndCountAllCustomer();
    customers.then(function (data) {
        console.log(data);
        console.log(JSON.stringify(data, null, 4));
    });
}